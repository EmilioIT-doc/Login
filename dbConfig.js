const sql = require('mssql');

module.exports = {
  user: 'system',
  password: 'N1$$@n',
  server: 'EMIDESKTOP',
  database: 'Login',
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};
// Llamas a la función para conectar la base de datos
//module.exports = conectarBaseDeDatos;