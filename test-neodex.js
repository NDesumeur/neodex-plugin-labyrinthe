// lancé par le test « local » de NeoDex : la vérification interne (plans, pièges, trappe, grille), une marche au clavier, une trappe qui s'ouvre
// sous le héros, la sortie, le plein écran et la place prise (avec NEO_SHOTS : garde des images du jeu)
module.exports = async ({ pj, sleep }) => {
  const C = code => pj(`(() => { const T = document.getElementById('gc').__lb, lb = T.st(); ${code} })()`);
  const key = (k, type = 'keydown') => pj(`document.dispatchEvent(new KeyboardEvent('${type}', {key: '${k}', bubbles: true})), 0`);
  const shot = async n => { if (!process.env.NEO_SHOTS) return; const d = await pj(`document.getElementById('gc').toDataURL()`); require('fs').writeFileSync(require('path').join(process.env.NEO_SHOTS, 'labyrinthe-' + n + '.png'), Buffer.from(d.split(',')[1], 'base64')); };
  await pj(`window.__e = []; addEventListener('error', e => __e.push(e.message)); 0`);
  const chk = await C('return T.check();'); if (chk !== 'ok') throw new Error('vérification : ' + chk);
  await C('T.again(6); return 0;'); await sleep(200); await shot('0-depart');
  // une marche au clavier dans le premier couloir libre
  const dir = await C(`return [['ArrowRight', 1, 0], ['ArrowDown', 0, 1]].find(([, dx, dy]) => !lb.m[1 + dy][1 + dx])[0];`);
  await key(dir); await sleep(400); await key(dir, 'keyup'); const s1 = await C('return {x: lb.x, y: lb.y, steps: lb.steps, mode: lb.mode};');
  if (s1.mode !== 'play' || !s1.steps) throw new Error('les flèches devaient faire avancer : ' + JSON.stringify(s1));
  // tout le plan éclairé pour l'image, puis le héros posé sur une trappe juste avant qu'elle s'ouvre
  await C(`lb.seen = lb.m.map(r => r.map(() => 1)); const g = lb.gates[0]; if (g) lb.t = (190 - g.off + 3000) % 300; return 0;`); await sleep(150); await shot('1-pieges');
  await C(`const tp = lb.traps[0]; lb.x = lb.fx = tp.x; lb.y = lb.fy = tp.y; lb.t = (160 - tp.off + 2400) % 240; return 0;`); await sleep(300); await shot('2-trappe-tremble'); await sleep(450); await shot('3-chute');
  await sleep(600); const s2 = await C('return {x: lb.x, y: lb.y, falls: lb.falls};'); if (s2.x !== 1 || s2.y !== 1 || s2.falls !== 1) throw new Error('la trappe devait renvoyer au départ : ' + JSON.stringify(s2));
  // la sortie : clé prise, on se pose à côté de la porte
  await C(`lb.has = true; const [dx, dy] = [[1, 0], [-1, 0], [0, 1], [0, -1]].find(([a, c]) => !lb.m[lb.door[1] + c][lb.door[0] + a]); lb.x = lb.fx = lb.door[0] + dx; lb.y = lb.fy = lb.door[1] + dy; lb.tmap.clear(); lb.gmap.clear(); window.__k = {'1,0': 'ArrowLeft', '-1,0': 'ArrowRight', '0,1': 'ArrowUp', '0,-1': 'ArrowDown'}[dx + ',' + dy]; return 0;`);
  await key(await pj('__k')); await key(await pj('__k'), 'keyup'); await sleep(700); if (await C('return lb.mode;') !== 'won') throw new Error('la porte devait faire sortir'); await shot('4-sorti');
  const errs = await pj(`window.__e.join(' | ')`); if (errs) throw new Error('erreur : ' + errs);
  await pj(`document.fullscreenElement && document.exitFullscreen(), 0`); await sleep(200);
  await pj(`document.getElementById('gFs').click(), 0`); await sleep(800);
  const fs = await pj(`(() => { const c = document.getElementById('gc'), r = c.getBoundingClientRect(); return document.fullscreenElement === c.parentElement && (Math.abs(r.height - innerHeight) < 3 || Math.abs(r.width - innerWidth) < 3); })()`);
  await pj(`document.fullscreenElement && document.exitFullscreen(), 0`); await sleep(400);
  if (!fs) throw new Error('le plein écran ne remplit pas l\'écran');
  const L = await pj(`(() => { const r = document.getElementById('gc').getBoundingClientRect(); let s = 0; for (let e = document.getElementById('gc').parentElement; e; e = e.parentElement) s += e.scrollTop; return { bottom: Math.round(r.bottom + s), h: Math.round(r.height), wh: innerHeight, ww: innerWidth, sw: document.documentElement.scrollWidth }; })()`);
  if (process.env.NEO_FIT_LOG) console.log('FIT', JSON.stringify(L));
  if (L.bottom > L.wh + 1 || L.sw > L.ww + 1 || L.h < 280) throw new Error('la zone de jeu dépasse la fenêtre ou reste petite : ' + JSON.stringify(L));
  await C('T.lbs.level = 1; T.again(1); return 0;');
  return 'vérification ok · marche au clavier · trappe : retour au départ · sortie · plein écran · ' + L.h + ' px dans ' + L.ww + '×' + L.wh;
};
