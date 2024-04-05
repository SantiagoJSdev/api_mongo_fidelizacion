const Usuario = require("../models/usuario");


const usuariosPost = async (req, res) => {
    const { nombre, correo } = req.body;
    try { 
        const usuario = new Usuario({ nombre, correo });
        // verificar si el usuario ya existe en la base de datos
        const existeUsuario = await Usuario.findOne({ correo });
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
        console.log(error);
    }


}

module.exports = {

    usuariosPost
}