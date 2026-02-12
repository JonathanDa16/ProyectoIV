import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout"
import Home from "./pages/Home"
import AdminPage from "./pages/Admin"
import LoginPage from "./pages/Login"
import MapaPage from "./pages/Mapa"
import ReportesPage from "./pages/Reportes"
import ContactoPage from "./pages/Contacto"
import FaqPage from "./pages/Faq"
import ForoPage from "./pages/Foro"
import GaleriaPage from "./pages/Galeria"
import NosotrosPage from "./pages/Nosotros"
import ProfilePage from "./pages/Perfil"
import TiendaPage from "./pages/Tienda"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="admin" element={<AdminPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="mapa" element={<MapaPage />} />
                    <Route path="reportes" element={<ReportesPage />} />
                    <Route path="contacto" element={<ContactoPage />} />
                    <Route path="faq" element={<FaqPage />} />
                    <Route path="foro" element={<ForoPage />} />
                    <Route path="galeria" element={<GaleriaPage />} />
                    <Route path="nosotros" element={<NosotrosPage />} />
                    <Route path="perfil" element={<ProfilePage />} />
                    <Route path="tienda" element={<TiendaPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
