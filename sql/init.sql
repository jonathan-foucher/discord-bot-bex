-- create customer table
create table customer (
	email         varchar(254)    primary key,
	discord_id		varchar(30),
	update_date		timestamptz     not null
);


-- init customer table with mails
insert into customer (email, update_date) 
select emails.email, now() update_date
from (values
('someone@somedomain.com'), ('someoneelse@anotherdomain.com')
) as emails(email)
on conflict do nothing;
