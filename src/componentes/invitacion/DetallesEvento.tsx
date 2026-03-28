import { Calendar, Clock, MapPin, Hourglass } from 'lucide-react'
import { motion } from 'motion/react'
import { FormulaMath } from '../compartidos/FormulaMath'
import { AnimacionEntrada } from './AnimacionEntrada'

interface DetallesEventoProps {
  fechaEvento: string
  horaInicio: string
  horaFin: string
  nombreLugar: string
  direccion: string
  formulaDuracion: string
  formulaInicio: string
}

interface FilaDetalleProps {
  icono: React.ReactNode
  titulo: string
  valor: React.ReactNode
  retraso: number
}

const FilaDetalle = ({ icono, titulo, valor, retraso }: FilaDetalleProps) => (
  <AnimacionEntrada retraso={retraso} direccion="izquierda">
    <motion.div
      className="detalle-fila"
      whileHover={{ x: 8 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <div className="detalle-icono">{icono}</div>
      <div className="detalle-texto">
        <span className="detalle-titulo">{titulo}</span>
        <span className="detalle-valor">{valor}</span>
      </div>
    </motion.div>
  </AnimacionEntrada>
)

const formatearFecha = (fechaISO: string): string => {
  const fecha = new Date(fechaISO)
  return fecha.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const DetallesEvento = ({
  fechaEvento,
  nombreLugar,
  direccion,
  formulaDuracion,
  formulaInicio,
}: DetallesEventoProps) => {
  return (
    <AnimacionEntrada>
      <section className="detalles-seccion">
        <h3 className="detalles-titulo-seccion">Detalles del Evento</h3>
        <div className="detalles-lista">
          <FilaDetalle
            icono={<Calendar size={22} />}
            titulo="Fecha"
            valor={formatearFecha(fechaEvento)}
            retraso={0.1}
          />
          <FilaDetalle
            icono={<Clock size={22} />}
            titulo="Inicio"
            valor={<FormulaMath math={formulaInicio} />}
            retraso={0.2}
          />
          <FilaDetalle
            icono={<Hourglass size={22} />}
            titulo="Duración"
            valor={<FormulaMath math={formulaDuracion} />}
            retraso={0.3}
          />
          <FilaDetalle
            icono={<MapPin size={22} />}
            titulo="Lugar"
            valor={`${nombreLugar}\n${direccion}`}
            retraso={0.4}
          />
        </div>
      </section>
    </AnimacionEntrada>
  )
}
