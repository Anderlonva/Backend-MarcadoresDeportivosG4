const validarEvento = (req) => {

    const validacion = [];

    if (!req.body.descripcion) {
        validacion.push('Descripcion requerido')
    }

    if (!req.body.equipoUno) {
        validacion.push('Equipo 1 requerido')
    }

    if (!req.body.equipoDos) {
        validacion.push('Equipo 2 requerido')
    }

    if (!req.body.tipoDeporte) {
        validacion.push('Tipo de Deporte requerido')
    }

    if (!req.body.marcadorEuno) {
        validacion.push('Marcador Equipo 1 requerido')
    }

    if (!req.body.marcadorEdos) {
        validacion.push('Marcador Equipo 2 requerido')
    }

    if (!req.body.usuarioCreo) {
        validacion.push('El usuario es requerido')
    }

    return validacion;

}

module.exports = {  validarEvento };