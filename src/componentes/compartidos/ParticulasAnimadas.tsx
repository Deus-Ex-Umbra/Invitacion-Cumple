import { useEffect, useRef, useCallback } from 'react'

interface CartaPoker {
  x: number
  y: number
  ancho: number
  alto: number
  velocidadX: number
  velocidadY: number
  rotacion: number
  velocidadRotacion: number
  opacidad: number
  palo: string
  valor: string
  esRojo: boolean
  oscilacionFase: number
  oscilacionAmplitud: number
}

const PALOS = ['♠', '♥', '♦', '♣']
const VALORES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

export const ParticulasAnimadas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cartasRef = useRef<CartaPoker[]>([])
  const animacionRef = useRef<number>(0)

  const crearCarta = useCallback((ancho: number, altoInicial?: number): CartaPoker => {
    const palo = PALOS[Math.floor(Math.random() * PALOS.length)]
    // Solo los pequeños corazones y diamantes de las esquinas serán rojos
    const esRojo = palo === '♥' || palo === '♦'
    return {
      x: Math.random() * ancho,
      y: altoInicial !== undefined ? Math.random() * altoInicial : -200,
      ancho: Math.random() * 80 + 120, // Mucho más grandes (120 a 200px de ancho)
      alto: 0,
      velocidadX: (Math.random() - 0.5) * 0.8,
      velocidadY: Math.random() * 1.2 + 0.5, // Caen un poco más rápido por ser más grandes
      rotacion: Math.random() * 360,
      velocidadRotacion: (Math.random() - 0.5) * 0.8, // Rotación ligeramente más lenta
      opacidad: Math.random() * 0.3 + 0.15, // Más opacas para verse mejor
      palo,
      valor: VALORES[Math.floor(Math.random() * VALORES.length)],
      esRojo,
      oscilacionFase: Math.random() * Math.PI * 2,
      oscilacionAmplitud: Math.random() * 40 + 20,
    }
  }, [])

  const dibujarCarta = (ctx: CanvasRenderingContext2D, carta: CartaPoker, tiempo: number) => {
    ctx.save()

    const oscilacion = Math.sin(tiempo * 0.0006 + carta.oscilacionFase) * carta.oscilacionAmplitud * 0.015
    ctx.translate(carta.x + oscilacion * carta.ancho, carta.y)
    ctx.rotate((carta.rotacion * Math.PI) / 180)
    ctx.globalAlpha = carta.opacidad

    const w = carta.ancho
    const h = w * 1.45
    carta.alto = h
    const radio = w * 0.06

    // Fondo blanco puro de la carta
    ctx.fillStyle = '#FFFFFF'
    ctx.shadowColor = 'rgba(0,0,0,0.6)' // Sombra más dura y notoria
    ctx.shadowBlur = 20
    ctx.shadowOffsetX = 5
    ctx.shadowOffsetY = 8
    
    ctx.beginPath()
    ctx.moveTo(-w / 2 + radio, -h / 2)
    ctx.lineTo(w / 2 - radio, -h / 2)
    ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + radio)
    ctx.lineTo(w / 2, h / 2 - radio)
    ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - radio, h / 2)
    ctx.lineTo(-w / 2 + radio, h / 2)
    ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - radio)
    ctx.lineTo(-w / 2, -h / 2 + radio)
    ctx.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + radio, -h / 2)
    ctx.closePath()
    ctx.fill()

    ctx.shadowColor = 'transparent'
    ctx.strokeStyle = 'rgba(50,50,50,0.4)'
    ctx.lineWidth = 1
    ctx.stroke()

    // --- Estilo Bicycle Ghost ---
    
    // 1. Esquina Superior Izquierda
    ctx.fillStyle = '#1A1A1A' // El número SIEMPRE es negro
    ctx.font = `bold ${w * 0.28}px 'Inter', 'Arial', sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText(carta.valor, -w / 2 + w * 0.15, -h / 2 + h * 0.06)

    // El palito de la esquina es rojo SOLO si es corazón o diamante
    ctx.fillStyle = carta.esRojo ? '#990000' : '#1A1A1A' 
    ctx.font = `${w * 0.22}px serif`
    ctx.fillText(carta.palo, -w / 2 + w * 0.15, -h / 2 + h * 0.06 + w * 0.28)

    // 2. Centro de la carta (SIEMPRE NEGRO)
    ctx.fillStyle = '#1A1A1A'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    // Hacemos el As de picas un poco más grande si toca, como en las barajas reales
    const esAsPicas = carta.palo === '♠' && carta.valor === 'A'
    const tamanoCentro = esAsPicas ? w * 0.8 : w * 0.65
    const offsetCentroY = esAsPicas ? h * 0.02 : h * 0.05
    
    ctx.font = `${tamanoCentro}px serif`
    ctx.fillText(carta.palo, 0, offsetCentroY)

    // 3. Esquina Inferior Derecha (Rotada 180)
    ctx.save()
    ctx.rotate(Math.PI)
    
    ctx.fillStyle = '#1A1A1A' // Número negro
    ctx.font = `bold ${w * 0.28}px 'Inter', 'Arial', sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText(carta.valor, -w / 2 + w * 0.15, -h / 2 + h * 0.06)
    
    ctx.fillStyle = carta.esRojo ? '#990000' : '#1A1A1A' // Palito rojo/negro
    ctx.font = `${w * 0.22}px serif`
    ctx.fillText(carta.palo, -w / 2 + w * 0.15, -h / 2 + h * 0.06 + w * 0.28)
    
    ctx.restore()

    ctx.restore()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const redimensionar = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    redimensionar()
    window.addEventListener('resize', redimensionar)

    // Menos cartas al mismo tiempo porque son gigantes
    for (let i = 0; i < 8; i++) {
      cartasRef.current.push(crearCarta(canvas.width, canvas.height))
    }

    const animar = (tiempo: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (cartasRef.current.length < 12 && Math.random() > 0.99) {
        cartasRef.current.push(crearCarta(canvas.width))
      }

      cartasRef.current = cartasRef.current.filter(carta => {
        carta.y += carta.velocidadY
        carta.x += carta.velocidadX + Math.sin(tiempo * 0.0005 + carta.oscilacionFase) * 0.3
        carta.rotacion += carta.velocidadRotacion

        if (carta.y > canvas.height + 250) return false

        dibujarCarta(ctx, carta, tiempo)
        return true
      })

      animacionRef.current = requestAnimationFrame(animar)
    }

    animacionRef.current = requestAnimationFrame(animar)

    return () => {
      cancelAnimationFrame(animacionRef.current)
      window.removeEventListener('resize', redimensionar)
    }
  }, [crearCarta])

  return (
    <canvas
      ref={canvasRef}
      className="particulas-canvas"
    />
  )
}
