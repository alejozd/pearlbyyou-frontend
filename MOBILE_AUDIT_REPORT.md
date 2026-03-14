# Reporte de Prioridades - Auditoría Mobile-First (Pearl by You)

## 1. Problemas Críticos de UX (Prioridad Alta)
- **Navegación (NavBar):** El área `end` de la barra de navegación (botones de redes sociales + WhatsApp) es muy ancha para pantallas de 320px-375px. Se solapa con el logo o fuerza un scroll horizontal innecesario.
- **Interacción con Productos:** Las flechas de navegación de la `Galleria` en `ProductCard` son pequeñas para el pulgar. Es necesario activar indicadores táctiles.
- **Touch Targets:** Varios botones (ej. botones sociales en el footer y navbar) no parecen alcanzar el estándar de 44x44px de área de clic.

## 2. Rendimiento y Carga (Prioridad Alta)
- **Code Splitting Incompleto:** Las rutas públicas (`Home`, `Catalogo`, `Sobre Nosotros`) se cargan en el bundle inicial, aumentando el tiempo de carga en redes 4G.
- **Carga de Imágenes:** Falta el atributo `loading="lazy"` en las imágenes del catálogo, lo que impacta el LCP (Largest Contentful Paint).
- **Bundle Size:** El bundle de PrimeReact puede optimizarse más mediante una mejor configuración de chunks en Vite.

## 3. Experiencia en el Panel de Administración (Prioridad Media)
- **Formularios:** El teclado del móvil puede ocultar el botón de "Guardar" o los campos activos en `AdminProductForm`.
- **Login:** El diseño del login es muy vertical; en pantallas pequeñas con el teclado abierto, el usuario pierde el contexto.

## 4. Sugerencias de Optimización PrimeReact
- **Galleria:** Cambiar navegadores por indicadores en móvil.
- **Carousel:** Ajustar `responsiveOptions` para pantallas de 320px.
- **Inputs:** Asegurar que `p-inputtext` y `p-button` tengan el padding adecuado para móviles.

## 5. Resumen de Refactorización Realizada

- **Rendimiento:** Implementación de `React.lazy` y `Suspense` para todas las rutas. Configuración de `manualChunks` en Vite para optimizar la carga de PrimeReact.
- **UX Móvil:** Reducción de escala de logo y simplificación de textos en `NavBar` (cambio de "WhatsApp" a "Chat").
- **Interactividad:** Mejora de `Galleria` con indicadores (puntos) táctiles y auto-reproducción.
- **Accesibilidad:** Incremento de áreas de clic a un mínimo de 44px mediante CSS global.
- **Administración:** Formularios con inputs grandes y botones apilados para evitar errores de dedo.

## 6. Checklist de Pruebas (Manual & Mobile Mode)

Para validar estos cambios, se recomienda realizar las siguientes pruebas en el navegador (Chrome DevTools > Toggle Device Toolbar):

- [ ] **Home:** Verificar que el logo no empuje los iconos de redes sociales fuera de la pantalla.
- [ ] **Home:** Probar el slider de productos (Carousel) deslizando con el dedo (o mouse emulando touch).
- [ ] **Catálogo:** Verificar que las imágenes de los bolsos carguen de forma diferida (Lazy Loading) al hacer scroll.
- [ ] **Producto (Galleria):** Confirmar que se puede cambiar de imagen tocando los indicadores inferiores (puntos) en lugar de flechas pequeñas.
- [ ] **Navegación:** Asegurarse de que el botón de WhatsApp (ahora "Chat") sea fácil de clickear con el pulgar derecho.
- [ ] **Admin:** Entrar al formulario de productos y verificar que el botón "Guardar" y "Cancelar" se vean uno sobre otro y no cortados.
- [ ] **Rendimiento:** Abrir la pestaña *Network*, poner límite "Fast 3G" y verificar que la carga inicial sea rápida gracias al Code Splitting.
