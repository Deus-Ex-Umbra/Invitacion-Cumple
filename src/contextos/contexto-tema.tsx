import { createContext, useContext, useEffect, type ReactNode } from 'react'
import type { TemaInvitacion } from '../tipos/invitacion'

interface ContextoTemaValor {
  tema: TemaInvitacion
}

const ContextoTema = createContext<ContextoTemaValor | null>(null)

export const usarTema = (): ContextoTemaValor => {
  const contexto = useContext(ContextoTema)
  if (!contexto) throw new Error('usarTema debe usarse dentro de ProveedorTema')
  return contexto
}

interface ProveedorTemaProps {
  tema: TemaInvitacion
  children: ReactNode
}

export const ProveedorTema = ({ tema, children }: ProveedorTemaProps) => {
  useEffect(() => {
    const raiz = document.documentElement
    raiz.style.setProperty('--color-primario', tema.colorPrimario)
    raiz.style.setProperty('--color-secundario', tema.colorSecundario)
    raiz.style.setProperty('--color-fondo', tema.colorFondo)
    raiz.style.setProperty('--color-texto', tema.colorTexto)
    raiz.style.setProperty('--color-acento', tema.colorAcento)
    raiz.style.setProperty('--fuente-titulo', tema.fuenteTitulo)
    raiz.style.setProperty('--fuente-cuerpo', tema.fuenteCuerpo)
  }, [tema])

  return (
    <ContextoTema.Provider value={{ tema }}>
      {children}
    </ContextoTema.Provider>
  )
}
