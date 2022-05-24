const { Client } = require('pg')
const argumentos = process.argv.slice(2)

const funcion = argumentos[0]
const rut = argumentos[1]
const nombre = argumentos[2]
const curso = argumentos[3]
const nivel = argumentos[4]

// Realizar la conexión con PostgreSQL con la clase Client.
const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'estudiantes_db',
  password: '12616027',
  port: 5432,
}
const client = new Client(config)
client.connect()

// Crear una función asíncrona para registrar un nuevo estudiante en la base de datos
async function registrarEstudiante() {
  const res = await client.query(
    'insert into estudiante (nombre, rut, curso, nivel) values ($1, $2, $3, $4) RETURNING *;',
    [nombre, rut, curso, nivel]
  )
  console.log(`Estudiante ${nombre} Agregado con éxito`)
  client.end()
}

// Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.
async function estudianteRut() {
  const res = await client.query('SELECT * FROM estudiante WHERE rut = $1', [
    rut,
  ])
  console.log('Estudiante: ', res.rows)
  client.end()
}
// Crear una función asíncrona para obtener por consola todos los estudiantes registrados.
async function todosEstudiantes() {
  const res = await client.query('SELECT * FROM estudiante')
  console.log('Estudiantes: ', res.rows)
  client.end()
}

// Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.
async function actualizarEstudiante() {
  const res = await client.query(
    'UPDATE estudiante SET rut  = $1 , rut = $2, curso =$3, nivel=$4 WHERE rut = $2  RETURNING *;',
    [nombre, rut, curso, nivel]
  )
  console.log('Registro del Estuadiante modificado', res.rows[0])
  console.log('Cantidad de registros afectados', res.rowCount)
  client.end()
}

// Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.
async function eliminarEstudiante() {
  const res = await client.query('DELETE FROM estudiante WHERE rut = $1', [rut])
  console.log(`Registro de estudiante con rut ${rut} eliminado.`)
  console.log('Cantidad de registros eliminados', res.rowCount)
  client.end()
}

if (funcion == 'nuevo') {
  registrarEstudiante()
} else if (funcion == 'consulta') {
  estudianteRut()
} else if (funcion == 'todos') {
  todosEstudiantes()
} else if (funcion == 'actualizar') {
  actualizarEstudiante()
} else if (funcion == 'eliminar') {
  eliminarEstudiante()
} else console.log('Consulta invalida')