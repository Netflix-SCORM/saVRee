// Es posible que necesites instalar 'node-fetch' si usas una versión antigua de Node.
// En las versiones más nuevas, 'fetch' es global.
const fetch = require('node-fetch');

// La URL de tu hoja de cálculo
const ZOHO_SHEET_URL = 'https://sheet.zohopublic.com/sheet/publishedsheet/46dd4522216d6bfa7c81b93a4df9234a67d3b3fab5eed1904b58fd5b5299f27b?type=grid&download=csv';

// El handler que procesará la petición
module.exports = async (req, res) => {
  try {
    // 1. Petición del servidor de la función al servidor de Zoho
    const response = await fetch(ZOHO_SHEET_URL);
    
    if (!response.ok) {
      // Si Zoho da un error, lo pasamos al cliente
      return res.status(response.status).send('Error fetching data from Zoho');
    }

    const data = await response.text(); // Obtenemos el CSV como texto

    // 2. Añadimos las cabeceras CORS a la respuesta
    //    '*" permite cualquier origen. Para mayor seguridad, puedes poner aquí
    //    el dominio de tu LMS: 'https://mi-lms.com'
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');

    // 3. Enviamos los datos de vuelta a tu SCORM
    res.status(200).send(data);

  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).send('Internal Server Error');
  }
};
