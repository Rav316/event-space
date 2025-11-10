--liquibase formatted sql

--changeset alex:1
ALTER TABLE event
ADD COLUMN participant_quantity int;

--changeset alex:2 splitStatements:false
create or replace function set_default_participant_quantity()
    returns trigger as $$
begin
    if new.participant_quantity is null then
        select s.capacity into new.participant_quantity
        from space s
        where s.id = new.space_id;
    end if;
    return new;
end;
$$ language plpgsql;

--changeset alex:3
create trigger trg_set_participant_quantity
    before insert on event
    for each row
execute function set_default_participant_quantity();