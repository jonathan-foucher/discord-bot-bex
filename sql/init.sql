-- insert script to help initializing the customer table with email addresses
insert into customer (email, update_date) 
select emails.email, now() update_date
from (values
('someone@somedomain.com'), ('someoneelse@anotherdomain.com')
) as emails(email)
on conflict do nothing;
