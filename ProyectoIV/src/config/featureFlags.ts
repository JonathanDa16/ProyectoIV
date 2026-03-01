/**
 * Logical Deployment Configuration
 * Maps environment variables (Spanish) to application features.
 * Use this configuration object to toggle functionality throughout the application.
 */
export const featureFlags = {
    deployment: {
        usuariosEnConstruccion: import.meta.env.VITE_DEPLOY_USUARIOS_EN_CONSTRUCCION === 'true',
    },
    gestionUsuarios: {
        admin: import.meta.env.VITE_FUNC_GESTION_USUARIOS_ADMIN === 'true',
    },
    identidadCorporativa: {
        logotipo: import.meta.env.VITE_FUNC_IDENTIDAD_LOGOTIPO === 'true',
        favicon: import.meta.env.VITE_FUNC_IDENTIDAD_FAVICON === 'true',
    },
    interfaz: {
        disenoResponsivo: import.meta.env["VITE_FUNC_DISE\u00d1O_RESPONSIVO"] === 'true',
        menuPrincipal: import.meta.env.VITE_FUNC_MENU_PRINCIPAL === 'true',
    },
    contenidoInstitucional: {
        paginas: import.meta.env.VITE_FUNC_CONTENIDO_INSTITUCIONAL === 'true',
    },
    interaccion: {
        chat: import.meta.env.VITE_FUNC_CHAT_TIEMPO_REAL === 'true',
        foroFaq: import.meta.env.VITE_FUNC_FORO_FAQ === 'true',
        redesSociales: import.meta.env.VITE_FUNC_CONECTIVIDAD_SOCIAL === 'true',
        sliderImagenes: import.meta.env.VITE_FUNC_SLIDER_IMAGENES === 'true',
        valoracion: import.meta.env.VITE_FUNC_VALORACION_PAGINAS === 'true',
    },
    multimedia: {
        videos: import.meta.env.VITE_FUNC_VIDEOS_EMBEBIDOS === 'true',
        galeria: import.meta.env.VITE_FUNC_GALERIA_IMAGENES === 'true',
        animaciones: import.meta.env.VITE_FUNC_ANIMACIONES_EMBEBIDAS === 'true',
        tienda: import.meta.env.VITE_FUNC_COMERCIO_TIENDITA === 'true',
    },
    contacto: {
        mapa: import.meta.env.VITE_FUNC_UBICACION_MAPA === 'true',
        formulario: import.meta.env.VITE_FUNC_FORMULARIO_CONTACTO === 'true',
    },
};

export default featureFlags;
