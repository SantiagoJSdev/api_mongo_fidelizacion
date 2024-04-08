const Usuario = require("../models/usuario");
const jwt = require('jsonwebtoken');

const usuariosPost = async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.secretKey);
        const usuario = new Usuario({ correo: decoded.correo });

        // verificar si el usuario ya existe en la base de datos
        const existeUsuario = await Usuario.findOne({ correo: decoded.correo });
        if (existeUsuario) {
            return res.status(400).json({
                msg: 'El usuario ya existe en la base de datos'
            });
        }
        await usuario.save();

        res.json({
            usuario,
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
        console.log(error);
    }


}

module.exports = {

    usuariosPost
}