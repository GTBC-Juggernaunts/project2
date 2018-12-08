USE currentdb;

-- Tenant 
INSERT INTO tenants 
(tenantname, email, createdAt, updatedAt)
VALUES
('Darron', 'darron@aol.com', now(), now());

-- Landlord
INSERT INTO landlords 
(landlordname, email, tenantid, createdAt, updatedAt)
VALUES
('Mike', 'mike@hotmail.com', 1, now(), now());

-- Property
INSERT INTO properties
(landlordid, address, description, capacity, rent, createdAt, updatedAt)
VALUES
(1, '123 Peachtree Street, Atlanta, GA', 'Condo', 2, 1600, now(), now());

-- Leases
INSERT INTO leases
(propertyid, tenantid, leasename, binaryfile, signdate, isActive, startdate, enddate, rent, createdAt, updatedAt)
VALUES 
(1, 1, 'Condo Lease: Mike', 0, now(), 1, now(), now(), 1600, now(), now());

-- Payment Status
INSERT INTO paymentstatuses
(id, status, createdAt, updatedAt)
VALUES
(1, 'Paid', now(), now()),
(2, 'Not Paid', now(), now()), 
(3, 'Late', now(), now());

-- Payments
INSERT INTO payments
(leaseid, datedue, paymentamt, paymentstatusid, createdAt, updatedAt)
VALUES 
(1, now(), 1600, 1, now(), now()); 

-- Maintenance Request Types
INSERT INTO requesttypes
(type, createdAt, updatedAt)
VALUES
('Appliances', now(), now()),
('Electrical', now(), now()),
('Exterior', now(), now()),
('HVAC', now(), now()),
('Plumbing', now(), now()),
('Other', now(), now());

-- Maintenance
INSERT INTO maintenancerequests
(requesttypeid, description, propertyid, landlordid, tenantid, requeststatus, createdAt, updatedAt)
VALUES
(5, 'the toilet flooded my condo', 1, 1, 1, 0, now(), now());