import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { ExternalLink, Navigation } from 'lucide-react'
import { motion } from 'motion/react'
import { AnimacionEntrada } from './AnimacionEntrada'
import type { Coordenadas } from '../../tipos/invitacion'
import 'leaflet/dist/leaflet.css'

const iconoMarcador = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface SeccionMapaProps {
  coordenadas: Coordenadas
  enlaceGoogleMaps: string
  nombreLugar: string
  direccion: string
}

export const SeccionMapa = ({
  coordenadas,
  enlaceGoogleMaps,
  nombreLugar,
  direccion,
}: SeccionMapaProps) => {
  const mapaRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (mapaRef.current) {
      setTimeout(() => mapaRef.current?.invalidateSize(), 300)
    }
  }, [])

  const posicion: [number, number] = [coordenadas.latitud, coordenadas.longitud]

  return (
    <AnimacionEntrada retraso={0.2}>
      <section className="seccion-mapa-bg">
        <h3 className="mapa-titulo">
          <Navigation size={20} />
          Ubicación
        </h3>

        <div className="mapa-contenedor">
          <MapContainer
            center={posicion}
            zoom={16}
            scrollWheelZoom={false}
            className="mapa-leaflet"
            ref={mapaRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={posicion} icon={iconoMarcador}>
              <Popup>
                <strong>{nombreLugar}</strong>
                <br />
                {direccion}
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="mapa-info">
          <p className="mapa-direccion">
            <strong>{nombreLugar}</strong>
            <br />
            {direccion}
          </p>
          <motion.a
            href={enlaceGoogleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="mapa-boton-google"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={18} />
            Abrir en Google Maps
          </motion.a>
        </div>
      </section>
    </AnimacionEntrada>
  )
}
