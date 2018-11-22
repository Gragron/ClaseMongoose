/**
 * Los middleware necesitan de un return solo por seguridad aunque no se han necesarios
 */

module.exports = (() => {

    const fillData = (req, res, next) => {  // middleware

        const { nombre, apellidos, edad, peso, ojos } = req.body; // destructuring data

        if (!nombre) return res.send('Falta Nombre')  // validamos que tenga nombre
        if (!edad) return res.send('Falta Edad')
        if (!apellidos) return res.send('Falta los Apellidos')

        const { paterno, materno } = apellidos;
        if (!paterno) return res.send('Falta el paterno')
        if (!materno) return res.send('Falta el materno')

        next(); // para indicar la continuacion de la ejecucion
    };

    const typeData = (req, res, next) => {  // middleware

        const { nombre, apellidos, edad, peso, ojos } = req.body; // destructuring data
        const { paterno, materno } = apellidos;

        if (typeof(nombre) !== 'string') return res.send('Nombre de ser texto')
        if (typeof(edad) !== 'number') return res.send('Edad debe ser numero')
        if (typeof(apellidos) !== 'object' ) return res.send('Apellidos debe ser objeto')
        if (typeof(paterno) !== 'string' ) return res.send('Paterno debe ser texto')
        if (typeof(materno) !== 'string' ) return res.send('Materno debe ser texto')

        next();
    };

    // comvertimos las funciones a objeto; osea regresamos un objeto con funciones
    return{
        fillData,
        typeData
    }

})(); // encapsulamos la function y la ejecutamos