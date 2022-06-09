export default () => ({
  database: {
    autoLoadEntities: true,
    database: process.env.POSTGRES_DB,
    // entities: ['dist/**/*.entity(.ts,.js)'],
    entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
    host: process.env.POSTGRES_HOST,
    logging: false,
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    synchronize: true,
    type: 'postgres',
    username: process.env.POSTGRES_USER,
  },
});
