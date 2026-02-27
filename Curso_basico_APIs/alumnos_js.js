document.addEventListener("DOMContentLoaded", () => {
    fetch('alumnos_json.php')
      .then(response => {
          if (!response.ok) throw new Error("Error en la red");
          return response.json();
      })
      .then(data => {
        const tbody = document.querySelector('#tablaAlumnos tbody');
        
        // CORRECCIÓN: Si data.alumnos no existe, usamos data directamente
        const listaAlumnos = data.alumnos || data;

        tbody.innerHTML = listaAlumnos.map(alumno => `
          <tr>
            <td>${alumno.nombre || 'N/A'}</td>
            <td>${alumno.edad || 'N/A'}</td>
            <td>${alumno.correo || 'No registrado'}</td>
          </tr>
        `).join('');
      })
      .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
        document.querySelector('#tablaAlumnos tbody').innerHTML = 
          `<tr><td colspan="3">Error al cargar datos</td></tr>`;
      });
});
