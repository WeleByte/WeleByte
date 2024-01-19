# Ozdravi - olakšava život kad imate bolesnu djecu 

## Deployment

URL aplikacije na javnom poslužitelju: https://welebyte-ozdravi-frontend-8717d38be8e3.herokuapp.com

**NAPOMENA:** Potrebno je pričekati pola minute prije nego što aplikacija postane dostupna. To je zbog činjenice da 
Heroku uspava aplikacije nakon nekog perioda nekorištenja. Slično se ponaša i backend aplikacija, pa će 
biti potreno više vremena da se obradi prvi zahtjev prema backendu. Nakon toga, aplikacija radi normalnom brzinom.

U aplikaciji, za potrebe testiranja već postoji set podataka (dummy data), to uključuje i korisnike:

* prvi@mail.com - Ivan Horvat - admin
* doktor@mail.com - Ante Kovač - liječnik obiteljske medicine
* pedijatar@mail.com - Sanda Bulić - pedijatar
* roditelj@mail.com - Tamara Stanić - roditelj
* roditaljBezDoktora@mail.com - Jasenka Bilić - roditelj
* roditeljDoktor@mail.com - Tomislav Lukas - roditelj i doktor obiteljske medicine

Svi korisnici imaju istu lozinku.

## Backend

Za potrebe spajanja projekta u Springu s postgres bazom podataka, treba se napraviti baza lokalno na računalu.

Prvo treba instalirati i konfigurirati PostgreSQL sa stranice: [https://www.postgresql.org/download/](https://www.postgresql.org/download/).

Nakon toga u SQL shellu treba izvesti sljedece naredbe: \
`create user welebyte with password 'welebyte';` \
`create database ozdravi owner welebyte;` 

Sada bi trebala biti kreairana baza podataka 'ozdravi' ćiji je vlasnik korisnik 'welebyte'. \
To se može provjeriti izvođenjem naredbe `\l` nakon koje bi se trebale \
izlistati sve postojeće baze podataka i njihovi vlasnici. 


Potrebno je otvoriti folder `IzvorniKod\ozdravi-backend` kao projekt u Intellij-u. \
Aplikacija se dalje jednostavno pokrene pokretanjem datoteke `OzdraviBackendApplication.java`

Rad backenda može se dalje pratiti na [http://localhost:8080](http://localhost:8080)

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

