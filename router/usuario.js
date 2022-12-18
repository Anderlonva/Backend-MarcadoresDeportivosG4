const e = require('express');
const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { validarUsuario } = require('../helpers/validacion-usuario');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

/*
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
*/

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

        //const salt = await bcrypt.genSalt()
       // const passwordEncript = bcrypt.hashSync(req.body.password, salt)

        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.email = req.body.email;
        //usuario.password = passwordEncript;
        usuario.foto = req.body.foto;
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



router.post('/registro', async (req = request, res = response) => {

    const { email, password } = req.body

    try {
        const usuarioExiste = await Usuario.findOne({
            email: email
        })

        if (usuarioExiste) {
            return res.status(400).json({
                msg: 'Ya existe usuario'
            })
        }

        const usuario = new Usuario()
        const salt = await bcrypt.genSalt()
        const passwordEncript = bcrypt.hashSync(password, salt)

        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.email = req.body.email;
        usuario.password = passwordEncript;
        usuario.rol = 'Usuario';
        usuario.foto = req.body.foto;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();


        const usuarioSave = await usuario.save()
        return res.status(400).json(usuarioSave)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
});


router.post('/login', async (req = request, res = response) => {

    const { email, password } = req.body

    try {
        const usuarioExiste = await Usuario.findOne({
            email: email
        })

        if (!usuarioExiste) {
            return res.status(400).json({
                msg: 'No existe usuario',
                token: false
            })
        }

        if (usuarioExiste.estado == 'Inactivo') {
            return res.status(400).json({
                msg: 'El usuario esta Inactivo',
                token: false
            })
        }

        const compare = bcrypt.compareSync(password, usuarioExiste.password)
        if (!compare) {
            return res.status(400).json({
                msg: 'contraseña incorrecta',
                token: false
            })
        } 

       /*const token = jwt.sign(
            {
                email: usuarioExiste.email,
                nombre: usuarioExiste.nombre,
                apellido: usuarioExiste.apellido
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )*/

        

        return res.json({ usuarioExiste, token: true })
    } catch (error) {

    }
});


router.post('/registro/admin', async (req = request, res = response) => {

    const { email, password } = req.body

    try {
        const usuarioExiste = await Usuario.findOne({
            email: email
        })

        if (usuarioExiste) {
            return res.status(400).json({
                msg: 'Ya existe usuario'
            })
        }

        const usuario = new Usuario()
        const salt = await bcrypt.genSalt()
        const passwordEncript = bcrypt.hashSync(password, salt)

        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.email = req.body.email;
        usuario.password = passwordEncript;
        usuario.rol = 'Admin';
        usuario.foto = req.body.foto;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();


        const usuarioSave = await usuario.save()
        return res.status(400).json(usuarioSave)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
});

module.exports = router