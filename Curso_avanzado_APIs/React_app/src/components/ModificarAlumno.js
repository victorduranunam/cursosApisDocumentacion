import { useState } from "react";

function ModificarAlumno() {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargado, setCargado] = useState(false);

  /*
    Obtiene los datos del alumno por ID
    para cargarlos en el formulario.
  */
  const buscarAlumno = async () => {
    if (!id) return;

    try {
      // 🔹 Endpoint correcto (GET)
      const response = await fetch(`http://localhost:3000/api/alumnos/obtenerID/${id}`);

      if (!response.ok) {
        setMensaje("Alumno no encontrado");
        setCargado(false);
        return;
      }

      const data = await response.json();

      // API: { success, data: {...}, message }
      if (data.success && data.data) {
        setNombre(data.data.nombre);
        setEdad(data.data.edad);
        setCorreo(data.data.correo);
        setCargado(true);
        setMensaje("");
      } else {
        setMensaje("Alumno no encontrado");
        setCargado(false);
      }

    } catch (error) {
      console.error(error);
      setMensaje("Error al obtener alumno");
      setCargado(false);
    }
  };

  /*
    Envía los datos modificados a la API
    usando el método PUT.
  */
  const modificarAlumno = async () => {
    try {
      // 🔹 Endpoint PUT correcto
      const response = await fetch(`http://localhost:3000/api/alumnos/actualizar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          edad,
          correo,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(data.message || "Alumno modificado correctamente");
      } else {
        setMensaje("Error al modificar alumno");
      }

    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión con el servidor");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Modificar alumno</h2>

      {/* Buscar */}
      <input
        type="number"
        placeholder="ID del alumno"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      <button onClick={buscarAlumno}>Buscar</button>

      {/* Formulario */}
      {cargado && (
        <div style={{ marginTop: "15px" }}>
          <div>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Edad"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <button onClick={modificarAlumno} style={{ marginTop: "10px" }}>
            Guardar cambios
          </button>
        </div>
      )}

      {/* Mensaje */}
      {mensaje && (
        <p style={{ marginTop: "10px", color: mensaje.includes("correctamente") ? "green" : "red" }}>
          {mensaje}
        </p>
      )}
    </div>
  );
}

export default ModificarAlumno;
