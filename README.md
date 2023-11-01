# Ozdravi - olakšava život kad imate bolesnu djecu 

Setup guide

## Backend

Za potrebe spajanja projekta u Springu s postgres bazom podataka, treba se napraviti baza lokalno na računalu.

Prvo treba instalirati i konfigurirati PostgreSQL sa stranice: [https://www.postgresql.org/download/](https://www.postgresql.org/download/).

Nakon toga u SQL shellu treba izvesti sljedece naredbe: \
`create user welebyte with password 'welebyte';` \
`create database ozdravi owner welebyte;` 

Sada bi trebala biti kreairana baza podataka 'ozdravi' ćiji je vlasnik korisnik 'welebyte'. \
To se može provjeriti izvođenjem naredbe `\l` nakon koje bi se trebale \
izlistati sve postojeće baze podataka i njihovi vlasnici. 

Trbea otvoriti PgAdmin i tamo naći odgovarajući port servera baze prateći sljedeće korake: \
desni klik na `PostgreSQL 15` ->  `Properties` -> `Connection` \
U kućici Port pisat će odgovarajući port servera.

U datoteci `IzvorniKod\ozdravi-backend\src\main\resources\application.properties` potrebno je u prvoj 
liniji koda kod `localhost:5434` zamjeniti četiri znamenke s nađenim portom.

Potrebno je otvoriti folder IzvorniKod\ozdravi-backend kao projekt u Intellij-u. \
Aplikacija se dalje jednostavno pokrene pokretanjem datoteke `OzdraviBackendApplication.java`

Rad backenda može se dalje pratiti na [http://localhost:8080](http://localhost:8080)

#

## Frontend

Prvo se pozicionirajte u frontend direktorij: `cd IzvorniKod\ozdravi-frontend` \
(ili tamo otvorite projekt)

Bitno je prvo instalirati sve dependency-je: `npm install` \
(ovo se radi samo prvi put, ili eventualno kad se mijenja grana git-a)

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
