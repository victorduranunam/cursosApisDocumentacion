async function SubirFoto() {
  try {
    // Definir la dirección del Endpoint que se quiere consultar
    const UrlAPI = 'https://api.thecatapi.com/v1/images/upload';
    const apiKey = 'live_dWSHNvQG7a76J1BIRXrUWrx3wdnhm2Wsq6cQCBwTOMmaMPLdgJy8VfsFysLVciIZ';

    //Obtener la referencia del formulario de captura
    const fileInput = document.getElementById('file');

    //Verificar si se envio la foto
    if (fileInput.files.length === 0) {
      alert('Por favor selecciona una imagen.');
      return;
    }

    // Capturar el archivo seleccionado en el input file
    const file = fileInput.files[0];

    // Crear el objeto FormData
    const formData = new FormData();
    formData.append('file', file);

    // Validar que el archivo sea de tipo imagen
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!validImageTypes.includes(file.type)) {
    alert('El archivo debe ser una imagen válida (JPEG o PNG).');
    return;
    }



    const response = await fetch(UrlAPI, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey
      },
      body: formData
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log('Imagen subida correctamente:', jsonResponse);
      alert('Imagen subida exitosamente.');
    } else {
      const errorResponse = await response.text();
      console.error('Error en la respuesta:', errorResponse);
      alert('Error al subir la imagen.');
    }

  } catch (error) {
    console.error('Error inesperado:', error);
    alert('Ocurrió un error inesperado. Revisa la consola.');
  }
}
