
module.exports = {
  port: 1337,
  datastores: {
    default: {
      adapter: 'sails-postgresql',
      url: 'postgres://c3_final_db_user:RhnVjr8wrH4rBZqqhNSzhOVNhBxrwyBB@dpg-cppdftmehbks73c0dhqg-a.oregon-postgres.render.com/c3_final_db',
    },
  },
  sockets: {
    onlyAllowOrigins: [
      "https://two024-1b-t12-in02-g04.onrender.com",
    ],
  },
  session: {
    cookie: {
      secure: true,
    }
  },
  http: {
    trustProxy: true,
  }
};