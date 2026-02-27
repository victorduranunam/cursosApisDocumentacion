async function VerFoto() {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');

    if (!response.ok) {
      throw new Error('Error en la respuesta de la API: ' + response.status);
    }

   



  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error.message);
  }
}
