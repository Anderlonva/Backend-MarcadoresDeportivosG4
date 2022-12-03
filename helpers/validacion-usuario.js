const validarUsuario = (req) => {

    const validacion = [];

    if (!req.body.nombre) {
        validacion.push('Nombre requerido')
    }

    if (!req.body.apellido) {
        validacion.push('Apellido requerido')
    }

    if (!req.body.email) {
        validacion.push('Email requerido')
    }

    if (!req.body.password) {
        validacion.push('Password requerido')
    }

    if (!req.body.estado) {
        validacion.push('Estado requerido')
    }

    return validacion;

}

module.exports = {  validarUsuario };
