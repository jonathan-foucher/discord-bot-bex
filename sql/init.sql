-- create client table
create table client (
	email         varchar(254)    primary key,
	discord_id		varchar(30),
	update_date		timestamptz     not null
);


-- init client table with mails
insert into client (email, update_date) 
select emails.email, now() update_date
from (values
('someone@somedomain.com'), ('someoneelse@anotherdomain.com')
) as emails(email)
on conflict do nothing;
