const Bot = require('./Bot');
const geo = require('../utils/geo');
const config = require('../config');
const axios = require('axios');

class DriverBot extends Bot {
    constructor(username) {
        super(username, 'driver');
        this.currentLocation = geo.getRandomLocation(config.location.lat, config.location.lng, config.location.radius);
        this.status = 'OFFLINE';
        this.activeTrip = null;
    }

    async start() {
        await this.login();
        this.connectSocket(() => {
            this.goOnline();
        });

        // Listen for new rides
        this.socket.on('new_ride', (payload) => {
            this.log(`🚨 RIDE RECEIVED! Trip ${payload.trip.id}`, 'yellow');
            this.handleTrip(payload.trip);
        });
    }

    goOnline() {
        this.status = 'IDLE';
        // Based on handlers.js: handleDriverStatusChange
        this.socket.emit('driver_status_change', {
            user_id: this.user.id,
            is_online: true,
            location: this.currentLocation
        });
        this.log('Status: ONLINE', 'green');
    }

    async handleTrip(trip) {
        this.activeTrip = trip;
        this.status = 'BUSY';

        // 1. Drive to Pickup
        this.log(`Driving to Pickup...`, 'blue');
        await this.simulateDrive({ latitude: parseFloat(trip.pickup_lat), longitude: parseFloat(trip.pickup_lon) });

        // 2. Start Trip
        this.log(`Arrived at Pickup. Starting Trip...`, 'green');
        this.socket.emit('trip_status_update', {
            trip_id: trip.id,
            status: 'IN_PROGRESS',
            driver_id: this.user.id
        });

        // 3. Drive to Dropoff
        this.log(`Driving to Dropoff...`, 'blue');
        await this.simulateDrive({ latitude: parseFloat(trip.dropoff_lat), longitude: parseFloat(trip.dropoff_lon) });

        // 4. Complete Trip
        this.log(`Arrived at Dropoff. Completing...`, 'green');
        try {
            // Using API to complete as per trips.js
            await axios.post(`${config.api.url}/trips/${trip.id}/complete`, {
                driver_id: this.user.driver_profile_id
            });
            this.log('Trip Completed. Returning to IDLE.', 'magenta');
        } catch (e) {
            this.log(`Error completing trip: ${e.message}`, 'red');
        }

        this.activeTrip = null;
        this.goOnline();
    }

    simulateDrive(target) {
        return new Promise(resolve => {
            const start = { ...this.currentLocation };
            const dist = geo.getDistance(start, target);
            // Calculate steps based on simulated speed (10 updates per second for smoothness)
            const fps = 5; 
            const speedPerSec = config.location.speed; // meters per second
            const durationSec = dist / speedPerSec;
            const totalSteps = Math.ceil(durationSec * fps);
            
            let step = 0;
            const interval = setInterval(() => {
                step++;
                const progress = step / totalSteps;
                this.currentLocation = geo.interpolate(start, target, progress);

                // Send update
                this.socket.emit('location_update', {
                    user_id: this.user.id,
                    latitude: this.currentLocation.latitude,
                    longitude: this.currentLocation.longitude
                });

                if (step >= totalSteps) {
                    clearInterval(interval);
                    resolve();
                }
            }, 1000 / fps);
        });
    }
}

module.exports = DriverBot;