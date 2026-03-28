export interface Coordenadas {
  latitud: number
  longitud: number
}

export interface FotoGaleria {
  url: string
  descripcion: string
}

export interface TemaInvitacion {
  colorPrimario: string
  colorSecundario: string
  colorFondo: string
  colorTexto: string
  colorAcento: string
  fuenteTitulo: string
  fuenteCuerpo: string
  tipoAnimacion: 'elegante' | 'festivo' | 'minimalista'
}

export interface ConfiguracionInvitacion {
  nombreCumpleanero: string
  edadCumplir: string
  fotoCumpleanero: string

  fechaEvento: string
  horaInicio: string
  horaFin: string
  nombreLugar: string
  direccion: string
  mensajePersonalizado: string

  coordenadas: Coordenadas
  enlaceGoogleMaps: string

  tema: TemaInvitacion

  galeriaFotos: FotoGaleria[]

  mostrarConfirmacion: boolean
  textoBotonConfirmar: string
  enlaceConfirmacion: string

  mostrarConfeti: boolean
  mostrarCuentaRegresiva: boolean
  mostrarMapa: boolean
}
