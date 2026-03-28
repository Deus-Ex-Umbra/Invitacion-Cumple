import { configuracion } from '../configuracion/datos-invitacion'
import { ProveedorTema } from '../contextos/contexto-tema'
import { TarjetaPrincipal } from '../componentes/invitacion/TarjetaPrincipal'
import { DetallesEvento } from '../componentes/invitacion/DetallesEvento'
import { SeccionMapa } from '../componentes/invitacion/SeccionMapa'
import { ConfirmacionAsistencia } from '../componentes/invitacion/ConfirmacionAsistencia'
import { ParticulasAnimadas } from '../componentes/compartidos/ParticulasAnimadas'

export const Invitacion = () => {
  const c = configuracion

  return (
    <ProveedorTema tema={c.tema}>
      <main className="invitacion-pagina">
        {c.mostrarConfeti && <ParticulasAnimadas />}

        <TarjetaPrincipal
          nombreCumpleanero={c.nombreCumpleanero}
          edadCumplir={c.edadCumplir}
          edadFormula={c.edadFormula}
          fotoCumpleanero={c.fotoCumpleanero}
          mensajePersonalizado={c.mensajePersonalizado}
        />

        <DetallesEvento
          fechaEvento={c.fechaEvento}
          horaInicio={c.horaInicio}
          horaFin={c.horaFin}
          nombreLugar={c.nombreLugar}
          direccion={c.direccion}
          formulaDuracion={c.formulaDuracion}
          formulaInicio={c.formulaInicio}
        />

        {c.mostrarMapa && (
          <SeccionMapa
            coordenadas={c.coordenadas}
            enlaceGoogleMaps={c.enlaceGoogleMaps}
            nombreLugar={c.nombreLugar}
            direccion={c.direccion}
          />
        )}

        {c.mostrarConfirmacion && (
          <ConfirmacionAsistencia
            textoBoton={c.textoBotonConfirmar}
            enlaceConfirmacion={c.enlaceConfirmacion}
          />
        )}

        <footer className="invitacion-footer">
          <p>Con mucho cariño ❤️</p>
        </footer>
      </main>
    </ProveedorTema>
  )
}
