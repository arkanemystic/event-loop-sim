const fs = require('fs');
const config = require('../src/config');

const DRIVER_COUNT = config.users.driverCount;
const PASSENGER_COUNT = config.users.passengerCount;

let sql = `-- Seed Data for Event-Loop-Sim
-- Generated automatically
-- Passwords are '${config.users.password}'

BEGIN;

`;

// Generate Drivers
for (let i = 1; i <= DRIVER_COUNT; i++) {
    const username = `${config.users.driverPrefix}${i}`;
    sql += `
    DO $$
    DECLARE new_user_id UUID;
    BEGIN
        INSERT INTO users (username, password, role, phone_number) 
        VALUES ('${username}', '${config.users.password}', 'driver', '555-000-${i.toString().padStart(4, '0')}')
        RETURNING id INTO new_user_id;

        INSERT INTO drivers (user_id, status, is_online) 
        VALUES (new_user_id, 'OFFLINE', false);
    END $$;
    `;
}

// Generate Passengers
for (let i = 1; i <= PASSENGER_COUNT; i++) {
    const username = `${config.users.passPrefix}${i}`;
    sql += `
    INSERT INTO users (username, password, role, phone_number) 
    VALUES ('${username}', '${config.users.password}', 'passenger', '555-100-${i.toString().padStart(4, '0')}');
    `;
}

sql += `
COMMIT;
`;

fs.writeFileSync('seed_users.sql', sql);
console.log('✅ Created seed_users.sql. Run this in your database to create test users.');