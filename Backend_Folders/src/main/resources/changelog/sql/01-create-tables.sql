CREATE SCHEMA IF NOT EXISTS nos_schema;

ALTER SCHEMA nos_schema OWNER TO postgres;

CREATE TABLE if not exists nos_schema.TRAINER_DATA (
                           ID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                           first_name VARCHAR(50) NOT NULL,
                           email VARCHAR(50) UNIQUE NOT NULL,
                           password VARCHAR(250) NOT NULL,
                           rank VARCHAR(250) NOT NULL
);

CREATE TABLE if not exists nos_schema.FAVORITE_TABLE(
     INDIVIDUAL_ID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     TRAINER_EMAIL VARCHAR(50) NOT NULL references nos_schema.TRAINER_DATA(email),
     FAVORITE_POKEMON_NAME VARCHAR(50) NOT NULL,
     POKEMON_HELD_ITEM VARCHAR(50),
     POKEMON_MOVES VARCHAR(75),
     POKEMON_STATS INTEGER[],
     POKEMON_IMAGE VARCHAR(100) NOT NULL,
     POKEMON_TYPES VARCHAR(50) NOT NULL,
     CONSTRAINT unique_trainer_pokemon UNIQUE (TRAINER_EMAIL, FAVORITE_POKEMON_NAME)
);

