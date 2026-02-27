async function getImages() {
  try {
    const response = await fetch('URL_DE_LA_API');

    if (!response.ok) {
      throw new Error('Error en la respuesta de la API: ' + response.status);
    }

    const data = await response.json();
    console.log('Datos recibidos:', data);

  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error.message);
  }
}
