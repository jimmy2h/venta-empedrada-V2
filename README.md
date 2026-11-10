# Venta Empedrada V2 · Despensa de Finca en Almería

Aplicación web **React + Vite** para la tienda online de **Finca La Venta Empedrada** (aceite de oliva virgen extra Picual, miel de romero, almendra Marcona y la caja regalo *La Mesa de la Venta*).

La versión **V2** adopta la arquitectura editorial de escaparate (cabecera de doble fila con buscador, héroe atmosférico, foco de producto icónico, mosaico asimétrico *bento*, recomendaciones de catálogo filtrables en 4 columnas, franja de novedades y pie estructurado) manteniendo al 100 % la identidad, paleta (*Olivo*, *Caliza*, *Miel* y *Barro*), tipografías y textos propios de **Venta Empedrada**.

---

## Vista online para el equipo

- **Web interactiva (GitHub Pages):** https://jimmy2h.github.io/venta-empedrada-V2/
- **Código fuente en GitHub:** https://github.com/jimmy2h/venta-empedrada-V2

---

## Secciones navegables de la página

1. **Cabecera fija con doble nivel (`SiteHeader`)**: buscador en tiempo real por variedad o código de lote, selector de categorías (*Toda la despensa*, *Aceites*, *Mieles*, *Frutos secos*, *Cajas Regalo*), enlace al **Sistema de marca** y botón de cesta con subtotal actualizado.
2. **Héroe de portada (`#inicio`)**: fotografía de la finca al amanecer y accesos directos a la historia del origen y al catálogo.
3. **Foco de producto icónico**: escaparate destacado del AOVE Picual *El Olivar* con nota de cata y añadido directo.
4. **Mosaico asimétrico (`BentoMosaicSection`)**: acceso visual a los tres parajes de la finca, historia, caja regalo y trazabilidad.
5. **Nuestra recomendación y despensa (`#recomendamos`)**: cuadrícula filtrable con tarjetas de producto, precios por unidad/medida, selector de cesta y diálogo modal detallado con trazabilidad por lote.
6. **Caja regalo *La Mesa de la Venta* (`#la-mesa-de-la-venta`)**: personalización opcional con envoltorio y dedicatoria para anfitriones.
7. **Relato de la finca (`#finca`)**: historia en tres capítulos (*Camino de piedra*, *Recuperación de bancales*, *La mesa abierta*) + infografía de colección y cuatro pilares de marca.
8. **Origen, ecología y trazabilidad (`#practicas`)**: prácticas regenerativas, protección de vidrio y seguimiento de cosecha.
9. **Hazles un sitio en tu mesa (`#ideas-mesa`)**: sugerencias reales de consumo cotidiano para desayuno, mediodía y aperitivo.
10. **Novedades y pie de página (`#contacto`)**: formulario accesible de suscripción a cosechas y pie de 4 columnas.
11. **Vista independiente · Sistema de marca**: botón **«Sistema de marca»** en la barra superior que abre el manual vivo interactivo (lámina de identidad, contraste WCAG de paleta, jerarquía envase-web y reglas tipográficas).

---

## Ejecución en local

```bash
npm install
npm run dev
```

Comandos adicionales de verificación:

```bash
npm run lint
npm run build
npm run preview
```

