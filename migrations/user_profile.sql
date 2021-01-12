create table user_profile (
  id serial primary key,
  full_name varchar not null,
  email varchar(50) unique not null,
  gender varchar(10) not null,
  residant varchar(15) not null,
  profile_image text,
  native varchar,
  address text,
  about text,
  interest text,
  contact_mode text,
  created_date timestamp NOT NULL DEFAULT NOW()
);