const e = require('express');
const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { validarUsuario } = require('../helpers/validacion-usuario');

const router  = Router();

router.get('/', async function(req, res){
    try {
        
        const usuarios = await Usuario.find();
        res.send(usuarios);
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.post('/',  async function(req, res){

    try {

        const validar = validarUsuario(req);
        
        if (validar.length > 0) {
            return res.status(400).send(validar);
        }
    
        const existeUsuario = await Usuario.findOne({email: req.body.email})

        if (existeUsuario) {
            return res.status(400).send('Email ya existe');
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.email = req.body.email;
        usuario.password = req.body.password;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

    
        usuario = await usuario.save();
    
        res.send(usuario); 
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }

   
});


router.put('/:usuarioId', async function(req, res){
    try {

        let usuario = await Usuario.findById(req.params.usuarioId); 

        if (!usuario) {
            return res.status(400).send('El Ususario no existe');
        }

        let usuarioEmail = await Usuario.findOne({email: req.body.email, _id: {$ne: usuario._id}});
                                                //$ne = no equals no igual 
                                                // busca en la tabla si exite el email y verifica que otro id diferente al que estoy buscando tenga este email, ya que si modifico el email y ya existe no me lo va a dejar actualizar
          if (usuarioEmail) {
            return res.status(400).send('El Email ya existe');
          }

        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.email = req.body.email;
        usuario.password = req.body.password;
        usuario.estado = req.body.estado;
        usuario.fechaActualizacion = new Date();

    
        usuario = await usuario.save(); 
    
        res.send(usuario); 
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }
});

router.get('/:usuarioId', async function( req, res ) {
    try {
        const usuario = await Usuario.findById(req.params.usuarioId)
        if (!usuario) {
            return res.status(404).send('Usuario no existe')
        }
        res.send(usuario)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router