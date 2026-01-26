--liquibase formatted sql

--changeset alex:1
alter table event_step
    drop constraint event_step_event_id_fkey;

--changeset alex:2
alter table event_step
add constraint event_step_event_id_fkey
foreign key (event_id)
references event (id)
on delete cascade;