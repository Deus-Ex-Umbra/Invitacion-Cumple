import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface FormulaMathProps {
  math: string;
}

export const FormulaMath = ({ math }: FormulaMathProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Limpiamos la fórmula para asegurar que múltiples barras invertidas
      // desde .env (ej. \\sum) se resuelvan como barras simples (\sum)
      const mathLimpio = math.replace(/\\\\/g, '\\');
      
      try {
        katex.render(mathLimpio, containerRef.current, {
          displayMode: true,
          throwOnError: false, // previene que la app crashee si hay error de sintaxis
          strict: false
        });
      } catch (e) {
        console.error("KaTeX render error:", e);
      }
    }
  }, [math]);

  return <div ref={containerRef} />;
};
