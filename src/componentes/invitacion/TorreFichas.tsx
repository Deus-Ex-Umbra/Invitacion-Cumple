import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export const TorreFichas = () => {
  const [paso, setPaso] = useState(0)

  // 0: Separadas (2 pequeñas torres)
  // 1: Elevándose y juntándose
  // 2: Torre única formada
  useEffect(() => {
    const intervalo = setInterval(() => {
      setPaso((prev) => (prev + 1) % 3)
    }, 1500)
    return () => clearInterval(intervalo)
  }, [])

  // Chips: 8 fichas en total
  // Pares van a la izquierda, impares a la derecha al inicio
  const obtenerVariante = (indice: number) => {
    const esDerecha = indice % 2 !== 0
    const indiceEnSubtorre = Math.floor(indice / 2) // 0, 1, 2, 3
    const alturaApilada = indice * -8 // Distancia apilada total
    const alturaSubtorre = indiceEnSubtorre * -8

    if (paso === 0) {
      // 2 torres separadas
      return {
        x: esDerecha ? 40 : -40,
        y: alturaSubtorre + 20,
        rotate: 0,
        transition: { type: 'spring' as const, stiffness: 120, damping: 14 }
      }
    } else if (paso === 1) {
      // En el aire juntándose
      return {
        x: esDerecha ? 15 : -15,
        y: alturaApilada - 30, // Un salto hacia arriba
        rotate: esDerecha ? -5 : 5,
        transition: { type: 'spring' as const, stiffness: 120, damping: 14, delay: indice * 0.05 }
      }
    } else {
      // Apiladas juntas en el centro
      return {
        x: 0,
        y: alturaApilada,
        rotate: 0,
        transition: { type: 'spring' as const, stiffness: 200, damping: 20, delay: indice * 0.02 }
      }
    }
  }

  const rendersFichas = Array.from({ length: 8 }).map((_, i) => {
    const esRoja = i % 2 === 0
    return (
      <motion.div
        key={i}
        className={`ficha-borde ficha-poker-3d ${esRoja ? 'ficha-roja' : 'ficha-negra'}`}
        style={{ zIndex: i }}
        initial={obtenerVariante(i)}
        animate={obtenerVariante(i)}
      >
        <div className="ficha-centro">
          {i % 4 === 0 ? '♠' : i % 4 === 1 ? '♥' : i % 4 === 2 ? '♣' : '♦'}
        </div>
      </motion.div>
    )
  })

  return (
    <div className="torre-fichas-contenedor">
      {rendersFichas}
    </div>
  )
}
