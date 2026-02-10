# Event-Loop-Sim

A stress testing suite for the Event-Loop platform. It simulates concurrent drivers and passengers with realistic GPS movement and trip lifecycle management.

## Setup

1. **Install Dependencies**
   ```bash
   npm install

2. **Configuration** Copy the example config and adjust the API URL and user counts.
    ```bash
    cp .env.example .env

3. **Database Seeding** Generate the SQL script to create the necessary test users, then execute the output file (seed_users.sql) in your database.
    ```bash
    node scripts/generate_seed_sql.js

**Start the simulation:**
    ```bash
    node index.js