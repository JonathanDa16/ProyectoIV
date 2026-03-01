/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FUNC_GESTION_USUARIOS_ADMIN: string;
    readonly VITE_DEPLOY_USUARIOS_EN_CONSTRUCCION: string;
    readonly VITE_FUNC_IDENTIDAD_LOGOTIPO: string;
    readonly VITE_FUNC_IDENTIDAD_FAVICON: string;
    readonly "VITE_FUNC_DISE\u00d1O_RESPONSIVO": string;
    readonly VITE_FUNC_MENU_PRINCIPAL: string;
    readonly VITE_FUNC_CONTENIDO_INSTITUCIONAL: string;
    readonly VITE_FUNC_CHAT_TIEMPO_REAL: string;
    readonly VITE_FUNC_FORO_FAQ: string;
    readonly VITE_FUNC_CONECTIVIDAD_SOCIAL: string;
    readonly VITE_FUNC_SLIDER_IMAGENES: string;
    readonly VITE_FUNC_VALORACION_PAGINAS: string;
    readonly VITE_FUNC_VIDEOS_EMBEBIDOS: string;
    readonly VITE_FUNC_GALERIA_IMAGENES: string;
    readonly VITE_FUNC_ANIMACIONES_EMBEBIDAS: string;
    readonly VITE_FUNC_COMERCIO_TIENDITA: string;
    readonly VITE_FUNC_UBICACION_MAPA: string;
    readonly VITE_FUNC_FORMULARIO_CONTACTO: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
