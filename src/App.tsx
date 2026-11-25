import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PageContainer from "./components/layout/PageContainer";
import Home from "./pages/Home";
import Refugios from "./pages/Refugios";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import RecuperarPassword from "./pages/RecuperarPassword";
import Perfil from "./pages/Perfil";
import Animales from "./pages/Animales";

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
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route
                path="/recuperar-password"
                element={<RecuperarPassword />}
            />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/animales" element={<Animales />} />
          </Routes>
        </PageContainer>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
