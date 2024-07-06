const express = require('express');
const cors = require('cors');
const app = express();
const dbConfig = require('./dbConfig');
const sql = require ('mssql');
const bcrypt = require('bcryptjs'); // Cambiado de bcryptjs a bcrypt

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

app.get('/test', (req,res) => {
    res.json('test ok');
});

app.post('/register',async (req, res)=>{
    try {
        await sql.connect(dbConfig);
        const {name, email, password} = req.body;
        let passwordHash = bcrypt.hashSync(password, 9); // Uso de bcrypt en lugar de bcryptjs
        res.json({name, email, password});

        const query = `INSERT INTO [Login].[dbo].[Usuarios] ([Name]
            ,[Email]
            ,[Password]
            ,[Privilege]
            ,[Active]) VALUES ('${name}','${email}','${passwordHash}',0,1)`;
        // Ejecutar la consulta
        const result = await sql.query(query);
    } catch (error) {
            console.error(error.message);
            res.status(500).send('Error en el servidor');
    }
});

/*app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const query = `SELECT * FROM [Login].[dbo].[Usuarios] WHERE Email = '${email}'`
});*/

app.post('/login', async (req, res) => {
    try{
        await sql.connect(dbConfig);
        const {email, password} = req.body;
        const query = `SELECT * FROM [Login].[dbo].[Usuarios] WHERE Email = '${email}'  and Active = 1`
        if(query === 0){
            res.json('found')
        }else{
            res.json('not found')
        }
        
    }catch(error){
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
});


app.listen(4000, () => {
    console.log('Servidor escuchando en el puerto 4000');
});
