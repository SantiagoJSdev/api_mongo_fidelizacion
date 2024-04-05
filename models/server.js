

const express = require('express');
const path = require('path');
const cors = require("cors");
const morgan = require("morgan"); 
const config = require('../config');
const clienteRoutes = require("../routes/clientes.routes");
const { dbConnection } = require('../database/config');
 
 

class Server {
    app = express();
    port = '';
    apiPaths = {
        usuarios: '/api'
    }

    constructor() {
        this.port = config.port || '8000';
        // Métodos iniciales
        this.conectarDb();
        this.middlewares();
        this.routes();
    }

    async conectarDb() {
        try {
           await dbConnection();
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares() {
        // Carpeta pública 
        this.app.use(express.static(path.join(__dirname, '..', 'public')));
        this.app.use(express.static('images'));

        
        // CORS
        this.app.use(cors());
        this.app.use(morgan("dev"));
        // Lectura del body
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());



    }

    routes() {
        this.app.use(this.apiPaths.usuarios, clienteRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        })
    }

 
}

module.exports = { Server }



