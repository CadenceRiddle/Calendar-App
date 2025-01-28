const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

class DB {
    constructor() {
        this.sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: process.env.DB_DIALECT,
            }
        );

        this.User = this.initUserModel();
    }

    // Initialize the User model
    initUserModel() {
        const User = this.sequelize.define('User', {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
            },
            userID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            age: {
                type: DataTypes.INTEGER,
                defaultValue: 21,
            },
        });

        User.beforeCreate(async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        })

        // Add connect method to User model
        User.connect = async () => {
            try {
                await User.sync({ alter: true });
                console.log('User model synced successfully.');
            } catch (err) {
                console.error('Failed to sync the user model:', err);
            }
        };

        return User;
    }

    initEventsModel() {
        // Initialize the Events model
        const Events = this.sequelize.define('Events', {
            eventID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            }
        });

        
        Events.connect = async () => {
            try {
                await Events.sync({ alter: true });
                console.log('Events model synced successfully.');
            } catch (err) {
                console.error('Failed to sync the events model:', err);
            }
        }

        return Events;

    }

    // Test database connection and sync User model
    async run() {
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
            await this.User.connect();  // Automatically sync the User model
            await this.Events.connect();  // Automatically sync the Events model
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

module.exports = { DB };
