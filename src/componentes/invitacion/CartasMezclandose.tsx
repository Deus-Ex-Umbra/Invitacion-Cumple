import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export const CartasMezclandose = () => {
  const [pasoAnimacion, setPasoAnimacion] = useState(0)

  // Carta Ghost: diseño elegante, blanca y negra
  // Carta Estándar: Reverso rojo/azul y cara normal
  useEffect(() => {
    const intervalo = setInterval(() => {
      setPasoAnimacion((prev) => (prev + 1) % 4) // Ciclo de 4 posiciones
    }, 1000)
    return () => clearInterval(intervalo)
  }, [])

  const obtenerVariante = (indice: number) => {
    // Calculamos una posición basada en el índice y el paso iterativo
    const pos = (indice + pasoAnimacion) % 3
    if (pos === 0) {
      return { x: -40, y: 10, rotate: -15, zIndex: 3, scale: 1 }
    } else if (pos === 1) {
      return { x: 0, y: -10, rotate: 0, zIndex: 1, scale: 1.1 }
    } else {
      return { x: 40, y: 10, rotate: 15, zIndex: 2, scale: 1 }
    }
  }

  return (
    <div className="cartas-mezclandose-contenedor">
      {/* Carta 1: Ghost As de Picas */}
      <motion.div
        className="carta-poker carta-ghost"
        animate={obtenerVariante(0)}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="esquina-sup">
          A<br />♠
        </div>
        <div className="centro ace-picas">♠</div>
        <div className="esquina-inf">
          A<br />♠
        </div>
      </motion.div>

      {/* Carta 2: Estándar Rey de Corazones */}
      <motion.div
        className="carta-poker carta-estandar"
        animate={obtenerVariante(1)}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="esquina-sup rojo">
          K<br />♥
        </div>
        <div className="centro rojo">♥</div>
        <div className="esquina-inf rojo">
          K<br />♥
        </div>
      </motion.div>

      {/* Carta 3: Estándar Reina de Diamantes */}
      <motion.div
        className="carta-poker carta-estandar"
        animate={obtenerVariante(2)}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="esquina-sup rojo">
          Q<br />♦
        </div>
        <div className="centro rojo">♦</div>
        <div className="esquina-inf rojo">
          Q<br />♦
        </div>
      </motion.div>

      {/* Fichas de Póker flotando alrededor */}
      <motion.div className="ficha-borde ficha-poker ficha-roja" style={{ top: '-10px', left: '-50px' }} animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
        <div className="ficha-centro">♠</div>
      </motion.div>
      <motion.div className="ficha-borde ficha-poker ficha-negra" style={{ top: '40px', right: '-60px' }} animate={{ y: [0, 10, 0], rotate: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: 0.5 }}>
        <div className="ficha-centro">♥</div>
      </motion.div>
      <motion.div className="ficha-borde ficha-poker ficha-roja" style={{ bottom: '-20px', left: '10px' }} animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}>
        <div className="ficha-centro">♣</div>
      </motion.div>
      <motion.div className="ficha-borde ficha-poker ficha-negra" style={{ bottom: '10px', right: '-20px' }} animate={{ y: [0, 12, 0], rotate: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 1.5 }}>
        <div className="ficha-centro">♦</div>
      </motion.div>
    </div>
  )
}
