# Labyrinthe

Un jeu d'exploration : à la lueur d'une lanterne, parcours un labyrinthe plongé dans le noir pour trouver la clé, puis la porte de sortie. Le plan se dessine à mesure que tu avances.

*English version: [README.en.md](README.en.md)*

## Commandes

- **Flèches** ou **ZQSD** : se déplacer ; **maintiens** la touche pour avancer en continu.
- **Souris** : maintiens le bouton vers une direction pour y avancer.

## Règles

- Tu pars d'un coin. La **clé** est cachée au point le plus éloigné du départ, et la **porte** au point le plus éloigné de la clé.
- Ramasse la clé en passant dessus ; la porte ne s'ouvre qu'avec elle.
- La lanterne n'éclaire que les cases proches. Tout ce qu'elle a déjà éclairé **reste sur le plan**, en sombre, pour te repérer.
- Le chrono tourne dès le départ.

## Les niveaux

- Chaque labyrinthe est généré et **toujours faisable** : un seul chemin principal, avec quelques raccourcis de plus en plus nombreux.
- Chaque niveau est plus grand que le précédent, jusqu'à 13 × 10 couloirs.
- Un labyrinthe fini ouvre le niveau suivant. Chaque niveau garde toujours le même plan, pour battre ton record de temps ; coche **Labyrinthes au hasard** pour en avoir un nouveau à chaque partie.

## Statistiques

Le panneau Records montre le **niveau le plus loin** atteint, ton **record de temps** sur le niveau en cours et le nombre de **labyrinthes finis**.

## Données et synchronisation

Ton niveau, tes records et tes réglages sont enregistrés par NeoDex, sauvegardés et synchronisés entre tes PC si la synchro est activée.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Labyrinthe → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).
