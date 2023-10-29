# Ozdravi - olakšava život kad imate bolesnu djecu 

Setup guide

## Backend

TODO: Napisati kako se pokreće backend dio aplikacije.

#

## Frontend

Prvo se pozicionirajte u frontend direktorij: `cd IzvorniKod\ozdravi-frontend` \
(ili tamo otvorite projekt)

Zatim pokrenite skriptu:
`npm start` \
Aplikacija je pokrenuta i moguće ju je vidjeti na [http://localhost:3000](http://localhost:3000).

Stranica se automatski ponovno učitava kad spremite promjene. 

Moguće je mijenjati port aplikacije. \
To se radi mijenjanjem skripte u *package.json* kojom pokrećemo aplikaciju: \
 `"start": "set PORT=3006 && react-scripts start"`

#

### `npm test`
Pokreće aplikaciju u načinu za testiranje i prmatranje. \
Više o tome na [linku](https://facebook.github.io/create-react-app/docs/running-tests).


### `npm run build`
Napravi build aplikacije za produkciju u *build* folder. \
Nakon toga, aplikacija je spremna za deployment. \
Potpuna dokumentacija je na [linku](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run eject`
**Pažnja: ovo je jednosmjerna radnja. *Ejectanu* aplikaciju nije moguće vratiti u prvobitno stanje.** \
Omogućava oslobađanje od defaultnih postavaka i veću slobodu. \
Nije obavezno ikad koristiti ovu naredbu, osim ako je **izričito** potrebna.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).