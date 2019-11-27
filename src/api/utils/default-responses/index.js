function succesProcess(msj, access = true, data) {
    return {
        status: true,
        access: access,
        message: msj,
        data
    }
}

function errorProcess(msj, access = true, data = []) {
    return {
        status: false,
        access: access,
        message: msj,
        data
    }
}

module.exports = {
    succesProcess, errorProcess
}