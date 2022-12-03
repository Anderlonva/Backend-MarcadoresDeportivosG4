const validarEquipo = (req) => {

    const validacion = [];

    if (!req.body.nombre) {
        validacion.push('Nombre requerido')
    }

    if (!req.body.descripcion) {
        validacion.push('Descripcion requerido')
    }

    if (!req.body.pais) {
        validacion.push('Pais requerido')
    }

    if (!req.body.estado) {
        validacion.push('Estado requerido')
    }

    return validacion;

}

module.exports = {  validarEquipo };