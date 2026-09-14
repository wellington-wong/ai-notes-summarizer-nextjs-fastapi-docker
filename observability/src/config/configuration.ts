export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),



  database: {
    url: process.env.DATABASE_URL,
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  },

});
