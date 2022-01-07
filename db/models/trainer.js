import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from '../connection.js';

const Trainers = sequelize.define('tbl_trainers', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    about: {
        type: DataTypes.STRING,
    },
    experience: {
        type: DataTypes.INTEGER
    },
    playersTrained: {
        type: DataTypes.INTEGER
    },
    medals: {
        type: DataTypes.INTEGER,
    },
    picture_url: {
        type: DataTypes.STRING,
    },
    contact_number: {
        type: DataTypes.INTEGER,
    },
    level: {
        type: DataTypes.ENUM('BASIC', 'INTERMEDIATE', 'ADVANCE', 'PREMIUM'),
    },
    certificates: {
        type: DataTypes.INTEGER,
    },
    login_type: {
        type: DataTypes.ENUM('EMAIL', 'GOOGLE'),
    },
    social_id: {
        type: DataTypes.STRING,
    },
    access_token: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: 'TIMESTAMP',
        allowNull: false
    },
    updatedAt: {
        type: 'TIMESTAMP',
        allowNull: false
    }
}, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
});

export { Trainers };
