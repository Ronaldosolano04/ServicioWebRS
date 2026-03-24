const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(express.json()); 
app.use(cors());

const API_URL = 'http://www.raydelto.org/agenda.php';


app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de contactos funcionando correctamente Raydelto',
        endpoints: {
            listar: 'GET /contactos',
            crear: 'POST /contactos'
        }
    });
});

app.get('/contactos', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.json(response.data);
    } catch (error) {
        console.error(error.message); 
        res.status(500).json({ error: 'Error al obtener contactos' });
    }
});

app.post('/contactos', async (req, res) => {
    try {
        const { nombre, apellido, telefono } = req.body;

        if (!nombre || !apellido || !telefono) {
            return res.status(400).json({ 
                error: 'Todos los campos son obligatorios' 
            });
        }

        const nuevoContacto = { nombre, apellido, telefono };

        const response = await axios.post(API_URL, nuevoContacto, {
            headers: { 'Content-Type': 'application/json' }
        });

        res.json({
            mensaje: 'Contacto guardado correctamente',
            data: response.data
        });

    } catch (error) {
        console.error(error.message); 
        res.status(500).json({ error: 'Error al guardar contacto' });
    }
});

// Iniciando servidor RS
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});