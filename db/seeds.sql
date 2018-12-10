USE currentdb;

-- users
insert into users
(username, password, createdAt, updatedAt)
values
('mike', 'mike', now(), now());

insert into users
(username, password, createdAt, updatedAt)
values
('darron', 'darron', now(), now());

-- Landlord
insert into landlords 
(name, email,createdAt, updatedAt, userId)
values
('Mike', 'mike@hotmail.com', now(), now(), 1);

-- Tenant 
insert into tenants 
(name, email, createdAt, updatedAt, userId)
values
('Darron', 'darron@aol.com', now(), now(), 2);

-- Property
insert into properties
(address, description, capacity, rent, createdAt, updatedAt, landlordId)
values
('123 Peachtree Street, Atlanta, GA', 'Condo', 2, 1600, now(), now(), 1);

-- Maintenance Request Types
insert into requesttypes
(type, createdAt, updatedAt)
values
('Appliances', now(), now()),
('Electrical', now(), now()),
('Exterior', now(), now()),
('HVAC', now(), now()),
('Plumbing', now(), now()),
('Other', now(), now());

-- Leases
insert into leases
(leasename, binaryfile, signdate, isActive, startdate, enddate, rent, createdAt, updatedAt, propertyid, tenantid)
values 
('Condo Lease: Mike', 0, now(), 1, now(), now(), 1600, now(), now(), 1, 1);


-- Payment Status
insert into paymentstatuses
(id, status, createdAt, updatedAt)
values
(1, 'Paid', now(), now()),
(2, 'Not Paid', now(), now()), 
(3, 'Late', now(), now());

-- Payments
insert into payments
(datedue, paymentamt, createdAt, updatedAt, leaseid, paymentstatusid)
values 
(now(), 1600, now(), now(), 1,1); 

-- Maintenance Requests
INSERT INTO maintenancerequests 
(description,createdAt,updatedAt,landlordId,tenantid, requesttypeId,propertyId) 
VALUES 
('Electricity is out',now(),now(),1,1,2,1);