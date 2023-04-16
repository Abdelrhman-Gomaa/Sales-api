import { Sequelize } from "sequelize-typescript";
import { User } from 'src/user/model/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DATABASE_HOST ,//|| 'localhost',
        port: +process.env.DATABASE_PORT ,//|| 3306,
        username: process.env.DATABASE_USER ,//|| 'root',
        password: process.env.DATABASE_PASSWORD ,//|| 'Pass@1234',
        database: process.env.DATABASE_NAME ,//|| 'sales-api',
        define: {
          timestamps: false
        },
      });
      sequelize.addModels([User]); //, Basket, Course, Subject

      sequelize
        .authenticate()
        .then(() => {
          console.log('Connection has been established successfully.');
        })
        .catch(err => {
          console.error('Unable to connect to the database:', err);
        });


      return sequelize;
    },
  },
];