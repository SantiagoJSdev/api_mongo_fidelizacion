
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    
    correo: {
        type: String,
        required: [true, 'El correo es obligatoria'],
        unique: true
    } 
    
})

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema) 