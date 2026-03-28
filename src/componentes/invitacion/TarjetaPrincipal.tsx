import { motion } from 'motion/react'
import { FormulaMath } from '../compartidos/FormulaMath'
import { AnimacionEntrada } from './AnimacionEntrada'
import { TorreFichas } from './TorreFichas'
import { CartasMezclandose } from './CartasMezclandose'

interface TarjetaPrincipalProps {
  nombreCumpleanero: string
  edadCumplir: number
  edadFormula: string
  fotoCumpleanero: string
  mensajePersonalizado: string
}

export const TarjetaPrincipal = ({
  nombreCumpleanero,
  edadFormula,
  mensajePersonalizado,
}: TarjetaPrincipalProps) => {
  return (
    <section className="tarjeta-principal-seccion">
      <AnimacionEntrada retraso={0.2}>
        <motion.div
          className="tarjeta-principal"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="tarjeta-brillo" />

          <div className="tarjeta-icono-superior">
            <CartasMezclandose />
          </div>

          <motion.p
            className="tarjeta-subtitulo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Estás invitado/a a celebrar
          </motion.p>

          <motion.h1
            className="tarjeta-titulo"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
          >
            ¡Mi cumpleaños!
          </motion.h1>

          <motion.div
            className="tarjeta-formula katex-contenedor"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <FormulaMath math={edadFormula} />
          </motion.div>

          <div className="tarjeta-foto-contenedor">
            <motion.div
              className="torre-fichas-wrapper"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.1, type: 'spring', stiffness: 150 }}
            >
              <TorreFichas />
            </motion.div>
          </div>

          <AnimacionEntrada retraso={1.3}>
            <h2 className="tarjeta-nombre">{nombreCumpleanero}</h2>
          </AnimacionEntrada>

          <AnimacionEntrada retraso={1.5}>
            <p className="tarjeta-mensaje">{mensajePersonalizado}</p>
          </AnimacionEntrada>

        </motion.div>
      </AnimacionEntrada>
    </section>
  )
}
