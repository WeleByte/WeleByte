insert into users (username, password, oib, first_name, last_name)
values ('prvi@mail.com',
        '{bcrypt}$2a$12$vyhf.Rod8fQmYsXi7fooHOGIzq5gLXMZ5kQtzywRCiRrgCe41o9lq',
        '69435151530',
        'Ivan',
        'Horvat');

-- prvi korisnik ima parent, doctor i address id te institution email ==NULL
-- to se moze lako promijeniti dodavanjem tih polja u prvu zagradu i njihovih vrijednosti u drugu zagradu
-- bitno je paziti da je isti poredak i gore i dolje
-- nije bitno paziti da je isti poredak kao i u User klasi, tj. kao i u bazi
-- pass je 'primus" TODO obrisati komentar u nekom trenutku