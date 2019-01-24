var convict = require('convict');

// Define a schema
var config = convict({
    env: {
        doc: "The application environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    ip: {
        doc: "The IP address to bind.",
        format: "ipaddress",
        default: "127.0.0.1",
        env: "IP_ADDRESS",
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 3000,
        env: "PORT",
        arg: "port"
    },
    db: {
        host: {
            doc: "Database host name/IP",
            format: '*',
            default: 'localhost'
        },
        name: {
            doc: "Database name",
            format: String,
            default: 'reshop'
        },
        username: {
            doc: "Database user",
            format: '*',
            default: 'root'
        },
        password: {
            doc: "Database password",
            format: '*',
            default: 'root'
        },
        port: {
            doc: "Database port",
            format: '*',
            default: 8889
        }
    }
});

// Load environment dependent configuration
var env = config.get('env');
config.loadFile('./config/' + env + '.json');

// Perform validation
config.validate({
    allowed: 'strict'
});

config.getDefault = (key, def) => {
    if(config.has(key)) {
        return config.get(key);
    } else if(def) {
        return def;
    } else {
        return;
    }
}

module.exports = config;