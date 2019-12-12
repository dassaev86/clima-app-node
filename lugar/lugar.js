const axios = require('axios');

const getLugarLatLng = async(direccion) => {
    const encodedUrl = encodeURI(direccion);
    console.log(encodedUrl);

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedUrl}`,
        headers: {
            'x-rapidapi-key': '76e578b776mshc006a79722c57b1p1524a7jsn821f2f0f01cc',
        },
    });

    const resp = await instance.get();

    if (resp.data.Results.length === 0) {
        throw new Error(`No hay resultados para ${direccion}`);
    }

    const data = resp.data.Results[0];
    const location = data.name;
    const lat = data.lat;
    const lng = data.lon;

    return {
        direccion,
        lat,
        lng,
    };
};

module.exports = {
    getLugarLatLng,
};