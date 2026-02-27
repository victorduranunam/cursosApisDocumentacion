import React, { useEffect, useState } from "react";

function Alumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/alumnos/mostrar")
      .then((response) => {
        if (!response.ok) throw new Error("Error al conectar con la API");
        return response.json();
      })
      .then((data) => {
        // La API devuelve: { success, data: [...], message }
        if (Array.isArray(data.data)) {
          setAlumnos(data.data);   // 👈 array real
        } else {
          throw new Error("La API no devolvió un arreglo de alumnos");
        }
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  // Estados de interfaz
  if (cargando) return <p>Cargando lista de alumnos...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Alumnos ({alumnos.length})</h2>

      <table
        border="1"
        style={{
          width: "100%",
          textAlign: "left",
          borderCollapse: "collapse",
          marginTop: "10px"
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Dirección</th>
            <th>Correo electrónico</th>
          </tr>
        </thead>

        <tbody>
          {alumnos.map((alumno) => (
            <tr key={alumno.id}>
              <td>{alumno.id}</td>
              <td>{alumno.nombre}</td>   {/* 👈 minúsculas */}
              <td>{alumno.edad}</td>
              <td>{alumno.direccion}</td>
              <td>{alumno.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Alumnos;
