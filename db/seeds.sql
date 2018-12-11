USE currentdb;

-- users
insert into users
(username, password, createdAt, updatedAt)
values
('mike', 'mike', now(), now()),
('darron', 'darron', now(), now()),
('mikey', 'mikey', now(), now()),
('peter', 'peter', now(), now());

-- Landlord
insert into landlords 
(name, email, createdAt, updatedAt, userId)
values
('Mike', 'mike@hotmail.com', now(), now(), 1),
('Mikey', 'mike@hotmail.com', now(), now(), 3);

-- Tenant 
insert into tenants 
(name, email, createdAt, updatedAt, userId)
values
('Darron', 'darron@aol.com', now(), now(), 2),
('Peter', 'peter@aol.com', now(), now(), 4);

-- Property
insert into properties
(address, description, capacity, rent, createdAt, updatedAt, landlordId)
values
('123 Peachtree Street, Atlanta, GA', 'Condo', 2, 1600, now(), now(), 1),
('1200 Pala Alto Street, Palo Alto, CA', 'Mansion', 8, 4800, now(), now(), 2);

-- Leases
insert into leases
(leasename, binaryfile, signdate, isActive, startdate, enddate, rent, createdAt, updatedAt, propertyid, tenantid)
values 
('Condo Lease', 0, now(), 1, now(), now(), 1600, now(), now(), 1, 1),
('Mansion Lease', 0, now(), 1, now(), now(), 4800, now(), now(), 2, 2);


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
(now(), 1600, now(), now(), 1,2), 
(now(), 1600, now(), now(), 1,1), 
(now(), 2400, now(), now(), 2,1), 
(now(), 2400, now(), now(), 2,1);

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

-- Maintenance Requests
INSERT INTO maintenancerequests 
(description, createdAt, updatedAt, landlordId, tenantid, requesttypeId, propertyId) 
VALUES 
('Electricity is out', now(), now(), 1, 1, 2, 1),
('Its so cold in here', now(), now(), 1, 1, 4, 1),
('Anyway someone can come cut the grass', now(), now(), 2, 2, 3, 2),
('Looking for to get rid of the pest here', now(), now(), 2, 2, 6, 2);