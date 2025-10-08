CREATE SCHEMA IF NOT EXISTS nos_schema;

ALTER SCHEMA nos_schema OWNER TO postgres;

CREATE TABLE if not exists nos_schema.TRAINER_DATA (
                           ID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                           first_name VARCHAR(50) NOT NULL,
                           email VARCHAR(50) UNIQUE NOT NULL,
                           password VARCHAR(50) NOT NULL

);

INSERT INTO nos_schema.TRAINER_DATA (first_name, email, password) values ('Joni', 'jone@exam.com', 'Jone');
INSERT INTO nos_schema.TRAINER_DATA (first_name, email, password) values ('Claudius', 'clad@test.com', 'Jone');
INSERT INTO nos_schema.TRAINER_DATA (first_name, email, password) values ('Rabbi','rabi@re.co','Jone');
INSERT INTO nos_schema.TRAINER_DATA (first_name, email, password) values ('Quill','rqwi@qw.co','Jone');
INSERT INTO nos_schema.TRAINER_DATA (first_name, email, password) values ('Catharina','cath@au.lu','Jone');
INSERT INTO nos_schema.TRAINER_DATA (first_name, email, password) values ('Kare','kare@eew.dle','Jone');
INSERT INTO nos_schema.TRAINER_DATA (first_name, email, password) values ('Edgard','ed@com.pt','Jone');
INSERT INTO nos_schema.TRAINER_DATA (first_name, email, password) values ('Paton','attpt@eel.de','Jone');
INSERT INTO nos_schema.TRAINER_DATA (first_name, email, password) values ('Lanita','laneoita@com.pt','Marsh');
INSERT INTO nos_schema.TRAINER_DATA (first_name, email, password) values ('Ahatron','rabi@ewwre.co','Jone');
