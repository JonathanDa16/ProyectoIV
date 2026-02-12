import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./Layout"
import Home from "./pages/Home"
import AdminPage from "./pages/Admin"
import LoginPage from "./pages/Login"
import MapaPage from "./pages/Mapa"
import ContactoPage from "./pages/Contacto"
import FaqPage from "./pages/Faq"
import ForoPage from "./pages/Foro"
import GaleriaPage from "./pages/Galeria"
import ProfilePage from "./pages/Perfil"
import TiendaPage from "./pages/Tienda"
import { featureFlags } from "@/config/featureFlags"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function ScrollToHash() {
    const { hash } = useLocation();
    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash]);
    return null;
}

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToHash />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="admin" element={featureFlags.gestionUsuarios.admin ? <AdminPage /> : <Navigate to="/" />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="mapa" element={featureFlags.contacto.mapa ? <MapaPage /> : <Navigate to="/" />} />

                    {/* Redirects for sections now on Home */}
                    <Route path="reportes" element={<Navigate to="/#reportes" replace />} />
                    <Route path="nosotros" element={<Navigate to="/#nosotros" replace />} />

                    <Route path="contacto" element={featureFlags.contacto.formulario ? <ContactoPage /> : <Navigate to="/" />} />
                    <Route path="faq" element={featureFlags.interaccion.foroFaq ? <FaqPage /> : <Navigate to="/" />} />
                    <Route path="foro" element={featureFlags.interaccion.foroFaq ? <ForoPage /> : <Navigate to="/" />} />
                    <Route path="galeria" element={featureFlags.multimedia.galeria ? <GaleriaPage /> : <Navigate to="/" />} />
                    <Route path="perfil" element={<ProfilePage />} />
                    <Route path="tienda" element={featureFlags.multimedia.tienda ? <TiendaPage /> : <Navigate to="/" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
