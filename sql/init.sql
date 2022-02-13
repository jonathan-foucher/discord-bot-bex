-- create client table
create table client (
	email         varchar(254)    primary key,
	discord_id		varchar(30),
	update_date		timestamptz     not null
);


-- init client table with mails
insert into client (email, update_date) values
('someone@somedomain.com', now()),
('someoneelse@anotherdomain.com', now())
on conflict do nothing;
