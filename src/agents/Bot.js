const axios = require('axios');
const io = require('socket.io-client');
const config = require('../config');
const chalk = require('chalk');

class Bot {
    constructor(username, role) {
        this.username = username;
        this.role = role;
        this.password = config.users.password;
        this.user = null; // User object from DB
        this.socket = null;
        this.logPrefix = `[${role.toUpperCase()} ${username}]`;
    }

    log(msg, color = 'white') {
        console.log(chalk[color](`${this.logPrefix} ${msg}`));
    }

    async login() {
        try {
            const { data } = await axios.post(`${config.api.url}/auth/login`, {
                username: this.username,
                password: this.password
            });
            this.user = data.user;
            this.log(`Logged in (ID: ${this.user.id})`, 'green');
        } catch (error) {
            this.log(`Login Failed: ${error.response?.data?.error || error.message}`, 'red');
            throw error;
        }
    }

    connectSocket(onConnectCallback) {
        this.socket = io(config.api.socketUrl);
        
        this.socket.on('connect', () => {
            this.log('Socket Connected', 'cyan');
            this.socket.emit('authenticate', { user_id: this.user.id, role: this.role });
            if (onConnectCallback) onConnectCallback();
        });

        this.socket.on('disconnect', () => this.log('Socket Disconnected', 'red'));
        this.socket.on('error', (err) => this.log(`Socket Error: ${err.message}`, 'red'));
    }
}

module.exports = Bot;