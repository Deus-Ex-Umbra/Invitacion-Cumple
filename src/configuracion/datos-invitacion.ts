import type { ConfiguracionInvitacion } from '../tipos/invitacion'



const env = import.meta.env

const whatsapp = (env.VITE_WHATSAPP || '+59173865661').replace('+', '')
const mensajeWa = encodeURIComponent(env.VITE_MENSAJE_WHATSAPP || '¡Hola! Confirmo mi asistencia al cumpleaños de "Graviel" 🎂🃏')

export const configuracion: ConfiguracionInvitacion = {
  nombreCumpleanero: env.VITE_NOMBRE_CUMPLEANERO || "Graviel",
  edadCumplir: env.VITE_EDAD_CUMPLIR || "\\sum_{k=1}^{3} k! + \\int_{0}^{\\pi/2} 10 \\sin(x) \\, dx + \\lim_{x \\to 1} \\frac{x^3 - 1}{x - 1}",
  fotoCumpleanero: "/imagenes/foto-cumpleanero.jpg",
  
  fechaEvento: env.VITE_FECHA_EVENTO || "2026-05-15T20:00:00",
  horaInicio: env.VITE_HORA_INICIO || "T_0 = 8:00 \\text{ PM}",
  horaFin: env.VITE_HORA_FIN || "T(x) = T_0 + k \\cdot \\ln(x + 1) \\quad (\\text{x = asistentes})",
  nombreLugar: env.VITE_NOMBRE_LUGAR || "MOOZ - RESTOBAR",
  direccion: env.VITE_DIRECCION || "Estados Unidos 692, Sucre",
  mensajePersonalizado: env.VITE_MENSAJE || "¡Ven a celebrar conmigo este día tan especial! 🎉",

  coordenadas: {
    latitud: Number(env.VITE_LATITUD) || -19.038208,
    longitud: Number(env.VITE_LONGITUD) || -65.2607488,
  },
  enlaceGoogleMaps: env.VITE_ENLACE_GOOGLE_MAPS || "https://maps.app.goo.gl/wKfxfcPRWujXETtRA?g_st=aw",

  tema: {
    colorPrimario: env.VITE_COLOR_PRIMARIO || "#6D28D9",
    colorSecundario: env.VITE_COLOR_SECUNDARIO || "#9333EA",
    colorFondo: env.VITE_COLOR_FONDO || "#050208",
    colorTexto: env.VITE_COLOR_TEXTO || "#E2E0E7",
    colorAcento: env.VITE_COLOR_ACENTO || "#C9A227",
    fuenteTitulo: "'Playfair Display', serif",
    fuenteCuerpo: "'Inter', sans-serif",
    tipoAnimacion: "elegante",
  },

  galeriaFotos: [],

  mostrarConfirmacion: true,
  textoBotonConfirmar: "¡Confirmo mi asistencia! 🃏",
  enlaceConfirmacion: `https://wa.me/${whatsapp}?text=${mensajeWa}`,

  mostrarConfeti: true,
  mostrarCuentaRegresiva: false,
  mostrarMapa: true,
}
