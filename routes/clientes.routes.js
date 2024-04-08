const { Router } = require("express");
const { usuariosPost } = require("../controllers/usuarios.controller");
 
 
const router = Router();


 
router.get("/info", (req, res) => {
    res.json({ User: 'Santiago' });
});
  

router.post('/verificacion',    usuariosPost );
// router.get('/:id',    getUsuario );
// router.post('/',      postUsuario );
// router.put('/:id',    putUsuario );
// router.delete('/:id', deleteUsuario );

module.exports = router;

