import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, Images } from 'lucide-react'
import { AnimacionEntrada } from './AnimacionEntrada'
import type { FotoGaleria } from '../../tipos/invitacion'

interface GaleriaFotosProps {
  fotos: FotoGaleria[]
}

export const GaleriaFotos = ({ fotos }: GaleriaFotosProps) => {
  const [indiceActual, setIndiceActual] = useState(0)
  const [direccionSlide, setDireccionSlide] = useState(1)

  if (fotos.length === 0) return null

  const avanzar = () => {
    setDireccionSlide(1)
    setIndiceActual((prev) => (prev + 1) % fotos.length)
  }

  const retroceder = () => {
    setDireccionSlide(-1)
    setIndiceActual((prev) => (prev - 1 + fotos.length) % fotos.length)
  }

  return (
    <AnimacionEntrada retraso={0.2}>
      <section className="galeria-seccion">
        <h3 className="galeria-titulo">
          <Images size={20} />
          Galería
        </h3>

        <div className="galeria-carrusel">
          <AnimatePresence mode="popLayout" custom={direccionSlide}>
            <motion.div
              key={indiceActual}
              custom={direccionSlide}
              className="galeria-slide"
              initial={{ x: direccionSlide * 300, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: direccionSlide * -300, opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <img
                src={fotos[indiceActual].url}
                alt={fotos[indiceActual].descripcion}
                className="galeria-imagen"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `data:image/svg+xml,${encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
                      <rect fill="#1a1a2e" width="400" height="300"/>
                      <text fill="#8B5CF6" font-family="sans-serif" font-size="18" text-anchor="middle" x="200" y="150">📷 ${fotos[indiceActual].descripcion}</text>
                    </svg>`
                  )}`
                }}
              />
              <p className="galeria-descripcion">{fotos[indiceActual].descripcion}</p>
            </motion.div>
          </AnimatePresence>

          {fotos.length > 1 && (
            <>
              <motion.button
                className="galeria-boton galeria-boton-izq"
                onClick={retroceder}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button
                className="galeria-boton galeria-boton-der"
                onClick={avanzar}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </>
          )}
        </div>

        {fotos.length > 1 && (
          <div className="galeria-indicadores">
            {fotos.map((_, i) => (
              <motion.button
                key={i}
                className={`galeria-punto ${i === indiceActual ? 'activo' : ''}`}
                onClick={() => {
                  setDireccionSlide(i > indiceActual ? 1 : -1)
                  setIndiceActual(i)
                }}
                animate={{ scale: i === indiceActual ? 1.3 : 1 }}
              />
            ))}
          </div>
        )}
      </section>
    </AnimacionEntrada>
  )
}
