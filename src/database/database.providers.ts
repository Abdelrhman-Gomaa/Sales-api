import { Sequelize } from "sequelize-typescript";
import { Invoice } from 'src/invoice/models/invoice.model';
import { Product } from 'src/product/models/product.model';
import { User } from 'src/user/models/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        define: {
          timestamps: false
        },
      });
      sequelize.addModels([User, Product, Invoice]);

      sequelize.authenticate()
        .then(() => {
          console.log('Connection has been established successfully ✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔');
        })
        .catch(err => {
          console.error('Unable to connect to the database ❌❌❌❌❌❌❌❌❌', err);
        });

      // sequelize.sync({ alter: true, force: true })
      //   .then(() => {
      //     console.log(`Models and relation synchronization In DB Successfully ✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔`);
      //   }).catch((err) => {
      //     console.log(`Can't synchronization Models and relation In BD ❌❌❌❌❌❌❌❌❌ ${err.message}`);
      //   });

      return sequelize;
    },
  },
];