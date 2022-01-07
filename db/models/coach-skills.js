import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from '../connection.js';

const CoachSkills = sequelize.define('tbl_coach-skills', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    coach_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    skill_id: {
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

export { CoachSkills };
