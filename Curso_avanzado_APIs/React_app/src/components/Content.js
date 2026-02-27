import "../styles/main.css";

function Content({ children }) {
  return (
    <main className="content">
      <h2>Contenido Principal</h2>
      <p>Aquí va el contenido principal de la página.</p>
      {children} {/* Aquí se renderizan las rutas */}
    </main>
  );
}

export default Content;
