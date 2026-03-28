import { useState, useEffect } from 'react'

interface TiempoRestante {
  dias: number
  horas: number
  minutos: number
  segundos: number
  expirado: boolean
}

export const usarCuentaRegresiva = (fechaObjetivo: string): TiempoRestante => {
  const calcular = (): TiempoRestante => {
    const ahora = new Date().getTime()
    const objetivo = new Date(fechaObjetivo).getTime()
    const diferencia = objetivo - ahora

    if (diferencia <= 0) {
      return { dias: 0, horas: 0, minutos: 0, segundos: 0, expirado: true }
    }

    return {
      dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
      horas: Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutos: Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60)),
      segundos: Math.floor((diferencia % (1000 * 60)) / 1000),
      expirado: false,
    }
  }

  const [tiempo, setTiempo] = useState<TiempoRestante>(calcular)

  useEffect(() => {
    const intervalo = setInterval(() => setTiempo(calcular()), 1000)
    return () => clearInterval(intervalo)
  }, [fechaObjetivo])

  return tiempo
}
