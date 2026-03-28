export const formatearNumero = (n: number): string =>
  n.toString().padStart(2, '0')

export const generarColorTransparente = (hex: string, opacidad: number): string => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacidad})`
}
