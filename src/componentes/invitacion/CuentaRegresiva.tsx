import { motion, AnimatePresence } from 'motion/react'
import { usarCuentaRegresiva } from '../../hooks/usar-cuenta-regresiva'
import { formatearNumero } from '../../lib/utilidades'
import { Clock } from 'lucide-react'
import { AnimacionEntrada } from './AnimacionEntrada'

interface CuentaRegresivaProps {
  fechaEvento: string
}

interface BloqueTiempoProps {
  valor: number
  etiqueta: string
  indice: number
}

const BloqueTiempo = ({ valor, etiqueta, indice }: BloqueTiempoProps) => (
  <motion.div
    className="cuenta-bloque"
    initial={{ scale: 0, rotateY: 90 }}
    animate={{ scale: 1, rotateY: 0 }}
    transition={{ delay: 0.2 * indice, type: 'spring', stiffness: 200 }}
  >
    <div className="cuenta-numero-contenedor">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={valor}
          className="cuenta-numero"
          initial={{ y: -30, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: 30, opacity: 0, filter: 'blur(4px)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {formatearNumero(valor)}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="cuenta-etiqueta">{etiqueta}</span>
  </motion.div>
)

export const CuentaRegresiva = ({ fechaEvento }: CuentaRegresivaProps) => {
  const { dias, horas, minutos, segundos, expirado } = usarCuentaRegresiva(fechaEvento)

  if (expirado) {
    return (
      <AnimacionEntrada>
        <div className="cuenta-expirada">
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎉 ¡La fiesta ya comenzó! 🎉
          </motion.p>
        </div>
      </AnimacionEntrada>
    )
  }

  const bloques = [
    { valor: dias, etiqueta: 'Días' },
    { valor: horas, etiqueta: 'Horas' },
    { valor: minutos, etiqueta: 'Minutos' },
    { valor: segundos, etiqueta: 'Segundos' },
  ]

  return (
    <AnimacionEntrada retraso={0.3}>
      <section className="cuenta-seccion">
        <div className="cuenta-encabezado">
          <Clock size={20} />
          <h3>Faltan</h3>
        </div>
        <div className="cuenta-bloques">
          {bloques.map((b, i) => (
            <BloqueTiempo key={b.etiqueta} valor={b.valor} etiqueta={b.etiqueta} indice={i} />
          ))}
        </div>
      </section>
    </AnimacionEntrada>
  )
}
