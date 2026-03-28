import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface AnimacionEntradaProps {
  children: ReactNode
  retraso?: number
  direccion?: 'arriba' | 'abajo' | 'izquierda' | 'derecha'
}

const desplazamientos = {
  arriba: { y: 60, x: 0 },
  abajo: { y: -60, x: 0 },
  izquierda: { x: -60, y: 0 },
  derecha: { x: 60, y: 0 },
}

export const AnimacionEntrada = ({
  children,
  retraso = 0,
  direccion = 'arriba',
}: AnimacionEntradaProps) => {
  const offset = desplazamientos[direccion]

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(8px)', ...offset }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }}
      transition={{
        duration: 0.8,
        delay: retraso,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {children}
    </motion.div>
  )
}
