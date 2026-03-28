import { FormulaMath } from './FormulaMath';

interface TextoInteligenteProps {
  texto: string;
}

export const TextoInteligente = ({ texto }: TextoInteligenteProps) => {
  if (!texto) return null;

  // Analizamos si el texto contiene comillas dobles al inicio y final
  // (por compatibilidad si el usuario agregó textos con comillas)
  let textoLimpio = texto.trim();
  if (textoLimpio.startsWith('"') && textoLimpio.endsWith('"')) {
    textoLimpio = textoLimpio.substring(1, textoLimpio.length - 1);
  }

  // Detectamos caracteres usuales de matemáticas de LaTeX 
  // O bien que empiece directamente con un comando de backslash (\)
  const pareceMath = /\\\\?sum|\\\\?int|\\\\?frac|\\\\?lim|\\\\?text|[_^]|={2}/.test(textoLimpio) || 
                     textoLimpio.includes('\\\\') || 
                     textoLimpio.includes('\\');

  // Si a pesar de tener un backslash es algo simple que no requiere renderización matemática,
  // la lógica puede dejarse al criterio heurístico. Para este proyecto:
  if (pareceMath) {
    return <FormulaMath math={textoLimpio} />;
  }

  // De lo contrario, se renderiza de forma estándar con soporte de saltos de línea
  return (
    <span style={{ whiteSpace: 'pre-line' }}>
      {textoLimpio}
    </span>
  );
};
