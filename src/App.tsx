import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/Login";
import ContactPage from "./pages/Contact";
import Footer from "./pages/Footer";

const App = () => {
  return (
    <BrowserRouter>
     
      <Navbar />
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;