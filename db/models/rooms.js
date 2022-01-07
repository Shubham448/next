import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from '../connection.js';

const Rooms = sequelize.define('tbl_rooms', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    room_id: {
        type: DataTypes.STRING
    },
    management_token: {
        type: DataTypes.STRING
    },
    app_token: {
        type: DataTypes.STRING
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

export { Rooms };
