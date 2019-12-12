const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true,
    },
}).argv;

const getInfo = async(direccion) => {
    try {
        const location = await lugar.getLugarLatLng(direccion);
        console.log(location);
        const weather = await clima.getClima(location.lat, location.lng);

        return `El clima en ${location.direccion} es de ${weather}° C.`;
    } catch (err) {
        return `No se pudo determinar el clima de ${direccion}`;
    }
};

getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log);

//lugar.getLugarLatLng(argv.direccion).then((resp) => console.log(resp));

// clima
//     .getClima(41.959999, -87.879997)
//     .then(console.log)
//     .catch((err) => console.log(err));