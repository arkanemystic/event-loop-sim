const Bot = require('./Bot');
const geo = require('../utils/geo');
const config = require('../config');
const axios = require('axios');

class PassengerBot extends Bot {
    constructor(username) {
        super(username, 'passenger');
    }

    async start(availableDropoffs) {
        await this.login();
        this.connectSocket();

        // Listen for updates
        this.socket.on('trip_status_update', (data) => {
            this.log(`Trip ${data.trip.id} is now ${data.status}`, 'blue');
            if (data.status === 'COMPLETED') {
                this.log('Ride finished. Requesting another in 5s...', 'cyan');
                setTimeout(() => this.requestRide(availableDropoffs), 5000);
            }
        });

        // Start request loop
        this.requestRide(availableDropoffs);
    }

    async requestRide(dropoffs) {
        if (!dropoffs.length) return this.log('No dropoff locations available', 'red');

        const pickup = geo.getRandomLocation(config.location.lat, config.location.lng, config.location.radius);
        const randomDropoff = dropoffs[Math.floor(Math.random() * dropoffs.length)];

        this.log('Requesting Ride...', 'yellow');
        
        try {
            await axios.post(`${config.api.url}/trips/request`, {
                passenger_id: this.user.id,
                pickup_lat: pickup.latitude,
                pickup_lng: pickup.longitude,
                dropoff_location_id: randomDropoff.id,
                passenger_count: 1
            });
            this.log('Ride Requested successfully.', 'green');
        } catch (e) {
            this.log(`Request failed: ${e.response?.data?.error || e.message}`, 'red');
            setTimeout(() => this.requestRide(dropoffs), 5000); // Retry
        }
    }
}

module.exports = PassengerBot;