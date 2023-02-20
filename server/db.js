const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost", //172.19.114.141 or localhost
  database: "12345678", //manufacturing or qwerty
  password: "123456789",
  port: 5432,
});
pool.connect();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
