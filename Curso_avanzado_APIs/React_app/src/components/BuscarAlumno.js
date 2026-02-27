import { useState } from "react";

function BuscarAlumno() {
  const [id, setId] = useState("");
  const [alumno, setAlumno] = useState(null);
  const [buscado, setBuscado] = useState(false);
  const [error, setError] = useState(null);

  const buscarAlumno = async () => {
    if (!id) return;

    try {
      const response = await fetch(`http://localhost:3000/api/alumnos/obtenerID/${id}`);

      if (!response.ok) {
        setAlumno(null);
        setError("Alumno no encontrado");
      } else {
        const data = await response.json();
        // API: { success, data: { ... }, message }
        if (data.data) {
          setAlumno(data.data);   // 👈 alumno real
          setError(null);
        } else {
          setAlumno(null);
          setError("Formato de respuesta inválido");
        }
      }

      setBuscado(true);
    } catch (error) {
      console.error(error);
      setAlumno(null);
      setError("Error de conexión con la API");
      setBuscado(true);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Buscar alumno por ID</h2>

      <input
        type="number"
        placeholder="Ingrese ID del alumno"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      <button onClick={buscarAlumno}>Buscar</button>

      {/* RESULTADO */}
      {buscado && (
        alumno ? (
          <table border="1" style={{ marginTop: "15px", width: "100%" }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th>ID</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Dirección</th>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{alumno.id}</td>
                <td>{alumno.nombre}</td>
                <td>{alumno.edad}</td>
                <td>{alumno.direccion}</td>
                <td>{alumno.correo}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p style={{ marginTop: "15px", color: "red" }}>
            {error || "Ningún alumno encontrado"}
          </p>
        )
      )}
    </div>
  );
}

export default BuscarAlumno;
