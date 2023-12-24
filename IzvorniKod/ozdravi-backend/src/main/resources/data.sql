-- noinspection SqlNoDataSourceInspectionForFile

-- noinspection SqlDialectInspectionForFile

-- roles
insert into roles (name) values ('admin');
insert into roles (name) values ('child');
insert into roles (name) values ('doctor');
insert into roles (name) values ('parent');
insert into roles (name) values ('pediatrician');

insert into users (email, password, oib, first_name, last_name)
values ('prvi@mail.com',
        '{bcrypt}$2a$12$vyhf.Rod8fQmYsXi7fooHOGIzq5gLXMZ5kQtzywRCiRrgCe41o9lq',
        '69435151530',
        'Ivan',
        'Horvat');

insert into user_roles (user_id, role_id) values (1, 1);

-- prvi korisnik ima parent, doctor i address id te institution email ==NULL
-- to se moze lako promijeniti dodavanjem tih polja u prvu zagradu i njihovih vrijednosti u drugu zagradu
-- bitno je paziti da je isti poredak i gore i dolje
-- nije bitno paziti da je isti poredak kao i u User klasi, tj. kao i u bazi
-- pass je 'primus" TODO obrisati komentar u nekom trenutku

-------------------------

insert into address(street, number, city, country) values ('Branimirova', '7', 'Zagreb', 'Hrvatska');
insert into address(street, number, city, country) values ('Ulica Ivana Gundulica', '4', 'Osijek', 'Hrvatska');
insert into address(street, number, city, country) values ('Petrova ulica', '53', 'Zagreb', 'Hrvatska');

insert into users (email, password, oib, first_name, last_name, address_id)
values ('doktor@mail.com',
        '{bcrypt}$2a$12$vyhf.Rod8fQmYsXi7fooHOGIzq5gLXMZ5kQtzywRCiRrgCe41o9lq',
        '70490403640',
        'Ante',
        'Kovac',
        1);
insert into user_roles(user_id, role_id) values (2, 3);

insert into users (email, password, oib, first_name, last_name, address_id)
values ('pedijatar@mail.com',
        '{bcrypt}$2a$12$vyhf.Rod8fQmYsXi7fooHOGIzq5gLXMZ5kQtzywRCiRrgCe41o9lq',
        '32383209241',
        'Sanda',
        'Bulic',
        2);
insert into user_roles(user_id, role_id) values (3, 5);

insert into users (email, password, oib, first_name, last_name, doctor_id)
values ('roditelj@mail.com',
        '{bcrypt}$2a$12$vyhf.Rod8fQmYsXi7fooHOGIzq5gLXMZ5kQtzywRCiRrgCe41o9lq',
        '09163624639',
        'Tamara',
        'Stanic',
        2);
insert into user_roles(user_id, role_id) values (4, 4);

insert into users (email, password, oib, first_name, last_name, parent_id, doctor_id)
values ('djete1@mail.com',
        '{bcrypt}$2a$12$vyhf.Rod8fQmYsXi7fooHOGIzq5gLXMZ5kQtzywRCiRrgCe41o9lq',
        '34019396094',
        'Marko',
        'Stanic',
        4, 3);
insert into user_roles(user_id, role_id) values (5, 2);

insert into users (email, password, oib, first_name, last_name, parent_id, doctor_id)
values ('djete2@mail.com',
        '{bcrypt}$2a$12$vyhf.Rod8fQmYsXi7fooHOGIzq5gLXMZ5kQtzywRCiRrgCe41o9lq',
        '67023616685',
        'Zdenka',
        'Stanic',
        4, 3);
insert into user_roles(user_id, role_id) values (6, 2);

insert into users (email, password, oib, first_name, last_name)
values ('roditeljBezDoktora@mail.com',
        '{bcrypt}$2a$12$vyhf.Rod8fQmYsXi7fooHOGIzq5gLXMZ5kQtzywRCiRrgCe41o9lq',
        '09163624639',
        'Jasenka',
        'Bilic');
insert into user_roles(user_id, role_id) values (7, 4);

insert into users (email, password, oib, first_name, last_name, parent_id)
values ('djeteBezPedijatra@mail.com',
        '{bcrypt}$2a$12$vyhf.Rod8fQmYsXi7fooHOGIzq5gLXMZ5kQtzywRCiRrgCe41o9lq',
        '67023616685',
        'Milko',
        'Kvrzic',
        4);
insert into user_roles(user_id, role_id) values (8, 2);


insert into users (email, password, oib, first_name, last_name)
values ('roditeljDoktor@mail.com',
        '{bcrypt}$2a$12$vyhf.Rod8fQmYsXi7fooHOGIzq5gLXMZ5kQtzywRCiRrgCe41o9lq',
        '25768672773',
        'Lukas',
        'Aca');
insert into user_roles(user_id, role_id) values (9, 3);
insert into user_roles(user_id, role_id) values (9, 4);

insert into examinations(patient_id, doctor_id, scheduler_id, address_id, report, date)
values(6, 3, 3, 3, 'pacijent ima upalu grla.', CURRENT_DATE + CURRENT_TIME);

insert into examinations(patient_id, doctor_id, scheduler_id, address_id, report, date)
values(5, 3, 3, 3, 'pacijentu nije nista', '2023-12-11 14:30:00');

insert into examinations(patient_id, doctor_id, scheduler_id, address_id, report, date)
values(4, 2, 2, 3, 'pacijent ima upalu uha.', '2023-01-11 14:30:00');

insert into examinations(patient_id, doctor_id, scheduler_id, address_id, report, date)
values(4, 3, 2, 3, 'gastroskopija.', '2023-12-25 18:30:00');

insert into examinations(patient_id, doctor_id, scheduler_id, address_id, report, date)
values(6, 2, 3, 3, 'pregled stitnjace.', '2023-02-13 14:30:00');

-- pass je 'primus" TODO obrisati komentar u nekom trenutku
