import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PageContainer from "./components/layout/PageContainer";
import Home from "./pages/Home";
import Refugios from "./pages/Refugios";
import RefugioDetalle from "./pages/RefugioDetalle";
import FormularioRefugio from "./components/refugios/FormularioRefugio";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />

        <PageContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/refugios" element={<Refugios />} />
            <Route path="/refugios/:id" element={<RefugioDetalle/>}/>
            <Route path="/refugios/nuevo" element={<FormularioRefugio />} />
            <Route path="/refugios/:id/editar" element={<FormularioRefugio />} />
          </Routes>
        </PageContainer>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
