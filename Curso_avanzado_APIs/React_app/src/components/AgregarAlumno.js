import { useState } from "react";

function AgregarAlumno() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const agregarAlumno = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/alumnos/guardar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          correo,
          direccion,
          edad,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error API:", data);
        setMensaje(data.message || "Error al agregar alumno");
        return;
      }

      setMensaje("Alumno agregado correctamente");
      setNombre("");
      setEdad("");
      setDireccion("");
      setCorreo("");

    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión con el servidor");
    }
  };

  return (
    <div>
      <h2>Agregar alumno</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="number"
        placeholder="Edad"
        value={edad}
        onChange={(e) => setEdad(e.target.value)}
      />

      <input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
      />

      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />

      <button onClick={agregarAlumno}>Agregar</button>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default AgregarAlumno;
