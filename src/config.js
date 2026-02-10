const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    api: {
        url: process.env.API_URL || 'http://localhost:3000/api',
        socketUrl: process.env.SOCKET_URL || 'http://localhost:3000'
    },
    location: {
        lat: parseFloat(process.env.SIMULATION_CENTER_LAT || '38.8977'),
        lng: parseFloat(process.env.SIMULATION_CENTER_LNG || '-77.0365'),
        radius: parseFloat(process.env.SIMULATION_RADIUS_KM || '5'),
        speed: parseFloat(process.env.DRIVER_SPEED_MPS || '0.001')
    },
    users: {
        driverCount: parseInt(process.env.DRIVER_COUNT || '5', 10),
        passengerCount: parseInt(process.env.PASSENGER_COUNT || '5', 10),
        driverPrefix: process.env.DRIVER_PREFIX || 'sim_driver_',
        passPrefix: process.env.PASSENGER_PREFIX || 'sim_pass_',
        password: process.env.PASSWORD_DEFAULT || 'password123'
    }
};