// No se necesita 'require('node-fetch')' ya que fetch es global en los entornos modernos.

const ZOHO_SHEET_URL = 'https://sheet.zohopublic.com/sheet/publishedsheet/46dd4522216d6bfa7c81b93a4df9234a67d3b3fab5eed1904b58fd5b5299f27b?type=grid&download=csv';

export default async function handler(req, res) {
  try {
    const response = await fetch(ZOHO_SHEET_URL);

    if (!response.ok) {
      // Reenviamos el código de estado y el texto del error de Zoho
      return res.status(response.status).send(response.statusText);
    }

    const data = await response.text();

    // Establecer las cabeceras CORS para permitir el acceso desde cualquier origen
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');

    // Manejar peticiones pre-flight (OPTIONS) para CORS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    res.status(200).send(data);

  } catch (error) {
    console.error('Proxy Error:', error); // Este log aparecerá en tu panel de Vercel
    res.status(500).send('Internal Server Error');
  }
}
