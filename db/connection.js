/**
 * Create database connection.
 *
 * @since 1.0.0
 */

 import { Sequelize } from 'sequelize';
import dbConfig from './config/config.js';
 
 const sequelize = new Sequelize(dbConfig);
 
 // Connection Init
 const databaseLoader = async () => new Promise((resolve, reject) => {
	sequelize.authenticate()
		.then(async db => {
			console.log('Database connection established');
			resolve(db);
		})
		.catch(reject);
});
 
export { databaseLoader, sequelize };
 