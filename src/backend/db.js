const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

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

    // Test database connection and sync User model
    async run() {
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
            await this.User.connect();  // Automatically sync the User model
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

module.exports = { DB };
