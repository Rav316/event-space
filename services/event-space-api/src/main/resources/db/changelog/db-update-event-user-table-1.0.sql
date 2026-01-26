--liquibase formatted sql

--changeset alex:1
alter table event_user
drop constraint event_user_event_id_fkey,
drop constraint event_user_user_id_fkey;

--changeset alex:2
alter table event_user
add constraint event_user_event_id_fkey
foreign key (event_id) references event (id) on delete cascade,
add constraint event_user_user_id_fkey
foreign key (user_id) references users (id) on delete cascade;
