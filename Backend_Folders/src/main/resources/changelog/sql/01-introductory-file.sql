create schema if not exists nos_schema;

alter schema nos_schema owner to postgres;

create table nos_schema.nos_schema.MOCK_DATA (
                           id INT,
                           first_name VARCHAR(50)
);
insert into nos_schema.MOCK_DATA (id, first_name) values (1, 'Joni');
insert into nos_schema.MOCK_DATA (id, first_name) values (2, 'Claudius');
insert into nos_schema.MOCK_DATA (id, first_name) values (3, 'Rabbi');
insert into nos_schema.MOCK_DATA (id, first_name) values (4, 'Quill');
insert into nos_schema.MOCK_DATA (id, first_name) values (5, 'Catharina');
insert into nos_schema.MOCK_DATA (id, first_name) values (6, 'Kare');
insert into nos_schema.MOCK_DATA (id, first_name) values (7, 'Edgard');
insert into nos_schema.MOCK_DATA (id, first_name) values (8, 'Paton');
insert into nos_schema.MOCK_DATA (id, first_name) values (9, 'Lanita');
insert into nos_schema.MOCK_DATA (id, first_name) values (10, 'Aharon');
