import { useState } from "react";

function BorrarAlumno() {
  const [id, setId] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [ejecutado, setEjecutado] = useState(false);



  const borrarAlumno = async () => {
    if (!id) return;

    try {
      const response = await fetch(`http://localhost:3000/api/alumnos/eliminar/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMensaje("Alumno eliminado correctamente");
      } else {
        setMensaje("No se pudo eliminar el alumno");
      }

      setEjecutado(true);
    } catch (error) {
      console.error(error);
      setMensaje("Error al conectar con el servidor");
      setEjecutado(true);
    }
  };

  return (
    <div>
      <h2>Borrar alumno por ID</h2>

      {/*
        Entrada del ID del alumno a eliminar
      */}
      <input
        type="number"
        placeholder="Ingrese ID del alumno"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button onClick={borrarAlumno}>Borrar</button>

      {/*
        Resultado de la operación de borrado
      */}
      {ejecutado && <p>{mensaje}</p>}
    </div>
  );
}

export default BorrarAlumno;
