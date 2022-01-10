import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from '../connection.js';
import { Rooms } from './rooms.js';

const AssignRooms = sequelize.define('tbl_assign-rooms', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    trainer_id: {
        type: DataTypes.STRING,
    },
    room_id: {
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

AssignRooms.belongsTo(Rooms, { foreignKey: 'room_id' });

export { AssignRooms };
