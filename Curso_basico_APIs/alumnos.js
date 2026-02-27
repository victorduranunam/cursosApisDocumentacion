document.addEventListener("DOMContentLoaded", () => {
    fetch('alumnos.php')
      .then(response => response.json())
      .then(data => {
        const tbody = document.querySelector('#tablaAlumnos tbody');
        tbody.innerHTML = data.alumnos.map(alumno => `
          <tr>
            <td>${alumno.nombre}</td>
            <td>${alumno.edad}</td>
            <td>${alumno.correo}</td>
          </tr>
        `).join('');
      })
      .catch(error => console.error('Error al cargar el archivo JSON:', error));
  });
 
