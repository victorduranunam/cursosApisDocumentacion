import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Content from "./components/Content";
import Footer from "./components/Footer";
import MiComponente from "./components/MiComponente";
import Servicios from "./components/Servicios";
import Contacto from "./components/Contacto";
import Nosotros from "./components/Nosotros";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Menu />

        <Content>
          <Routes>
            <Route path="/" element={<MiComponente />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </Content>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
