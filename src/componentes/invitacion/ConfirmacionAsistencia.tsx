import { motion } from 'motion/react'
import { Heart } from 'lucide-react'
import { AnimacionEntrada } from './AnimacionEntrada'

interface ConfirmacionAsistenciaProps {
  textoBoton: string
  enlaceConfirmacion: string
}

export const ConfirmacionAsistencia = ({
  textoBoton,
  enlaceConfirmacion,
}: ConfirmacionAsistenciaProps) => {
  return (
    <AnimacionEntrada retraso={0.3}>
      <section className="confirmacion-seccion">
        <motion.div
          className="confirmacion-contenedor"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
        >
          <Heart className="confirmacion-icono" size={28} />
          <p className="confirmacion-texto">
            Tu presencia hará este momento aún más especial
          </p>
          <motion.a
            href={enlaceConfirmacion}
            target="_blank"
            rel="noopener noreferrer"
            className="confirmacion-boton"
            whileHover={{
              scale: 1.08,
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            {textoBoton}
          </motion.a>
        </motion.div>
      </section>
    </AnimacionEntrada>
  )
}
