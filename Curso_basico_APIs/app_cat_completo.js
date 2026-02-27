async function VerFoto() {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');

    if (!response.ok) {
      throw new Error('Error en la respuesta de la API: ' + response.status);
    }

    const data = await response.json();
    console.log('Datos recibidos:', data);
    // Obtener el contenedor principal y limpiar su contenido
    const galeriaFotos = document.getElementById('galeria_fotos');
    galeriaFotos.innerHTML = ''; // Limpiar el contenedor


      // Crear el elemento img
      const imgElement = document.createElement('img');
      imgElement.src = data[0].url; 
      imgElement.classList.add('tamano_imagen');

      // Crear el div contenedor con la clase específica
      const divElement = document.createElement('div');
      divElement.classList.add('contenedor_imagen');
      divElement.appendChild(imgElement);

      // Añadir el div al contenedor principal
      galeriaFotos.appendChild(divElement);






  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error.message);
  }
}
