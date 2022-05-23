const { Client } = require('pg')

// Realizar la conexión con PostgreSQL con la clase Client.
const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'jeans',
  password: '12616027',
  port: 5432,
}
const client = new Client(config)
client.connect()

// Crear una función asíncrona para registrar un nuevo estudiante en la base de datos
async function registrarEstudiante() {
  const res = await client.query(
    "insert into estudiante (nombre, rut, curso, nivel) values ('Brian May', '1.345.678-9','guitarra','10') RETURNING *;"
  )
  console.log(res)
  client.end()
}
registrarEstudiante()
// Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.
async function estudianteRut() {
  const res = await client.query(
    'SELECT * FROM estudiante WHERE rut = 12.345.678-9'
  )
  console.log('Registros: ', res.rows)
  client.end()
}
estudianteRut()

// Crear una función asíncrona para obtener por consola todos los estudiantes registrados.
// Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.
// Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.