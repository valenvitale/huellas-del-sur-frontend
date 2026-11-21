import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PageContainer from "./components/layout/PageContainer";
import Home from "./pages/Home";

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
          </Routes>
        </PageContainer>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
