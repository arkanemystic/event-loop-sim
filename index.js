const DriverBot = require('./src/agents/DriverBot');
const PassengerBot = require('./src/agents/PassengerBot');
const config = require('./src/config');
const axios = require('axios');
const chalk = require('chalk');

async function main() {
    console.log(chalk.bold.white(`--- Event-Loop Simulation Suite ---`));
    
    // 1. Fetch Locations (needed for passengers)
    let dropoffs = [];
    try {
        const res = await axios.get(`${config.api.url}/locations`);
        dropoffs = res.data.locations;
        console.log(chalk.green(`Loaded ${dropoffs.length} dropoff locations.`));
    } catch (e) {
        console.error(chalk.red("Failed to fetch locations. Is the server running?"));
        process.exit(1);
    }

    // 2. Start Drivers
    console.log(chalk.yellow(`Starting ${config.users.driverCount} Drivers...`));
    for (let i = 1; i <= config.users.driverCount; i++) {
        const username = `${config.users.driverPrefix}${i}`;
        new DriverBot(username).start().catch(e => console.error(`Driver ${username} fail: ${e.message}`));
        await new Promise(r => setTimeout(r, 200)); // Stagger starts
    }

    // 3. Start Passengers
    console.log(chalk.yellow(`Starting ${config.users.passengerCount} Passengers...`));
    setTimeout(async () => {
        for (let i = 1; i <= config.users.passengerCount; i++) {
            const username = `${config.users.passPrefix}${i}`;
            new PassengerBot(username).start(dropoffs).catch(e => console.error(`Passenger ${username} fail: ${e.message}`));
            await new Promise(r => setTimeout(r, 500)); // Stagger requests
        }
    }, 2000);
}

main();