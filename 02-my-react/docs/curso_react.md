# Índice del curso React

## Completado

1. [¿Qué es React?](#que-es-react)
2. [Primeros pasos en React](#primeros-pasos-en-react)
3. [JSX: La sintaxis de React](#jsx-la-sintaxis-de-react)
4. [Componentes en React](#componentes-en-react)
5. [Componentes vs Funciones normales](#componentes-vs-funciones-normales)
6. [Creando JobCard: Nuestro primer componente real](#creando-jobcard-componente-real)
7. [Eventos en React](#eventos-en-react)
8. [Estado con useState](#estado-con-usestate)
9. [Renderizado y Virtual DOM](#renderizado-y-virtual-dom)
10. [Vite: Empaquetador moderno](#vite-empaquetador-moderno)
11. [Instalación de Vite](#instalacion-de-vite)
12. [Fast Refresh y Actualizaciones de Estado](#fast-refresh)
13. [Migrando el Proyecto DevJobs a React](#migrando-devjobs)
14. [Creando el Componente JobCard](#creando-componente-jobcard)
15. [Props - Comunicación entre Componentes](#props-comunicacion)
16. [Módulos JavaScript - Import y Export](#modulos-javascript)
17. [Paginación - Props y Comunicación Padre-Hijo](#paginacion-props)
18. [Callbacks - Pasar Funciones como Props](#callbacks)
19. [Estado por Props - Lifting State Up](#lifting-state-up)
20. [Keys y Renderizado de Listas](#keys-listas)
21. [Terminando la paginación](#terminando-paginacion)
22. [CSS Modules](#css-modules)
23. [Hook useId()](#hook-useid)
24. [Gestión de Formularios y Filtros](#formularios-filtros)
25. [Ejercicios: Formularios y Eventos](#ejercicios-formularios)

---

## Próximamente
*(temas planificados, contenido aún no escrito)*

26. Filtros automáticos y Routing básico
27. Hook useEffect: Efectos secundarios en React
28. Cuándo usar useEffect
29. Creando una Single Page Application (SPA) desde cero con React
30. Custom Hooks: Reutilizar lógica en React
31. Integrando navegación con formulario de búsqueda
32. Creando un componente <Route> declarativo
33. Creando custom hook para formulario
34. 9 Ejercicios prácticos: Router y Formularios
35. Llamada a la API: Consumiendo datos reales con fetch
36. Integrando filtros en la petición HTTP
37. Arreglando paginación con limit y offset
38. Ejercicios: Mejoras en la aplicación
39. Problemas con la etiqueta title
40. Técnica de debounce en el buscador
41. Hook useRef: referencias y valores que persisten entre renders
42. Arreglando la paginación
43. Sincronización de la URL con el buscador

---


---
<a id="que-es-react"></a>
¿Qué es React?

Hasta ahora hemos trabajado con HTML, CSS y JavaScript puro (también conocido como “Vanilla JavaScript”) para construir nuestra aplicación DevJobs. Esto está genial para proyectos pequeños, pero cuando las aplicaciones crecen, manipular el DOM manualmente se vuelve complejo y difícil de mantener.

React es una biblioteca de JavaScript creada por Facebook (Meta) en 2013 que nos ayuda a construir interfaces de usuario de forma más sencilla, organizada y eficiente.
Analogía: React como un constructor de LEGO

Imagina que estás construyendo una ciudad con piezas de LEGO:

    Sin React (JavaScript puro): Cada vez que quieres una casa, tienes que colocar ladrillo por ladrillo, ventana por ventana, puerta por puerta.
    Con React: Creas un “molde” de casa una vez. Luego solo dices “quiero 10 casas aquí” y React las construye automáticamente.

Eso es exactamente lo que React hace con tu UI: te permite crear componentes reutilizables (moldes) que puedes usar una y otra vez.
¿Por qué migrar DevJobs a React?

Miremos nuestro código actual de DevJobs. Tenemos:

    ✅ Listado de empleos cargados desde JSON
    ✅ Filtros por ubicación
    ✅ Botones “Aplicar” con estado
    ✅ Renderizado dinámico con fetch

Pero conforme crece, nos encontraremos con problemas:
1. Código repetitivo y difícil de mantener

// fetch-data.js - Creamos elementos manualmente
jobs.forEach((job) => {
  const article = document.createElement('article')
  article.className = 'job-listing-card'
  article.innerHTML = `<div>
      <h3>${job.titulo}</h3>
      <small>${job.empresa} | ${job.ubicacion}</small>
      <p>${job.descripcion}</p>
    </div>
    <button class="button-apply-job">Aplicar</button>`
  container.appendChild(article)
})
        
          
        
        
        
      

Cada vez que queremos mostrar un empleo, tenemos que crear manualmente el elemento, asignar clases, construir el HTML y añadirlo al DOM. Si queremos cambiar algo, tenemos que buscarlo en todo el código.
2. Gestión manual del estado

// apply-button.js - Actualizamos el DOM manualmente
element.textContent = '¡Aplicado!'
element.classList.add('is-applied')
element.disabled = true
        
          
        
        
        
      

Tenemos que buscar el elemento en el DOM, cambiar su texto, añadir clases y modificar propiedades. Si el estado cambia en varios lugares, se vuelve un caos mantener todo sincronizado.
3. Sincronización compleja

// filters.js - Tenemos que buscar y actualizar elementos manualmente
jobs.forEach((job) => {
  const modalidad = job.getAttribute('data-modalidad')
  const isShown = selectedValue === '' || selectedValue === modalidad
  job.classList.toggle('is-hidden', isShown === false)
})
        
          
        
        
        
      

Cuando filtramos, tenemos que iterar sobre todos los elementos del DOM, leer atributos y actualizar clases. Es propenso a errores y lento.
Con React, todo esto se simplifica

Ventajas de React:

    ✅ Declarativo: Describes QUÉ quieres mostrar, no CÓMO hacerlo
    ✅ Componentes reutilizables: Escribe una vez, usa en cualquier lugar
    ✅ Virtual DOM: React actualiza solo lo que cambia (súper rápido)
    ✅ Estado reactivo: Los datos y la UI se mantienen sincronizados automáticamente
    ✅ Ecosistema enorme: Miles de librerías y herramientas disponibles
    ✅ Comunidad gigante: Usado por Facebook, Instagram, Netflix, Airbnb, etc.

Comparación práctica

JavaScript puro:

// Manipulamos el DOM manualmente
const button = document.querySelector('.button-apply-job')
button.addEventListener('click', () => {
  button.textContent = '¡Aplicado!'
  button.classList.add('is-applied')
  button.disabled = true
})
        
          
        
        
        
      

React:

// Declaramos lo que queremos mostrar
function ApplyButton() {
  const [applied, setApplied] = useState(false)

  return (
    <button
      onClick={() => setApplied(true)}
      disabled={applied}
      className={applied ? 'is-applied' : ''}
    >
      {applied ? '¡Aplicado!' : 'Aplicar'}
    </button>
  )
}
        
          
        
        
        
      

¿Ves la diferencia?

    ❌ JavaScript puro: Manipulas el DOM manualmente (createElement, innerHTML, appendChild, querySelector)
    ✅ React: Declaras lo que quieres mostrar según el estado, React se encarga del resto

¿Qué aprenderemos en este módulo?

En las próximas clases, vamos a:

    Configurar un proyecto React desde cero
    Crear componentes para cada parte de nuestra aplicación
    Migrar DevJobs de JavaScript vanilla a React
    Gestionar el estado de forma reactiva
    Trabajar con props para comunicar componentes
    Manejar eventos de forma declarativa

Al final de este módulo, tendrás DevJobs completamente funcional en React, con un código más limpio, mantenible y escalable.
React no es un framework, es una biblioteca

Es importante aclarar que React se define como una biblioteca (library), no como un framework:

    Biblioteca: Te da herramientas específicas para resolver problemas concretos (en este caso, construir interfaces)
    Framework: Te da una estructura completa con reglas estrictas sobre cómo organizar todo tu código

React solo se enfoca en la capa de vista (la UI). Para otras cosas como:

    Enrutamiento (navegación entre páginas)
    Gestión de estado global
    Peticiones HTTP
    Animaciones

…necesitarás otras bibliotecas que puedes elegir según tus necesidades. Esto te da flexibilidad, aunque también requiere tomar decisiones.
¿Por qué React es tan popular?

React es la biblioteca más usada para crear interfaces web. Algunas razones:

    🚀 Curva de aprendizaje suave - Si sabes JavaScript, aprender React es natural
    🔄 Reutilización de código - Los componentes se pueden usar en múltiples proyectos
    ⚡ Rendimiento excelente - El Virtual DOM hace actualizaciones súper eficientes
    📱 React Native - Puedes crear apps móviles nativas con el mismo código
    💼 Oportunidades laborales - La mayoría de empresas buscan desarrolladores React
    📚 Documentación excelente - Bien documentado y fácil de aprender
    🛠️ Herramientas increíbles - DevTools, Create React App, Next.js, etc.

React no es la única opción

Aunque React es el más popular, no es la única opción disponible. Existen otras alternativas igual de interesantes como:

    Vue.js - Framework progresivo muy fácil de aprender, popular en Europa
    Angular - Framework completo de Google, usado en grandes empresas
    preact - Biblioteca reactiva ultra ligera con sintaxis similar a React
    Svelte - Compilador moderno que genera código muy optimizado
    Solid.js - Biblioteca reactiva ultra rápida con sintaxis similar a React

Todas son excelentes opciones. En este curso usaremos React porque tiene mucha demanda laboral, una comunidad muy grande y un ecosistema muy maduro, lo que facilita el aprendizaje y la resolución de problemas.

    💡 Una vez domines React, aprender Vue, Svelte u otros frameworks será mucho más fácil porque todos comparten conceptos fundamentales: componentes, estado, props, reactividad, etc.

Empecemos con React

En esta clase vamos a migrar DevJobs paso a paso de JavaScript vanilla a React. Verás cómo cada problema que teníamos se resuelve de forma más elegante y simple.

¡Prepárate para ver el poder de React en acción!
---
<a id="primeros-pasos-en-react"></a>
Primeros pasos en React

En esta clase vamos a crear nuestra primera aplicación React desde cero. Por defecto, React recomienda instalar un framework para crear proyectos, pero nosotros vamos a hacerlo desde cero, paso a paso y de forma incremental.
Creando nuestro primer archivo React

Crea un nuevo archivo react.html en la carpeta de nuestro proyecto:

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>

  <body>
    <!-- Aquí React renderizará nuestra aplicación -->
    <div id="root"></div>

    <!-- Cargar React y ReactDOM desde CDN -->
    <script type="module">
      import React from 'https://esm.sh/react?dev'
      import ReactDOM from 'https://esm.sh/react-dom/client?dev'

      // Crear un elemento h1 con React.createElement
      const titulo = React.createElement(
        'h1', // Tipo de elemento
        { style: { color: '#09f' } }, // Props (atributos)
        '¡Hola React!' // Contenido (children)
      )

      // Renderizar en el DOM
      const rootEl = document.querySelector('#root')
      const root = ReactDOMClient.createRoot(rootEl)
      root.render(titulo)
    </script>
  </body>
</html>
        
          
        
        
        
      

Abre este archivo en tu navegador y verás un título azul que dice “¡Hola React!”.
¿Qué está pasando aquí?

Vamos a desglosar cada parte del código:
1. Importamos React desde un CDN

import React from 'https://esm.sh/react?dev'
import ReactDOM from 'https://esm.sh/react-dom/client?dev'
        
          
        
        
        
      

    Cargamos React y ReactDOM desde el CDN esm.sh
    react es la biblioteca principal con la lógica de componentes
    react-dom/client es el encargado de renderizar React en el navegador
    No necesitamos instalar nada, todo funciona directamente en el navegador
    El ?dev al final activa el modo desarrollo para mejores mensajes de error

    💡 Nota: Esto es solo para aprender. En proyectos reales usaremos herramientas como Vite o Next.js que gestionan esto automáticamente.

2. Creamos un elemento con React.createElement

const titulo = React.createElement(
  'h1', // ¿Qué elemento? (h1, div, p, etc.)
  { style: { color: '#09f' } }, // ¿Qué propiedades? (className, style, etc.)
  '¡Hola React!' // ¿Qué contenido?
)
        
          
        
        
        
      

Esta función tiene tres parámetros:

    Tipo de elemento - El tag HTML que queremos crear ('h1', 'div', 'button', etc.)
    Props (propiedades) - Un objeto con los atributos del elemento (className, style, onClick, etc.)
    Children (hijos) - El contenido del elemento (texto, otros elementos, etc.)

Ejemplo equivalente en HTML puro:

<h1 style="color: #09f">¡Hola React!</h1>
        
          
        
        
        
      

3. Lo renderizamos en el DOM

const rootEl = document.querySelector('#root')
const root = ReactDOMClient.createRoot(rootEl)
root.render(titulo)
        
          
        
        
        
      

    Seleccionamos el elemento con id="root" donde queremos renderizar
    Creamos un root de React con createRoot()
    Llamamos a render() para mostrar nuestro elemento React en el DOM

¿Por qué React.createElement es importante?

Nunca escribirás React.createElement a mano en el futuro, pero es fundamental entenderlo porque:

    🔍 Más adelante aprenderemos que JSX se convierte en createElement - El JSX es solo azúcar sintáctica
    🐛 Ayuda a debuguear errores - Entenderás mejor los mensajes de error
    🧠 Comprendes React más profundamente - Sabes qué pasa por debajo

Creando elementos más complejos

Ahora vamos a crear una estructura más elaborada. Añade este código después del anterior:

// Crear una tarjeta de empleo sin JSX
const tarjetaEmpleo = React.createElement(
  'article',
  { className: 'job-listing-card' },
  React.createElement('h3', null, 'Desarrollador Frontend'),
  React.createElement('small', null, 'TechCorp | Madrid'),
  React.createElement('p', null, 'Buscamos desarrollador con experiencia en React'),
  React.createElement('button', { className: 'button-apply-job' }, 'Aplicar')
)

// Renderizar la tarjeta
root.render(tarjetaEmpleo)
        
          
        
        
        
      

Estructura de elementos anidados

Cuando tienes múltiples hijos, puedes pasarlos como argumentos adicionales:

React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Título'),
  React.createElement('p', null, 'Párrafo'),
  React.createElement('button', null, 'Botón')
)
        
          
        
        
        
      

Equivalente en HTML:

<div class="container">
  <h1>Título</h1>
  <p>Párrafo</p>
  <button>Botón</button>
</div>
        
          
        
        
        
      

Como ves, con React.createElement el código se vuelve muy verboso y difícil de leer. Por eso existe JSX, que lo veremos próximamente.
Props: null vs objeto vacío

En el segundo parámetro de createElement puedes pasar:

    null - Si no necesitas props
    {} - Objeto vacío (equivalente a null)
    { className: 'card' } - Props específicas

React.createElement('h1', null, 'Sin props')
React.createElement('h1', {}, 'Sin props también')
React.createElement('h1', { className: 'title' }, 'Con props')
        
          
        
        
        
      

Propiedades comunes en React

Algunas props importantes que usarás:
className (no class)

React.createElement('div', { className: 'container' }, 'Contenido')
        
          
        
        
        
      

    ⚠️ Usamos className en lugar de class porque class es una palabra reservada en JavaScript.

style

React.createElement('h1', { style: { color: 'red', fontSize: '24px' } }, 'Título rojo')
        
          
        
        
        
      

    💡 Los estilos se pasan como un objeto JavaScript. Las propiedades CSS en kebab-case (font-size) se convierten a camelCase (fontSize).

onClick y eventos

React.createElement('button', { onClick: () => alert('¡Clic!') }, 'Haz clic')
        
          
        
        
        
      

    📝 Los eventos en React usan camelCase: onClick, onChange, onSubmit, etc.

¿Por qué crear elementos así?

Te estarás preguntando: “¿Por qué no simplemente usar HTML?”

Buena pregunta. Comparemos:

JavaScript puro (lo que hacíamos antes):

const titulo = document.createElement('h1')
titulo.textContent = '¡Hola!'
titulo.style.color = 'blue'
document.body.appendChild(titulo)
        
          
        
        
        
      

React con createElement:

const titulo = React.createElement('h1', { style: { color: 'blue' } }, '¡Hola!')
root.render(titulo)
        
          
        
        
        
      

Ventajas de React:

    ✅ Declarativo - Describes QUÉ quieres, no CÓMO hacerlo
    ✅ Más fácil de mantener - Todo en un solo lugar
    ✅ React gestiona el DOM - Tú solo describes la UI
    ✅ Actualizaciones eficientes - React solo cambia lo necesario

Lo que hemos aprendido por ahora…

En esta clase has aprendido:

    🎯 Cómo cargar React desde un CDN
    🏗️ Qué es React.createElement y cómo funciona
    📦 Cómo renderizar elementos en el DOM con ReactDOM
    🔑 La diferencia entre className, style y otras props
    🌳 Cómo crear estructuras de elementos anidados

En la siguiente clase veremos JSX, que hace todo esto mucho más simple y legible. Pero ahora entiendes qué pasa por debajo, lo cual es fundamental.

    💡 Recuerda: JSX es solo azúcar sintáctica. Al final, todo se convierte en React.createElement.

---
<a id="jsx-la-sintaxis-de-react"></a>
JSX: La sintaxis de React

En la clase anterior aprendimos a usar React.createElement para crear elementos. Funcionaba, pero el código era verboso y difícil de leer. Ahora vamos a conocer JSX, que hace que React sea mucho más fácil de escribir y entender.
¿Qué es JSX?

JSX (JavaScript XML) es una extensión de sintaxis de JavaScript que nos permite escribir código que parece HTML dentro de JavaScript.

// Con JSX - Parece HTML
const titulo = <h1>¡Hola React!</h1>

// Sin JSX - JavaScript puro
const titulo = React.createElement('h1', null, '¡Hola React!')
        
          
        
        
        
      

¿Por qué JSX?

    ✅ Más legible - Parece HTML, que ya conoces
    ✅ Menos código - Escribes menos para lograr lo mismo
    ✅ Menos errores - Es más fácil ver la estructura
    ✅ Más intuitivo - Se siente natural

    💡 Importante: JSX NO es HTML. Es JavaScript que se parece a HTML. Al final se transforma en React.createElement.

Creando nuestro primer archivo con JSX

Vamos a actualizar nuestro archivo react.html para usar JSX:

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React con JSX</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>

  <body>
    <!-- Aquí React renderizará nuestra aplicación -->
    <div id="root"></div>

    <!-- 1. Cargar React y ReactDOM desde CDN -->
    <script type="module">
      import React from 'https://esm.sh/react?dev'
      import ReactDOM from 'https://esm.sh/react-dom/client?dev'
      window.React = React
      window.ReactDOMClient = ReactDOM
    </script>

    <!-- 2. ¡NOVEDAD! Cargar Babel para transformar JSX -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <!-- 3. Nuestro código React CON JSX -->
    <script type="text/babel">
      // Ahora podemos escribir JSX directamente
      const titulo = <h1 style={{ color: '#09f' }}>¡Hola React con JSX!</h1>

      // Renderizar
      window.onload = () => {
        const rootEl = document.querySelector('#root')
        const root = ReactDOMClient.createRoot(rootEl)
        root.render(titulo)
      }
    </script>
  </body>
</html>
        
          
        
        
        
      

¿Qué cambió?

Analicemos los cambios importantes:
1. Añadimos Babel

<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        
          
        
        
        
      

¿Qué es Babel?

    Es un transpilador de JavaScript
    Transforma código moderno (como JSX) a código que el navegador entiende
    Convierte JSX en llamadas a React.createElement

¿Cómo funciona?

// Escribes esto (JSX)
;<h1>Hola</h1>

// Babel lo transforma a esto (JavaScript)
React.createElement('h1', null, 'Hola')
        
          
        
        
        
      

    ⚠️ Nota: Usar Babel en el navegador es solo para aprender. En proyectos reales, la transformación se hace al compilar, no en tiempo de ejecución.

2. Cambiamos el tipo de script

<script type="text/babel">
        
          
        
        
        
      

    En lugar de type="module", usamos type="text/babel"
    Esto le indica a Babel que debe procesar este código
    Babel transformará el JSX antes de que se ejecute

    Esto es una sintaxis especial de Babel para detectar qué código debe ser transformado por Babel. No es algo nativo de la plataforma y no lo volveremos a ver en el futuro.

3. Escribimos JSX

const titulo = <h1 style={{ color: '#09f' }}>¡Hola React con JSX!</h1>
        
          
        
        
        
      

¡Mira qué diferencia! En lugar de:

const titulo = React.createElement('h1', { style: { color: '#09f' } }, '¡Hola React con JSX!')
        
          
        
        
        
      

Ahora escribimos algo que parece HTML. Mucho más limpio y fácil de leer.
Sintaxis de JSX
Las llaves dobles en style

¿Notaste las dobles llaves en style={{ color: '#09f' }}?

<h1 style={{ color: '#09f' }}>Título</h1>
        
          
        
        
        
      

¿Por qué dos pares de llaves?

    Primera llave {} - Indica que vamos a insertar una expresión JavaScript en JSX
    Segunda llave {} - Es el objeto JavaScript con los estilos

// Primer par de llaves: "aquí va JavaScript"
<h1 style={...}>

// Segundo par de llaves: objeto con estilos
<h1 style={{ color: '#09f', fontSize: '24px' }}>
        
          
        
        
        
      

Es lo mismo que:

const estilos = { color: '#09f', fontSize: '24px' }
<h1 style={estilos}>Título</h1>
        
          
        
        
        
      

Insertando JavaScript en JSX

Una de las características más poderosas de JSX es que puedes insertar expresiones de JavaScript usando llaves {}:

const nombre = 'Miguel'
const elemento = <h1>Hola, {nombre}</h1>

// Se renderiza: "Hola, Miguel"
        
          
        
        
        
      

Puedes insertar cualquier expresión válida de JavaScript:

<p>La suma de 2 + 2 es: {2 + 2}</p>
// Se renderiza: "La suma de 2 + 2 es: 4"

<p>La fecha es: {new Date().toLocaleDateString()}</p>
// Se renderiza: "La fecha es: 27/10/2025"

<h1>Bienvenido, {usuario.nombre}</h1>
// Accede a propiedades de objetos

<button>Hay {empleos.length} empleos</button>
// Usa métodos de arrays
        
          
        
        
        
      

    ⚠️ Importante: Solo puedes usar expresiones (cosas que devuelven un valor), no sentencias (if, for, while, etc.).

className en lugar de class

En JSX usamos className en lugar de class:

// ✅ Correcto
<div className="container">Contenido</div>

// ❌ Incorrecto (aunque funciona, no es recomendado)
<div class="container">Contenido</div>
        
          
        
        
        
      

¿Por qué className?

Porque class es una palabra reservada en JavaScript (para definir clases). JSX es JavaScript, así que necesitamos usar className.
Estilos inline en JSX

Los estilos se escriben como objetos JavaScript:

<h1 style={{ color: 'red', fontSize: '24px', marginTop: '10px' }}>Título con estilos</h1>
        
          
        
        
        
      

Diferencias con HTML:

    ✅ camelCase en lugar de kebab-case: fontSize en lugar de font-size
    ✅ Valores en strings si tienen unidades: '24px' en lugar de 24px
    ✅ Objeto JavaScript en lugar de string: {{ color: 'red' }} en lugar de "color: red"

// ❌ CSS tradicional (no funciona en JSX)
<h1 style="color: red; font-size: 24px">Título</h1>

// ✅ JSX
<h1 style={{ color: 'red', fontSize: '24px' }}>Título</h1>
        
          
        
        
        
      

Comparación: Sin JSX vs Con JSX

Veamos un ejemplo real de nuestra app DevJobs:
Sin JSX (verboso y difícil de leer)

const tarjeta = React.createElement(
  'article',
  { className: 'job-listing-card' },
  React.createElement(
    'div',
    null,
    React.createElement('h3', null, 'Desarrollador Frontend'),
    React.createElement('small', null, 'TechCorp | Madrid'),
    React.createElement('p', null, 'Buscamos desarrollador con experiencia en React')
  ),
  React.createElement('button', { className: 'button-apply-job' }, 'Aplicar')
)
        
          
        
        
        
      

Con JSX (limpio y legible)

const tarjeta = (
  <article className="job-listing-card">
    <div>
      <h3>Desarrollador Frontend</h3>
      <small>TechCorp | Madrid</small>
      <p>Buscamos desarrollador con experiencia en React</p>
    </div>
    <button className="button-apply-job">Aplicar</button>
  </article>
)
        
          
        
        
        
      

¡La diferencia es enorme! 🎉
JSX con datos dinámicos

Lo interesante es que podemos combinar JSX con variables:

const empleo = {
  titulo: 'Desarrollador Frontend',
  empresa: 'TechCorp',
  ubicacion: 'Madrid',
  descripcion: 'Buscamos desarrollador con experiencia en React',
}

const tarjeta = (
  <article className="job-listing-card">
    <div>
      <h3>{empleo.titulo}</h3>
      <small>
        {empleo.empresa} | {empleo.ubicacion}
      </small>
      <p>{empleo.descripcion}</p>
    </div>
    <button className="button-apply-job">Aplicar</button>
  </article>
)
        
          
        
        
        
      

Múltiples elementos en JSX

Cuando quieres renderizar varios elementos, debes envolverlos en un elemento padre:

// ✅ Correcto: envueltos en un div
const app = (
  <div>
    <h1>Bienvenido</h1>
    <p>Esta es mi app React</p>
    <button>Empezar</button>
  </div>
)

// ❌ Error: múltiples elementos raíz
const app = (
  <h1>Bienvenido</h1>
  <p>Esta es mi app React</p>
  <button>Empezar</button>
)
        
          
        
        
        
      

    🔧 Más adelante aprenderemos sobre React Fragment (<>...</>) que permite agrupar elementos sin crear un div extra en el DOM.

Reglas importantes de JSX
1. Todos los elementos deben cerrarse

// ✅ Correcto
<img src="logo.png" />
<input type="text" />
<br />

// ❌ Incorrecto (en HTML normal sí funciona, pero no en JSX)
<img src="logo.png">
<input type="text">
<br>
        
          
        
        
        
      

2. Un solo elemento raíz

// ✅ Correcto
const app = (
  <div>
    <h1>Título</h1>
    <p>Párrafo</p>
  </div>
)

// ❌ Incorrecto
const app = (
  <h1>Título</h1>
  <p>Párrafo</p>
)
        
          
        
        
        
      

3. Usa paréntesis para JSX multi-línea

// ✅ Bien: con paréntesis
const elemento = (
  <div>
    <h1>Título</h1>
  </div>
)

// ⚠️ También funciona, pero menos legible
const elemento = (
  <div>
    <h1>Título</h1>
  </div>
)
        
          
        
        
        
      

4. JSX es una expresión

Puedes asignar JSX a variables, pasarlo como argumentos, retornarlo de funciones:

// Asignar a variable
const titulo = <h1>Hola</h1>

// Pasar como argumento
root.render(<h1>Hola</h1>)

// Retornar de función (componentes)
function Header() {
  return <h1>Hola</h1>
}
        
          
        
        
        
      

Ejercicio práctico

Actualiza tu archivo react.html y prueba este código:

<script type="text/babel">
  const empleos = [
    { titulo: 'Frontend Developer', empresa: 'TechCorp', ubicacion: 'Madrid' },
    { titulo: 'Backend Developer', empresa: 'CodeLabs', ubicacion: 'Barcelona' },
    { titulo: 'Full Stack Developer', empresa: 'DevStudio', ubicacion: 'Valencia' },
  ]

  const app = (
    <div>
      <h1>DevJobs - Ofertas de empleo</h1>
      <p>Hay {empleos.length} ofertas disponibles</p>

      <article className="job-listing-card">
        <h3>{empleos[0].titulo}</h3>
        <small>
          {empleos[0].empresa} | {empleos[0].ubicacion}
        </small>
        <button className="button-apply-job">Aplicar</button>
      </article>
    </div>
  )

  window.onload = () => {
    const rootEl = document.querySelector('#root')
    const root = ReactDOMClient.createRoot(rootEl)
    root.render(app)
  }
</script>
        
          
        
        
        
      

Lo que hemos aprendido

En esta clase has aprendido:

    🎯 Qué es JSX y por qué hace React más fácil
    🔧 Cómo usar Babel para transformar JSX a JavaScript
    📝 Sintaxis de JSX - llaves, className, style, etc.
    💻 Insertar JavaScript en JSX con {}
    📦 Reglas de JSX - cerrar tags, un elemento raíz, etc.
    ⚡ Diferencias con HTML - className vs class, estilos como objetos, etc.

En la siguiente clase aprenderemos sobre componentes, que es donde JSX realmente brilla. Veremos cómo crear funciones que retornan JSX y reutilizarlas en toda la aplicación.

    💡 Recuerda: JSX es opcional, pero el 99.9% de proyectos React lo usan porque hace el código mucho más legible y mantenible.

---
<a id="componentes-en-react"></a>
Componentes en React

Hasta ahora hemos usado JSX para crear elementos, pero la verdadera potencia de React está en los componentes. Un componente es una función de JavaScript que retorna JSX. Es como crear tus propias etiquetas HTML personalizadas y reutilizables.
¿Qué es un componente?

Un componente es simplemente una función de JavaScript que devuelve JSX:

function Saludo() {
  return <h1>¡Hola desde un componente!</h1>
}
        
          
        
        
        
      

Y puedes usarlo como si fuera una etiqueta HTML:

<Saludo />
        
          
        
        
        
      

¿Por qué componentes?

    🔄 Reutilizables - Escribe una vez, usa en cualquier lugar
    📦 Organizados - Cada componente tiene su propia lógica
    🧩 Componibles - Combina componentes para crear UIs complejas
    🔧 Mantenibles - Más fácil de entender y modificar

Elemento vs Componente en React

En React, los elementos son los bloques básicos de la interfaz de usuario. Son lo que se renderizan en el DOM y son representados por etiquetas HTML.

<h1>Hola</h1>
        
          
        
        
        
      

Los componentes son funciones que retornan elementos.

function Saludar() {
  return <h1>Hola</h1>
}
        
          
        
        
        
      

<Saludar />
        
          
        
        
        
      

Esa es la diferencia fundamental entre elementos y componentes.
Tu primer componente: Saludar

Vamos a crear un componente simple para entender los conceptos básicos. Actualiza tu archivo react.html:

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React - Componentes</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>

  <body>
    <div id="root"></div>

    <script type="module">
      import React from 'https://esm.sh/react?dev'
      import ReactDOM from 'https://esm.sh/react-dom/client?dev'
      window.React = React
      window.ReactDOMClient = ReactDOM
    </script>

    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="text/babel">
      // Nuestro primer componente
      function Saludar() {
        return <h1>¡Hola desde un componente!</h1>
      }

      // Renderizar el componente
      window.onload = () => {
        const rootEl = document.querySelector('#root')
        const root = ReactDOMClient.createRoot(rootEl)
        root.render(<Saludar />)
      }
    </script>
  </body>
</html>
        
          
        
        
        
      

Props: Pasando datos a componentes

Los componentes pueden recibir props (propiedades). Es como pasar argumentos a una función:

function Saludar(props) {
  return <h1>¡Hola, {props.nombre}!</h1>
}

// Usar el componente
// <Saludar nombre="Miguel" />
        
          
        
        
        
      

Destructuring de props

Es muy común usar destructuring para extraer las props directamente:

function Saludar({ nombre }) {
  return <h1>¡Hola, {nombre}!</h1>
}

// uso: <Saludar nombre="Miguel" />
        
          
        
        
        
      

Esto es más limpio que escribir props.nombre cada vez.
Múltiples props

Puedes pasar tantas props como necesites:

function Saludar({ nombre, edad, ciudad }) {
  return (
    <div>
      <h1>¡Hola, {nombre}!</h1>
      <p>
        Tienes {edad} años y vives en {ciudad}
      </p>
    </div>
  )
}

// uso: <Saludar nombre="Miguel" edad={25} ciudad="Madrid" />
        
          
        
        
        
      

    💡 Nota: Los valores que no son strings se pasan entre llaves: edad={25} en lugar de edad="25".

Estilos en JSX: Un objeto JavaScript

Ahora vamos a añadir un estilo personalizado a nuestro componente. Importante: Recuerda que JSX es JavaScript, no HTML.

function Saludar({ nombre, color }) {
  const estilos = {
    color: color,
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
  }

  return <h1 style={estilos}>¡Hola, {nombre}!</h1>
}

<Saludar nombre="Miguel" color="#09f" />
<Saludar nombre="Ana" color="#f90" />
        
          
        
        
        
      

¿Por qué estilos como objeto?

JSX es JavaScript, no HTML. Por eso:

    ✅ Los estilos son un objeto JavaScript
    ✅ Las propiedades usan camelCase: fontSize en lugar de font-size
    ✅ Los valores son strings: '32px' o números: 32
    ✅ Se pasan con llaves: style={estilos} o style={{ color: 'red' }}

Comparación:

<!-- HTML normal -->
<h1 style="color: red; font-size: 32px">Hola</h1>
        
          
        
        
        
      

// JSX (JavaScript)
<h1 style={{ color: 'red', fontSize: '32px' }}>Hola</h1>
        
          
        
        
        
      

Estilos inline con props

Puedes pasar los estilos directamente usando el valor de las props:

function Saludar({ nombre, color }) {
  return (
    <h1 style={{ color: color, fontSize: '32px', textAlign: 'center' }}>
      ¡Hola, {nombre}!
    </h1>
  )
}

<Saludar nombre="Miguel" color="blue" />
<Saludar nombre="Ana" color="green" />
        
          
        
        
        
      

O incluso más corto con la notación de propiedad abreviada:

function Saludar({ nombre, color }) {
  return <h1 style={{ color, fontSize: '32px' }}>¡Hola, {nombre}!</h1>
}
        
          
        
        
        
      

    Cuando la propiedad del objeto tiene el mismo nombre que la variable (color: color), puedes escribir solo color.

¡Lo que hemos aprendido de los componentes!

    🧩 Qué son los componentes - Funciones que retornan JSX
    📦 Cómo crear componentes - Nombres con mayúscula, retornar JSX
    🔑 Qué son las props - Datos que se pasan a los componentes
    🎨 Estilos en JSX - Objetos JavaScript, camelCase
    🔄 Reutilización - El mismo componente con diferentes datos
    🏗️ Composición - Combinar componentes para crear UIs complejas
    ⚡ Ventajas sobre vanilla JS - Código más limpio y mantenible

En la próxima clase aprenderemos sobre el estado (useState), que nos permitirá crear componentes interactivos que reaccionan a eventos del usuario.

    💡 Recuerda: Los componentes son funciones que retornan JSX. Las props son los datos que reciben. JSX es JavaScript, por eso los estilos son objetos.
----
<a id="componentes-vs-funciones-normales"></a>
Componentes vs Funciones normales

Los componentes de React son funciones de JavaScript, pero no todas las funciones de JavaScript son componentes de React. En esta clase vamos a entender cuál es la diferencia y por qué es importante.
¿Qué es un componente de React?

Un componente de React es una función especial que:

    Retorna algo que React puede renderizar (JSX, elementos, strings, números, null, etc.)
    Su nombre empieza con mayúscula (PascalCase)
    Se usa como una etiqueta JSX (<MiComponente />)

// ✅ Esto es un componente
function Saludo() {
  return <h1>Hola</h1>
}

// Se usa así:
// <Saludo />
        
          
        
        
        
      

¿Qué es una función normal?

Una función normal de JavaScript es cualquier función que realizas tareas pero no necesariamente retorna JSX:

// ✅ Esto es una función normal
function calcularTotal(precio, iva) {
  return precio + precio * iva
}

// Se llama como función
const total = calcularTotal(100, 0.21)
        
          
        
        
        
      

Diferencias clave
1. Cómo se invocan

Componentes: Se usan como etiquetas JSX

function Boton() {
  return <button>Haz clic</button>
}

// Se invoca así:
// <Boton />
        
          
        
        
        
      

Funciones normales: Se llaman con paréntesis

function saludar(nombre) {
  return `Hola, ${nombre}`
}

// Se invoca así:
saludar('Miguel')
        
          
        
        
        
      

2. Lo que retornan

Componentes: Retornan elementos que React puede renderizar

function Titulo() {
  return <h1>Mi título</h1> // Retorna JSX
}
        
          
        
        
        
      

Funciones normales: Retornan cualquier tipo de dato JavaScript

function sumar(a, b) {
  return a + b // Retorna un número
}

function obtenerUsuario() {
  return { nombre: 'Miguel', edad: 25 } // Retorna un objeto
}
        
          
        
        
        
      

3. Convención de nombres

Componentes: PascalCase (primera letra mayúscula)

function MiComponente() {
  return <div>Hola</div>
}
        
          
        
        
        
      

Funciones normales: camelCase (primera letra minúscula)

function calcularPrecio() {
  return 100
}
        
          
        
        
        
      

¿Qué puede renderizar React?

React puede renderizar varios tipos de valores:
✅ Elementos JSX

function App() {
  return <h1>Hola mundo</h1>
}
        
          
        
        
        
      

✅ Strings (texto)

function Saludo() {
  return 'Hola desde un componente'
}

// También puedes renderizar strings directamente
<div>{'Texto entre llaves'}</div>
<div>Texto directo</div>
        
          
        
        
        
      

✅ Números

function Contador() {
  return 42
}

// También en JSX:
<div>{100}</div>
<div>{2 + 2}</div>
        
          
        
        
        
      

✅ null o undefined

Estos valores no renderizan nada visible, pero son válidos:

function Invisible() {
  return null // No renderiza nada
}

// Uso:
;<Invisible /> // No renderiza nada
        
          
        
        
        
      

PascalCase: ¿Por qué es importante?

Los componentes deben empezar con mayúscula. Esto no es solo una convención, es un requisito técnico de React.
¿Por qué?

React necesita distinguir entre:

    Componentes personalizados (tus componentes)
    Elementos HTML nativos (div, button, h1, etc.)

// React ve mayúscula = componente personalizado
<MiBoton /> // Busca un componente llamado MiBoton

// React ve minúscula = elemento HTML
<miboton /> // Renderiza un elemento HTML normal
        
          
        
        
        
      

Ejemplo práctico

// ✅ Correcto - PascalCase
function MiComponente() {
  return <div>Hola</div>
}

// uso: <MiComponente />
// React lo trata como componente

// ❌ Incorrecto - camelCase
function miComponente() {
  return <div>Hola</div>
}

// uso: <miComponente />
// React lo trata como una etiqueta HTML normal
        
          
        
        
        
      

Si usas minúscula, React pensará que es una etiqueta HTML desconocida y no funcionará correctamente.
Reglas de nomenclatura

// ✅ Correcto
function Boton() {}
function MiBoton() {}
function BotonPrimario() {}
function JobCard() {}

// ❌ Incorrecto
function boton() {} // Minúscula
function miBoton() {} // camelCase
function BOTON() {} // MAYÚSCULAS (técnicamente funciona, pero no es convención)
function boton_primario() {} // snake_case
        
          
        
        
        
      

Mezclando componentes y funciones

Es común tener funciones normales que ayudan a los componentes:

// Función normal (helper)
function formatearPrecio(precio) {
  return `${precio}€`
}

// Componente que usa la función
function Producto({ nombre, precio }) {
  const precioFormateado = formatearPrecio(precio) // Llamada normal

  return (
    <div>
      <h3>{nombre}</h3>
      <p>{precioFormateado}</p>
    </div>
  )
}

// Uso del componente
// <Producto nombre="Laptop" precio={999} />
        
          
        
        
        
      

Cuándo usar cada uno
Usa componentes cuando:

    Necesitas renderizar UI (interfaz de usuario)
    Quieres reutilizar un trozo de interfaz
    Necesitas componer elementos visuales

function Tarjeta({ titulo, descripcion }) {
  return (
    <div className="card">
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </div>
  )
}
        
          
        
        
        
      

Usa funciones normales cuando:

    Necesitas hacer cálculos o transformaciones
    Quieres formatear datos
    Tienes lógica de negocio que no renderiza nada

function validarEmail(email) {
  return email.includes('@')
}

function obtenerFechaActual() {
  return new Date().toLocaleDateString()
}
        
          
        
        
        
      

Errores comunes
❌ Error 1: Llamar un componente como función

function Saludo() {
  return <h1>Hola</h1>
}

// ❌ Mal
const resultado = Saludo() // No hagas esto

// ✅ Bien
<Saludo /> // Usa como etiqueta
        
          
        
        
        
      

❌ Error 2: Usar minúscula para componentes

// ❌ Mal
function saludo() {
  return <h1>Hola</h1>
}

// ✅ Bien
function Saludo() {
  return <h1>Hola</h1>
}
        
          
        
        
        
      

❌ Error 3: Intentar renderizar objetos

// ❌ Mal
function Usuario() {
  return { nombre: 'Miguel', edad: 25 } // Error!
}

// ✅ Bien
function Usuario() {
  const usuario = { nombre: 'Miguel', edad: 25 }
  return (
    <div>
      {usuario.nombre} - {usuario.edad} años
    </div>
  )
}
        
          
        
        
        
      

El último repaso:

    🎯 Diferencia entre componentes y funciones - Cómo se usan y qué retornan
    🔤 Por qué PascalCase - React necesita distinguir componentes de HTML
    📦 Qué puede renderizar React - JSX, strings, números, null, arrays
    ⚠️ Qué NO puede renderizar - Objetos planos
    🔧 Cuándo usar cada uno - Componentes para UI, funciones para lógica
    🚫 Errores comunes - Llamar componentes como funciones, usar minúsculas

En la próxima clase aprenderemos sobre el estado con useState, que nos permitirá crear componentes interactivos que reaccionan a las acciones del usuario.

    💡 Recuerda: Los componentes son funciones especiales que retornan JSX y usan PascalCase. Las funciones normales ayudan con la lógica pero no se renderizan directamente.
---
<a id="creando-jobcard-componente-real"></a>
Creando JobCard: Nuestro primer componente real

Hasta ahora hemos aprendido qué es JSX, qué son los componentes y cómo se diferencian de las funciones normales. Ahora es el momento de aplicar todo ese conocimiento creando un componente real para nuestra aplicación DevJobs.
Componente JobCard: Caso real

Vamos a crear un componente que muestre una tarjeta de empleo. Este componente será reutilizable y recibirá diferentes datos cada vez que lo usemos.

Actualiza tu archivo react.html con este código completo:

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React - JobCard</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>

  <body>
    <div id="root"></div>

    <script type="module">
      import React from 'https://esm.sh/react?dev'
      import ReactDOM from 'https://esm.sh/react-dom/client?dev'
      window.React = React
      window.ReactDOMClient = ReactDOM
    </script>

    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="text/babel">
      // Componente JobCard con múltiples props
      function JobCard({ titulo, empresa, ubicacion, descripcion }) {
        return (
          <article className="job-listing-card">
            <div>
              <h3>{titulo}</h3>
              <small>
                {empresa} | {ubicacion}
              </small>
              <p>{descripcion}</p>
            </div>
            <button className="button-apply-job">Aplicar</button>
          </article>
        )
      }

      // Componente App
      function App() {
        return (
          <section>
            <h2>Empleos disponibles</h2>
            <div className="jobs-listings">
              <JobCard
                titulo="Desarrollador Frontend"
                empresa="Tech Solutions Inc."
                ubicacion="Remoto"
                descripcion="Buscamos un desarrollador frontend con experiencia en React, TypeScript y Tailwind CSS."
              />
              <JobCard
                titulo="Ingeniero de Software Senior"
                empresa="Data Driven Co."
                ubicacion="Ciudad de México"
                descripcion="Estamos buscando un ingeniero de software con experiencia en desarrollo web."
              />
            </div>
          </section>
        )
      }

      // Renderizar
      window.onload = () => {
        const rootEl = document.querySelector('#root')
        const root = ReactDOMClient.createRoot(rootEl)
        root.render(<App />)
      }
    </script>
  </body>
</html>
        
          
        
        
        
      

¿Qué está pasando aquí?

Vamos a analizar cada parte del código en detalle.
1. Componente con múltiples props

function JobCard({ titulo, empresa, ubicacion, descripcion }) {
  return (
    <article className="job-listing-card">
      <h3>{titulo}</h3>
      <small>
        {empresa} | {ubicacion}
      </small>
      <p>{descripcion}</p>
      <button>Aplicar</button>
    </article>
  )
}
        
          
        
        
        
      

Este componente:

    Recibe 4 props diferentes mediante destructuring: { titulo, empresa, ubicacion, descripcion }
    Usa className en lugar de class (porque JSX es JavaScript)
    Inserta cada prop en su lugar con {}
    Retorna una estructura JSX completa que representa una tarjeta de empleo

¿Por qué destructuring?

En lugar de escribir props.titulo, props.empresa, etc., usamos destructuring para extraer las props directamente:

// Sin destructuring (más verboso)
function JobCard(props) {
  return (
    <article>
      <h3>{props.titulo}</h3>
      <small>{props.empresa}</small>
    </article>
  )
}

// Con destructuring (más limpio)
function JobCard({ titulo, empresa }) {
  return (
    <article>
      <h3>{titulo}</h3>
      <small>{empresa}</small>
    </article>
  )
}
        
          
        
        
        
      

2. Componente App que compone otros componentes

function App() {
  return (
    <section>
      <h2>Empleos disponibles</h2>
      <div className="jobs-listings">
        <JobCard
          titulo="Desarrollador Frontend"
          empresa="Tech Solutions Inc."
          ubicacion="Remoto"
          descripcion="..."
        />
        <JobCard
          titulo="Ingeniero de Software Senior"
          empresa="Data Driven Co."
          ubicacion="Ciudad de México"
          descripcion="..."
        />
      </div>
    </section>
  )
}
        
          
        
        
        
      

Aquí vemos la composición de componentes:

    App es un componente que contiene otros componentes
    Pasamos props diferentes a cada instancia de <JobCard />
    Cada instancia renderiza con sus propios datos
    Esta es la composición de componentes en acción

Ventajas de la composición:

    🔄 Reutilización - El mismo componente, diferentes datos
    📦 Organización - Cada componente tiene su responsabilidad
    🧩 Escalabilidad - Fácil añadir más tarjetas

3. Renderizamos el componente principal

root.render(<App />)
        
          
        
        
        
      

Solo renderizamos App, y React automáticamente renderiza todos los componentes hijos. No necesitamos renderizar cada JobCard individualmente.
Comparación con JavaScript vanilla

Veamos cómo hemos mejorado nuestro código comparado con lo que hacíamos antes con JavaScript puro.
Antes (JavaScript vanilla)

En nuestro archivo fetch-data.js teníamos que hacer esto:

jobs.forEach((job) => {
  const article = document.createElement('article')
  article.className = 'job-listing-card'
  article.innerHTML = `<div>
      <h3>${job.titulo}</h3>
      <small>${job.empresa} | ${job.ubicacion}</small>
      <p>${job.descripcion}</p>
    </div>
    <button class="button-apply-job">Aplicar</button>`
  container.appendChild(article)
})
        
          
        
        
        
      

Problemas con este enfoque:

    ❌ Código repetitivo - Cada vez que necesitamos una tarjeta, escribimos todo esto
    ❌ Difícil de mantener - Si queremos cambiar la estructura, hay que buscar en todo el código
    ❌ Manipulación manual del DOM - Tenemos que crear, modificar y añadir elementos manualmente
    ❌ Propenso a errores - Un error de tipeo en el HTML string rompe todo
    ❌ HTML en strings - No hay validación, autocompletado ni resaltado de sintaxis
    ❌ Difícil de testear - Necesitamos un DOM real para probarlo

Ahora (React con componentes)

function JobCard({ titulo, empresa, ubicacion, descripcion }) {
  return (
    <article className="job-listing-card">
      <div>
        <h3>{titulo}</h3>
        <small>
          {empresa} | {ubicacion}
        </small>
        <p>{descripcion}</p>
      </div>
      <button className="button-apply-job">Aplicar</button>
    </article>
  )
}

/* Uso:
<JobCard
  titulo={job.titulo}
  empresa={job.empresa}
  ubicacion={job.ubicacion}
  descripcion={job.descripcion}
/>
*/
        
          
        
        
        
      

Ventajas de React:

    ✅ Código limpio y declarativo - Describes qué quieres, no cómo hacerlo
    ✅ Fácil de mantener - Cambias el componente una vez, se actualiza en todos lados
    ✅ React gestiona el DOM - No te preocupas por createElement, appendChild, etc.
    ✅ Reutilizable - Usa el mismo componente con diferentes datos
    ✅ JSX valida la estructura - Errores de sintaxis se detectan inmediatamente
    ✅ Fácil de testear - Puedes testear el componente sin un DOM real

¡Mucho mejor! No necesitas createElement, innerHTML ni appendChild.
Composición de componentes

La verdadera potencia de React está en componer componentes más pequeños para crear interfaces complejas.
Ejemplo: Estructura completa de la aplicación

function Header() {
  return (
    <header>
      <h1>DevJobs</h1>
      <nav>
        <a href="/">Inicio</a>
        <a href="/empleos">Empleos</a>
      </nav>
    </header>
  )
}

function JobList() {
  return (
    <div className="jobs-listings">
      <JobCard titulo="..." empresa="..." ubicacion="..." descripcion="..." />
      <JobCard titulo="..." empresa="..." ubicacion="..." descripcion="..." />
    </div>
  )
}

function Footer() {
  return (
    <footer>
      <p>&copy; 2025 DevJobs</p>
    </footer>
  )
}

function App() {
  return (
    <div>
      <Header />
      <JobList />
      <Footer />
    </div>
  )
}
        
          
        
        
        
      

Principio de responsabilidad única:

Cada componente tiene una responsabilidad específica:

    Header - Muestra la cabecera y navegación
    JobList - Muestra la lista de empleos
    Footer - Muestra el pie de página
    App - Compone todos los componentes anteriores

Esto hace que el código sea:

    📖 Más fácil de leer - Cada componente es pequeño y simple
    🔧 Más fácil de mantener - Cambios localizados en un solo componente
    🧪 Más fácil de testear - Puedes testear cada componente por separado
    🔄 Más fácil de reutilizar - Puedes usar Header en diferentes páginas

Pasando props dinámicas

Ahora vamos a hacer nuestro componente más interesante usando datos dinámicos:

function App() {
  // Array de empleos
  const empleos = [
    {
      id: 1,
      titulo: 'Desarrollador Frontend',
      empresa: 'Tech Solutions Inc.',
      ubicacion: 'Remoto',
      descripcion: 'Buscamos un desarrollador frontend con experiencia en React.',
    },
    {
      id: 2,
      titulo: 'Ingeniero Backend',
      empresa: 'Data Systems',
      ubicacion: 'Madrid',
      descripcion: 'Experiencia con Node.js y bases de datos.',
    },
    {
      id: 3,
      titulo: 'Full Stack Developer',
      empresa: 'StartupCo',
      ubicacion: 'Barcelona',
      descripcion: 'Desarrollo completo de aplicaciones web.',
    },
  ]

  return (
    <section>
      <h2>Empleos disponibles: {empleos.length}</h2>
      <div className="jobs-listings">
        <JobCard
          titulo={empleos[0].titulo}
          empresa={empleos[0].empresa}
          ubicacion={empleos[0].ubicacion}
          descripcion={empleos[0].descripcion}
        />
        <JobCard
          titulo={empleos[1].titulo}
          empresa={empleos[1].empresa}
          ubicacion={empleos[1].ubicacion}
          descripcion={empleos[1].descripcion}
        />
        <JobCard
          titulo={empleos[2].titulo}
          empresa={empleos[2].empresa}
          ubicacion={empleos[2].ubicacion}
          descripcion={empleos[2].descripcion}
        />
      </div>
    </section>
  )
}
        
          
        
        
        
      

Ahora estamos usando datos reales en lugar de strings hardcodeados. En la próxima clase veremos cómo hacer esto de forma más elegante con .map().
Ejercicio práctico

Prueba a añadir más props al componente JobCard:

function JobCard({ titulo, empresa, ubicacion, descripcion, salario, modalidad, nivel }) {
  return (
    <article className="job-listing-card">
      <div>
        <h3>{titulo}</h3>
        <small>
          {empresa} | {ubicacion}
        </small>
        <p>{descripcion}</p>
        <div className="job-details">
          <span>💰 {salario}</span>
          <span>📍 {modalidad}</span>
          <span>📊 {nivel}</span>
        </div>
      </div>
      <button className="button-apply-job">Aplicar</button>
    </article>
  )
}

/* Uso
<JobCard
  titulo="Desarrollador Frontend"
  empresa="Tech Solutions Inc."
  ubicacion="Remoto"
  descripcion="Buscamos un desarrollador frontend..."
  salario="45.000€ - 60.000€"
  modalidad="Remoto"
  nivel="Senior"
/>
*/
        
          
        
        
        
      

Buenas prácticas con componentes
1. Un componente, una responsabilidad

Cada componente debe hacer una sola cosa y hacerla bien:

// ✅ Bien: componentes enfocados
function JobTitle({ children }) {
  return <h3>{children}</h3>
}

function JobCompany({ empresa, ubicacion }) {
  return (
    <small>
      {empresa} | {ubicacion}
    </small>
  )
}

// ❌ Mal: componente que hace demasiado
function EverythingComponent({ titulo, empresa, ubicacion, descripcion, usuario, configuracion }) {
  // Demasiadas responsabilidades
}
        
          
        
        
        
      

2. Nombres descriptivos

Usa nombres que describan claramente qué hace el componente:

// ✅ Bien
function UserProfileCard() {}
function JobListingItem() {}
function NavigationMenu() {}

// ❌ Mal
function Item() {} // Demasiado genérico
function Thing() {} // No descriptivo
function Comp1() {} // Nada claro
        
          
        
        
        
      

3. Props claras y descriptivas

// ✅ Bien: props con nombres claros
function Button({ text, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  )
}

// ❌ Mal: props ambiguas
function Button({ t, oc, d }) {
  return (
    <button onClick={oc} disabled={d}>
      {t}
    </button>
  )
}
        
          
        
        
        
      

Lo que hemos aprendido

    🎯 Crear un componente real con múltiples props
    🧩 Composición de componentes - Combinar componentes para crear UIs
    📊 Comparación con vanilla JS - Las ventajas de usar React
    🔄 Reutilización - El mismo componente con diferentes datos
    📦 Organización del código - Cada componente con su responsabilidad
    ✨ Buenas prácticas - Nombres descriptivos, responsabilidad única

En la próxima clase aprenderemos sobre el estado con useState, que nos permitirá crear componentes interactivos que responden a las acciones del usuario.

    💡 Recuerda: Los componentes son bloques de construcción reutilizables. Divide tu UI en componentes pequeños y composables para crear aplicaciones más mantenibles.

----
<a id="eventos-en-react"></a>
Eventos en React

Hasta ahora nuestros componentes son estáticos: muestran información pero no responden a las acciones del usuario. En esta clase vamos a aprender a manejar eventos como clicks, cambios en inputs, envío de formularios, etc.
¿Qué son los eventos?

Los eventos son acciones que ocurren en el navegador:

    👆 Click - El usuario hace clic en un botón
    ⌨️ Input - El usuario escribe en un input
    📝 Change - El valor de un input cambia
    📤 Submit - Se envía un formulario
    🖱️ Hover - El ratón pasa sobre un elemento

React nos permite escuchar estos eventos y ejecutar código cuando ocurren.
Añadiendo eventos onClick

Vamos a hacer que el botón “Aplicar” responda a clicks. Todavía sin estado, solo vamos a mostrar un mensaje en la consola y una alerta.

Actualiza tu archivo react.html con este código:

function JobCard({ titulo, empresa, ubicacion, descripcion }) {
  // Función que se ejecuta al hacer click
  const handleAplicar = () => {
    console.log('¡Click en el botón!')
    console.log('Aplicando a:', titulo, '-', empresa)
    alert(`Has aplicado a: ${titulo} en ${empresa}`)
  }

  return (
    <article className="job-listing-card">
      <div>
        <h3>{titulo}</h3>
        <small>
          {empresa} | {ubicacion}
        </small>
        <p>{descripcion}</p>
      </div>
      <button className="button-apply-job" onClick={handleAplicar}>
        Aplicar
      </button>
    </article>
  )
}
        
          
        
        
        
      

¿Qué cambió?

Analicemos las novedades paso a paso.
1. Función manejadora de eventos

function JobCard({ titulo, empresa, ubicacion, descripcion }) {
  // Definimos una función que se ejecuta al hacer click
  const handleAplicar = () => {
    console.log('¡Click en el botón!')
    console.log('Aplicando a:', titulo, '-', empresa)
    alert(`Has aplicado a: ${titulo} en ${empresa}`)
  }

  return (
    <article className="job-listing-card">
      {/* ... */}
      <button className="button-apply-job" onClick={handleAplicar}>
        Aplicar
      </button>
    </article>
  )
}
        
          
        
        
        
      

Puntos clave:

    Definimos una función handleAplicar dentro del componente
    Esta función tiene acceso a las props (titulo, empresa)
    Conectamos la función al botón con onClick={handleAplicar}

2. Sintaxis de eventos en React

<button onClick={handleAplicar}>Aplicar</button>
        
          
        
        
        
      

Importante:

    ✅ Usa camelCase: onClick, no onclick
    ✅ Pasa la referencia a la función: onClick={handleAplicar}
    ❌ NO la llames: onClick={handleAplicar()} ← Esto ejecuta la función inmediatamente

// ✅ Correcto: pasa la referencia
<button onClick={handleAplicar}>Aplicar</button>

// ❌ Incorrecto: ejecuta la función inmediatamente
<button onClick={handleAplicar()}>Aplicar</button>

// ✅ Alternativa con función inline
<button onClick={() => alert('Click!')}>Aplicar</button>
        
          
        
        
        
      

Pruébalo

    Abre el archivo en tu navegador
    Abre la consola (F12 o Cmd+Option+I en Mac)
    Haz click en cualquier botón “Aplicar”
    Verás los mensajes en la consola y una alerta

Convención de nombres

Por convención, las funciones manejadoras de eventos suelen empezar con handle:

const handleClick = () => {
  /* ... */
}
const handleSubmit = () => {
  /* ... */
}
const handleChange = () => {
  /* ... */
}
const handleAplicar = () => {
  /* ... */
}
        
          
        
        
        
      

Esto hace el código más legible: cuando ves handleAlgo, sabes que es un manejador de eventos.
Comparación con JavaScript vanilla

Veamos cómo hemos simplificado el manejo de eventos.
Antes (JavaScript vanilla)

En nuestro archivo apply-button.js teníamos que hacer esto:

const jobsListingSection = document.querySelector('.jobs-listings')

jobsListingSection.addEventListener('click', function (event) {
  const element = event.target
  if (element.classList.contains('button-apply-job')) {
    element.textContent = '¡Aplicado!'
    element.classList.add('is-applied')
    element.disabled = true
  }
})
        
          
        
        
        
      

Problemas:

    ❌ Event delegation - Tenemos que escuchar en un contenedor padre
    ❌ Verificar el target - Con if (element.classList.contains(...))
    ❌ Manipular el DOM manualmente - Cambiar texto, clases, etc.
    ❌ Código difícil de mantener - Todo mezclado

Ahora (React)

const handleAplicar = () => {
  alert(`Has aplicado a: ${titulo} en ${empresa}`)
}

;<button onClick={handleAplicar}>Aplicar</button>
        
          
        
        
        
      

Ventajas:

    ✅ Directo - El evento está donde lo necesitas
    ✅ Sin querySelector - No buscas elementos
    ✅ Sin addEventListener - React lo hace por ti
    ✅ Sin event delegation - Cada componente gestiona sus eventos
    ✅ Acceso a props - La función tiene acceso al contexto del componente

¡Mucho más simple!
Eventos con funciones inline

A veces es útil definir la función directamente en el onClick:

function JobCard({ titulo, empresa }) {
  return <button onClick={() => alert(`Aplicando a ${titulo}`)}>Aplicar</button>
}
        
          
        
        
        
      

¿Cuándo usar cada enfoque?
Función separada (recomendado)

function JobCard({ titulo }) {
  const handleClick = () => {
    console.log('Click!')
    alert(titulo)
  }

  return <button onClick={handleClick}>Aplicar</button>
}
        
          
        
        
        
      

✅ Mejor cuando:

    La función tiene más de una línea
    Quieres reutilizar la función
    Necesitas testear la función

Función inline

<button onClick={() => alert('Click!')}>Aplicar</button>
        
          
        
        
        
      

✅ Mejor cuando:

    Es una sola línea muy simple
    No se va a reutilizar

Acceso a las props en los manejadores

Los manejadores de eventos tienen acceso completo a las props del componente:

function JobCard({ titulo, empresa, ubicacion, descripcion }) {
  const handleAplicar = () => {
    // Podemos usar todas las props
    console.log('Título:', titulo)
    console.log('Empresa:', empresa)
    console.log('Ubicación:', ubicacion)
    console.log('Descripción:', descripcion)

    alert(`Has aplicado a ${titulo} en ${empresa}`)
  }

  return (
    <article>
      <h3>{titulo}</h3>
      <button onClick={handleAplicar}>Aplicar</button>
    </article>
  )
}
        
          
        
        
        
      

Esto es posible gracias a los closures de JavaScript: la función handleAplicar “recuerda” las variables del ámbito donde fue creada.
Tipos de eventos comunes

React soporta todos los eventos del navegador. Los más comunes:
onClick - Click del ratón

<button onClick={() => console.log('Click!')}>Haz click</button>
        
          
        
        
        
      

onChange - Cambio en un input

<input onChange={(e) => console.log('Valor:', e.target.value)} />
        
          
        
        
        
      

onSubmit - Envío de formulario

<form
  onSubmit={(e) => {
    e.preventDefault()
    console.log('Formulario enviado')
  }}
>
  <button type="submit">Enviar</button>
</form>
        
          
        
        
        
      

onMouseEnter / onMouseLeave - Hover

<div onMouseEnter={() => console.log('Entrando')} onMouseLeave={() => console.log('Saliendo')}>
  Pasa el ratón
</div>
        
          
        
        
        
      

onKeyDown / onKeyUp - Teclas

<input onKeyDown={(e) => console.log('Tecla:', e.key)} />
        
          
        
        
        
      

El objeto evento (event)

Los manejadores de eventos reciben un objeto evento como parámetro:

function JobCard({ titulo }) {
  const handleAplicar = (event) => {
    console.log('Evento completo:', event)
    console.log('Elemento que disparó el evento:', event.target)
    console.log('Tipo de evento:', event.type)
  }

  return <button onClick={handleAplicar}>Aplicar</button>
}
        
          
        
        
        
      

Propiedades útiles del evento

const handleClick = (event) => {
  event.preventDefault() // Prevenir comportamiento por defecto
  event.stopPropagation() // Detener propagación del evento
  event.target // Elemento que disparó el evento
  event.currentTarget // Elemento al que está adjunto el evento
  event.type // Tipo de evento ('click', 'change', etc.)
}
        
          
        
        
        
      

Ejemplo práctico con preventDefault

function Formulario() {
  const handleSubmit = (event) => {
    event.preventDefault() // Evita recargar la página
    console.log('Formulario enviado')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nombre" />
      <button type="submit">Enviar</button>
    </form>
  )
}
        
          
        
        
        
      

Pasando argumentos a los manejadores

¿Qué pasa si necesitas pasar argumentos adicionales?
Opción 1: Función inline con arrow function

function JobCard({ titulo, id }) {
  const handleAplicar = (jobId) => {
    console.log('ID del empleo:', jobId)
  }

  return <button onClick={() => handleAplicar(id)}>Aplicar</button>
}
        
          
        
        
        
      

Opción 2: Con el evento

function JobCard({ titulo, id }) {
  const handleAplicar = (event, jobId) => {
    console.log('Evento:', event)
    console.log('ID del empleo:', jobId)
  }

  return <button onClick={(e) => handleAplicar(e, id)}>Aplicar</button>
}
        
          
        
        
        
      

Múltiples eventos en un componente

Puedes tener varios manejadores en el mismo componente:

function JobCard({ titulo, empresa }) {
  const handleAplicar = () => {
    alert(`Aplicando a ${titulo}`)
  }

  const handleGuardar = () => {
    alert(`Guardando ${titulo}`)
  }

  const handleCompartir = () => {
    alert(`Compartiendo ${titulo}`)
  }

  return (
    <article>
      <h3>{titulo}</h3>
      <button onClick={handleAplicar}>Aplicar</button>
      <button onClick={handleGuardar}>Guardar</button>
      <button onClick={handleCompartir}>Compartir</button>
    </article>
  )
}
        
          
        
        
        
      

Limitaciones actuales

Por ahora, cuando hacemos click en “Aplicar”:

    ✅ Se ejecuta la función
    ✅ Se muestra la alerta
    ✅ Se imprime en consola
    ❌ El botón NO cambia visualmente
    ❌ No se recuerda que aplicaste

¿Por qué?

Porque todavía no estamos usando estado. El componente no “recuerda” nada entre renders.

En la próxima clase aprenderemos sobre useState, que nos permitirá:

    Cambiar el texto del botón a “¡Aplicado!”
    Desactivar el botón después de aplicar
    Añadir una clase CSS
    ¡Y mucho más!

Lo que hemos aprendido de los eventos de React

    🎯 Qué son los eventos en React
    👆 Sintaxis de eventos - onClick, onChange, etc.
    🔧 Crear manejadores - Funciones que responden a eventos
    📦 Acceso a props - Los manejadores pueden usar las props
    ⚡ Comparación con vanilla JS - Mucho más simple
    🎨 Diferentes tipos de eventos - Click, change, submit, hover, etc.
    📝 Objeto evento - Acceder a información del evento
    🔀 Múltiples eventos - Varios manejadores en un componente

En la próxima clase aprenderemos sobre el estado con useState, que nos permitirá crear componentes que cambian en respuesta a eventos.

    💡 Recuerda: Los eventos en React usan camelCase (onClick) y reciben referencias a funciones, no llamadas (onClick={handleClick}, no onClick={handleClick()}).
---
<a id="estado-con-usestate"></a>
Estado con useState

En la clase anterior aprendimos a manejar eventos, pero los componentes no recordaban nada. Cuando hacías clic en “Aplicar”, se ejecutaba la función pero el botón no cambiaba visualmente. Ahora vamos a solucionar eso con el estado.
¿Qué es el estado?

El estado es la memoria de un componente. Es donde guardas información que puede cambiar con el tiempo.
Analogía: El interruptor de luz

Piénsalo así. Imagina un interruptor de luz:

    Tiene un estado: encendido o apagado
    Cuando lo presionas, cambia de estado
    Y la luz se actualiza automáticamente

Lo mismo pasa con los componentes de React:

    Tienen un estado (por ejemplo: aplicado = false)
    Cuando el usuario interactúa, cambias el estado (a aplicado = true)
    React actualiza la interfaz automáticamente

¿Por qué necesitamos estado?

Hasta ahora, nuestros componentes son estáticos:

function Boton() {
  return <button>Haz clic</button>
}
        
          
        
        
        
      

Este botón siempre dice “Haz clic”. No puede recordar si ya hiciste clic.

Con estado, podemos hacer componentes dinámicos que recuerdan cosas:

function Boton() {
  const [clicks, setClicks] = React.useState(0)

  return <button onClick={() => setClicks(clicks + 1)}>Clicks: {clicks}</button>
}
        
          
        
        
        
      

Ahora el botón recuerda cuántas veces has hecho clic.
Gestionando estado con useState

Vamos a añadir estado a nuestro componente JobCard para que el botón “Aplicar” cambie cuando lo clickeas.

Actualiza tu archivo react.html:

function JobCard({ titulo, empresa, ubicacion, descripcion }) {
  // ¡NOVEDAD! Estado: ¿el usuario aplicó a este empleo?
  const [aplicado, setAplicado] = React.useState(false)

  const handleAplicar = () => {
    setAplicado(true) // Cambiamos el estado a true
  }

  return (
    <article className="job-listing-card">
      <div>
        <h3>{titulo}</h3>
        <small>
          {empresa} | {ubicacion}
        </small>
        <p>{descripcion}</p>
      </div>
      <button
        className={aplicado ? 'button-apply-job is-applied' : 'button-apply-job'}
        onClick={handleAplicar}
        disabled={aplicado}
      >
        {aplicado ? '¡Aplicado!' : 'Aplicar'}
      </button>
    </article>
  )
}
        
          
        
        
        
      

¿Qué cambió?

Analicemos la novedad paso a paso.
useState: El Hook de estado

function JobCard({ titulo, empresa, ubicacion, descripcion }) {
  // Declarar estado
  const [aplicado, setAplicado] = React.useState(false)
  //     ↓          ↓                ↓
  //   valor    función         valor inicial
  //  actual   para cambiar

  const handleAplicar = () => {
    setAplicado(true) // Actualizamos el estado
  }

  return (
    <article className="job-listing-card">
      {/* ... */}
      <button
        className={aplicado ? 'button-apply-job is-applied' : 'button-apply-job'}
        onClick={handleAplicar}
        disabled={aplicado}
      >
        {aplicado ? '¡Aplicado!' : 'Aplicar'}
      </button>
    </article>
  )
}
        
          
        
        
        
      

Desglose de useState

const [aplicado, setAplicado] = React.useState(false)
        
          
        
        
        
      

¿Qué significa esto?

    React.useState(false) - Crea una variable de estado con valor inicial false
    aplicado - Variable que contiene el valor actual del estado
    setAplicado - Función para actualizar el estado

¿Por qué usar array destructuring?

// useState devuelve un array con 2 elementos:
const resultado = React.useState(false)
const aplicado = resultado[0] // El valor
const setAplicado = resultado[1] // La función

// Destructuring hace esto más simple:
const [aplicado, setAplicado] = React.useState(false)
        
          
        
        
        
      

Cómo funciona el flujo

    Estado inicial: aplicado = false
    Usuario hace clic en el botón
    Se ejecuta handleAplicar
    Se llama setAplicado(true)
    React actualiza aplicado a true
    React re-renderiza el componente
    El botón muestra “¡Aplicado!”, cambia de estilo y se deshabilita

Todo esto automáticamente ✨
Usando el estado en el JSX

<button
  className={aplicado ? 'button-apply-job is-applied' : 'button-apply-job'}
  disabled={aplicado}
>
  {aplicado ? '¡Aplicado!' : 'Aplicar'}
</button>
        
          
        
        
        
      

Tres cosas cambian según el estado:

    className - Si aplicado es true, añade la clase is-applied
    disabled - Deshabilita el botón cuando aplicado es true
    Texto - Cambia de “Aplicar” a “¡Aplicado!”

    Nota sobre accesibilidad: Cuando cambias el estado de un botón dinámicamente (como cambiar el texto de “Aplicar” a “¡Aplicado!”), React actualiza el DOM y los lectores de pantalla generalmente detectan estos cambios automáticamente. El atributo disabled también se anuncia correctamente. Si necesitas anunciar cambios más complejos o importantes, considera usar aria-live regions o aria-label para proporcionar contexto adicional sobre el cambio de estado.

Operador ternario

{
  aplicado ? '¡Aplicado!' : 'Aplicar'
}
        
          
        
        
        
      

Esto es un operador ternario:

condición ? siVerdadero : siFalso
        
          
        
        
        
      

Es como un if/else en una línea:

// Con if/else (no funciona en JSX directamente)
if (aplicado) {
  return '¡Aplicado!'
} else {
  return 'Aplicar'
}

// Con operador ternario (funciona en JSX)
aplicado ? '¡Aplicado!' : 'Aplicar'
        
          
        
        
        
      

Comparación completa: Antes vs Ahora

Veamos todo el cambio de JavaScript vanilla a React con useState.
Antes (JavaScript vanilla)

En apply-button.js:

// Seleccionar elemento
const jobsListingSection = document.querySelector('.jobs-listings')

// Añadir evento
jobsListingSection.addEventListener('click', function (event) {
  const element = event.target
  if (element.classList.contains('button-apply-job')) {
    // Actualizar manualmente el DOM
    element.textContent = '¡Aplicado!'
    element.classList.add('is-applied')
    element.disabled = true
  }
})
        
          
        
        
        
      

Problemas:

    ❌ Manipulación manual del DOM
    ❌ No hay separación entre datos y UI
    ❌ Difícil de testear
    ❌ Propenso a errores
    ❌ Cada botón necesita lógica especial

Ahora (React con useState)

function JobCard({ titulo, empresa, ubicacion, descripcion }) {
  const [aplicado, setAplicado] = React.useState(false)

  return (
    <button onClick={() => setAplicado(true)} disabled={aplicado}>
      {aplicado ? '¡Aplicado!' : 'Aplicar'}
    </button>
  )
}
        
          
        
        
        
      

Ventajas:

    ✅ No manipulas el DOM manualmente
    ✅ El estado y la UI están sincronizados automáticamente
    ✅ Cada componente tiene su propio estado independiente
    ✅ Fácil de testear
    ✅ Declarativo: describes qué quieres, no cómo hacerlo

Cada componente tiene su propio estado

Mira esto: tenemos dos tarjetas de empleo:

<JobCard titulo="Frontend Developer" />
<JobCard titulo="Backend Developer" />
        
          
        
        
        
      

Cada una tiene su propio estado independiente:

    Si aplicas al primero, solo el primero cambia
    El segundo mantiene su estado original
    No se interfieren entre sí

¿Por qué?

Porque cada vez que usas <JobCard />, React crea una instancia nueva con su propio estado.
Reglas de useState
1. Solo en el nivel superior

// ✅ Correcto: en el nivel superior del componente
function JobCard() {
  const [aplicado, setAplicado] = React.useState(false)
  return <button>Aplicar</button>
}

// ❌ Incorrecto: dentro de un if
function JobCard() {
  if (algo) {
    const [aplicado, setAplicado] = React.useState(false) // Error!
  }
  return <button>Aplicar</button>
}

// ❌ Incorrecto: dentro de un loop
function JobCard() {
  for (let i = 0; i < 10; i++) {
    const [aplicado, setAplicado] = React.useState(false) // Error!
  }
  return <button>Aplicar</button>
}
        
          
        
        
        
      

2. Solo en componentes de React

// ✅ Correcto: en un componente
function MiComponente() {
  const [estado, setEstado] = React.useState(0)
}

// ❌ Incorrecto: en una función normal
function miFuncion() {
  const [estado, setEstado] = React.useState(0) // Error!
}
        
          
        
        
        
      

3. Nunca modificar el estado directamente

const [aplicado, setAplicado] = React.useState(false)

// ❌ Incorrecto: modificar directamente
aplicado = true // No funciona y es un error

// ✅ Correcto: usar la función set
setAplicado(true)
        
          
        
        
        
      

Tipos de valores en useState

Puedes usar useState con cualquier tipo de valor:
Booleanos

const [activo, setActivo] = React.useState(false)
const [visible, setVisible] = React.useState(true)
        
          
        
        
        
      

Números

const [contador, setContador] = React.useState(0)
const [edad, setEdad] = React.useState(25)
        
          
        
        
        
      

Strings

const [nombre, setNombre] = React.useState('')
const [mensaje, setMensaje] = React.useState('Hola')
        
          
        
        
        
      

Arrays

const [empleos, setEmpleos] = React.useState([])
const [numeros, setNumeros] = React.useState([1, 2, 3])
        
          
        
        
        
      

Objetos

const [usuario, setUsuario] = React.useState({ nombre: 'Miguel', edad: 25 })
const [config, setConfig] = React.useState({ tema: 'oscuro', idioma: 'es' })
        
          
        
        
        
      

Ejemplo práctico: Contador

Veamos otro ejemplo simple para entender mejor useState:

function Contador() {
  const [count, setCount] = React.useState(0)

  return (
    <div>
      <p>Has hecho clic {count} veces</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
      <button onClick={() => setCount(count - 1)}>Decrementar</button>
      <button onClick={() => setCount(0)}>Resetear</button>
    </div>
  )
}
        
          
        
        
        
      

¿Qué pasa aquí?

    Estado inicial: count = 0
    Cada clic actualiza el estado
    React re-renderiza mostrando el nuevo valor

Múltiples estados en un componente

Puedes tener varios estados en el mismo componente:

function JobCard({ titulo, empresa }) {
  const [aplicado, setAplicado] = React.useState(false)
  const [guardado, setGuardado] = React.useState(false)
  const [likes, setLikes] = React.useState(0)

  return (
    <article>
      <h3>{titulo}</h3>
      <button onClick={() => setAplicado(true)} disabled={aplicado}>
        {aplicado ? '¡Aplicado!' : 'Aplicar'}
      </button>
      <button onClick={() => setGuardado(!guardado)}>
        {guardado ? '❤️ Guardado' : '🤍 Guardar'}
      </button>
      <button onClick={() => setLikes(likes + 1)}>👍 {likes}</button>
    </article>
  )
}
        
          
        
        
        
      

Cada estado es independiente y se puede actualizar por separado.
Actualizando estado basado en el valor anterior

A veces necesitas actualizar el estado basándote en su valor anterior:

function Contador() {
  const [count, setCount] = React.useState(0)

  // ✅ Forma correcta: usando una función
  const incrementar = () => {
    setCount((prevCount) => prevCount + 1)
  }

  // ⚠️ Forma simple: funciona pero puede tener problemas
  const incrementarSimple = () => {
    setCount(count + 1)
  }

  return <button onClick={incrementar}>Incrementar</button>
}
        
          
        
        
        
      

¿Cuándo usar la función?

Cuando necesitas hacer múltiples actualizaciones seguidas o cuando el nuevo valor depende del anterior.
Lo que hemos aprendido

En esta clase has aprendido:

    🧠 Qué es el estado - La memoria del componente
    🎯 Cómo usar useState - Crear y actualizar estado
    🔄 Flujo de actualización - Cómo React re-renderiza componentes
    🎨 Estado en JSX - Usar el estado para cambiar la UI
    ⚡ Comparación con vanilla JS - Mucho más simple y automático
    🔑 Reglas de useState - Dónde y cómo usarlo
    📊 Tipos de valores - Booleanos, números, strings, arrays, objetos
    🔢 Múltiples estados - Varios useState en un componente

En la próxima clase aprenderemos a renderizar listas de elementos dinámicamente usando .map(), para no tener que escribir cada <JobCard /> manualmente.

    💡 Recuerda: El estado es la memoria del componente. Cuando el estado cambia, React re-renderiza automáticamente. Nunca modifiques el estado directamente, siempre usa la función set.

---
<a id="renderizado-y-virtual-dom"></a>
Renderizado y Virtual DOM

Ya sabemos que cuando cambiamos el estado con useState, la interfaz se actualiza automáticamente. Pero ¿qué está pasando por debajo? ¿Cómo sabe React qué actualizar? En esta clase vamos a entenderlo.
¿Qué significa “renderizar”?

Renderizar es el proceso de ejecutar tu componente (tu función) para generar el JSX que se mostrará en pantalla.

function Saludo() {
  return <h1>Hola</h1>
}

// Cuando React "renderiza" Saludo:
// 1. Ejecuta la función Saludo()
// 2. Obtiene el JSX: <h1>Hola</h1>
// 3. Lo convierte en elementos del DOM
        
          
        
        
        
      

Re-renderizado: Cuando cambia el estado

Cuando cambias el estado, React vuelve a ejecutar tu función componente. Veamos esto en acción con nuestro componente JobCard.
Añadiendo console.log para verlo

Actualiza tu componente JobCard para incluir un console.log:

function JobCard({ titulo, empresa, ubicacion, descripcion }) {
  // ¡Añadimos esto para ver cuándo se ejecuta!
  console.log('🔄 JobCard se está renderizando. Título:', titulo)

  // Estado: ¿el usuario aplicó a este empleo?
  const [aplicado, setAplicado] = React.useState(false)

  const handleAplicar = () => {
    console.log('👆 Click en aplicar')
    setAplicado(true) // Cambiamos el estado a true
  }

  console.log('📊 Estado actual de aplicado:', aplicado)

  return (
    <article className="job-listing-card">
      <div>
        <h3>{titulo}</h3>
        <small>
          {empresa} | {ubicacion}
        </small>
        <p>{descripcion}</p>
      </div>
      <button
        className={aplicado ? 'button-apply-job is-applied' : 'button-apply-job'}
        onClick={handleAplicar}
        disabled={aplicado}
      >
        {aplicado ? '¡Aplicado!' : 'Aplicar'}
      </button>
    </article>
  )
}
        
          
        
        
        
      

Prueba esto

    Abre tu navegador con el archivo
    Abre la consola (F12)
    Observa los mensajes iniciales
    Haz click en “Aplicar”
    Mira qué pasa en la consola

Verás algo así:

🔄 JobCard se está renderizando. Título: Desarrollador Frontend
📊 Estado actual de aplicado: false
🔄 JobCard se está renderizando. Título: Ingeniero de Software Senior
📊 Estado actual de aplicado: false
        
          
        
        
        
      

Y cuando haces click en el primer botón:

👆 Click en aplicar
🔄 JobCard se está renderizando. Título: Desarrollador Frontend
📊 Estado actual de aplicado: true
        
          
        
        
        
      

¿Qué está pasando?

    Renderizado inicial:
        React ejecuta cada componente JobCard
        aplicado empieza en false
        Se muestra “Aplicar”

    Usuario hace click:
        Se ejecuta handleAplicar
        Llama a setAplicado(true)

    React detecta el cambio de estado:
        Vuelve a ejecutar la función JobCard
        Esta vez aplicado es true
        Genera nuevo JSX con “¡Aplicado!”
        Actualiza solo ese botón en el DOM

Importante: La función componente se ejecuta completamente de nuevo cada vez que el estado cambia.
El ciclo de vida del renderizado

┌─────────────────────────────────────────┐
│  1. Renderizado inicial                 │
│     • React ejecuta el componente       │
│     • useState devuelve valor inicial   │
│     • Se genera JSX                     │
│     • Se muestra en el DOM              │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  2. Usuario interactúa                  │
│     • Hace click en el botón            │
│     • Se ejecuta handleAplicar          │
│     • Se llama setAplicado(true)        │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  3. Re-renderizado                      │
│     • React ejecuta el componente otra vez │
│     • useState devuelve el nuevo valor  │
│     • Se genera nuevo JSX               │
│     • React compara con el anterior     │
│     • Actualiza solo lo que cambió      │
└─────────────────────────────────────────┘
        
          
        
        
        
      

¿Por qué no se pierde el estado?

Te estarás preguntando: “Si la función se ejecuta de nuevo, ¿por qué aplicado no vuelve a false?”

Buena pregunta. La respuesta es que React guarda el estado fuera del componente.

function JobCard() {
  const [aplicado, setAplicado] = React.useState(false)
  // ↑ Esto NO crea un nuevo estado cada vez
  // React lo mantiene guardado y te lo devuelve
}
        
          
        
        
        
      

Cómo funciona:

    Primera vez: React crea el estado con el valor inicial (false)
    Siguientes veces: React ignora el valor inicial y te devuelve el estado guardado

Es como si React tuviera una caja con tu estado:

React mantiene internamente:
{
  componente: JobCard,
  posición: 0,
  estado: true  ← Este valor se mantiene entre renders
}
        
          
        
        
        
      

Virtual DOM: La magia de React

Ahora la gran pregunta: ¿Cómo actualiza React solo lo que cambió?
El problema sin Virtual DOM

Si actualizáramos el DOM manualmente cada vez:

// Esto es ineficiente
element.innerHTML = '<button>¡Aplicado!</button>' // Recrea todo el elemento
        
          
        
        
        
      

Recrear elementos del DOM es lento y puede causar:

    ❌ Pérdida de foco en inputs
    ❌ Pérdida de posición de scroll
    ❌ Animaciones que se reinician
    ❌ Rendimiento pobre

La solución: Virtual DOM

React usa un Virtual DOM (DOM Virtual):

    Es una copia ligera del DOM real en JavaScript
    Es solo un objeto en memoria (muy rápido)
    React lo usa para comparar antes y después

¿Cómo funciona?

┌──────────────────────────────────────────────┐
│  1. Estado actual                            │
│     Virtual DOM antiguo:                     │
│     <button>Aplicar</button>                 │
└──────────────────────────────────────────────┘
            ↓
┌──────────────────────────────────────────────┐
│  2. Cambio de estado                         │
│     setAplicado(true)                        │
└──────────────────────────────────────────────┘
            ↓
┌──────────────────────────────────────────────┐
│  3. Nuevo Virtual DOM                        │
│     React re-ejecuta el componente           │
│     Genera nuevo Virtual DOM:                │
│     <button disabled>¡Aplicado!</button>     │
└──────────────────────────────────────────────┘
            ↓
┌──────────────────────────────────────────────┐
│  4. Comparación (Diffing)                    │
│     React compara los dos Virtual DOMs       │
│     Encuentra las diferencias:               │
│     • Texto cambió: "Aplicar" → "¡Aplicado!" │
│     • Se añadió atributo: disabled           │
│     • Clase cambió: se añadió "is-applied"   │
└──────────────────────────────────────────────┘
            ↓
┌──────────────────────────────────────────────┐
│  5. Actualización mínima (Reconciliation)    │
│     React actualiza SOLO lo que cambió:      │
│     • element.textContent = '¡Aplicado!'     │
│     • element.disabled = true                │
│     • element.classList.add('is-applied')    │
└──────────────────────────────────────────────┘
        
          
        
        
        
      

Ejemplo visual

Imagina que tienes esto:

function JobCard({ titulo }) {
  const [aplicado, setAplicado] = React.useState(false)

  return (
    <article>
      <h3>{titulo}</h3>
      <p>Descripción del empleo...</p>
      <button onClick={() => setAplicado(true)}>{aplicado ? '¡Aplicado!' : 'Aplicar'}</button>
    </article>
  )
}
        
          
        
        
        
      

Cuando haces click:

Virtual DOM antes:          Virtual DOM después:
┌─────────────────┐        ┌─────────────────┐
│ <article>       │        │ <article>       │
│   <h3>Título</h3>│        │   <h3>Título</h3>│  ← Sin cambios
│   <p>Desc...</p>│        │   <p>Desc...</p>│  ← Sin cambios
│   <button>      │        │   <button>      │
│     Aplicar     │   ≠    │     ¡Aplicado!  │  ← ¡CAMBIÓ!
│   </button>     │        │   </button>     │
│ </article>      │        │ </article>      │
└─────────────────┘        └─────────────────┘

React actualiza solo:
→ button.textContent = '¡Aplicado!'
        
          
        
        
        
      

No toca el <h3> ni el <p> porque no cambiaron. ¡Súper eficiente!
Ventajas del Virtual DOM
1. Rendimiento optimizado

// Si tienes 100 empleos y cambias uno:
<div>
  <JobCard /> ← No se actualiza
  <JobCard /> ← No se actualiza
  <JobCard /> ← SOLO ESTE se actualiza
  <JobCard /> ← No se actualiza ...97 más
</div>
        
          
        
        
        
      

React solo actualiza el componente que cambió, no los otros 99.
2. Batch Updates (Agrupación de actualizaciones)

React agrupa múltiples cambios de estado:

function JobCard() {
  const [aplicado, setAplicado] = React.useState(false)
  const [guardado, setGuardado] = React.useState(false)

  const handleAplicar = () => {
    setAplicado(true)
    setGuardado(true)
    // React agrupa estos dos cambios
    // y hace UN SOLO re-render, no dos
  }
}
        
          
        
        
        
      

3. Previene actualizaciones innecesarias

Si intentas poner el mismo valor:

const [count, setCount] = React.useState(0)

setCount(0) // Ya es 0
// React detecta que no cambió y NO re-renderiza
        
          
        
        
        
      

Comparación: Vanilla JS vs React
Vanilla JS

// Tienes que actualizar TODO manualmente
button.textContent = '¡Aplicado!'
button.classList.add('is-applied')
button.disabled = true

// Si te olvidas de algo, hay inconsistencias
        
          
        
        
        
      

React con Virtual DOM

// Solo cambias el estado
setAplicado(true)

// React se encarga de:
// 1. Re-ejecutar el componente
// 2. Generar nuevo Virtual DOM
// 3. Comparar con el anterior
// 4. Actualizar solo lo necesario
        
          
        
        
        
      

Cuando NO se re-renderiza

El componente NO se re-renderiza cuando:

function JobCard() {
  // ❌ Variables normales NO causan re-render
  let contador = 0
  contador = contador + 1 // Esto NO actualiza la UI

  // ✅ Solo useState causa re-render
  const [aplicado, setAplicado] = React.useState(false)
  setAplicado(true) // Esto SÍ actualiza la UI
}
        
          
        
        
        
      

Variables normales se resetean en cada render:

function JobCard() {
  let contador = 0
  console.log(contador) // Siempre 0

  const handleClick = () => {
    contador++ // Se incrementa...
    console.log(contador) // ...pero se pierde en el próximo render
  }
}
        
          
        
        
        
      

Re-renderizado por props

Un componente también se re-renderiza cuando sus props cambian:

function App() {
  const [titulo, setTitulo] = React.useState('Frontend Developer')

  return (
    <>
      <JobCard titulo={titulo} />
      <button onClick={() => setTitulo('Backend Developer')}>Cambiar</button>
    </>
  )
}

// Cuando setTitulo cambia:
// 1. App se re-renderiza
// 2. JobCard recibe nueva prop
// 3. JobCard también se re-renderiza
        
          
        
        
        
      

Visualizando los re-renders

Puedes ver qué componentes se re-renderizan añadiendo console.log:

function App() {
  console.log('🟢 App se renderiza')
  const [count, setCount] = React.useState(0)

  return (
    <>
      <Counter count={count} />
      <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  )
}

function Counter({ count }) {
  console.log('🔵 Counter se renderiza con count:', count)
  return <p>Count: {count}</p>
}
        
          
        
        
        
      

Al hacer click verás:

🟢 App se renderiza
🔵 Counter se renderiza con count: 1
        
          
        
        
        
      

Ambos se re-renderizan porque:

    App cambió su estado
    Counter recibió una nueva prop

Lo que hemos aprendido de los renderizados y el Virtual DOM

    🔄 Qué es renderizar - Ejecutar el componente para generar JSX
    🎯 Re-renderizado - Cuando cambia el estado, React vuelve a ejecutar el componente
    🧠 Estado persistente - React guarda el estado entre renders
    🌳 Virtual DOM - Copia ligera del DOM en JavaScript
    ⚡ Diffing - React compara Virtual DOMs para encontrar cambios
    🎨 Reconciliation - React actualiza solo lo que cambió
    📊 Batch Updates - React agrupa múltiples cambios
    🔍 Optimización - React previene actualizaciones innecesarias

En la próxima clase aprenderemos a renderizar listas de elementos dinámicamente usando .map() y la importancia de la prop key.

    💡 Recuerda: Cuando el estado cambia, React re-ejecuta el componente, compara el Virtual DOM antiguo con el nuevo, y actualiza solo lo que cambió en el DOM real. ¡Por eso React es tan rápido!

----
<a id="vite-empaquetador-moderno"></a>
Vite: Empaquetador moderno

Hasta ahora hemos usado React directamente en el navegador con un simple archivo HTML. Esto está bien para aprender, pero en proyectos reales necesitamos herramientas más potentes. Aquí es donde entra Vite.
¿Qué es un empaquetador?

Un empaquetador (o bundler en inglés) es una herramienta que toma todos tus archivos (JavaScript, CSS, imágenes, etc.) y los procesa, optimiza y empaqueta para que funcionen perfectamente en el navegador.
El problema que resuelven

Cuando trabajas en una aplicación real, típicamente tienes:

proyecto/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── JobCard.jsx
│   │   └── ... (decenas de componentes)
│   ├── utils/
│   │   ├── api.js
│   │   └── helpers.js
│   ├── styles/
│   │   ├── main.css
│   │   ├── components.css
│   │   └── variables.css
│   └── App.jsx
└── index.html
        
          
        
        
        
      

Problemas sin un empaquetador:

    ❌ Tienes que cargar cada archivo manualmente con <script>
    ❌ El orden de los archivos importa (pueden fallar si no están en orden)
    ❌ No puedes usar import/export de ES6 directamente en todos los navegadores
    ❌ El navegador tiene que hacer cientos de peticiones HTTP (muy lento)
    ❌ No hay optimización del código
    ❌ No puedes usar Sass u otras herramientas modernas fácilmente

Solución con un empaquetador:

Tus archivos → Empaquetador → Archivos optimizados para producción
  (100+ archivos)                      (1-3 archivos)
        
          
        
        
        
      

El empaquetador:

    ✅ Combina múltiples archivos en uno o pocos archivos
    ✅ Transforma código moderno a código compatible con navegadores antiguos
    ✅ Elimina código no utilizado (tree shaking)
    ✅ Minifica el código (lo hace más pequeño)
    ✅ Optimiza imágenes
    ✅ Gestiona dependencias automáticamente

¿Qué es Vite?

Vite (palabra francesa que significa “rápido”) es un empaquetador moderno creado por Evan You, el mismo creador de Vue.js.
Características principales

🚀 Extremadamente rápido

    Arranca el servidor de desarrollo en milisegundos
    Recarga instantánea al hacer cambios

⚡ Hot Module Replacement (HMR)

    Cuando cambias el código, solo actualiza lo que cambió
    No recarga toda la página
    El estado de tu aplicación se mantiene

📦 Empaquetado optimizado

    Usa esbuild para el desarrollo (escrito en Go, muy rápido)
    Usa Rollup para producción (mejor optimización)

🔧 Configuración mínima

    Funciona out-of-the-box (sin configuración)
    Soporte para React, Vue y otros frameworks por defecto

🎨 Ecosistema moderno

    Soporte para CSS Modules, PostCSS, Sass
    Importación de imágenes, JSON, etc.
    Plugins para extender funcionalidad

¿Quién creó Vite y por qué?

Evan You creó Vite en 2020 porque los empaquetadores tradicionales como Webpack eran lentos en proyectos grandes.
Comparación con otros empaquetadores
Webpack

Webpack fue el empaquetador más popular durante años. Es muy potente pero lento en proyectos grandes y con una configuración compleja.
esbuild

esbuild es un empaquetador escrito en Go, extremadamente rápido.

Ventajas:
✅ El más rápido (10-100x más que otros)
✅ Muy simple

Desventajas:
❌ Menos maduro
❌ Menos plugins
❌ No tan optimizado para producción
        
          
        
        
        
      

Nota: Vite, a día de hoy (octubre 2025), usa esbuild internamente para el desarrollo.
Turbopack

Turbopack es el nuevo empaquetador de Vercel (creadores de Next.js), escrito en Rust.

Ventajas:
✅ Muy rápido
✅ Diseñado para Next.js

Desventajas:
❌ Aún en beta (no estable)
❌ Solo funciona con Next.js por ahora
        
          
        
        
        
      

¿Por qué Vite es ideal para React?
1. Configuración instantánea

Un proyecto React con Vite se crea y está listo para trabajar en segundos. No necesitas configurar nada.
2. Fast Refresh

Vite incluye Fast Refresh para React:

// Cambias esto:
function App() {
  return <h1>Hola</h1>
}

// A esto:
function App() {
  return <h1>Hola Mundo</h1>
}

// Y se actualiza INSTANTÁNEAMENTE sin perder el estado
        
          
        
        
        
      

Si tienes un formulario con datos, no se pierden al hacer cambios en el código.
3. Importaciones naturales

Puedes importar todo tipo de archivos:

// Componentes
import Header from './components/Header.jsx'

// CSS
import './styles/app.css'

// Imágenes
import logo from './assets/logo.png'

// JSON
import data from './data.json'
        
          
        
        
        
      

4. Build optimizado

Para producción, Vite te genera:

    ✅ Código minificado
    ✅ Tree shaking (elimina código no usado)
    ✅ Code splitting (divide el código en chunks)
    ✅ Assets optimizados
    ✅ Todo listo para subir a producción

Arquitectura de Vite

Vite funciona de manera diferente en desarrollo vs producción:
En desarrollo

Navegador solicita index.html
       ↓
Vite envía index.html
       ↓
Navegador pide App.jsx
       ↓
Vite transforma App.jsx on-demand
       ↓
Navegador pide componentes importados
       ↓
Vite transforma solo lo necesario
        
          
        
        
        
      

Ventaja: Solo procesa lo que realmente se usa. Arranque instantáneo.
En producción

Vite usa Rollup
       ↓
Procesa y optimiza TODO
       ↓
Genera archivos estáticos optimizados
       ↓
dist/
├── index.html
├── assets/
│   ├── index-a1b2c3d4.js  (minificado)
│   └── index-e5f6g7h8.css (minificado)
        
          
        
        
        
      

Ventaja: Todo optimizado al máximo para rendimiento.
ES Modules: La tecnología detrás de Vite

Vite aprovecha los ES Modules nativos del navegador:

<!-- Los navegadores modernos entienden esto: -->
<script type="module">
  import { useState } from 'react'
  import App from './App.jsx'
</script>
        
          
        
        
        
      

Ventajas:

    🚀 No necesita empaquetar en desarrollo
    ⚡ Carga solo lo que se importa
    🔥 Hot Module Replacement más rápido

Compatibilidad:

    ✅ Chrome 61+
    ✅ Firefox 60+
    ✅ Safari 11+
    ✅ Edge 16+

(Todos los navegadores modernos)
El ecosistema de Vite

Vite tiene un ecosistema de plugins muy potente:

// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(), // Soporte para React
    // Puedes añadir más plugins aquí
  ],
})
        
          
        
        
        
      

Plugins populares:

    @vitejs/plugin-react - Soporte para React
    @vitejs/plugin-vue - Soporte para Vue
    vite-plugin-pwa - Progressive Web App
    vite-imagetools - Optimización de imágenes
    Y cientos más…

Repaso final de la clase

    📦 Qué es un empaquetador - Herramienta que procesa y optimiza tu código
    ⚡ Qué es Vite - Empaquetador moderno extremadamente rápido
    👨‍💻 Quién creó Vite - Evan You, creador de Vue.js
    🎯 Por qué Vite es rápido - Usa ES Modules nativos y procesa solo lo necesario
    📊 Comparación con otros - Webpack (tradicional), esbuild (velocidad), Turbopack (nuevo)
    🔥 Ventajas para React - Fast Refresh, configuración simple, importaciones naturales
    🏗️ Arquitectura - Desarrollo sin bundling, producción optimizada

En la próxima clase vamos a crear nuestro primer proyecto React con Vite y verás todas estas ventajas en acción.

    💡 Recuerda: Vite es la herramienta moderna recomendada para proyectos React. Es extremadamente rápido porque usa ES Modules nativos en desarrollo y solo procesa lo que realmente necesitas. ¡Prepárate para una experiencia de desarrollo increíblemente rápida!

----
<a id="instalacion-de-vite"></a>
Instalación de Vite

Hasta ahora hemos estado trabajando con React directamente en un archivo HTML, cargando React desde un CDN y usando Babel en el navegador. Esto está bien para aprender, pero no es lo que se hace en proyectos reales.

En esta clase vamos a crear un proyecto React profesional usando Vite, la herramienta de desarrollo moderna que usan las empresas.
¿Qué son Node.js y npm?

Antes de instalar Vite, necesitamos entender dos conceptos fundamentales.
Node.js

Node.js es un entorno de ejecución de JavaScript que te permite ejecutar JavaScript fuera del navegador, directamente en tu computadora.

# Puedes ejecutar JavaScript en la terminal
node script.js
        
          
        
        
        
      

¿Por qué lo necesitamos?

    🔧 Las herramientas de desarrollo (como Vite) están escritas en JavaScript
    📦 Necesitamos ejecutar estas herramientas en nuestra computadora
    ⚡ Node.js permite que Vite compile y transforme tu código

npm (Node Package Manager)

npm es el gestor de paquetes de Node.js. Es como una “tienda de aplicaciones” para código JavaScript.

¿Para qué sirve?

    📦 Instalar librerías - React, React Router, etc.
    🔧 Instalar herramientas - Vite, ESLint, etc.
    📝 Gestionar dependencias - Qué versión de cada librería usas
    🚀 Ejecutar scripts - Comandos para desarrollo y producción

Instalando Node.js

Si no tienes Node.js instalado:

    Ve a nodejs.org
    Descarga la versión LTS (Long Term Support)
    Instala siguiendo las instrucciones
    Verifica la instalación:

node --version
# Debería mostrar algo como: v22.x.x

npm --version
# Debería mostrar algo como: 11.x.x
        
          
        
        
        
      

Creando un proyecto con Vite

Ahora sí, vamos a crear nuestro proyecto React con Vite.
Paso 1: Crear el proyecto

Abre tu terminal y ejecuta:

npm create vite@latest
        
          
        
        
        
      

Este comando:

    Descarga la última versión de Vite
    Te hace algunas preguntas
    Crea un proyecto nuevo con la estructura necesaria

Paso 2: Responder las preguntas

Te preguntará:

1. Project name:

? Project name: › devjobs-react
        
          
        
        
        
      

Escribe el nombre de tu proyecto. Por ejemplo: devjobs-react

2. Select a framework:

? Select a framework: ›
  Vanilla
  Vue
❯ React
  Preact
  Lit
  Svelte
  Solid
  Qwik
  Others
        
          
        
        
        
      

Usa las flechas para seleccionar React y presiona Enter.

3. Select a variant:

? Select a variant: ›
  TypeScript
❯ TypeScript + SWC
  JavaScript
  JavaScript + SWC
        
          
        
        
        
      

Selecciona JavaScript + SWC y presiona Enter.
¿Por qué SWC?

SWC (Speedy Web Compiler) es un compilador ultra rápido escrito en Rust.

¿Qué hace SWC?

    Transforma JSX a JavaScript
    Transforma código moderno a código compatible
    Es 20-70x más rápido que Babel

SWC vs Babel:

Babel:        ████████████████ (100s)
SWC:          █ (5s)
        
          
        
        
        
      

¿Por qué lo usamos?

    ⚡ Velocidad - Compilación casi instantánea
    🎯 Mismo resultado - Hace lo mismo que Babel pero más rápido
    🔥 Hot Reload más rápido - Los cambios se ven instantáneamente

Paso 3: Instalar dependencias

Una vez creado el proyecto, entra a la carpeta:

cd devjobs-react
        
          
        
        
        
      

E instala las dependencias:

npm install
        
          
        
        
        
      

Esto instala:

    ✅ React y React DOM
    ✅ Vite
    ✅ SWC
    ✅ Otras herramientas necesarias

¿Qué está pasando?

npm lee el archivo package.json que Vite creó, descarga todas las librerías listadas y las guarda en una carpeta llamada node_modules/.
Paso 4: Iniciar el servidor de desarrollo

npm run dev
        
          
        
        
        
      

Verás algo como:

  VITE v7.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
        
          
        
        
        
      

Abre tu navegador en http://localhost:5173/ y verás tu aplicación React funcionando.
Estructura del proyecto

Vite crea esta estructura de carpetas:

devjobs-react/
├── node_modules/       # Dependencias instaladas (no tocar)
├── public/             # Archivos estáticos (imágenes, etc.)
│   └── vite.svg
├── src/                # Tu código fuente
│   ├── assets/         # Recursos (imágenes, CSS, etc.)
│   │   └── react.svg
│   ├── App.css         # Estilos del componente App
│   ├── App.jsx         # Componente principal
│   ├── index.css       # Estilos globales
│   └── main.jsx        # Punto de entrada de la aplicación
├── .gitignore          # Archivos que Git debe ignorar
├── index.html          # HTML principal
├── package.json        # Configuración del proyecto y dependencias
├── package-lock.json   # Versiones exactas de dependencias
└── vite.config.js      # Configuración de Vite
        
          
        
        
        
      

Archivos importantes

Veamos los archivos más importantes y qué hace cada uno.
1. index.html - El HTML principal

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
        
          
        
        
        
      

¿Qué hace?

    Define el <div id="root"> donde React renderizará la aplicación
    Carga el archivo main.jsx como módulo
    Es el punto de entrada HTML de tu aplicación

Diferencias con lo que hacíamos antes:

<!-- Antes: cargábamos React desde CDN -->
<script src="https://esm.sh/react"></script>

<!-- Ahora: Vite lo gestiona por nosotros -->
<script type="module" src="/src/main.jsx"></script>
        
          
        
        
        
      

2. main.jsx - Punto de entrada de React

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
        
          
        
        
        
      

¿Qué hace?

    Importa React - Desde node_modules/ (no desde CDN)
    Importa ReactDOM - Para renderizar en el navegador
    Importa App - Tu componente principal
    Importa estilos - CSS global
    Renderiza la aplicación - En el <div id="root">

React.StrictMode:

<React.StrictMode>
  <App />
</React.StrictMode>
        
          
        
        
        
      

Es un componente especial que:

    Detecta problemas potenciales en tu código
    Solo funciona en desarrollo (no afecta producción)
    Hace que los componentes se rendericen dos veces para encontrar bugs

    💡 Nota sobre los archivos .jsx: Los archivos con extensión .jsx le indican a Vite que contienen código JSX que necesita ser compilado. Vite detecta automáticamente estos archivos y los transforma usando SWC.

3. App.jsx - Componente principal

import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
    </div>
  )
}

export default App
        
          
        
        
        
      

¿Qué hace?

    Define el componente principal de tu aplicación
    Usa useState (ya no necesitas React.useState)
    Exporta el componente para que main.jsx pueda importarlo

Diferencias importantes:

// Antes (en HTML)
const [count, setCount] = React.useState(0)

// Ahora (con módulos)
import { useState } from 'react'
const [count, setCount] = useState(0)
        
          
        
        
        
      

4. package.json - Configuración del proyecto

{
  "name": "devjobs-react",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react-swc": "^4.1.0",
    "vite": "^7.0.0"
  }
}
        
          
        
        
        
      

Secciones importantes:

    scripts - Comandos que puedes ejecutar:
        npm run dev - Inicia el servidor de desarrollo
        npm run build - Crea la versión de producción
        npm run preview - Vista previa de la build de producción

    dependencies - Librerías que tu app necesita:
        react - La biblioteca de React
        react-dom - Para renderizar en el navegador

    devDependencies - Herramientas de desarrollo:
        vite - El build tool
        @vitejs/plugin-react-swc - Plugin para usar SWC con React

5. vite.config.js - Configuración de Vite

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
})
        
          
        
        
        
      

¿Qué hace?

    Configura Vite para usar el plugin de React con SWC
    Por ahora no necesitas modificar este archivo

Comandos útiles
Desarrollo

npm run dev
        
          
        
        
        
      

Inicia el servidor de desarrollo en http://localhost:5173/

Características:

    🔥 Hot Module Replacement - Los cambios se ven al instante
    ⚡ Rápido - Inicia en menos de 1 segundo
    🐛 Mensajes de error claros - En el navegador y consola

Build para producción

npm run build
        
          
        
        
        
      

Crea una versión optimizada en la carpeta dist/:

    📦 Código minificado - Más pequeño y rápido
    🗜️ CSS optimizado - Comprimido y sin duplicados
    🎯 Assets optimizados - Imágenes, fuentes, etc.
    🔢 Code splitting - Divide el código en chunks

Vista previa de producción

npm run preview
        
          
        
        
        
      

Sirve la build de producción localmente para probarla antes de desplegar.
Diferencias clave con el HTML directo
Antes (HTML + CDN)

<script src="https://esm.sh/react"></script>
<script src="https://unpkg.com/@babel/standalone"></script>
<script type="text/babel">
  const [count, setCount] = React.useState(0)
  // Todo en un solo archivo
</script>
        
          
        
        
        
      

Problemas:

    ❌ Babel en el navegador (lento)
    ❌ Un solo archivo (difícil de mantener)
    ❌ No hay Hot Reload
    ❌ No optimizado

Ahora (Vite + npm)

// src/App.jsx
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  // ...
}
        
          
        
        
        
      

Ventajas:

    ✅ SWC compila antes (rápido)
    ✅ Múltiples archivos (organizado)
    ✅ Hot Reload instantáneo
    ✅ Optimizado para producción

Extensiones de archivos: .jsx

Una cosa importante a entender es por qué usamos la extensión .jsx en lugar de solo .js.
¿Qué significa .jsx?

Los archivos con extensión .jsx indican que contienen código JSX que necesita ser transformado:

// App.jsx - Vite sabe que tiene JSX
function App() {
  return <h1>Hola</h1> // ← Esto es JSX
}
        
          
        
        
        
      

¿Por qué es importante?

    Vite detecta automáticamente qué archivos necesitan compilación
    Mejor para editores - Tu IDE sabe que puede haber JSX
    Convención clara - Otros desarrolladores saben qué esperar
    Optimización - Vite puede optimizar mejor estos archivos

.js vs .jsx

App.js   ← JavaScript puro (sin JSX)
App.jsx  ← JavaScript con JSX
        
          
        
        
        
      

¿Puedes usar .js con JSX?

Técnicamente sí, Vite lo detectará, pero es mejor usar .jsx para ser explícito:

// ✅ Recomendado: .jsx para archivos con JSX
// src/App.jsx
export default function App() {
  return <h1>Hola</h1>
}

// ⚠️ Funciona pero no es convención: .js con JSX
// src/App.js
export default function App() {
  return <h1>Hola</h1>
}
        
          
        
        
        
      

Resumen de la clase

    🎯 Node.js y npm - Qué son y por qué los necesitamos
    ⚡ Vite - Herramienta de desarrollo moderna y rápida
    🚀 SWC - Compilador ultra rápido para JSX
    📦 Crear proyecto - Con npm create vite@latest
    📁 Estructura de carpetas - Qué hace cada archivo
    🔑 Punto de entrada - index.html y main.jsx
    📝 Extensión .jsx - Para indicar archivos con JSX
    🛠️ Comandos útiles - dev, build, preview

En la próxima clase empezaremos a migrar nuestra aplicación DevJobs a este nuevo proyecto de Vite, creando componentes organizados en archivos separados.

    💡 Recuerda: Vite + SWC es la combinación moderna para desarrollo React. Es rápido, simple y es lo que usan las empresas actualmente.
----
<a id="fast-refresh"></a>
Fast Refresh y Actualizaciones de Estado

En esta clase vamos a entender dos conceptos importantes: Fast Refresh (una característica que hace que tu desarrollo sea más rápido) y la forma correcta de actualizar el estado cuando depende de su valor anterior.
¿Qué es Fast Refresh?

Fast Refresh es una tecnología específica de React que preserva el estado de tus componentes cuando guardas cambios en el código.
Ejemplo práctico

Imagina que estás desarrollando un contador:

function Contador() {
  const [count, setCount] = React.useState(0)

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  )
}
        
          
        
        
        
      

Sin Fast Refresh:

    Has clickeado varias veces, el contador está en 15
    Cambias el texto “Incrementar” por “Sumar”
    Guardas el archivo
    La página se recarga completamente
    ❌ El contador vuelve a 0

Con Fast Refresh:

    Has clickeado varias veces, el contador está en 15
    Cambias el texto “Incrementar” por “Sumar”
    Guardas el archivo
    El componente se actualiza
    ✅ El contador sigue en 15

¡El estado se mantiene! Esto es súper útil cuando estás desarrollando.
Fast Refresh vs Hot Module Replacement (HMR)

Aunque parecen lo mismo, hay una diferencia importante:
Hot Module Replacement (HMR)

    🔧 Tecnología genérica para cualquier tipo de código
    📦 Funciona con JavaScript, CSS, imágenes, etc.
    🔄 Reemplaza módulos sin recargar la página
    ⚠️ No preserva el estado automáticamente
    💻 Usado por Vite, Webpack, Parcel, etc.

HMR: "Cambió el archivo CSS → Actualizo solo el CSS"
HMR: "Cambió el archivo JS → Actualizo ese módulo"
        
          
        
        
        
      

Fast Refresh

    ⚛️ Tecnología específica de React
    🎯 Solo funciona con componentes de React
    💾 Preserva el estado de los componentes inteligentemente
    🔄 Re-renderiza solo los componentes que cambiaron
    ✨ Construido sobre HMR (lo usa por debajo)

Fast Refresh: "Cambió el componente → Actualizo Y mantengo el estado"
        
          
        
        
        
      

En resumen

HMR = Reemplaza código sin recargar la página
Fast Refresh = HMR + Preservar estado de React
        
          
        
        
        
      

Fast Refresh usa HMR como base, pero añade inteligencia específica de React para mantener el estado.
Actualizando estado: Callback vs Valor directo

Ahora vamos a ver un problema común al actualizar el estado y cómo solucionarlo.
El problema

Intenta adivinar qué pasa cuando haces click en este botón:

function Contador() {
  const [count, setCount] = React.useState(0)

  const incrementarTresVeces = () => {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={incrementarTresVeces}>+3</button>
    </div>
  )
}
        
          
        
        
        
      

¿El resultado? ❌ Solo suma 1, no 3
¿Por qué pasa esto?

Cuando llamas a setCount, React no actualiza el estado inmediatamente. Lo hace de forma asíncrona.

const incrementarTresVeces = () => {
  // En este momento, count = 0
  setCount(count + 1) // Programa: "poner en 0 + 1 = 1"
  setCount(count + 1) // Programa: "poner en 0 + 1 = 1"
  setCount(count + 1) // Programa: "poner en 0 + 1 = 1"
  // count sigue siendo 0 aquí

  // React aplica las actualizaciones después
  // Como todas dicen "poner en 1", el resultado es 1
}
        
          
        
        
        
      

Es como si dijeras tres veces: “pon el contador en 1”, en lugar de “suma 1 al contador”.
La solución: Usar un callback

La forma correcta es usar una función callback:

function Contador() {
  const [count, setCount] = React.useState(0)

  const incrementarTresVeces = () => {
    setCount((prevCount) => prevCount + 1)
    setCount((prevCount) => prevCount + 1)
    setCount((prevCount) => prevCount + 1)
  }

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={incrementarTresVeces}>+3</button>
    </div>
  )
}
        
          
        
        
        
      

Ahora sí funciona correctamente: ✅ Suma 3
¿Cómo funciona el callback?

setCount((prevCount) => prevCount + 1)
        
          
        
        
        
      

Le dices a React: “Dame el valor más reciente y yo te devuelvo el nuevo valor”

const incrementarTresVeces = () => {
  // Primera actualización
  setCount((prevCount) => prevCount + 1) // prevCount = 0 → devuelve 1

  // Segunda actualización
  setCount((prevCount) => prevCount + 1) // prevCount = 1 → devuelve 2

  // Tercera actualización
  setCount((prevCount) => prevCount + 1) // prevCount = 2 → devuelve 3

  // Resultado final: 3 ✅
}
        
          
        
        
        
      

React procesa las actualizaciones en orden, usando siempre el valor más reciente.
¿Cuándo usar cada forma?
Valor directo (forma simple)

// ✅ Bien: el nuevo valor NO depende del anterior
setNombre('Miguel')
setMostrar(true)
setColor('#ff0000')
        
          
        
        
        
      

Usa esta forma cuando el nuevo valor es independiente del valor actual.
Callback (forma con función)

// ✅ Bien: el nuevo valor depende del anterior
setCount((prev) => prev + 1)
setItems((prevItems) => [...prevItems, nuevoItem])
setVisible((prev) => !prev)
        
          
        
        
        
      

Usa esta forma cuando:

    ⚡ El nuevo valor depende del valor anterior
    🔄 Haces múltiples actualizaciones seguidas
    🎯 Quieres garantizar que usas el valor más reciente

Repaso final de la clase

    🔥 Fast Refresh - Tecnología de React que preserva el estado al guardar cambios
    🔄 HMR vs Fast Refresh - HMR es genérico, Fast Refresh es específico de React y preserva estado
    📝 Callback en setState - Usar función cuando el nuevo valor depende del anterior
    ⚡ Múltiples actualizaciones - El callback garantiza que uses el valor más reciente
    🎯 Cuándo usar cada forma - Valor directo para independientes, callback para dependientes

    💡 Recuerda: Usa setState((prev) => ...) cuando el nuevo valor depende del anterior. Fast Refresh hace que tu experiencia de desarrollo sea más fluida al mantener el estado mientras editas código.
----
<a id="migrando-devjobs"></a>
Migrando el Proyecto DevJobs a React

Ya tenemos nuestro proyecto React con Vite configurado. Ahora vamos a migrar nuestro proyecto DevJobs que teníamos en HTML puro a React.

La estrategia que vamos a seguir es simple:

    Empezar con todo el HTML en un solo componente
    Identificar problemas (como los comentarios HTML)
    Separar en componentes progresivamente

Creando el componente inicial con todo el HTML

Lo primero que haremos es crear un componente que contenga todo el HTML de nuestro proyecto DevJobs.

No te preocupes si al principio parece un componente gigante con mucho código. Este es el primer paso natural al migrar de HTML a React.
Copiando el HTML

Abre tu App.jsx y vamos a poner todo el HTML de DevJobs dentro del return:

function App() {
  return (
    <div>
      <!-- Aquí iría todo tu HTML de DevJobs -->
      <header>
        <nav>...</nav>
      </header>

      <main>
        <section>...</section>
      </main>

      <footer>
        <p>...</p>
      </footer>
    </div>
  )
}

export default App
        
          
        
        
        
      

Este es un buen primer paso. Tener todo en un componente nos permite:

    ✅ Verificar que el HTML funciona en React
    ✅ Identificar problemas de sintaxis
    ✅ Ver la aplicación funcionando antes de refactorizar

Problema con los comentarios HTML

Cuando copies tu HTML a JSX, te encontrarás con un error importante: los comentarios HTML no funcionan en JSX.
Comentarios en HTML vs JSX

En HTML normal escribíamos:

<!-- Este es un comentario en HTML -->
<div>Contenido</div>
        
          
        
        
        
      

Pero en JSX, esto da error:

// ❌ ESTO NO FUNCIONA
function App() {
  return (
    <div>
      <!-- Este comentario rompe JSX -->
      <h1>Hola</h1>
    </div>
  )
}
        
          
        
        
        
      

¿Por qué fallan los comentarios HTML?

Recuerda que JSX no es HTML, es JavaScript que se transforma a llamadas de React:

// Esto:
<div><!-- comentario --><h1>Hola</h1></div>

// Se intenta transformar a:
React.createElement('div', null, '<!-- comentario -->', React.createElement('h1', null, 'Hola'))

// ❌ Pero '<!-- comentario -->' no es válido en JavaScript
        
          
        
        
        
      

La solución: Comentarios en JSX

En JSX, los comentarios se escriben como expresiones de JavaScript:

// ✅ Así se comentan cosas en JSX
function App() {
  return (
    <div>
      {/* Este es un comentario en JSX */}
      <h1>Hola</h1>

      {/* 
        Los comentarios pueden
        ocupar múltiples líneas
      */}
      <p>Contenido</p>
    </div>
  )
}
        
          
        
        
        
      

Sintaxis:

{
  /* Tu comentario aquí */
}
        
          
        
        
        
      

    Empieza con {/*
    Termina con */}
    Es una expresión de JavaScript dentro de llaves

Reemplazando comentarios

Cuando migres tu HTML, busca todos los comentarios y reemplázalos:

// ❌ Antes (HTML)
<!-- Header principal -->
<header>
  <!-- Navegación -->
  <nav>...</nav>
</header>

// ✅ Después (JSX)
{/* Header principal */}
<header>
  {/* Navegación */}
  <nav>...</nav>
</header>
        
          
        
        
        
      

    💡 Tip: Puedes buscar en tu editor <!-- para encontrar todos los comentarios HTML y reemplazarlos por comentarios JSX.

Separando en componentes: Header y Footer

Ahora que tenemos todo funcionando en un solo componente, es hora de empezar a separar en componentes más pequeños.

Comenzaremos con los más fáciles: el Header y el Footer.
¿Por qué Header y Footer primero?

    🎯 Son independientes del resto de la aplicación
    📦 Tienen una responsabilidad clara
    🔄 No cambian frecuentemente
    ✅ Son fáciles de identificar y extraer

Creando el componente Header

Crea un nuevo archivo src/components/Header.jsx:

function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
          <h1>DevJobs</h1>
        </div>

        <ul>
          <li>
            <a href="#jobs">Trabajos</a>
          </li>
          <li>
            <a href="#about">Acerca</a>
          </li>
          <li>
            <a href="#contact">Contacto</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
        
          
        
        
        
      

Pasos que seguimos:

    Crear archivo nuevo - Header.jsx en carpeta components/
    Definir función - function Header() { ... }
    Copiar el HTML - Del <header> completo
    Exportar - export default Header

Creando el componente Footer

Crea otro archivo src/components/Footer.jsx:

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2024 DevJobs. Todos los derechos reservados.</p>

        <div className="social-links">
          <a href="#twitter">Twitter</a>
          <a href="#linkedin">LinkedIn</a>
          <a href="#github">GitHub</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
        
          
        
        
        
      

Usando los componentes en App

Ahora, en App.jsx, importa y usa estos componentes:

import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Header />

      <main>
        {/* Aquí seguirá el resto del contenido por ahora */}
        <section>
          <h2>Trabajos Disponibles</h2>
          {/* ... */}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
        
          
        
        
        
      

¿Qué ganamos?

    ✅ App.jsx más limpio - Menos líneas de código
    ✅ Componentes reutilizables - Puedes usar Header en otras páginas
    ✅ Más fácil de mantener - Cambios al header en un solo lugar
    ✅ Mejor organización - Cada cosa en su archivo

Estructura de carpetas

Tu proyecto ahora debería verse así:

src/
├── components/
│   ├── Header.jsx    # ← Nuevo
│   └── Footer.jsx    # ← Nuevo
├── App.jsx           # ← Modificado (usa Header y Footer)
└── main.jsx
        
          
        
        
        
      

Ventajas de separar en componentes
1. Código más organizado

// ❌ Todo en un archivo - Difícil de leer
function App() {
  return <div>{/* 500 líneas de HTML aquí... */}</div>
}

// ✅ Separado en componentes - Fácil de entender
function App() {
  return (
    <div>
      <Header />
      <JobList />
      <Footer />
    </div>
  )
}
        
          
        
        
        
      

2. Más fácil de mantener

Si necesitas cambiar el footer, solo editas Footer.jsx:

// Antes: buscar el footer entre 500 líneas
// Ahora: abrir Footer.jsx directamente
        
          
        
        
        
      

3. Reutilizable

Puedes usar el mismo Header en múltiples páginas:

// pages/Home.jsx
<Header />

// pages/Jobs.jsx
<Header />

// pages/About.jsx
<Header />
        
          
        
        
        
      

4. Testeable

Puedes probar cada componente individualmente:

// tests/Header.test.jsx
test('Header muestra el logo correctamente', () => {
  render(<Header />)
  // ...
})
        
          
        
        
        
      

Próximos pasos

Ahora que tenemos Header y Footer separados, en las siguientes clases vamos a:

    Separar la lista de trabajos en un componente JobList
    Crear componente para cada trabajo individual: JobCard
    Manejar el estado de los trabajos (favoritos, filtros, etc.)
    Agregar interactividad con eventos y estado

Patrón de migración

Este patrón que hemos seguido es muy común al migrar proyectos:

1. Todo en un componente
   └── Verificar que funciona

2. Identificar piezas independientes
   └── Header, Footer, etc.

3. Extraer a componentes
   └── Crear archivos separados

4. Importar y usar
   └── Componer en App.jsx

5. Repetir con piezas más complejas
   └── JobList, JobCard, etc.
        
          
        
        
        
      

Este enfoque progresivo es mejor que intentar separar todo de una vez.
Errores comunes al migrar
1. Olvidar cambiar class por className

// ❌ HTML
<div class="header">

// ✅ JSX
<div className="header">
        
          
        
        
        
      

2. No cerrar etiquetas self-closing

// ❌ HTML (funciona)
<img src="logo.png">
<input type="text">

// ✅ JSX (obligatorio cerrar)
<img src="logo.png" />
<input type="text" />
        
          
        
        
        
      

3. Olvidar el export

// ❌ Sin export - no se puede importar
function Header() {
  return <header>...</header>
}

// ✅ Con export
export function Header() {
  return <header>...</header>
}
        
          
        
        
        
      

4. No importar el componente

// ❌ Sin import - error
function App() {
  return <Header /> // ← "Header is not defined"
}

// ✅ Con import
import Header from './components/Header'

function App() {
  return <Header />
}
        
          
        
        
        
      

¡Resumiendo que es gerundio!

    📋 Migración progresiva - Empezar con todo en un componente
    💬 Comentarios en JSX - Usar {/* */} en lugar de <!-- -->
    🧩 Separar componentes - Header y Footer como primeros pasos
    📁 Organizar archivos - Carpeta components/ para componentes
    ♻️ Reutilización - Componentes que puedes usar múltiples veces
    🎯 Patrón de migración - Del HTML monolítico a componentes pequeños

En la próxima clase continuaremos separando más componentes y aprenderemos a pasar datos entre componentes usando props.

    💡 Recuerda: No intentes separar todo en componentes desde el principio. Empieza con todo funcionando en un solo componente y ve separando progresivamente. Es más fácil y menos propenso a errores.
---
<a id="creando-componente-jobcard"></a>
Creando el Componente JobCard

En esta clase vamos a continuar componetizando nuestra aplicación DevJobs. Ya tenemos separados el Header y el Footer. Ahora es el turno de la parte más importante: los JobCard (tarjetas de trabajo).
Creando la estructura de datos

Antes de crear los componentes, necesitamos tener datos de ejemplo. Vamos a definir un array con algunos trabajos en nuestro App.jsx:

function App() {
  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'Madrid, España',
      salary: '€45,000 - €60,000',
      description: 'Estamos buscando un desarrollador frontend con experiencia en React.',
      tags: ['React', 'TypeScript', 'CSS'],
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'DataStack',
      location: 'Barcelona, España',
      salary: '€50,000 - €70,000',
      description: 'Desarrollador backend para trabajar con Node.js y bases de datos.',
      tags: ['Node.js', 'PostgreSQL', 'API'],
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'StartupX',
      location: 'Valencia, España',
      salary: '€40,000 - €55,000',
      description: 'Buscan un desarrollador salvavidas que pueda hacer de todo.',
      tags: ['React', 'Node.js', 'MongoDB'],
    },
  ]

  return (
    <div className="app">
      <Header />

      <main>
        <section className="jobs-container">
          <h2>Trabajos Disponibles</h2>
          {/* Aquí renderizaremos los JobCard */}
        </section>
      </main>

      <Footer />
    </div>
  )
}
        
          
        
        
        
      

Creando el componente JobCard

Ahora vamos a crear el componente JobCard. Este componente recibirá props con la información de cada trabajo.

Crea un nuevo archivo src/components/JobCard.jsx:

function JobCard({ job }) {
  return (
    <article className="job-card">
      <header className="job-card-header">
        <h3 className="job-title">{job.title}</h3>
        <p className="job-company">{job.company}</p>
      </header>

      <div className="job-card-body">
        <p className="job-location">📍 {job.location}</p>
        <p className="job-salary">💰 {job.salary}</p>
        <p className="job-description">{job.description}</p>
      </div>

      <footer className="job-card-footer">
        <span className="job-tags">{job.tags.join(', ')}</span>
        <button className="btn-apply">Aplicar</button>
      </footer>
    </article>
  )
}

export default JobCard
        
          
        
        
        
      

Simplificando el componente con la desestructuración

function JobCard({ job }) {
  // extraemos las propiedades del objeto job
  const { title, company, location, salary, description, tags } = job

  return (
    <article className="job-card">
      <header className="job-card-header">
        <h3 className="job-title">{title}</h3>
        <p className="job-company">{company}</p>
      </header>
      <div className="job-card-body">
        <p className="job-location">{location}</p>
        <p className="job-salary">{salary}</p>
        <p className="job-description">{description}</p>
      </div>
      <footer className="job-card-footer">
        <span className="job-tags">{tags.join(', ')}</span>
        <button className="btn-apply">Aplicar</button>
      </footer>
    </article>
  )
}
        
          
        
        
        
      

¿Qué hace este componente?
1. Recibe props

function JobCard({ job }) {
  // Este componente recibe un objeto 'job' como prop
        
          
        
        
        
      

Desestructuración de props: En lugar de escribir props.job.title, desestructuramos y usamos directamente job.title.

// ❌ Sin desestructuración (más verboso)
function JobCard(props) {
  return <h3>{props.job.title}</h3>
}

// ✅ Con desestructuración (más limpio)
function JobCard({ job }) {
  return <h3>{job.title}</h3>
}
        
          
        
        
        
      

Ahora desestructuramos el objeto job en el componente JobCard.

function JobCard({ job }) {
  const { title } = job
  return <h3 className="job-title">{title}</h3>
}
        
          
        
        
        
      

2. Renderiza la información del trabajo

<h3 className="job-title">{title}</h3>
<p className="job-company">{company}</p>
        
          
        
        
        
      

Usamos expresiones de JavaScript {title} para mostrar datos dinámicos.
Usando el componente en App

Ahora importa y usa el componente en App.jsx:

import Header from './components/Header'
import Footer from './components/Footer'
import JobCard from './components/JobCard'

function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <section className="jobs-container">
          <h2>Trabajos Disponibles (3)</h2>

          <div className="jobs-grid">
            <JobCard
              job={{
                id: 1,
                title: 'Frontend Developer',
                company: 'TechCorp',
                location: 'Madrid, España',
                salary: '€45,000 - €60,000',
                description: 'Estamos buscando un desarrollador frontend con experiencia en React.',
                tags: ['React', 'TypeScript', 'CSS'],
              }}
            />
            <JobCard
              job={{
                id: 2,
                title: 'Backend Developer',
                company: 'DataStack',
                location: 'Barcelona, España',
                salary: '€50,000 - €70,000',
                description: 'Desarrollador backend para trabajar con Node.js y bases de datos.',
                tags: ['Node.js', 'PostgreSQL', 'API'],
              }}
            />
            <JobCard
              job={{
                id: 3,
                title: 'Full Stack Developer',
                company: 'StartupX',
                location: 'Valencia, España',
                salary: '€40,000 - €55,000',
                description: 'Buscan un desarrollador salvavidas que pueda hacer de todo.',
                tags: ['React', 'Node.js', 'MongoDB'],
              }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
        
          
        
        
        
      

¿Qué pasa aquí?

    Importamos el componente JobCard
    Creamos tres instancias del componente manualmente con sus respectivos datos
    Pasamos la prop job con todos los datos de cada trabajo
    Cada JobCard renderiza la información de su trabajo correspondiente

    💡 Por ahora repetimos el componente manualmente. Más adelante en esta clase veremos cómo usar .map() para automatizar esto y no tener que repetir el código tantas veces.

Componentización progresiva

Este es el proceso que hemos seguido:
Paso 1: Todo en App

function App() {
  // 500 líneas de HTML
  return <div>...todo el HTML...</div>
}
        
          
        
        
        
      

Paso 2: Header y Footer

function App() {
  return (
    <div>
      <Header /> {/* ← Separado */}
      ... contenido ...
      <Footer /> {/* ← Separado */}
    </div>
  )
}
        
          
        
        
        
      

Paso 3: Crea un componente JobList

Crea un componente <JobList> que renderice la lista de trabajos. ¡Este es tu turno! Además, crea todos los componentes que consideres. Por ahora la lista la puedes renderizar a mano porque próximamente aprenderemos cómo usar .map() para renderizar listas.
¡Resumiendo que es gerundio!

En esta clase has aprendido:

    🏷️ Props - Cómo pasar datos de un componente a otro
    🔑 Prop key - Obligatoria al renderizar listas
    📦 JobCard - Componente reutilizable para cada trabajo
    📋 JobList - Componente que renderiza la lista de trabajos
    🎯 Componentización - Separar en componentes más pequeños
    💡 Desestructuración de props - { job } en lugar de props.job

    💡 Recuerda: Las props fluyen de padre a hijo. Usa props para hacer componentes reutilizables que puedan mostrar diferentes datos cada vez.
---
<a id="props-comunicacion"></a>
Props - Comunicación entre Componentes

En la clase anterior creamos el componente JobCard y lo usamos manualmente tres veces. Ahora vamos a profundizar en props, el mecanismo fundamental de React para pasar datos entre componentes.
¿Qué son las Props?

Props (abreviatura de “properties”) son argumentos que se pasan a los componentes de React, similar a cómo pasas argumentos a una función.

// Función normal con argumentos
function saludar(nombre) {
  return `Hola ${nombre}`
}
saludar('Miguel') // "Hola Miguel"

// Componente React con props
function Saludo({ nombre }) {
  return <h1>Hola {nombre}</h1>
}
;<Saludo nombre="Miguel" /> // <h1>Hola Miguel</h1>
        
          
        
        
        
      

Características de las props:

    📦 Son objetos con los datos que le pasas al componente
    ⬇️ Fluyen de padre a hijo (nunca al revés)
    🔒 Son inmutables (no se pueden modificar dentro del componente)
    🔄 Hacen que los componentes sean reutilizables

Pasando Props de Padre a Hijo

Imagina que tienes un componente padre (App) y un componente hijo (JobCard):

// Componente HIJO - recibe props
function JobCard({ title, company }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{company}</p>
    </article>
  )
}

// Componente PADRE - pasa props
function App() {
  return (
    <div>
      <JobCard title="Frontend Developer" company="TechCorp" />
      <JobCard title="Backend Developer" company="DataStack" />
    </div>
  )
}
        
          
        
        
        
      

El flujo es unidireccional:

App (padre)
  │
  ├─ pasa: title="Frontend Developer"
  ├─ pasa: company="TechCorp"
  │
  ▼
JobCard (hijo)
  │
  └─ usa: {title} y {company} para renderizar
        
          
        
        
        
      

Tipos de Valores en Props

Puedes pasar diferentes tipos de datos como props:
Strings (texto)

<JobCard title="Frontend Developer" location="Madrid" />
        
          
        
        
        
      

Numbers (números)

<JobCard salary={45000} experience={3} />
        
          
        
        
        
      

    ⚠️ Nota: Los números se pasan entre llaves {}, no entre comillas.

Booleans (booleanos)

;<JobCard isRemote={true} isFeatured={false} />

{
  /* Shorthand para true */
}
;<JobCard isRemote isFeatured />
        
          
        
        
        
      

Arrays (listas)

<JobCard tags={['React', 'TypeScript', 'CSS']} />
        
          
        
        
        
      

Objects (objetos)

<JobCard
  job={{
    title: 'Frontend Developer',
    company: 'TechCorp',
    salary: 45000,
  }}
/>
        
          
        
        
        
      

Functions (funciones)

<JobCard onApply={() => console.log('Aplicando...')} />
        
          
        
        
        
      

Desestructuración de Props

Hay dos formas de recibir props en un componente:
Sin desestructuración (verboso)

function JobCard(props) {
  return (
    <article>
      <h3>{props.title}</h3>
      <p>{props.company}</p>
      <p>{props.location}</p>
    </article>
  )
}
        
          
        
        
        
      

Problema: Escribir props. todo el tiempo es repetitivo.
Con desestructuración (recomendado)

function JobCard({ title, company, location }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{company}</p>
      <p>{location}</p>
    </article>
  )
}
        
          
        
        
        
      

Ventajas:

    ✅ Código más limpio y legible
    ✅ Ves inmediatamente qué props usa el componente
    ✅ Menos repetición de código

Desestructuración anidada

Si pasas un objeto como prop, puedes desestructurar dentro del componente:

// Opción 1: Desestructurar dentro del componente
function JobCard({ job }) {
  const { title, company, location } = job

  return (
    <article>
      <h3>{title}</h3>
      <p>{company}</p>
      <p>{location}</p>
    </article>
  )
}

// Opción 2: Desestructurar en los parámetros
function JobCard({ job: { title, company, location } }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{company}</p>
      <p>{location}</p>
    </article>
  )
}
        
          
        
        
        
      

Recomendación: La opción 1 es más legible.
Props por Defecto

A veces quieres que una prop tenga un valor por defecto si no se proporciona:

function JobCard({ title, company, location = 'Remoto' }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{company}</p>
      <p>{location}</p>
    </article>
  )
}

// Si no pasas location, usará "Remoto"
<JobCard title="Frontend Dev" company="TechCorp" />
// Renderiza: <p>Remoto</p>

// Si pasas location, usa ese valor
<JobCard title="Frontend Dev" company="TechCorp" location="Madrid" />
// Renderiza: <p>Madrid</p>
        
          
        
        
        
      

Props Condicionales

Puedes usar props para mostrar contenido condicionalmente:

function JobCard({ title, company, isRemote, isFeatured }) {
  return (
    <article className={isFeatured ? 'job-card featured' : 'job-card'}>
      <h3>{title}</h3>
      <p>{company}</p>

      {isRemote && <span className="badge">🏠 Remoto</span>}
      {isFeatured && <span className="badge">⭐ Destacado</span>}
    </article>
  )
}
        
          
        
        
        
      

¿Qué hace &&?

{
  condición && <Elemento />
}
        
          
        
        
        
      

    Si condición es true, renderiza <Elemento />
    Si condición es false, no renderiza nada

Ejemplos:

{
  true && <span>Se muestra</span>
} // ✅ Se renderiza
{
  false && <span>No se muestra</span>
} // ❌ No se renderiza
{
  isRemote && <span>Remoto</span>
} // Depende de isRemote
        
          
        
        
        
      

Mejor usar las ternarias

Muchas veces es mejor usar las ternarias para renderizar condicionalmente:

{
  isRemote ? <span>Remoto</span> : null
}
        
          
        
        
        
      

¿Por qué? Porque cuando estamos comparando booleanos no hay ningún problema, pero a veces podemos usar valores que no sean booleanos, como strings, números, etc. pero que sean falsy, y se renderizarán en la aplicación.

{
  results.length && <span>Remoto</span>
}
        
          
        
        
        
      

Esto mostraría el número 0 en la pantalla, que es un error muy común en aplicaciones de React.
Ejercicio Práctico: Mejorar JobCard

Vamos a mejorar nuestro componente JobCard añadiendo más props:

function JobCard({ job, isRemote, isFeatured, isNew }) {
  const { title, company, location, salary, description, tags } = job

  return (
    <article className={`job-card ${isFeatured ? 'featured' : ''}`}>
      <header className="job-card-header">
        <h3 className="job-title">{title}</h3>
        <p className="job-company">{company}</p>

        <div className="badges">
          {isNew && <span className="badge new">🆕 Nuevo</span>}
          {isFeatured && <span className="badge featured">⭐ Destacado</span>}
          {isRemote && <span className="badge remote">🏠 Remoto</span>}
        </div>
      </header>

      <div className="job-card-body">
        <p className="job-location">📍 {location}</p>
        <p className="job-salary">💰 {salary}</p>
        <p className="job-description">{description}</p>
      </div>

      <footer className="job-card-footer">
        <span className="job-tags">{tags.join(', ')}</span>
        <button className="btn-apply">Aplicar</button>
      </footer>
    </article>
  )
}

export default JobCard
        
          
        
        
        
      

Y úsalo así en App.jsx:

function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <section className="jobs-container">
          <h2>Trabajos Disponibles (3)</h2>

          <div className="jobs-grid">
            <JobCard
              job={{
                title: 'Frontend Developer',
                company: 'TechCorp',
                location: 'Madrid, España',
                salary: '€45,000 - €60,000',
                description: 'Buscamos desarrollador frontend con experiencia en React.',
                tags: ['React', 'TypeScript', 'CSS'],
              }}
              isRemote={false}
              isFeatured={true}
              isNew={true}
            />

            <JobCard
              job={{
                title: 'Backend Developer',
                company: 'DataStack',
                location: 'Barcelona, España',
                salary: '€50,000 - €70,000',
                description: 'Desarrollador backend para Node.js y bases de datos.',
                tags: ['Node.js', 'PostgreSQL', 'API'],
              }}
              isRemote={true}
              isFeatured={false}
              isNew={false}
            />

            <JobCard
              job={{
                title: 'Full Stack Developer',
                company: 'StartupX',
                location: 'Remoto',
                salary: '€40,000 - €55,000',
                description: 'Desarrollador full stack para startup en crecimiento.',
                tags: ['React', 'Node.js', 'MongoDB'],
              }}
              isRemote={true}
              isFeatured={false}
              isNew={true}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
        
          
        
        
        
      

Props: Reglas Importantes
Las props fluyen de arriba hacia abajo

// ✅ Correcto: Padre → Hijo
function App() {
  return <JobCard title="Frontend Dev" />
}

// ❌ Incorrecto: Un hijo NO puede pasar props a su padre directamente
// (Para esto se usan callbacks, que veremos más adelante)
        
          
        
        
        
      

Siempre desestructura en los parámetros

// ❌ Menos legible
function JobCard(props) {
  return <h3>{props.title}</h3>
}

// ✅ Más legible
function JobCard({ title }) {
  return <h3>{title}</h3>
}
        
          
        
        
        
      

Composición de Componentes

Las props permiten componer componentes más complejos a partir de componentes simples:

// Componente simple: Badge
function Badge({ children, type = 'default' }) {
  return <span className={`badge badge-${type}`}>{children}</span>
}

// Componente que usa Badge
function JobCard({ title, isRemote, isFeatured }) {
  return (
    <article>
      <h3>{title}</h3>
      {isRemote && <Badge type="info">🏠 Remoto</Badge>}
      {isFeatured && <Badge type="success">⭐ Destacado</Badge>}
    </article>
  )
}
        
          
        
        
        
      

Ventajas:

    ♻️ Componentes reutilizables (Badge se puede usar en otros lugares)
    🧩 Fácil de mantener (cambiar Badge afecta a todos los lugares donde se usa)
    📖 Código más legible

Fragments en React

En React te habrás dado cuenta que no puedes retornar múltiples elementos directamente, sino que debes envolverlos en un elemento padre.

Es importante entender Fragments, una característica esencial de React que usarás constantemente.
El problema: Solo un elemento raíz

React tiene una regla: un componente solo puede retornar un elemento raíz.

// ❌ Error: No puedes retornar múltiples elementos
function JobCard() {
  return (
    <h3>Título</h3>
    <p>Descripción</p>
  )
}
// Error: Adjacent JSX elements must be wrapped in an enclosing tag
        
          
        
        
        
      

Solución tradicional: Envolver en un <div>:

// ✅ Funciona, pero agrega un div innecesario
function JobCard() {
  return (
    <div>
      <h3>Título</h3>
      <p>Descripción</p>
    </div>
  )
}
        
          
        
        
        
      

Problema: Este <div> extra contamina el HTML y puede romper estilos CSS:

<!-- Resultado en el DOM -->
<div class="jobs-grid">
  <div>
    <!-- ← div extra innecesario -->
    <h3>Título</h3>
    <p>Descripción</p>
  </div>
  <div>
    <!-- ← otro div extra -->
    <h3>Título 2</h3>
    <p>Descripción 2</p>
  </div>
</div>
        
          
        
        
        
      

La solución: React Fragment

Fragment es un componente especial que agrupa elementos sin agregar nodos al DOM:

import { Fragment } from 'react'

function JobCard() {
  return (
    <Fragment>
      <h3>Título</h3>
      <p>Descripción</p>
    </Fragment>
  )
}
        
          
        
        
        
      

Resultado en el DOM:

<!-- Sin divs extras! -->
<h3>Título</h3>
<p>Descripción</p>
        
          
        
        
        
      

Sintaxis corta: <></>

React tiene una sintaxis abreviada para Fragment:

function JobCard() {
  return (
    <>
      <h3>Título</h3>
      <p>Descripción</p>
    </>
  )
}
        
          
        
        
        
      

Es lo mismo que <Fragment> pero más corto y limpio.
¿Cuándo usar Fragment?

Caso 1: Retornar múltiples elementos

function JobActions() {
  return (
    <>
      <button>Aplicar</button>
      <button>Guardar</button>
      <button>Compartir</button>
    </>
  )
}
        
          
        
        
        
      

Caso 2: Renderizar listas sin wrapper

function JobTags({ tags }) {
  return (
    <>
      {tags.map((tag) => (
        <span key={tag} className={styles.tag}>
          {tag}
        </span>
      ))}
    </>
  )
}
        
          
        
        
        
      

Caso 3: Condicionales que retornan múltiples elementos

function JobCard({ job, showDetails }) {
  return (
    <article className={styles.card}>
      <h3>{job.title}</h3>

      {showDetails && (
        <>
          <p>{job.description}</p>
          <p>{job.requirements}</p>
          <p>{job.benefits}</p>
        </>
      )}
    </article>
  )
}
        
          
        
        
        
      

Fragment vs div

Cuándo usar <Fragment> / <></>:

    ✅ No necesitas estilos en el wrapper
    ✅ No quieres alterar la estructura del DOM
    ✅ Usas CSS Grid/Flexbox y un div extra lo rompería
    ✅ Simplemente agrupar elementos lógicamente

Cuándo usar <div>:

    ✅ Necesitas aplicar estilos al wrapper
    ✅ Necesitas event handlers en el wrapper
    ✅ Necesitas una referencia (ref) al wrapper

Ejemplo comparativo:

// ❌ Fragment NO puede tener className
function JobCard() {
  return (
    <Fragment className={styles.card}>
      {/* ERROR */}
      <h3>Título</h3>
      <p>Subtítulo</p>
    </Fragment>
  )
}

// ✅ Usa div si necesitas estilos
function JobCard() {
  return (
    <div className={styles.card}>
      <h3>Título</h3>
      <p>Subtítulo</p>
    </div>
  )
}

// ✅ Fragment para agrupar sin estilos
function JobCard() {
  return (
    <article className={styles.card}>
      <h3>Título</h3>
      <p>Subtítulo</p>
    </article>
  )
}
        
          
        
        
        
      

¡Resumiendo que es gerundio!

En esta clase has aprendido:

    🎁 Props - Argumentos que se pasan a componentes
    ⬇️ Flujo unidireccional - Las props van de padre a hijo
    🔓 Desestructuración - Forma limpia de recibir props
    🎯 Valores por defecto - Props con valores predeterminados
    ❓ Renderizado condicional - Mostrar contenido según props

En la próxima clase aprenderemos a renderizar listas con .map() y a importar datos desde un archivo JSON para automatizar la creación de múltiples JobCards.

    💡 Recuerda: Las props son el mecanismo fundamental de React para crear componentes reutilizables y componibles. Dominar las props es esencial para ser efectivo con React.
---
<a id="modulos-javascript"></a>
Módulos JavaScript - Import y Export

Hasta ahora hemos tenido todo nuestro código en un solo archivo App.jsx. En aplicaciones reales, separamos el código en múltiples archivos usando el sistema de módulos de JavaScript. En esta clase aprenderemos a exportar e importar componentes.
El problema: Todo en un archivo

Imagina que tienes toda tu aplicación en App.jsx:

// App.jsx - 500 líneas de código 😱

function Header() {
  return <header>...</header>
}

function Footer() {
  return <footer>...</footer>
}

function JobCard({ job }) {
  return <article>...</article>
}

function JobList({ jobs }) {
  return <div>...</div>
}

function SearchForm() {
  return <form>...</form>
}

function App() {
  return (
    <div>
      <Header />
      <SearchForm />
      <JobList />
      <Footer />
    </div>
  )
}

export default App
        
          
        
        
        
      

Problemas:

    📜 Difícil de leer - 500+ líneas en un archivo
    🔍 Difícil de encontrar - ¿Dónde está el componente que necesito?
    🐛 Difícil de depurar - Todo mezclado
    👥 Difícil de colaborar - Conflictos en Git
    ♻️ No reutilizable - No puedes usar estos componentes en otros archivos

La solución: Módulos

Separamos cada componente en su propio archivo y usamos import / export:

src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── JobCard.jsx
│   ├── JobList.jsx
│   └── SearchForm.jsx
└── App.jsx
        
          
        
        
        
      

Separando un componente a otro archivo

Vamos a separar el componente Header paso a paso.
Paso 1: Crear el archivo

Crea src/components/Header.jsx:

// src/components/Header.jsx
function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1>DevJobs</h1>
        <nav>
          <a href="#jobs">Trabajos</a>
          <a href="#about">Acerca</a>
          <a href="#contact">Contacto</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
        
          
        
        
        
      

¿Qué hace export default?

    Marca el componente para que pueda ser importado desde otros archivos
    default significa que es la exportación principal del archivo
    Solo puede haber un export default por archivo

Paso 2: Importar en App.jsx

Ahora en App.jsx importamos el componente:

// src/App.jsx
import Header from './components/Header'

function App() {
  return (
    <div className="app">
      <Header />
      {/* Resto de la aplicación */}
    </div>
  )
}

export default App
        
          
        
        
        
      

¿Qué hace import?

    import Header - El nombre que usarás en este archivo
    from './components/Header' - La ruta al archivo (sin extensión .jsx)
    ./ significa “carpeta actual”

¡Listo! El componente está separado y funcionando.
Export Default vs Export Named

Hay dos formas de exportar en JavaScript:
1. Export Default (por defecto)

Un solo export principal por archivo:

// Header.jsx
function Header() {
  return <header>...</header>
}

export default Header
        
          
        
        
        
      

Importar:

// Puedes usar CUALQUIER nombre al importar
import Header from './components/Header'
import MyHeader from './components/Header' // ✅ También funciona
import Cabecera from './components/Header' // ✅ También funciona
        
          
        
        
        
      

Ventajas:

    ✅ Simple para componentes principales
    ✅ Puedes renombrar al importar
    ✅ Menos código

Desventajas:

    ⚠️ No sabes el nombre original del componente
    ⚠️ Diferentes nombres en diferentes archivos (confuso)
    ⚠️ No hay autocomplete del nombre

2. Export Named (nombrado)

Múltiples exports por archivo:

// Header.jsx
export function Header() {
  return <header>...</header>
}

export function HeaderLogo() {
  return <img src="logo.png" alt="Logo" />
}

export function HeaderNav() {
  return <nav>...</nav>
}
        
          
        
        
        
      

Importar:

// Debes usar el NOMBRE EXACTO con llaves {}
import { Header, HeaderLogo, HeaderNav } from './components/Header'
        
          
        
        
        
      

Ventajas:

    ✅ Nombres consistentes en toda la aplicación
    ✅ Autocomplete funciona mejor
    ✅ Puedes exportar múltiples cosas
    ✅ Más explícito y claro
    ✅ Mejor para tree-shaking (optimización)

Desventajas:

    ⚠️ Más verboso (necesitas las llaves {})
    ⚠️ Debes recordar el nombre exacto

Por qué preferimos Named Exports

En React moderno, preferimos named exports por varias razones:
1. Consistencia

// ❌ Con default export (cada archivo puede usar diferente nombre)
// App.jsx
import Header from './components/Header'

// OtherPage.jsx
import MyHeader from './components/Header'

// AnotherPage.jsx
import TopBar from './components/Header'

// 😱 Tres nombres diferentes para el mismo componente!
        
          
        
        
        
      

// ✅ Con named export (siempre el mismo nombre)
// App.jsx
import { Header } from './components/Header'

// OtherPage.jsx
import { Header } from './components/Header'

// AnotherPage.jsx
import { Header } from './components/Header'

// 🎉 Mismo nombre en todos lados!
        
          
        
        
        
      

2. Refactoring seguro

Con named exports, si renombras el componente, tu IDE puede actualizar todas las referencias automáticamente.
3. Autocomplete

// Con named export, tu IDE sugiere:
import { Header } from './components/Header'
//       ^ Autocomplete del nombre exacto

// Con default export:
import Header from './components/Header'
//     ^ Tienes que recordar/adivinar el nombre
        
          
        
        
        
      

4. Múltiples exports

// utils.js - Puedes exportar varias funciones
export function formatDate(date) {
  // ...
}

export function formatCurrency(amount) {
  // ...
}

export function formatPhone(phone) {
  // ...
}

// Importar solo lo que necesitas
import { formatDate, formatCurrency } from './utils'
        
          
        
        
        
      

Sintaxis de Named Export

Hay dos formas de escribir named exports:
Forma 1: Export inline (recomendada)

// Header.jsx
export function Header() {
  return <header>...</header>
}

export function HeaderLogo() {
  return <img src="logo.png" />
}
        
          
        
        
        
      

Forma 2: Export al final

// Header.jsx
function Header() {
  return <header>...</header>
}

function HeaderLogo() {
  return <img src="logo.png" />
}

// Al final del archivo
export { Header, HeaderLogo }
        
          
        
        
        
      

Ambas son equivalentes. La primera es más común en React.
Renombrando imports

A veces necesitas renombrar un import para evitar colisiones de nombres:
Problema: Colisión de nombres

// ❌ Error: Ambos se llaman "Button"
import { Button } from './components/Button'
import { Button } from './ui/Button'
        
          
        
        
        
      

Solución 1: Renombrar con as

// ✅ Renombrar uno de ellos
import { Button } from './components/Button'
import { Button as UIButton } from './ui/Button'

function App() {
  return (
    <div>
      <Button>Componente Button</Button>
      <UIButton>UI Button</UIButton>
    </div>
  )
}
        
          
        
        
        
      

Solución 2: Renombrar ambos

// ✅ Nombres más descriptivos
import { Button as PrimaryButton } from './components/Button'
import { Button as SecondaryButton } from './ui/Button'

function App() {
  return (
    <div>
      <PrimaryButton>Principal</PrimaryButton>
      <SecondaryButton>Secundario</SecondaryButton>
    </div>
  )
}
        
          
        
        
        
      

Ejemplo real: Colisión con nombres comunes

// Dos componentes diferentes llamados "Card"
import { Card as JobCard } from './components/JobCard'
import { Card as UserCard } from './components/UserCard'

function Dashboard() {
  return (
    <div>
      <JobCard job={job} />
      <UserCard user={user} />
    </div>
  )
}
        
          
        
        
        
      

Rutas de importación
Rutas relativas

// Mismo directorio
import { Header } from './Header'

// Subdirectorio
import { Header } from './components/Header'

// Directorio padre
import { Header } from '../Header'

// Dos niveles arriba
import { Header } from '../../Header'
        
          
        
        
        
      

Import de múltiples elementos

Puedes importar varios elementos a la vez:

// Importar múltiples named exports
import { Header, Footer, Nav } from './components'

// Importar default + named
import App, { config, API_URL } from './App'

// Importar todo como namespace
import * as Utils from './utils'
Utils.formatDate()
Utils.formatCurrency()
        
          
        
        
        
      

Errores comunes
1. Olvidar el export

// ❌ Error: No exportado
function Header() {
  return <header>...</header>
}

// ✅ Correcto
export function Header() {
  return <header>...</header>
}
        
          
        
        
        
      

2. Mezclar default y named imports

// Header.jsx
export function Header() {
  return <header>...</header>
}

// ❌ Error: Header no es default export
import Header from './components/Header'

// ✅ Correcto: Usar llaves para named
import { Header } from './components/Header'
        
          
        
        
        
      

3. Ruta incorrecta

// ❌ Error: Falta el ./
import { Header } from 'components/Header'

// ✅ Correcto: Rutas relativas empiezan con ./
import { Header } from './components/Header'
        
          
        
        
        
      

4. Olvidar la extensión en algunos bundlers

// Vite: No necesitas extensión
import { Header } from './components/Header' // ✅

// Algunos bundlers antiguos:
import { Header } from './components/Header.jsx' // Puede ser necesario
        
          
        
        
        
      

¡Resumiendo que es gerundio!

En esta clase has aprendido:

    📦 Módulos - Separar código en múltiples archivos
    📤 Export default - Una exportación principal por archivo
    📤 Export named - Múltiples exportaciones con nombres específicos
    📥 Import - Traer código de otros archivos
    🔄 Renombrar imports - Usar as para evitar colisiones
    🎯 Named exports preferidos - Más consistentes y mantenibles
    🗂️ Estructura - Organizar componentes en carpetas

En la próxima clase aprenderemos sobre CSS Modules, una forma de escribir CSS con scope local para evitar conflictos de estilos entre componentes.

    💡 Recuerda: Usa named exports (export function ComponentName) en lugar de default exports para mantener consistencia y aprovechar mejor el autocomplete. Organiza tu código en archivos pequeños y enfocados en una sola responsabilidad.

---
<a id="paginacion-props"></a>
Paginación - Props y Comunicación Padre-Hijo

En esta clase vamos a crear un componente Pagination que nos permitirá navegar entre diferentes páginas de contenido. Aprenderemos a pasar datos mediante props, definir valores por defecto, y lo más importante: cómo un componente hijo puede comunicarse con su padre usando funciones.
Creando el componente Pagination

Empezaremos creando un componente simple que recibe la página actual y el total de páginas:

// src/components/Pagination.jsx
function Pagination({ currentPage, totalPages }) {
  // Generar array de páginas a mostrar
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const styleLinkLeft = {
    opacity: currentPage === 1 ? 0.5 : 1,
    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
  }

  const styleLinkRight = {
    opacity: currentPage === totalPages ? 0.5 : 1,
    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
  }

  return (
    <nav className="pagination">
      <a href="#" style={styleLinkLeft}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </a>

      {pages.map((page) => (
        <a key={page} className={currentPage === page ? 'is-active' : ''} href="#">
          {page}
        </a>
      ))}

      <a href="#" style={styleLinkRight}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </a>
    </nav>
  )
}

export default Pagination
        
          
        
        
        
      

Generando el array de páginas

const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
        
          
        
        
        
      

¿Qué hace esto?

    Array.from() crea un nuevo array
    { length: totalPages } define la longitud del array
    (_, i) => i + 1 transforma cada índice en un número de página

Ejemplo:

// Si totalPages = 5
Array.from({ length: 5 }, (_, i) => i + 1)
// Resultado: [1, 2, 3, 4, 5]
        
          
        
        
        
      

Renderizando listas con .map()

{
  pages.map((page) => (
    <a key={page} className={currentPage === page ? 'is-active' : ''} href="#">
      {page}
    </a>
  ))
}
        
          
        
        
        
      

¿Qué hace .map()?

    Recorre cada elemento del array pages
    Por cada page, retorna un elemento <a>
    key={page} es obligatorio para que React identifique cada elemento

    💡 Nota: Profundizaremos en renderizado de listas en clases futuras. Por ahora, entiende que .map() transforma un array de datos en un array de elementos JSX.

Props por defecto

¿Qué pasa si no pasamos las props al componente? Se rompe. Vamos a definir valores por defecto:
❌ Forma tradicional (menos recomendada)

function Pagination({ currentPage, totalPages }) {
  currentPage = currentPage || 1
  totalPages = totalPages || 5

  // resto del código...
}
        
          
        
        
        
      

Problema: Es verboso y no es la forma idiomática de JavaScript moderno.
✅ Forma moderna (recomendada)

function Pagination({ currentPage = 1, totalPages = 5 }) {
  // Si no se pasan props, usa los valores por defecto
  // resto del código...
}
        
          
        
        
        
      

Ventajas:

    ✅ Más limpio y conciso
    ✅ Valores por defecto en la firma de la función
    ✅ Es la sintaxis estándar de ES6

Ejemplo de uso:

// Sin props: usa valores por defecto
<Pagination />
// currentPage = 1, totalPages = 5

// Con una prop: usa el valor pasado + defecto para la otra
<Pagination currentPage={3} />
// currentPage = 3, totalPages = 5

// Con ambas props: usa los valores pasados
<Pagination currentPage={3} totalPages={10} />
// currentPage = 3, totalPages = 10
        
          
        
        
        
      

Usando el componente en App

Ahora vamos a usar nuestro componente Pagination en App.jsx:

// src/App.jsx
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { SearchForm } from './components/SearchForm'
import { JobListings } from './components/JobListings'
import Pagination from './components/Pagination'

function App() {
  const currentPage = 3
  const totalPages = 5

  return (
    <>
      <Header />

      <main>
        <SearchForm />
        <JobListings />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </main>

      <Footer />
    </>
  )
}

export default App
        
          
        
        
        
      

¿Qué está pasando?

    Definimos currentPage y totalPages en el componente padre (App)
    Pasamos estos valores como props al componente hijo (Pagination)
    Pagination recibe las props y las usa para renderizarse

Flujo de datos:

App (padre)
  │
  ├─ currentPage: 3
  ├─ totalPages: 5
  │
  ▼
Pagination (hijo)
  │
  └─ Renderiza botones según estos valores
        
          
        
        
        
      

Estilos inline con objetos

Nota que usamos estilos inline en el componente:

const styleLinkLeft = {
  opacity: currentPage === 1 ? 0.5 : 1,
  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
}
        
          
        
        
        
      

Características de estilos inline en React:

    Se pasan como objetos JavaScript
    Las propiedades CSS usan camelCase: background-color → backgroundColor
    Los valores pueden ser dinámicos (cambian según props o estado)

<a href="#" style={styleLinkLeft}>
        
          
        
        
        
      

Equivalente en HTML:

<a href="#" style="opacity: 0.5; cursor: not-allowed;"></a>
        
          
        
        
        
      

Prevenir comportamiento por defecto

Nota el e.preventDefault() en todas las funciones:

const handlePrevious = (e) => {
  e.preventDefault() // ← Importante
  // ...
}
        
          
        
        
        
      

¿Por qué?

    Los enlaces <a href="#"> por defecto navegan a #
    Esto causa un pequeño salto en la página
    preventDefault() cancela este comportamiento
    Solo ejecuta nuestra lógica personalizada

Convención de nombres para event handlers

Es común usar estas convenciones:

// Función que se pasa como prop: onAlgo
<Pagination onPageChange={handlePageChange} />

// Función dentro del componente: handleAlgo
const handleNext = () => { ... }
const handlePrevious = () => { ... }
const handlePageClick = () => { ... }
        
          
        
        
        
      

Patrón:

    on + Evento para props que son funciones
    handle + Evento para funciones que manejan eventos

¡Resumiendo que es gerundio!

En esta clase has aprendido:

    🧩 Componente Pagination - Crear un componente de navegación entre páginas
    📊 Array.from() - Generar arrays de números
    🔄 Renderizado de listas - Usar .map() para renderizar elementos (básico)
    🎯 Props por defecto - Sintaxis { prop = valorDefecto }
    🎨 Estilos inline - Objetos JavaScript para estilos dinámicos
    🚫 preventDefault() - Evitar comportamiento por defecto de eventos
    📛 Convención de nombres - on + Evento para props y handle + Evento para funciones

En la próxima clase aprenderemos sobre callbacks y cómo pasar funciones como props para que los componentes hijos puedan comunicarse con sus padres.

    💡 Recuerda: Las props fluyen de padre a hijo. Los estilos inline se pasan como objetos JavaScript con propiedades en camelCase. Usa preventDefault() para evitar comportamientos por defecto del navegador.

----
<a id="callbacks"></a>
Callbacks - Pasar Funciones como Props

En la clase anterior creamos el componente Pagination que recibe props con datos. Ahora vamos a aprender a pasar funciones como props para que el componente hijo pueda comunicarse con el padre y notificarle cuando algo cambia.
El problema: Componente sin interacción

Hasta ahora nuestro Pagination solo muestra información, pero no hace nada cuando haces click:

function Pagination({ currentPage = 1, totalPages = 5 }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="pagination">
      <a href="#">←</a>

      {pages.map((page) => (
        <a key={page} className={currentPage === page ? 'is-active' : ''} href="#">
          {page}
        </a>
      ))}

      <a href="#">→</a>
    </nav>
  )
}
        
          
        
        
        
      

Problema: Cuando haces click en un botón, no pasa nada. ¿Cómo hacemos que el componente reaccione?
Pasando funciones como props

La solución es que el padre le pase una función al hijo mediante props:

// src/App.jsx
function App() {
  const currentPage = 3
  const totalPages = 5

  const handlePageChange = (page) => {
    console.log('Página cambiada a:', page)
  }

  return (
    <>
      <Header />

      <main>
        <SearchForm />
        <JobListings />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      <Footer />
    </>
  )
}

export default App
        
          
        
        
        
      

¿Qué acabamos de hacer?

    Creamos una función handlePageChange en el padre
    Pasamos esta función como prop onPageChange={handlePageChange}
    Ahora Pagination tiene acceso a esta función

Convención: Las props que son funciones suelen empezar con on:

    onClick
    onChange
    onSubmit
    onPageChange
    onDelete
    onUpdate

Recibiendo y usando la función en el hijo

Ahora el hijo recibe la función y puede llamarla:

function Pagination({ currentPage = 1, totalPages = 5, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const handlePrevious = (e) => {
    e.preventDefault()
    if (currentPage > 1) {
      onPageChange(currentPage - 1) // ← Llamamos a la función del padre
    }
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1) // ← Llamamos a la función del padre
    }
  }

  const handlePageClick = (e, page) => {
    e.preventDefault()
    onPageChange(page) // ← Llamamos a la función del padre
  }

  const styleLinkLeft = {
    opacity: currentPage === 1 ? 0.5 : 1,
    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
  }

  const styleLinkRight = {
    opacity: currentPage === totalPages ? 0.5 : 1,
    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
  }

  return (
    <nav className="pagination">
      <a href="#" style={styleLinkLeft} onClick={handlePrevious}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </a>

      {pages.map((page) => (
        <a
          key={page}
          className={currentPage === page ? 'is-active' : ''}
          href="#"
          onClick={(e) => handlePageClick(e, page)}
        >
          {page}
        </a>
      ))}

      <a href="#" style={styleLinkRight} onClick={handleNext}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </a>
    </nav>
  )
}

export default Pagination
        
          
        
        
        
      

¿Qué hace cada función?
handlePrevious

const handlePrevious = (e) => {
  e.preventDefault() // Evita que el <a> navegue
  if (currentPage > 1) {
    onPageChange(currentPage - 1) // Notifica al padre
  }
}
        
          
        
        
        
      

    Verifica que no estemos en la primera página
    Llama a onPageChange (la función del padre) con la página anterior

handleNext

const handleNext = (e) => {
  e.preventDefault()
  if (currentPage < totalPages) {
    onPageChange(currentPage + 1) // Notifica al padre
  }
}
        
          
        
        
        
      

    Verifica que no estemos en la última página
    Llama a onPageChange con la página siguiente

handlePageClick

const handlePageClick = (e, page) => {
  e.preventDefault()
  onPageChange(page) // Notifica al padre con la página clickeada
}
        
          
        
        
        
      

    Llama a onPageChange con el número de página específico

¿Qué es un callback?

Un callback es una función que se pasa como argumento a otra función, y que será llamada más tarde (de ahí el nombre “call back” = “llamar de vuelta”).

// onPageChange es un callback
<Pagination onPageChange={handlePageChange} />
        
          
        
        
        
      

En este caso:

    El padre (App) pasa handlePageChange como callback
    El hijo (Pagination) guarda este callback en la prop onPageChange
    Cuando el usuario hace click, el hijo “llama de vuelta” al padre ejecutando onPageChange(page)

El flujo de comunicación

Ahora que tenemos el callback configurado, veamos qué pasa cuando el usuario interactúa:

1. Usuario hace click en "Página 3"
   ↓
2. Se dispara handlePageClick(e, 3) en Pagination
   ↓
3. handlePageClick llama a onPageChange(3)
   ↓
4. onPageChange es handlePageChange del padre (App)
   ↓
5. handlePageChange(3) ejecuta console.log('Página cambiada a:', 3)
        
          
        
        
        
      

Por ahora solo imprime en consola, pero en la próxima clase veremos cómo usar estado para que realmente cambie la página visualmente.
Convención de nombres

Es común usar estas convenciones para funciones:
En el componente padre

// Función que se pasa como prop: onAlgo
<Pagination onPageChange={handlePageChange} />
<Button onClick={handleClick} />
<Form onSubmit={handleSubmit} />

// Función que maneja el evento: handleAlgo
const handlePageChange = (page) => { ... }
const handleClick = () => { ... }
const handleSubmit = (data) => { ... }
        
          
        
        
        
      

En el componente hijo

// Recibir: onAlgo
function Pagination({ onPageChange }) {
  // Función interna: handleAlgo
  const handleNext = () => {
    onPageChange(currentPage + 1)
  }
}
        
          
        
        
        
      

Patrón:

    on + Evento → props que son funciones
    handle + Evento → funciones que manejan eventos

Validando que la prop sea una función

Es buena práctica validar que las funciones prop realmente sean funciones:

function Pagination({ currentPage = 1, totalPages = 5, onPageChange }) {
  // Validar que onPageChange sea una función
  if (!onPageChange || typeof onPageChange !== 'function') {
    console.warn('Pagination: onPageChange debe ser una función')
    onPageChange = () => {} // Función vacía por defecto
  }

  // resto del código...
}
        
          
        
        
        
      

O podemos usar un valor por defecto:

function Pagination({ currentPage = 1, totalPages = 5, onPageChange = () => {} }) {
  // Si no se pasa onPageChange, usa función vacía
  // ...
}
        
          
        
        
        
      

Ejemplo adicional: Button con callback

Veamos otro ejemplo para reforzar el concepto:

// Componente Button reutilizable
function Button({ children, onClick, variant = 'primary' }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  )
}

// Uso en App
function App() {
  const handleDelete = () => {
    console.log('Eliminando...')
  }

  const handleSave = () => {
    console.log('Guardando...')
  }

  return (
    <div>
      <Button onClick={handleSave}>Guardar</Button>
      <Button onClick={handleDelete} variant="danger">
        Eliminar
      </Button>
    </div>
  )
}
        
          
        
        
        
      

El patrón es el mismo:

    El padre define funciones (handleSave, handleDelete)
    El padre pasa las funciones como props (onClick={handleSave})
    El hijo recibe y ejecuta las funciones cuando ocurre el evento

Pasando argumentos a callbacks

A veces necesitas pasar información adicional:

function JobCard({ job, onApply }) {
  return (
    <article>
      <h3>{job.title}</h3>
      <button onClick={() => onApply(job.id)}>Aplicar</button>
    </article>
  )
}

function App() {
  const handleApply = (jobId) => {
    console.log('Aplicando a trabajo:', jobId)
  }

  return <JobCard job={job} onApply={handleApply} />
}
        
          
        
        
        
      

Nota: Usamos una arrow function onClick={() => onApply(job.id)} para poder pasar argumentos.
Diferencia: onClick vs onClick()

Es importante entender esta diferencia:

// ✅ Correcto: Pasa la función
<button onClick={handleClick}>Click</button>

// ❌ Incorrecto: EJECUTA la función inmediatamente
<button onClick={handleClick()}>Click</button>

// ✅ Correcto: Arrow function para pasar argumentos
<button onClick={() => handleClick(id)}>Click</button>

// ✅ Correcto: Pasar referencia directa sin argumentos
<button onClick={handleClick}>Click</button>
        
          
        
        
        
      

Regla:

    onClick={handleClick} → Pasa la referencia a la función
    onClick={handleClick()} → Ejecuta la función inmediatamente (¡no queremos esto!)
    onClick={() => handleClick(arg)} → Crea una nueva función que ejecutará handleClick con argumentos

¡Resumiendo que es gerundio!

En esta clase has aprendido:

    🔄 Callbacks - Funciones pasadas como props
    📤 Comunicación hijo → padre - El hijo llama a funciones del padre
    🎯 Convención on/handle - onEvent para props, handleEvent para funciones
    ✅ Validación - Verificar que las props sean funciones
    🔀 Flujo de comunicación - El hijo notifica al padre mediante callbacks
    ⚡ onClick vs onClick() - Diferencia crucial entre referencia y ejecución
    📝 Ejemplo práctico - Button reutilizable con onClick
    🎯 Pasar argumentos - Usar arrow functions para pasar datos

En la próxima clase completaremos el ciclo aprendiendo sobre estado en el componente padre, haciendo que los cambios se reflejen visualmente en la interfaz.

    💡 Recuerda: Las funciones como props (callbacks) permiten que los componentes hijos notifiquen a sus padres sobre eventos. El hijo no modifica datos directamente, solo informa al padre que algo ocurrió llamando a la función callback.

---
<a id="lifting-state-up"></a>
Estado por Props - Lifting State Up

En la clase anterior aprendimos a pasar funciones como props para que el hijo notifique al padre. Ahora vamos a completar el ciclo: crear estado en el padre y pasarlo como props al hijo, haciendo que todo funcione de forma reactiva.
El problema: Estado fijo

Hasta ahora, currentPage es un valor fijo que no cambia:

// src/App.jsx
function App() {
  const currentPage = 3 // ← Valor fijo, nunca cambia
  const totalPages = 5

  const handlePageChange = (page) => {
    console.log('Página cambiada a:', page)
  }

  return (
    <>
      <Header />

      <main>
        <SearchForm />
        <JobListings />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      <Footer />
    </>
  )
}

export default App
        
          
        
        
        
      

Problema: Aunque el callback se ejecuta, la página no cambia visualmente porque currentPage siempre es 3.
Agregando estado con useState

Para que currentPage pueda cambiar, necesitamos usar estado:

import { useState } from 'react'
//...

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Header />

      <main>
        <SearchForm />
        <JobListings />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      <Footer />
    </>
  )
}

export default App
        
          
        
        
        
      

¿Qué cambió?
Antes (valor fijo)

const currentPage = 3 // Nunca cambia

const handlePageChange = (page) => {
  console.log('Página cambiada a:', page) // Solo imprime
}
        
          
        
        
        
      

Después (con estado)

const [currentPage, setCurrentPage] = useState(1) // Estado reactivo

const handlePageChange = (page) => {
  setCurrentPage(page) // Actualiza el estado
}
        
          
        
        
        
      

Ahora sí funciona:

    Usuario hace click en “Página 3”
    Pagination llama a onPageChange(3)
    handlePageChange(3) llama a setCurrentPage(3)
    El estado cambia de 1 a 3
    React re-renderiza App con el nuevo valor
    Pagination recibe currentPage={3} como prop
    El botón “3” se muestra activo

Entendiendo los renderizados

Vamos a agregar console.log para ver cuándo se renderiza cada componente:

// src/App.jsx

function App() {
  console.log('🔵 App renderizado')

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5

  // ...
}
        
          
        
        
        
      

// src/components/Pagination.jsx
function Pagination({ currentPage = 1, totalPages = 5, onPageChange }) {
  console.log('🟢 Pagination renderizado', { currentPage })

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const handlePrevious = (e) => {
    e.preventDefault()
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePageClick = (e, page) => {
    e.preventDefault()
    onPageChange(page)
  }

  // ... resto del componente
}
        
          
        
        
        
      

Al abrir la aplicación verás en la consola:

🔵 App renderizado
🟢 Pagination renderizado { currentPage: 1 }
🔵 App renderizado
🟢 Pagination renderizado { currentPage: 1 }
        
          
        
        
        
      

¿Por qué aparece dos veces? 🤔
React.StrictMode: Renderizados dobles

En main.jsx probablemente tengas esto:

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
        
          
        
        
        
      

<React.StrictMode> es un componente especial que:

    Solo funciona en desarrollo (no en producción)
    Renderiza los componentes dos veces intencionalmente
    Ayuda a detectar problemas potenciales en tu código
    Verifica que tus componentes sean funciones puras

¿Por qué renderiza dos veces?

React quiere asegurarse de que tus componentes sean funciones puras, es decir, que:

    Dado las mismas props/estado → siempre retornen el mismo resultado
    No tengan efectos secundarios inesperados

Renderizar dos veces ayuda a detectar:

    Componentes que modifican variables externas
    Componentes que dependen de efectos secundarios
    Código que no es idempotente

Ejemplo de problema que detectaría:

// ❌ Mal: Modifica variable externa
let counter = 0

function BadComponent() {
  counter++ // ← ¡Efecto secundario!
  return <div>Counter: {counter}</div>
}
        
          
        
        
        
      

En StrictMode, este componente mostraría valores inconsistentes porque counter se incrementa dos veces.
¿Debo preocuparme?

No. Es completamente normal y esperado:

    ✅ En desarrollo: Ves renderizados dobles (está bien)
    ✅ En producción: Solo renderiza una vez
    ✅ Es una herramienta de ayuda, no un bug

Para verlo sin StrictMode:

// main.jsx
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
        
          
        
        
        
      

Ahora solo verás:

🔵 App renderizado
🟢 Pagination renderizado { currentPage: 1 }
        
          
        
        
        
      

    💡 Recomendación: Deja StrictMode activado en desarrollo. Te ayudará a escribir código más robusto.

Observando cambios de estado

Ahora, cuando hagas click en “Página 3”, verás en la consola:

🔵 App renderizado
🟢 Pagination renderizado { currentPage: 3 }
        
          
        
        
        
      

¿Qué pasó?

    Click en “Página 3”
    Se llama a setCurrentPage(3)
    React detecta que el estado cambió
    React re-renderiza App (por eso ves el log azul)
    React re-renderiza Pagination con la nueva prop (por eso ves el log verde)

Importante: React solo re-renderiza los componentes necesarios. Si tienes otros componentes que no dependen de currentPage, no se re-renderizarán.
El flujo completo con estado

Veamos el flujo completo paso a paso:
Montaje inicial (Primera carga)

1. React monta App
   ↓
2. console.log('🔵 App renderizado')
   ↓
3. useState(1) crea el estado currentPage = 1
   ↓
4. App retorna JSX incluyendo <Pagination currentPage={1} />
   ↓
5. React monta Pagination
   ↓
6. console.log('🟢 Pagination renderizado', { currentPage: 1 })
   ↓
7. Pagination retorna JSX con botones
   ↓
8. Todo se renderiza en pantalla
        
          
        
        
        
      

Cuando haces click (Actualización)

1. Usuario hace click en "Página 3"
   ↓
2. handlePageClick llama a onPageChange(3)
   ↓
3. handlePageChange llama a setCurrentPage(3)
   ↓
4. React detecta cambio de estado: 1 → 3
   ↓
5. React re-renderiza App
   ↓
6. console.log('🔵 App renderizado')
   ↓
7. App retorna JSX con <Pagination currentPage={3} />
   ↓
8. React detecta que Pagination recibió nueva prop
   ↓
9. React re-renderiza Pagination
   ↓
10. console.log('🟢 Pagination renderizado', { currentPage: 3 })
   ↓
11. Pagination retorna JSX con botón "3" activo
   ↓
12. React actualiza el DOM (solo lo que cambió)
        
          
        
        
        
      

Lifting State Up (Elevar el estado)

Este patrón se llama “Lifting State Up” (elevar el estado):

Antes: Cada componente tiene su propio estado aislado

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1) // Estado local
  // ...
}

function JobListings() {
  const [currentPage, setCurrentPage] = useState(1) // Estado duplicado!
  // ...
}
        
          
        
        
        
      

Problema: Los dos componentes no están sincronizados.

Después: El estado vive en el ancestro común

function App() {
  const [currentPage, setCurrentPage] = useState(1) // Estado compartido

  return (
    <>
      <JobListings page={currentPage} />
      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
    </>
  )
}
        
          
        
        
        
      

Ventajas:

    ✅ Una sola fuente de verdad
    ✅ Los componentes están sincronizados
    ✅ Más fácil de mantener
    ✅ Más fácil de depurar

¿Por qué el estado vive en App?

Pregunta importante: ¿Por qué no poner el estado en Pagination?

// ❌ Estado en Pagination (problema)
function Pagination({ totalPages, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1)

  const handleClick = (page) => {
    setCurrentPage(page) // Actualiza estado local
    onPageChange(page) // Notifica al padre
  }

  // ...
}
        
          
        
        
        
      

Problemas:

    Duplicación: Si JobListings también necesita la página, tendrías dos estados separados
    Sincronización: ¿Qué pasa si el padre quiere cambiar la página desde fuera?
    Single Source of Truth: React recomienda una sola fuente de verdad para cada dato

Solución correcta:

// ✅ Estado en App (correcto)
function App() {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <>
      {/* Ambos usan el mismo estado */}
      <JobListings page={currentPage} />
      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
    </>
  )
}
        
          
        
        
        
      

Componentes controlados vs no controlados
Componente controlado (recomendado)

El valor está controlado por el padre mediante props:

// Pagination es un componente controlado
function Pagination({ currentPage, onPageChange }) {
  // currentPage viene del padre
  // No hay estado local
  // ...
}
        
          
        
        
        
      

Ventajas:

    ✅ El padre tiene control total
    ✅ Más predecible
    ✅ Más fácil de testear

Componente no controlado

El valor está controlado por el componente con estado interno:

// Pagination es un componente no controlado
function Pagination() {
  const [currentPage, setCurrentPage] = useState(1)
  // Maneja su propio estado
  // ...
}
        
          
        
        
        
      

Desventajas:

    ⚠️ El padre no tiene control
    ⚠️ Difícil sincronizar con otros componentes
    ⚠️ Más difícil de depurar

Regla general: Prefiere componentes controlados cuando necesites compartir el estado.
Simplificando el código

Podemos simplificar handlePageChange:
Versión verbosa

const handlePageChange = (page) => {
  setCurrentPage(page)
}

// <Pagination onPageChange={handlePageChange} />
        
          
        
        
        
      

Versión simplificada

<Pagination onPageChange={setCurrentPage} />
        
          
        
        
        
      

¿Por qué funciona?

    setCurrentPage ya es una función que acepta un valor
    No necesitamos crear otra función que solo llame a setCurrentPage
    Ambas versiones son equivalentes

Logs más informativos

Podemos mejorar los logs para ver más información:

function App() {
  const [currentPage, setCurrentPage] = useState(1)

  console.log('🔵 App renderizado', {
    currentPage,
    timestamp: new Date().toLocaleTimeString(),
  })

  // ...
}
        
          
        
        
        
      

function Pagination({ currentPage = 1, totalPages = 5, onPageChange }) {
  console.log('🟢 Pagination renderizado', {
    currentPage,
    totalPages,
    timestamp: new Date().toLocaleTimeString(),
  })

  // ...
}
        
          
        
        
        
      

Ahora verás:

🔵 App renderizado { currentPage: 1, timestamp: '10:30:45' }
🟢 Pagination renderizado { currentPage: 1, totalPages: 5, timestamp: '10:30:45' }
        
          
        
        
        
      

Cuando hagas click:

🔵 App renderizado { currentPage: 3, timestamp: '10:30:47' }
🟢 Pagination renderizado { currentPage: 3, totalPages: 5, timestamp: '10:30:47' }
        
          
        
        
        
      

Optimización: Evitar renderizados innecesarios

Si totalPages nunca cambia, podemos hacer que Pagination solo se re-renderice cuando currentPage cambia:

import { memo } from 'react'

const Pagination = memo(function Pagination({ currentPage, totalPages, onPageChange }) {
  console.log('🟢 Pagination renderizado', { currentPage })

  // ... resto del código
})

export default Pagination
        
          
        
        
        
      

memo:

    Memoriza el resultado del componente
    Solo re-renderiza si las props cambiaron
    Optimización de rendimiento

    💡 Nota: No abuses de memo. Úsalo solo cuando tengas problemas de rendimiento reales.

Patrón completo: Estado → Props → Callback

Este es el patrón fundamental de React:

function App() {
  // 1. Estado vive en el padre
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <Pagination
      // 2. Estado se pasa como prop
      currentPage={currentPage}
      // 3. Setter se pasa como callback
      onPageChange={setCurrentPage}
    />
  )
}

function Pagination({ currentPage, onPageChange }) {
  // 4. Hijo recibe el estado como prop
  // 5. Hijo llama al callback para actualizar
  return <button onClick={() => onPageChange(2)}>Ir a página 2</button>
}
        
          
        
        
        
      

Flujo:

Estado (App)
   ↓ prop
Hijo (Pagination)
   ↓ callback
Estado actualizado (App)
   ↓ prop actualizada
Hijo re-renderizado (Pagination)
        
          
        
        
        
      

¡Resumiendo que es gerundio!

En esta clase has aprendido:

    📊 useState en padre - Crear estado en el componente padre
    ⬇️ Pasar estado como prop - El hijo recibe el estado actualizado
    🔄 Lifting State Up - Elevar el estado al ancestro común
    🎭 StrictMode - Renderiza dos veces en desarrollo (es normal)
    📝 console.log - Observar cuándo se renderiza cada componente
    🔁 Flujo completo - Estado → Props → Callback → Actualización
    🎛️ Componentes controlados - El padre controla el valor
    ⚡ Renderizados - React solo actualiza lo que cambió
    🎯 Single Source of Truth - Una sola fuente de verdad para cada dato

En la próxima clase profundizaremos en renderizado de listas con .map(), aprendiendo a transformar arrays de datos en componentes React de forma dinámica y eficiente.

    💡 Recuerda: El estado vive en el padre, se pasa a los hijos como props, y los hijos lo actualizan llamando a callbacks. Este es el flujo de datos unidireccional de React. Los renderizados dobles en desarrollo son normales por StrictMode y te ayudan a escribir mejor código.
---
<a id="keys-listas"></a>
Keys y Renderizado de Listas

Hasta ahora hemos trabajado con componentes individuales. En esta clase aprenderemos a renderizar listas de datos dinámicamente usando .map(), y entenderemos por qué React necesita que cada elemento tenga una key única.
El problema: Componentes repetidos manualmente

Imagina que queremos mostrar una lista de trabajos:

function App() {
  return (
    <div>
      <article className="job-listing-card">
        <h3>Frontend Developer</h3>
        <p>TechCorp</p>
        <p>Madrid, España</p>
      </article>

      <article className="job-listing-card">
        <h3>Backend Developer</h3>
        <p>DataStack</p>
        <p>Barcelona, España</p>
      </article>

      <article className="job-listing-card">
        <h3>Full Stack Developer</h3>
        <p>StartupX</p>
        <p>Valencia, España</p>
      </article>
    </div>
  )
}
        
          
        
        
        
      

Problemas:

    📝 Repetitivo - Copiar y pegar el mismo HTML
    🔢 No escala - ¿Y si tienes 100 trabajos?
    📊 Datos hardcodeados - Los datos están mezclados con la UI
    🔄 Difícil de actualizar - Cambiar algo requiere tocar múltiples lugares

Creando el archivo de datos

Primero, creemos un archivo JSON con nuestros datos:

// src/data/jobs.json
[
  {
    "id": "7a4d1d8b-1e45-4d8c-9f1a-8c2f9a9121a4",
    "titulo": "Desarrollador de Software Senior",
    "empresa": "Tech Solutions Inc.",
    "ubicacion": "Remoto",
    "descripcion": "Buscamos un ingeniero de software con experiencia en desarrollo web y conocimientos en JavaScript, React y Node.js. El candidato ideal debe ser capaz de trabajar en equipo y tener buenas habilidades de comunicación.",
    "data": {
      "technology": ["react", "node", "javascript"],
      "modalidad": "remoto",
      "nivel": "senior"
    }
  },
  {
    "id": "d35b2c89-5d60-4f26-b19a-6cfb2f1a0f57",
    "titulo": "Analista de Datos",
    "empresa": "Data Driven Co.",
    "ubicacion": "Ciudad de México",
    "descripcion": "Estamos buscando un analista de datos con experiencia en el manejo de grandes conjuntos de datos y herramientas de visualización. Se requiere conocimiento en SQL, Python y R.",
    "data": {
      "technology": "python",
      "modalidad": "cdmx",
      "nivel": "junior"
    }
  }
  // ... más elementos
]
        
          
        
        
        
      

Creando el componente JobCard

Ahora creemos un componente para mostrar cada trabajo:

// src/components/JobCard.jsx
export function JobCard({ job }) {
  return (
    <article
      className="job-listing-card"
      data-modalidad={job.data.modalidad}
      data-nivel={job.data.nivel}
      data-technology={job.data.technology}
    >
      <div>
        <h3>{job.titulo}</h3>
        <small>
          {job.empresa} | {job.ubicacion}
        </small>
        <p>{job.descripcion}</p>
      </div>
      <button>Aplicar</button>
    </article>
  )
}
        
          
        
        
        
      

Puntos clave:

    Recibe job como prop
    Accede a las propiedades del objeto: job.title, job.company, etc.

Renderizando la lista con .map()

Ahora creemos el componente que renderiza la lista de trabajos:

// src/components/JobListings.jsx
import { JobCard } from './JobCard'
import jobsData from './data/jobs.json'

export function JobListings() {
  return (
    <div className="jobs-grid">
      {jobsData.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}
        
          
        
        
        
      

¿Qué hace .map()?

// Array de datos
const jobs = [
  { id: 1, title: 'Frontend Developer' },
  { id: 2, title: 'Backend Developer' },
  { id: 3, title: 'Full Stack Developer' },
]

// .map() transforma cada elemento
jobs.map((job) => <JobCard key={job.id} job={job} />)

// Resultado: Array de componentes React
// [
//   <JobCard key={1} job={{...}} />,
//   <JobCard key={2} job={{...}} />,
//   <JobCard key={3} job={{...}} />
// ]
        
          
        
        
        
      

¿Por qué necesitamos la key?

La prop key es obligatoria cuando renderizas listas. Sin ella, verás este warning:

⚠️ Warning: Each child in a list should have a unique "key" prop.
        
          
        
        
        
      

¿Qué es la key?

La key es un identificador único que ayuda a React a identificar qué elementos cambiaron, se agregaron o se eliminaron.

{
  jobs.map((job) => <JobCard key={job.id} job={job} />)
}
//                           ↑
//                      Obligatoria y única
        
          
        
        
        
      

¿Por qué React necesita keys?

React necesita saber qué elemento es cuál cuando la lista cambia.

Sin keys: React no sabe qué cambió

// Renderizado inicial
[
  <JobCard />,  // Frontend Developer
  <JobCard />,  // Backend Developer
  <JobCard />,  // Full Stack Developer
]

// Agregas uno al inicio
[
  <JobCard />,  // 🆕 DevOps Engineer
  <JobCard />,  // Frontend Developer
  <JobCard />,  // Backend Developer
  <JobCard />,  // Full Stack Developer
]

// React piensa: "¿Todos cambiaron? Re-renderizo todos" 🐌
        
          
        
        
        
      

Con keys: React sabe exactamente qué cambió

// Renderizado inicial
[
  <JobCard key={1} />,  // Frontend Developer
  <JobCard key={2} />,  // Backend Developer
  <JobCard key={3} />,  // Full Stack Developer
]

// Agregas uno al inicio
[
  <JobCard key={4} />,  // 🆕 DevOps Engineer (NUEVO)
  <JobCard key={1} />,  // Frontend Developer (mismo)
  <JobCard key={2} />,  // Backend Developer (mismo)
  <JobCard key={3} />,  // Full Stack Developer (mismo)
]

// React piensa: "Solo key={4} es nuevo, solo renderizo ese" ⚡
        
          
        
        
        
      

Reglas de las keys
1. Deben ser únicas entre hermanos

// ✅ Correcto: IDs únicos
{
  jobs.map((job) => <JobCard key={job.id} job={job} />)
}

// ❌ Error: Todas tienen la misma key
{
  jobs.map((job) => <JobCard key="job" job={job} />)
}
        
          
        
        
        
      

2. Deben ser estables

La key no debería cambiar entre renderizados:

// ❌ Mal: Math.random() genera keys diferentes cada vez
{
  jobs.map((job) => <JobCard key={Math.random()} job={job} />)
}

// ✅ Bien: El ID no cambia
{
  jobs.map((job) => <JobCard key={job.id} job={job} />)
}
        
          
        
        
        
      

3. Preferiblemente, usa IDs del dato

// ✅ Mejor: ID del objeto
{
  jobs.map((job) => <JobCard key={job.id} job={job} />)
}

// ⚠️ Aceptable solo si la lista NUNCA cambia
{
  jobs.map((job, index) => <JobCard key={index} job={job} />)
}
        
          
        
        
        
      

¿Cuándo usar índices como keys?

Los índices del array (index) solo son seguros cuando:

    ✅ La lista nunca se reordena
    ✅ La lista nunca cambia (no se agregan/eliminan items)
    ✅ Los items no tienen un ID único

Ejemplo donde es seguro:

const DAYS_OF_WEEK = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']

// ✅ OK: Lista estática que nunca cambia
{
  DAYS_OF_WEEK.map((day, index) => <li key={index}>{day}</li>)
}
        
          
        
        
        
      

Ejemplo donde NO es seguro:

const [tasks, setTasks] = useState([...])

// ❌ Mal: Lista dinámica que cambia
{tasks.map((task, index) => (
  <Task key={index} task={task} />
))}

// ✅ Bien: Usa ID único
{tasks.map((task) => (
  <Task key={task.id} task={task} />
))}
        
          
        
        
        
      

Problema con índices: Ejemplo visual

Imagina una lista de tareas:

// Lista inicial
;[
  { id: 'a', text: 'Tarea A', completed: false },
  { id: 'b', text: 'Tarea B', completed: true },
  { id: 'c', text: 'Tarea C', completed: false },
]
        
          
        
        
        
      

Con índices como key:

// Renderizado inicial
<Task key={0} text="Tarea A" completed={false} />
<Task key={1} text="Tarea B" completed={true} />
<Task key={2} text="Tarea C" completed={false} />

// Usuario elimina "Tarea A"
<Task key={0} text="Tarea B" completed={true} />  // ← key cambió!
<Task key={1} text="Tarea C" completed={false} /> // ← key cambió!

// React piensa: "key={0} cambió de 'Tarea A' a 'Tarea B'"
// Puede causar bugs en el estado o animaciones
        
          
        
        
        
      

Con IDs como key:

// Renderizado inicial
<Task key="a" text="Tarea A" completed={false} />
<Task key="b" text="Tarea B" completed={true} />
<Task key="c" text="Tarea C" completed={false} />

// Usuario elimina "Tarea A"
<Task key="b" text="Tarea B" completed={true} />  // ← key no cambió
<Task key="c" text="Tarea C" completed={false} /> // ← key no cambió

// React piensa: "key='a' se eliminó, las demás siguen igual"
// Todo funciona correctamente
        
          
        
        
        
      

Lista vacía: Renderizado condicional

¿Qué pasa si no hay trabajos? Deberíamos mostrar un mensaje:

export function JobListings({ jobs }) {
  if (jobs.length === 0) {
    return (
      <div className="no-jobs">
        <p>No hay trabajos disponibles en este momento.</p>
      </div>
    )
  }

  return (
    <div className="jobs-grid">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}
        
          
        
        
        
      

O con operador ternario:

export function JobListings({ jobs }) {
  return (
    <div>
      {jobs.length === 0 ? (
        <p>No hay trabajos disponibles.</p>
      ) : (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}
        
          
        
        
        
      

Lo que hemos visto en esta clase

    🗂️ Importar JSON - Cargar datos desde archivos externos
    🧩 Componente JobCard - Mostrar un trabajo individual
    📋 Componente JobListings - Renderizar lista de trabajos
    🔄 .map() - Transformar array de datos en array de componentes
    🔑 Key obligatoria - React necesita identificar elementos únicos
    🎯 Keys únicas y estables - Usar IDs en lugar de índices
    ⚠️ Problema con índices - Por qué no usar index en listas dinámicas
    📊 Flujo de datos - JSON → JobListings → JobCard
    🎭 Renderizado condicional - Mostrar mensaje si lista está vacía

En la próxima clase vamos a terminar de hacer funcionar nuestra paginación.

    💡 Recuerda: Siempre usa keys únicas y estables al renderizar listas. Prefiere IDs del objeto sobre índices del array. La key ayuda a React a optimizar los renderizados identificando qué elementos cambiaron.

---
<a id="terminando-paginacion"></a>
Terminando la paginación

En las clases anteriores creamos el componente Pagination y aprendimos a pasar funciones como props y manejar el estado en el componente padre. Ahora vamos a conectar todo para que la paginación funcione completamente: calcularemos el número total de páginas y mostraremos solo los trabajos de la página actual.
Moviendo la importación de datos a App.jsx

Antes de continuar, necesitamos hacer un cambio importante en nuestra arquitectura. Hasta ahora, JobListings importaba directamente los datos del archivo jobs.json:

// src/components/JobListings.jsx (antes)
import jobsData from './data/jobs.json'

export function JobListings() {
  return (
    <div className="jobs-grid">
      {jobsData.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}
        
          
        
        
        
      

Problema: Si los datos están dentro de JobListings, no podemos filtrarlos, paginarlos ni manipularlos desde App.jsx.

Solución: Mover la importación de los datos a App.jsx y pasarlos como prop a JobListings:

// src/App.jsx (ahora)
import jobsData from './data/jobs.json'

function App() {
  // Ahora podemos filtrar, paginar o manipular los datos aquí
  return (
    <>
      <Header />
      <main>
        <SearchForm />
        <JobListings jobs={jobsData} />
        <Pagination />
      </main>
      <Footer />
    </>
  )
}
        
          
        
        
        
      

// src/components/JobListings.jsx (ahora)
export function JobListings({ jobs }) {
  // Recibe los datos desde arriba
  return (
    <div className="jobs-grid">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}
        
          
        
        
        
      

¿Por qué es mejor así?

Antes (datos en JobListings):

JobListings (tiene los datos)
    ↓
  Renderiza JobCard
        
          
        
        
        
      

    ❌ No podemos filtrar los datos desde App
    ❌ No podemos paginar los datos desde App
    ❌ No podemos compartir los datos con otros componentes

Ahora (datos en App):

App (tiene los datos)
 ↓
 ├─→ Puede filtrar
 ├─→ Puede paginar
 ├─→ Puede calcular totales
 ↓
JobListings (solo renderiza)
 ↓
JobCard
        
          
        
        
        
      

    ✅ Tenemos control total sobre los datos
    ✅ Podemos aplicar paginación
    ✅ Podemos aplicar filtros
    ✅ Podemos pasar los datos a múltiples componentes

Principio de React: Los datos deben estar en el componente padre que necesita manipularlos. Los componentes hijos solo deben mostrar lo que reciben.
El código completo en App.jsx

Vamos a ver cómo queda el componente App con la paginación funcionando:

// src/App.jsx
import { useState } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { SearchForm } from './components/SearchForm'
import { JobListings } from './components/JobListings'
import Pagination from './components/Pagination'
import jobsData from './data/jobs.json'

const RESULTS_PER_PAGE = 5

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE)

  const pagedResults = jobsData.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Header />
      <main>
        <SearchForm />
        <JobListings jobs={pagedResults} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
        
          
        
        
        
      

Vamos a desglosar cada parte para entenderla mejor.
Constante RESULTS_PER_PAGE

const RESULTS_PER_PAGE = 5
        
          
        
        
        
      

Definimos una constante con el número de resultados que queremos mostrar por página. Usar una constante nos permite:

    ✅ Cambiar fácilmente - Solo modificamos un valor
    ✅ Legibilidad - El código es más claro
    ✅ Evitar valores mágicos - No usamos 5 directamente en varias partes

Convención: Las constantes suelen escribirse en MAYÚSCULAS_CON_GUIONES_BAJOS.
Calculando el total de páginas con Math.ceil()

const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE)
        
          
        
        
        
      

Necesitamos saber cuántas páginas totales tendremos. Para eso dividimos el total de trabajos entre los resultados por página.
Entendiendo Math.ceil()

Math.ceil() redondea hacia arriba al número entero más cercano:

Math.ceil(4.1) // 5
Math.ceil(4.5) // 5
Math.ceil(4.9) // 5
Math.ceil(5.0) // 5
        
          
        
        
        
      

¿Por qué usamos ceil()?

Porque si tenemos 23 trabajos y mostramos 5 por página:

23 / 5 = 4.6 páginas
        
          
        
        
        
      

No podemos tener 4.6 páginas, necesitamos 5 páginas completas:

    Página 1: 5 trabajos (1-5)
    Página 2: 5 trabajos (6-10)
    Página 3: 5 trabajos (11-15)
    Página 4: 5 trabajos (16-20)
    Página 5: 3 trabajos (21-23) ← Página incompleta pero necesaria

// ✅ Correcto: Redondeamos hacia arriba
const totalPages = Math.ceil(23 / 5) // 5

// ❌ Incorrecto: Perderíamos los últimos 3 trabajos
const totalPages = Math.floor(23 / 5) // 4

// ❌ Incorrecto: No tiene sentido 4.6 páginas
const totalPages = 23 / 5 // 4.6
        
          
        
        
        
      

Comparando Math.floor(), Math.ceil() y Math.round()

JavaScript tiene tres funciones para redondear números:
1. Math.floor() - Redondea hacia abajo

Siempre redondea al entero menor más cercano:

Math.floor(4.1) // 4
Math.floor(4.5) // 4
Math.floor(4.9) // 4
Math.floor(5.0) // 5
Math.floor(-4.9) // -5 (hacia abajo en la recta numérica)
        
          
        
        
        
      

Ejemplo de uso:

// Calcular edad a partir de años decimales
const edadExacta = 25.8
const edad = Math.floor(edadExacta) // 25 años completos
        
          
        
        
        
      

2. Math.ceil() - Redondea hacia arriba

Siempre redondea al entero mayor más cercano:

Math.ceil(4.1) // 5
Math.ceil(4.5) // 5
Math.ceil(4.9) // 5
Math.ceil(5.0) // 5
Math.ceil(-4.1) // -4 (hacia arriba en la recta numérica)
        
          
        
        
        
      

Ejemplo de uso:

// Calcular número de cajas necesarias
const productos = 23
const productosPorCaja = 10
const cajasNecesarias = Math.ceil(productos / productosPorCaja) // 3 cajas
        
          
        
        
        
      

3. Math.round() - Redondea al más cercano

Redondea al entero más cercano. Si está exactamente en el medio (.5), redondea hacia arriba:

Math.round(4.1) // 4
Math.round(4.4) // 4
Math.round(4.5) // 5 ← En el medio, redondea hacia arriba
Math.round(4.9) // 5
Math.round(5.0) // 5
Math.round(-4.5) // -4
        
          
        
        
        
      

Ejemplo de uso:

// Redondear precio al euro más cercano
const precioExacto = 19.67
const precioRedondeado = Math.round(precioExacto) // 20€
        
          
        
        
        
      

Tabla comparativa
Número	floor()	round()	ceil()
4.1	4	4	5
4.4	4	4	5
4.5	4	5	5
4.6	4	5	5
4.9	4	5	5
5.0	5	5	5

Ayuda visual:

        floor()          round()          ceil()
           ↓                ↓                ↓
    4 ←-------- 4.3 -----------→ 5 --------→ 5
    4 ←-------- 4.5 ---------------→ 5 ----→ 5
    4 ←-------- 4.7 -------------------→ 5 → 5
        
          
        
        
        
      

¿Cuál usar para la paginación?

Para calcular páginas totales, siempre usa Math.ceil():

// 23 trabajos, 5 por página
Math.floor(23 / 5) // ❌ 4 - Perdemos los últimos 3 trabajos
Math.round(23 / 5) // ❌ 5 - Funciona, pero no es semánticamente correcto
Math.ceil(23 / 5) // ✅ 5 - Correcto: necesitamos 5 páginas
        
          
        
        
        
      

Cortando los datos con Array.slice()

Ahora necesitamos obtener solo los trabajos de la página actual. Para eso usamos slice():

const pagedResults = jobsData.slice(
  (currentPage - 1) * RESULTS_PER_PAGE, // inicio
  currentPage * RESULTS_PER_PAGE // fin (no incluido)
)
        
          
        
        
        
      

¿Qué hace Array.slice()?

slice() extrae una porción del array sin modificar el array original:

array.slice(inicio, fin)
        
          
        
        
        
      

    inicio: Índice donde empezar (incluido)
    fin: Índice donde terminar (no incluido)
    Retorna un nuevo array con los elementos entre inicio y fin

Ejemplos básicos:

const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// Obtener los primeros 5 elementos
numeros.slice(0, 5) // [0, 1, 2, 3, 4]

// Obtener los elementos del índice 5 al 10
numeros.slice(5, 10) // [5, 6, 7, 8, 9]

// Obtener los últimos 3 elementos
numeros.slice(-3) // [7, 8, 9]

// Obtener todos menos el primero y el último
numeros.slice(1, -1) // [1, 2, 3, 4, 5, 6, 7, 8]
        
          
        
        
        
      

Importante: slice() no muta el array original:

const original = [1, 2, 3, 4, 5]
const copia = original.slice(1, 3) // [2, 3]

console.log(original) // [1, 2, 3, 4, 5] ← No cambió
console.log(copia) // [2, 3]
        
          
        
        
        
      

Calculando los índices para cada página

Veamos cómo calcular los índices de inicio y fin para cada página:

Con 23 trabajos y 5 por página:

const RESULTS_PER_PAGE = 5
        
          
        
        
        
      

Página 1

currentPage = 1
inicio = (1 - 1) * 5 = 0
fin = 1 * 5 = 5

jobsData.slice(0, 5) // Índices 0, 1, 2, 3, 4 (5 elementos)
        
          
        
        
        
      

Página 2

currentPage = 2
inicio = (2 - 1) * 5 = 5
fin = 2 * 5 = 10

jobsData.slice(5, 10) // Índices 5, 6, 7, 8, 9 (5 elementos)
        
          
        
        
        
      

Página 3

currentPage = 3
inicio = (3 - 1) * 5 = 10
fin = 3 * 5 = 15

jobsData.slice(10, 15) // Índices 10, 11, 12, 13, 14 (5 elementos)
        
          
        
        
        
      

Página 5 (última, incompleta)

currentPage = 5
inicio = (5 - 1) * 5 = 20
fin = 5 * 5 = 25

jobsData.slice(20, 25) // Índices 20, 21, 22 (3 elementos)
// No hay problema si `fin` es mayor que el tamaño del array
        
          
        
        
        
      

Tabla visual de la paginación
Página	currentPage	inicio	fin	slice()	Trabajos mostrados
1	1	0	5	slice(0, 5)	0-4 (5 trabajos)
2	2	5	10	slice(5, 10)	5-9 (5 trabajos)
3	3	10	15	slice(10, 15)	10-14 (5 trabajos)
4	4	15	20	slice(15, 20)	15-19 (5 trabajos)
5	5	20	25	slice(20, 25)	20-22 (3 trabajos)
Ejemplo con datos reales

const jobsData = [
  { id: 1, title: 'Job 1' },
  { id: 2, title: 'Job 2' },
  { id: 3, title: 'Job 3' },
  { id: 4, title: 'Job 4' },
  { id: 5, title: 'Job 5' },
  { id: 6, title: 'Job 6' },
  { id: 7, title: 'Job 7' },
  { id: 8, title: 'Job 8' },
  { id: 9, title: 'Job 9' },
  { id: 10, title: 'Job 10' },
  { id: 11, title: 'Job 11' },
  { id: 12, title: 'Job 12' },
  { id: 13, title: 'Job 13' },
]

const RESULTS_PER_PAGE = 5
const currentPage = 2

const pagedResults = jobsData.slice(
  (currentPage - 1) * RESULTS_PER_PAGE, // (2-1)*5 = 5
  currentPage * RESULTS_PER_PAGE // 2*5 = 10
)

console.log(pagedResults)
// [
//   { id: 6, title: 'Job 6' },
//   { id: 7, title: 'Job 7' },
//   { id: 8, title: 'Job 8' },
//   { id: 9, title: 'Job 9' },
//   { id: 10, title: 'Job 10' }
// ]
        
          
        
        
        
      

El flujo completo de la paginación

Vamos a ver cómo funciona todo junto:
1. Estado inicial

const [currentPage, setCurrentPage] = useState(1)
// currentPage = 1
        
          
        
        
        
      

2. Cálculo de páginas totales

const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE)
// totalPages = Math.ceil(23 / 5) = 5
        
          
        
        
        
      

3. Obtención de trabajos de la página actual

const pagedResults = jobsData.slice(
  (currentPage - 1) * RESULTS_PER_PAGE, // (1-1)*5 = 0
  currentPage * RESULTS_PER_PAGE // 1*5 = 5
)
// pagedResults = [trabajo1, trabajo2, trabajo3, trabajo4, trabajo5]
        
          
        
        
        
      

4. Renderizado

<JobListings jobs={pagedResults} />
// Muestra solo los 5 primeros trabajos

<Pagination
  currentPage={1}
  totalPages={5}
  onPageChange={handlePageChange}
/>
// Muestra: [<] 1 2 3 4 5 [>]
        
          
        
        
        
      

5. Usuario hace clic en página 3

// Usuario hace clic en el botón "3"
// Se ejecuta:
handlePageChange(3)
// Que llama a:
setCurrentPage(3)
        
          
        
        
        
      

6. React re-renderiza

// currentPage ahora es 3
const pagedResults = jobsData.slice(
  (3 - 1) * 5, // 10
  3 * 5 // 15
)
// pagedResults = [trabajo11, trabajo12, trabajo13, trabajo14, trabajo15]

// Se renderiza de nuevo con los nuevos datos
<JobListings jobs={pagedResults} />
// Muestra los trabajos 11-15

<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />
// Muestra: [<] 1 2 *3* 4 5 [>]
//                 ↑
//            página activa
        
          
        
        
        
      

Diagrama del flujo de datos

╔════════════════════════════════════╗
║          jobsData (23 items)       ║
╚════════════════════════════════════╝
              ↓
╔════════════════════════════════════╗
║  totalPages = ceil(23/5) = 5       ║
╚════════════════════════════════════╝
              ↓
╔════════════════════════════════════╗
║  currentPage = 1 (estado)          ║
╚════════════════════════════════════╝
              ↓
╔════════════════════════════════════╗
║  pagedResults = slice(0, 5)        ║
║  [trabajo1, trabajo2, ... trabajo5]║
╚════════════════════════════════════╝
              ↓
    ┌─────────────────┐
    │   JobListings   │
    │  (5 trabajos)   │
    └─────────────────┘
              ↓
    ┌─────────────────┐
    │   Pagination    │
    │   [<] 1 2 3 4 5 [>] │
    └─────────────────┘
              ↓
     Usuario hace clic en "3"
              ↓
       onPageChange(3)
              ↓
      setCurrentPage(3)
              ↓
         RE-RENDER
              ↓
    pagedResults = slice(10, 15)
              ↓
    JobListings muestra trabajos 11-15
        
          
        
        
        
      

Ventajas de esta implementación
✅ Separación de responsabilidades

// App.jsx - Maneja la lógica de datos
const pagedResults = jobsData.slice(...)

// JobListings.jsx - Solo renderiza lo que recibe
<JobListings jobs={pagedResults} />

// Pagination.jsx - Solo maneja la navegación
<Pagination currentPage={...} onPageChange={...} />
        
          
        
        
        
      

✅ Reutilizable

El componente Pagination puede usarse con cualquier tipo de datos:

// Para trabajos
<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />

// Para productos
<Pagination
  currentPage={productPage}
  totalPages={productTotalPages}
  onPageChange={handleProductPageChange}
/>

// Para artículos
<Pagination
  currentPage={articlePage}
  totalPages={articleTotalPages}
  onPageChange={handleArticlePageChange}
/>
        
          
        
        
        
      

✅ Eficiente

    Solo renderizamos los trabajos necesarios
    slice() no muta el array original
    No cargamos todos los trabajos de golpe

Mejoras posibles
1. Scroll al inicio al cambiar de página

const handlePageChange = (page) => {
  setCurrentPage(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
        
          
        
        
        
      

2. Persistir página en la URL

// Usando React Router
const [searchParams, setSearchParams] = useSearchParams()
const currentPage = Number(searchParams.get('page') || '1')

const handlePageChange = (page) => {
  setSearchParams({ page })
}

// URL: /jobs?page=3
        
          
        
        
        
      

3. Desactivar botones en los extremos

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  disablePrevious={currentPage === 1}
  disableNext={currentPage === totalPages}
/>
        
          
        
        
        
      

4. Mostrar rango de resultados

<p>
  Mostrando {(currentPage - 1) * RESULTS_PER_PAGE + 1} -{' '}
  {Math.min(currentPage * RESULTS_PER_PAGE, jobsData.length)} de {jobsData.length} trabajos
</p>
// Página 2: "Mostrando 6 - 10 de 23 trabajos"
        
          
        
        
        
      

Errores comunes
❌ Olvidar restar 1 en el cálculo de inicio

// ❌ Incorrecto
const pagedResults = jobsData.slice(
  currentPage * RESULTS_PER_PAGE, // Página 1 empezaría en índice 5
  (currentPage + 1) * RESULTS_PER_PAGE
)

// ✅ Correcto
const pagedResults = jobsData.slice(
  (currentPage - 1) * RESULTS_PER_PAGE, // Página 1 empieza en índice 0
  currentPage * RESULTS_PER_PAGE
)
        
          
        
        
        
      

❌ Usar Math.floor() o Math.round() para páginas totales

// ❌ Incorrecto: Perdemos la última página parcial
const totalPages = Math.floor(jobsData.length / RESULTS_PER_PAGE)

// ❌ Incorrecto: Puede redondear mal
const totalPages = Math.round(jobsData.length / RESULTS_PER_PAGE)

// ✅ Correcto: Siempre redondea hacia arriba
const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE)
        
          
        
        
        
      

❌ Mutar el array con splice()

// ❌ Incorrecto: splice() MUTA el array original
const pagedResults = jobsData.splice(0, 5)

// ✅ Correcto: slice() crea un nuevo array
const pagedResults = jobsData.slice(0, 5)
        
          
        
        
        
      

Diferencia entre slice() y splice():

const original = [1, 2, 3, 4, 5]

// slice() - NO muta, retorna nueva copia
const copia = original.slice(1, 3) // [2, 3]
console.log(original) // [1, 2, 3, 4, 5] ← No cambió

// splice() - SÍ muta, modifica el original
const eliminados = original.splice(1, 2) // [2, 3]
console.log(original) // [1, 4, 5] ← Cambió!
        
          
        
        
        
      

Lo que hemos visto en esta clase

    📊 Paginación completa - Cálculo de páginas y corte de datos
    🔢 Math.ceil() - Redondear hacia arriba para páginas totales
    🔍 Math.floor(), Math.round(), Math.ceil() - Diferencias entre las funciones de redondeo
    ✂️ Array.slice() - Extraer porción de array sin mutar
    🧮 Cálculo de índices - Fórmula: (page-1) * size y page * size
    📈 Flujo completo - De datos a renderizado y actualización
    ⚡ Optimización - Solo renderizar datos necesarios
    🎯 Separación de responsabilidades - Cada componente hace una cosa

En la próxima clase veremos más conceptos avanzados de React que te ayudarán a construir aplicaciones más complejas.

    💡 Recuerda: Para paginación siempre usa Math.ceil() para el total de páginas y slice() para cortar los datos. La fórmula clave es: inicio = (página - 1) * tamaño, fin = página * tamaño.

----
<a id="css-modules"></a>
CSS Modules

Hasta ahora hemos usado CSS global, donde todas las clases están disponibles en toda la aplicación. En esta clase aprenderemos a usar CSS Modules, una técnica que nos permite escribir CSS con ámbito local para cada componente, evitando conflictos de nombres.
El problema con CSS global

Imagina que tienes estos estilos globales:

/* styles.css */
.button {
  background-color: blue;
  color: white;
}
        
          
        
        
        
      

/* otro-archivo.css */
.button {
  background-color: red; /* ⚠️ Sobreescribe el anterior */
  font-size: 20px;
}
        
          
        
        
        
      

Problemas:

    ❌ Colisiones de nombres - Dos clases .button se pisan entre sí
    ❌ Difícil de mantener - No sabes dónde se usa cada clase
    ❌ Miedo a romper algo - Cambiar un estilo puede afectar otros componentes
    ❌ No hay encapsulación - Los estilos de un componente afectan a otros

¿Qué son los CSS Modules?

Los CSS Modules son archivos CSS normales pero con una convención especial: el nombre del archivo termina en .module.css.

❌ Pagination.css       → CSS global
✅ Pagination.module.css → CSS Module (ámbito local)
        
          
        
        
        
      

Característica principal: Las clases CSS tienen ámbito local automáticamente. React (Vite/Webpack) las transforma para que sean únicas.
Creando el CSS Module para Pagination

Vamos a crear estilos para nuestro componente Pagination.
1. Crear el archivo Pagination.module.css

Creamos el archivo junto al componente:

src/
  components/
    Pagination.jsx
    Pagination.module.css  ← Nuevo archivo
        
          
        
        
        
      

Convención de nombres:

    El archivo debe llamarse igual que el componente
    Debe tener la extensión .module.css
    Se coloca en la misma carpeta que el componente

2. Escribir los estilos

/* src/components/Pagination.module.css */
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-block: 2rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    text-decoration: none;
    color: var(--text-muted);
    border-radius: 0.375rem;
    transition: all 0.3s;

    &:hover,
    &:focus {
      background-color: #fff;
    }

    &:active {
      transform: scale(0.9);
    }
  }
}

.isActive {
  background-color: var(--primary-light);
  color: white;
  pointer-events: none;
}
        
          
        
        
        
      

Notas sobre la sintaxis:

    Usamos anidación (a dentro de .pagination) - Esto funciona con herramientas modernas como Vite
    Usamos &:hover para pseudoclases
    Usamos margin-block (propiedad lógica de CSS moderno)
    Usamos variables CSS (var(--primary-light))

3. Importar y usar el CSS Module

Ahora importamos el CSS Module en nuestro componente:

// src/components/Pagination.jsx
import styles from './Pagination.module.css'

export function Pagination({ currentPage = 1, totalPages = 5, onPageChange }) {

  // ...

  return (
    <nav className={styles.pagination}>
      <a href="#" style={styleLinkLeft} onClick={handlePrevious}>
        <!-- Icono de flecha izquierda -->
      </a>

      {pages.map((page) => (
        <a
          key={page}
          className={currentPage === page ? styles.isActive : ''}
          href="#"
          onClick={(e) => handlePageClick(e, page)}
        >
          {page}
        </a>
      ))}

      <a href="#" style={styleLinkRight} onClick={handleNext}>
        <!-- Icono de flecha derecha -->
      </a>
    </nav>
  )
}
        
          
        
        
        
      

Puntos clave:

// 1. Importar el CSS Module
import styles from './Pagination.module.css'

// 2. Usar las clases con styles.nombreClase
<nav className={styles.pagination}>
  {/* ... */}
</nav>

// 3. Aplicar clases condicionales
<a className={currentPage === page ? styles.isActive : ''}>
  {page}
</a>
        
          
        
        
        
      

¿Cómo funcionan los CSS Modules?

Cuando importas un CSS Module, React (Vite/Webpack) transforma los nombres de las clases para hacerlos únicos:
Código que escribes

import styles from './Pagination.module.css'
;<nav className={styles.pagination}>
  <a className={styles.isActive}>1</a>
</nav>
        
          
        
        
        
      

Lo que se importa

styles = {
  pagination: 'Pagination_pagination__a1b2c',
  isActive: 'Pagination_isActive__d3e4f',
}
        
          
        
        
        
      

HTML generado en el navegador

<nav class="Pagination_pagination__a1b2c">
  <a class="Pagination_isActive__d3e4f">1</a>
</nav>
        
          
        
        
        
      

Resultado: Los nombres de clase son únicos y no colisionan con otros componentes.
Formato del nombre generado

El nombre generado sigue este patrón:

[Componente]_[clase-original]__[hash-único]
        
          
        
        
        
      

Ejemplos:

.pagination  →  Pagination_pagination__a1b2c
.isActive    →  Pagination_isActive__d3e4f
.button      →  Button_button__x7y8z
        
          
        
        
        
      

Comparación: CSS Global vs CSS Modules
CSS Global

/* Pagination.css */
.pagination {
  display: flex;
}

.isActive {
  background-color: blue;
}
        
          
        
        
        
      

// Pagination.jsx
import './Pagination.css'

function Pagination() {
  return (
    <nav className="pagination">
      <a className="isActive">1</a>
    </nav>
  )
}
        
          
        
        
        
      

Problemas:

    ⚠️ Si otro componente usa .isActive, pueden colisionar
    ⚠️ Los estilos están disponibles globalmente
    ⚠️ No sabes qué componente usa cada clase

CSS Modules

/* Pagination.module.css */
.pagination {
  display: flex;
}

.isActive {
  background-color: blue;
}
        
          
        
        
        
      

// Pagination.jsx
import styles from './Pagination.module.css'

function Pagination() {
  return (
    <nav className={styles.pagination}>
      <a className={styles.isActive}>1</a>
    </nav>
  )
}
        
          
        
        
        
      

Ventajas:

    ✅ No hay colisiones: .isActive es único para este componente
    ✅ Los estilos están encapsulados
    ✅ Autocompletado en el editor (puedes ver styles.)
    ✅ Error si usas una clase que no existe

Ventajas de los CSS Modules
1. ✅ Sin colisiones de nombres

Puedes usar el mismo nombre de clase en diferentes componentes:

/* Button.module.css */
.button {
  background-color: blue;
}
        
          
        
        
        
      

/* Card.module.css */
.button {
  background-color: red; /* ✅ No colisiona con Button */
}
        
          
        
        
        
      

2. ✅ Encapsulación y mantenibilidad

Los estilos están junto al componente:

src/
  components/
    Pagination/
      Pagination.jsx
      Pagination.module.css    ← Estilos aquí
        
          
        
        
        
      

    Fácil de encontrar los estilos de un componente
    Si borras el componente, borras sus estilos
    Cambiar un estilo no afecta otros componentes

3. ✅ Autocompletado y detección de errores

Tu editor puede autocompletar las clases:

import styles from './Pagination.module.css'

// Escribes: styles.
// Tu editor sugiere: pagination, isActive
<nav className={styles.pagination}>
  {/* Tu editor sabe que existe */}
</nav>

// ❌ Error de TypeScript si usas una clase que no existe
<nav className={styles.paginashon}>
  {/* TypeScript te avisa que 'paginashon' no existe */}
</nav>
        
          
        
        
        
      

4. ✅ Eliminación automática de CSS no usado

Las herramientas de build pueden detectar qué clases se usan:

// Si nunca usas styles.isActive, puede ser eliminado del bundle
        
          
        
        
        
      

5. ✅ Convive con CSS global

Puedes mezclar CSS Modules con CSS global:

import styles from './Pagination.module.css'
import './global.css'

/*
<nav className={`${styles.pagination} container`}>
                        ↑ CSS Module     ↑ CSS global
</nav>
*/
        
          
        
        
        
      

Aplicando múltiples clases

Hay varias formas de aplicar múltiples clases CSS Module:
Opción 1: Template literals

<a className={`${styles.link} ${styles.active}`}>Link</a>
        
          
        
        
        
      

Opción 2: Condicionales

<a className={currentPage === page ? styles.isActive : ''}>{page}</a>
        
          
        
        
        
      

Opción 3: Combinar módulo y global

<nav className={`${styles.pagination} container`}>
  {/*      ↑ CSS Module        ↑ CSS global */}
</nav>
        
          
        
        
        
      

Opción 4: Array + join (más legible)

<a className={[styles.link, isActive && styles.active].filter(Boolean).join(' ')}>Link</a>
        
          
        
        
        
      

Opción 5: Librería classnames

import classNames from 'classnames'

// <a className={classNames(styles.link, { [styles.active]: isActive })}>Link</a>
        
          
        
        
        
      

Cuándo usar CSS Modules vs CSS global
Usa CSS Modules para:

    ✅ Estilos de componentes específicos
    ✅ Componentes reutilizables (Button, Card, Modal)
    ✅ Cuando quieres evitar colisiones
    ✅ Proyectos medianos/grandes

Usa CSS global para:

    ✅ Reset CSS / Normalize
    ✅ Variables globales (:root)
    ✅ Estilos del body, html
    ✅ Utilidades genéricas (.container, .text-center)
    ✅ Fuentes y tipografía base

Errores comunes
❌ Olvidar .module.css

/* ❌ Pagination.css - NO es CSS Module */
.pagination {
}

/* ✅ Pagination.module.css - SÍ es CSS Module */
.pagination {
}
        
          
        
        
        
      

❌ Usar nombres con guiones

/* Pagination.module.css */
.is-active {
  /* ⚠️ Complicado de acceder */
}
        
          
        
        
        
      

// Tienes que usar corchetes
<a className={styles['is-active']}>Link</a>

// ✅ Mejor: usa camelCase
// .isActive { }
<a className={styles.isActive}>Link</a>
        
          
        
        
        
      

Convención: Usa camelCase para nombres de clases en CSS Modules.
❌ Tratar de usar clases globalmente

/* Pagination.module.css */
.pagination {
}
        
          
        
        
        
      

// ❌ No funciona: la clase real es "Pagination_pagination__a1b2c"
<nav className="pagination">

// ✅ Usa el objeto styles
<nav className={styles.pagination}>
        
          
        
        
        
      

Escapando al ámbito global: :global()

A veces necesitas estilos globales dentro de un CSS Module:

/* Pagination.module.css */
.pagination {
  /* Este estilo es local */
  display: flex;
}

/* Este estilo será global */
:global(.container) {
  max-width: 1200px;
  margin: 0 auto;
}

/* Afecta a todos los enlaces globalmente */
:global(a) {
  color: blue;
}
        
          
        
        
        
      

Uso común: Estilos para librerías externas que inyectan HTML:

.myComponent {
  /* Estilos locales */
}

/* Estilar elementos inyectados por una librería */
:global(.external-library-class) {
  color: red;
}
        
          
        
        
        
      

Lo que hemos visto en esta clase

    📦 CSS Modules - CSS con ámbito local para componentes
    🏷️ Convención .module.css - Cómo nombrar los archivos
    🔒 Encapsulación - Evitar colisiones de nombres
    🎯 Import y uso - import styles from './Pagination.module.css'
    🔧 Cómo funcionan - Transformación de nombres a clases únicas
    ✨ Ventajas - Autocompletado, mantenibilidad, sin colisiones
    🌐 Global vs Modules - Cuándo usar cada uno
    🎭 :global() - Escapar al ámbito global cuando sea necesario

En la próxima clase seguiremos explorando más conceptos de React que te ayudarán a construir aplicaciones más robustas y mantenibles.

    💡 Recuerda: Usa CSS Modules para estilos de componentes específicos y CSS global para estilos base y utilidades. Los CSS Modules te dan encapsulación y evitan colisiones de nombres automáticamente.

----
<a id="hook-useid"></a>
Hook useId()

En esta clase vamos a mejorar nuestro componente de formulario de búsqueda. Aprenderemos a manejar el evento submit y a usar el hook useId() para generar identificadores únicos que eviten colisiones en nuestros elementos HTML.
El formulario de búsqueda actual

Actualmente tenemos un formulario con dos <select> para filtrar trabajos:

// src/components/SearchForm.jsx
export function SearchForm() {
  return (
    <form className="search-form">
      <div className="form-group">
        <label htmlFor="filter-location">Ubicación</label>
        <select name="location" id="filter-location">
          <option value="">Ubicación</option>
          <option value="remoto">Remoto</option>
          <option value="cdmx">Ciudad de México</option>
          <option value="guadalajara">Guadalajara</option>
          <option value="monterrey">Monterrey</option>
          <option value="barcelona">Barcelona</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="filter-experience-level">Nivel de experiencia</label>
        <select name="experience-level" id="filter-experience-level">
          <option value="">Nivel de experiencia</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid-level</option>
          <option value="senior">Senior</option>
          <option value="lead">Lead</option>
        </select>
      </div>
    </form>
  )
}
        
          
        
        
        
      

Añadiendo el manejador de submit

Vamos a añadir un manejador para el evento submit del formulario:

// src/components/SearchForm.jsx
export function SearchForm() {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado')
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="filter-location">Ubicación</label>
        <select name="location" id="filter-location">
          <option value="">Ubicación</option>
          <option value="remoto">Remoto</option>
          <option value="cdmx">Ciudad de México</option>
          <option value="guadalajara">Guadalajara</option>
          <option value="monterrey">Monterrey</option>
          <option value="barcelona">Barcelona</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="filter-experience-level">Nivel de experiencia</label>
        <select name="experience-level" id="filter-experience-level">
          <option value="">Nivel de experiencia</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid-level</option>
          <option value="senior">Senior</option>
          <option value="lead">Lead</option>
        </select>
      </div>
    </form>
  )
}
        
          
        
        
        
      

Puntos clave:

    onSubmit={handleSubmit} - Ejecuta la función cuando se envía el formulario
    e.preventDefault() - Evita que el formulario recargue la página (comportamiento por defecto)
    console.log() - Para verificar que el evento se está ejecutando

¿Qué es e.preventDefault()?

Cuando un formulario se envía, el navegador por defecto:

    Recarga la página
    Envía los datos a la URL especificada en action
    Pierde todo el estado de React

Ejemplo sin preventDefault():

const handleSubmit = (e) => {
  console.log('Formulario enviado')
  // La página se recarga inmediatamente
  // El console.log puede no verse
}
        
          
        
        
        
      

Con preventDefault():

const handleSubmit = (e) => {
  e.preventDefault() // ← Evita la recarga
  console.log('Formulario enviado')
  // Ahora podemos manejar el formulario con JavaScript
}
        
          
        
        
        
      

Añadiendo un botón de submit

Para poder enviar el formulario, necesitamos un botón:

// src/components/SearchForm.jsx
export function SearchForm() {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado')
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="filter-location">Ubicación</label>
        <select name="location" id="filter-location">
          <option value="">Ubicación</option>
          <option value="remoto">Remoto</option>
          <option value="cdmx">Ciudad de México</option>
          <option value="guadalajara">Guadalajara</option>
          <option value="monterrey">Monterrey</option>
          <option value="barcelona">Barcelona</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="filter-experience-level">Nivel de experiencia</label>
        <select name="experience-level" id="filter-experience-level">
          <option value="">Nivel de experiencia</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid-level</option>
          <option value="senior">Senior</option>
          <option value="lead">Lead</option>
        </select>
      </div>

      <button type="submit">Buscar</button>
    </form>
  )
}
        
          
        
        
        
      

Tipos de botones:

<button type="submit">Buscar</button>
// ✅ Envía el formulario (ejecuta onSubmit)

<button type="button">Cancelar</button>
// ✅ No envía el formulario (solo ejecuta onClick)

<button type="reset">Limpiar</button>
// ✅ Resetea el formulario a sus valores iniciales

<button>Buscar</button>
// ⚠️ Por defecto es type="submit" dentro de un <form>
        
          
        
        
        
      

Importante: Si no especificas type, un <button> dentro de un <form> es automáticamente type="submit".
El problema con IDs manuales

Actualmente, nuestros IDs están hardcodeados:

<label htmlFor="filter-location">Ubicación</label>
<select name="location" id="filter-location">
  {/* ... */}
</select>

<label htmlFor="filter-experience-level">Nivel de experiencia</label>
<select name="experience-level" id="filter-experience-level">
  {/* ... */}
</select>
        
          
        
        
        
      

¿Qué problema hay con esto?
Problema 1: Colisiones de IDs

Los IDs deben ser únicos en toda la página. Si usas el componente dos veces:

function App() {
  return (
    <>
      <SearchForm />
      <SearchForm />
    </>
  )
}
        
          
        
        
        
      

HTML generado:

<!-- Primer SearchForm -->
<label for="filter-location">Ubicación</label>
<select id="filter-location">
  ...
</select>

<!-- Segundo SearchForm -->
<label for="filter-location">Ubicación</label>
<select id="filter-location">
  ...
</select>
<!-- ❌ ID duplicado! -->
        
          
        
        
        
      

Consecuencias:

    ❌ HTML inválido (los IDs deben ser únicos)
    ❌ Al hacer clic en un label, puede enfocarse el elemento incorrecto
    ❌ Problemas con lectores de pantalla (accesibilidad)
    ❌ Errores en herramientas de testing

Problema 2: Difícil de mantener

Si necesitas cambiar el ID, debes actualizarlo en varios lugares:

// Cambiar "filter-location" por "location-filter" requiere:
<label htmlFor="filter-location">
  {/*          ↑ Cambiar aquí */}
</label>
<select id="filter-location">
  {/*      ↑ Y aquí */}
</select>
        
          
        
        
        
      

La solución: useId()

React 18 introdujo el hook useId() que genera IDs únicos automáticamente:

import { useId } from 'react'

export function SearchForm() {
  const locationId = useId()
  const experienceId = useId()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado')
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor={locationId}>Ubicación</label>
        <select name="location" id={locationId}>
          <option value="">Ubicación</option>
          <option value="remoto">Remoto</option>
          <option value="cdmx">Ciudad de México</option>
          <option value="guadalajara">Guadalajara</option>
          <option value="monterrey">Monterrey</option>
          <option value="barcelona">Barcelona</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor={experienceId}>Nivel de experiencia</label>
        <select name="experience-level" id={experienceId}>
          <option value="">Nivel de experiencia</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid-level</option>
          <option value="senior">Senior</option>
          <option value="lead">Lead</option>
        </select>
      </div>

      <button type="submit">Buscar</button>
    </form>
  )
}
        
          
        
        
        
      

Cambios realizados:

    Importamos useId de React
    Llamamos useId() para cada campo que necesita un ID
    Usamos los IDs generados en htmlFor y id

Nota sobre el atributo name

También podríamos usar useId() para los atributos name en lugar de usar strings hardcodeados:

export function SearchForm() {
  const locationId = useId()
  const experienceId = useId()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado')
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor={locationId}>Ubicación</label>
        <select name={locationId} id={locationId}>
          {/* Ahora name también usa el ID generado */}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor={experienceId}>Nivel de experiencia</label>
        <select name={experienceId} id={experienceId}>
          {/* Evitamos magic strings como "experience-level" */}
        </select>
      </div>

      <button type="submit">Buscar</button>
    </form>
  )
}
        
          
        
        
        
      

Ventajas de usar useId() para name:

    ✅ Sin magic strings - No hay valores hardcodeados como "location" o "experience-level"
    ✅ Consistencia - El mismo valor para id y name
    ✅ Refactor seguro - No hay que buscar y reemplazar strings en múltiples lugares

Cuándo usarlo:

    ✅ Si los datos son solo para React (filtrado en cliente)
    ✅ Si procesas el formulario con JavaScript (no envías a servidor)

Para nuestro caso, como solo usaremos los datos en React para filtrar, podríamos usar useId() también para los name.
¿Qué genera useId() en el DOM?

Inspeccionando el HTML generado en el navegador:

<!-- Primer SearchForm -->
<label for=":r0:">Ubicación</label>
<select id=":r0:" name="location">
  ...
</select>

<label for=":r1:">Nivel de experiencia</label>
<select id=":r1:" name="experience-level">
  ...
</select>

<!-- Segundo SearchForm (si lo usamos dos veces) -->
<label for=":r2:">Ubicación</label>
<select id=":r2:" name="location">
  ...
</select>

<label for=":r3:">Nivel de experiencia</label>
<select id=":r3:" name="experience-level">
  ...
</select>
        
          
        
        
        
      

Características del ID generado:

    :r0:, :r1:, :r2:, etc.
    Formato: :r[número]:
    Los dos puntos (:) son válidos en HTML5
    Únicos en toda la aplicación
    Estables durante el ciclo de vida del componente

¿Por qué este formato?

El formato :r0: es:

    Corto - Reduce el tamaño del HTML
    Único - Garantiza que no haya colisiones
    Estable - No cambia entre renderizados
    Compatible con SSR - Funciona en Server-Side Rendering

¿Cómo funciona useId()?

const id1 = useId() // ":r0:"
const id2 = useId() // ":r1:"
const id3 = useId() // ":r2:"
        
          
        
        
        
      

Características importantes:
1. Único por componente y renderizado

function MyComponent() {
  const id1 = useId() // ":r0:"
  const id2 = useId() // ":r1:"

  // Siempre son diferentes entre sí
  console.log(id1 === id2) // false
}
        
          
        
        
        
      

2. Estable entre renderizados

function MyComponent() {
  const id = useId() // ":r0:"
  const [count, setCount] = useState(0)

  // Aunque el componente se re-renderice, el ID no cambia
  return <div id={id}>Count: {count}</div>
}
        
          
        
        
        
      

3. Único entre instancias

function App() {
  return (
    <>
      <SearchForm /> {/* locationId: ":r0:", experienceId: ":r1:" */}
      <SearchForm /> {/* locationId: ":r2:", experienceId: ":r3:" */}
    </>
  )
}
        
          
        
        
        
      

Comparación: ID manual vs useId()
ID Manual (❌ Problemático)

function SearchForm() {
  return (
    <>
      <label htmlFor="location">Ubicación</label>
      <select id="location" name="location">
        {/* ... */}
      </select>
    </>
  )
}

// Usarlo dos veces causa problemas
<SearchForm /> {/* id="location" */}
<SearchForm /> {/* id="location" ❌ Duplicado! */}
        
          
        
        
        
      

Problemas:

    ❌ IDs duplicados si usas el componente múltiples veces
    ❌ HTML inválido
    ❌ Bugs difíciles de detectar
    ❌ Problemas de accesibilidad

useId() (✅ Correcto)

import { useId } from 'react'

function SearchForm() {
  const locationId = useId()

  return (
    <>
      <label htmlFor={locationId}>Ubicación</label>
      <select id={locationId} name="location">
        {/* ... */}
      </select>
    </>
  )
}

// Usarlo múltiples veces es seguro
<SearchForm /> {/* id=":r0:" */}
<SearchForm /> {/* id=":r1:" ✅ Único! */}
        
          
        
        
        
      

Ventajas:

    ✅ IDs únicos automáticamente
    ✅ HTML válido siempre
    ✅ Sin colisiones
    ✅ Compatible con SSR
    ✅ Accesible por defecto

Casos de uso de useId()
1. Labels y inputs

function TextField({ label }) {
  const id = useId()

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" />
    </>
  )
}
        
          
        
        
        
      

2. ARIA attributes

function Tooltip({ children, tip }) {
  const id = useId()

  return (
    <>
      <div aria-describedby={id}>{children}</div>
      <div role="tooltip" id={id}>
        {tip}
      </div>
    </>
  )
}
        
          
        
        
        
      

3. Múltiples IDs relacionados

function FormField({ label }) {
  const id = useId()

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" aria-describedby={`${id}-help`} />
      <small id={`${id}-help`}>Texto de ayuda</small>
    </>
  )
}
        
          
        
        
        
      

Nota: Puedes concatenar strings al ID generado:

const baseId = useId() // ":r0:"
const inputId = `${baseId}-input` // ":r0:-input"
const helpId = `${baseId}-help` // ":r0:-help"
        
          
        
        
        
      

Reglas de useId()
✅ Puedes:

// Llamar useId() en el nivel superior del componente
function MyComponent() {
  const id = useId()
  return <div id={id}>...</div>
}

// Llamarlo múltiples veces
function MyComponent() {
  const id1 = useId()
  const id2 = useId()
  const id3 = useId()
  // ...
}

// Concatenar strings al ID
const id = useId()
const inputId = `${id}-input`
const errorId = `${id}-error`
        
          
        
        
        
      

❌ No puedes:

// ❌ No usar para keys en listas
{
  items.map((item) => <div key={useId()}>{item}</div>)
}
// Usa el ID del item en su lugar:
{
  items.map((item) => <div key={item.id}>{item}</div>)
}

// ❌ No llamar dentro de condiciones
if (condition) {
  const id = useId() // ❌ Error!
}

// ❌ No llamar dentro de loops
for (let i = 0; i < 3; i++) {
  const id = useId() // ❌ Error!
}

// ❌ No llamar dentro de callbacks
const handleClick = () => {
  const id = useId() // ❌ Error!
}
        
          
        
        
        
      

Regla general: useId() debe llamarse en el nivel superior del componente (como todos los hooks).
Diferencia entre useId() y otros hooks
useId() vs useState()

// ❌ No uses useState para IDs
const [id] = useState('my-id') // No es necesario

// ✅ Usa useId()
const id = useId() // Más simple y correcto
        
          
        
        
        
      

useState() es para datos que cambian. useId() es para identificadores que nunca cambian.

useRef() es para referencias a elementos DOM. useId() es específicamente para generar IDs únicos.
useId() vs Math.random()

// ❌ No uses Math.random()
const id = `input-${Math.random()}` // Cambia en cada render!

// ✅ Usa useId()
const id = useId() // Estable entre renders
        
          
        
        
        
      

Math.random() genera valores diferentes en cada renderizado. useId() es estable.
Lo que hemos visto en esta clase

    📝 handleSubmit - Manejar el evento submit del formulario
    ⛔ e.preventDefault() - Evitar la recarga de página
    🔘 Botón submit - Tipos de botones en formularios
    🆔 Problema con IDs manuales - Colisiones y duplicados
    🎣 Hook useId() - Generar IDs únicos automáticamente
    🔍 IDs generados - Formato :r0:, :r1:, etc.
    ✅ Ventajas de useId() - Único, estable, compatible con SSR
    🎯 Casos de uso - Labels, ARIA attributes, formularios
    📏 Reglas de useId() - Llamar en el nivel superior del componente
    🔄 Diferencias - useId vs useState, useRef, Math.random

En la próxima clase aprenderemos a gestionar los datos del formulario y cómo capturar los valores seleccionados por el usuario.

    💡 Recuerda: Siempre usa useId() para generar IDs en tus componentes React. Evita IDs hardcodeados para prevenir colisiones cuando el componente se usa múltiples veces. Los IDs son para accesibilidad y asociación de elementos, mientras que name es para enviar datos del formulario.

---
<a id="formularios-filtros"></a>
Gestión de Formularios y Filtros

En la clase anterior añadimos el handleSubmit y usamos useId() para generar identificadores únicos. Ahora vamos a implementar la lógica completa del formulario: capturar los valores, filtrar los trabajos y añadir búsqueda en tiempo real.
Capturando los datos del formulario con FormData

Vamos a mejorar nuestro handleSubmit para capturar los valores del formulario:

// src/components/SearchForm.jsx
import { useId } from 'react'

export function SearchForm() {
  const idText = useId()
  const idTechnology = useId()
  const idLocation = useId()
  const idExperienceLevel = useId()

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const filters = {
      search: formData.get(idText),
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel),
    }

    console.log(filters)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  )
}
        
          
        
        
        
      

Puntos clave:

    Creamos un useId() para cada campo del formulario
    Usamos esos IDs como valores para name e id
    En el handleSubmit, usamos FormData para obtener los valores

¿Qué es FormData?

FormData es una API nativa del navegador que permite acceder fácilmente a los datos de un formulario.
Creación de FormData

const formData = new FormData(event.target)
//                              ↑
//                     El elemento <form>
        
          
        
        
        
      

event.target es el elemento del formulario que disparó el evento submit.
Obtener valores con .get()

const formData = new FormData(event.target)

// Obtener el valor de un campo por su atributo "name"
const value = formData.get('nombre-del-campo')
        
          
        
        
        
      

En nuestro caso:

const filters = {
  search: formData.get(idText), // Valor del input de texto
  technology: formData.get(idTechnology), // Valor del select de tecnología
  location: formData.get(idLocation), // Valor del select de ubicación
  experienceLevel: formData.get(idExperienceLevel), // Valor del select de experiencia
}
        
          
        
        
        
      

Como usamos useId() para los atributos name, pasamos esos IDs a .get().
Ejemplo visual

HTML generado:

<input type="text" name=":r0:" id=":r0:" />
<select name=":r1:" id=":r1:">
  <option value="react">React</option>
</select>
        
          
        
        
        
      

JavaScript:

const formData = new FormData(event.target)

formData.get(':r0:') // Valor del input (lo que el usuario escribió)
formData.get(':r1:') // "react" (opción seleccionada)
        
          
        
        
        
      

Ventajas de FormData

    ✅ Simple - Una línea de código para acceder al formulario
    ✅ Nativo - No necesitas librerías externas
    ✅ Funciona con cualquier input - text, select, checkbox, radio, file, etc.
    ✅ No necesitas estado - Los valores están en el DOM

Levantando el estado al padre

Los filtros deben estar en el componente App porque:

    App tiene los datos de trabajos (jobsData)
    App necesita filtrar los trabajos antes de paginarlos
    Múltiples componentes pueden necesitar acceder a los filtros

Paso 1: Añadir estado en App.jsx

// src/App.jsx
function App() {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: '',
  })
  const [currentPage, setCurrentPage] = useState(1)

  // Por ahora solo log
  const handleSearch = (newFilters) => {
    console.log('Filtros recibidos:', newFilters)
  }

  /* ... resto del código */
}

export default App
        
          
        
        
        
      

Estados añadidos:

    filters - Filtros de los selects (technology, location, experienceLevel)
    textToFilter - Texto del input de búsqueda (filtro en tiempo real)
    currentPage - Página actual (ya lo teníamos)

Paso 2: Pasar onSearch a SearchForm

// src/components/SearchForm.jsx
export function SearchForm({ onSearch }) {
  // ... useId's

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const filters = {
      search: formData.get(idText),
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel),
    }

    // Llamar a la función del padre
    onSearch(filters)
  }

  // ... return
}
        
          
        
        
        
      

Flujo de datos:

Usuario hace submit
       ↓
handleSubmit captura valores con FormData
       ↓
onSearch(filters) llama a la función del padre
       ↓
App recibe los filtros y actualiza el estado
        
          
        
        
        
      

Filtrando los trabajos

Ahora vamos a filtrar los trabajos antes de paginarlos:

// src/App.jsx
function App() {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: '',
  })
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearch = (newFilters) => {
    setFilters({
      technology: newFilters.technology,
      location: newFilters.location,
      experienceLevel: newFilters.experienceLevel,
    })
    setTextToFilter(newFilters.search)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // 1. Filtrar por los selects
  const jobsFilteredByFilters = jobsData.filter((job) => {
    return (
      (filters.technology === '' || job.data.technology === filters.technology) &&
      (filters.location === '' || job.data.modalidad === filters.location) &&
      (filters.experienceLevel === '' || job.data.nivel === filters.experienceLevel)
    )
  })

  // 2. Paginar los resultados ya filtrados
  const totalPages = Math.ceil(jobsFilteredByFilters.length / RESULTS_PER_PAGE)

  const pagedResults = jobsFilteredByFilters.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )

  return (
    <>
      <Header />
      <main>
        <SearchForm onSearch={handleSearch} />
        <JobListings jobs={pagedResults} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </>
  )
}
        
          
        
        
        
      

Orden de operaciones:

jobsData (todos los trabajos)
    ↓
1. Filtrar por technology, location, experienceLevel
    ↓
jobsFilteredByFilters
    ↓
    ↓
2. Calcular páginas totales
    ↓
3. Aplicar paginación
    ↓
pagedResults (solo los trabajos de la página actual)
        
          
        
        
        
      

Entendiendo el filtro por selects

const jobsFilteredByFilters = jobsData.filter((job) => {
  return (
    (filters.technology === '' || job.data.technology === filters.technology) &&
    (filters.location === '' || job.data.modalidad === filters.location) &&
    (filters.experienceLevel === '' || job.data.nivel === filters.experienceLevel)
  )
})
        
          
        
        
        
      

Lógica de cada condición:

filters.technology === '' || job.data.technology === filters.technology
//          ↑                              ↑
//    Si está vacío           O      Si coincide con el filtro
//   (no filtrar)                    (sí filtrar)
        
          
        
        
        
      

Ejemplos:

// Filtro: { technology: '', location: 'remoto', experienceLevel: '' }

// Job 1: { technology: 'react', modalidad: 'remoto', nivel: 'senior' }
true && true && true = ✅ Pasa el filtro (location coincide)

// Job 2: { technology: 'python', modalidad: 'cdmx', nivel: 'junior' }
true && false && true = ❌ No pasa (location no coincide)

// Job 3: { technology: 'node', modalidad: 'remoto', nivel: 'mid' }
true && true && true = ✅ Pasa el filtro (location coincide)
        
          
        
        
        
      

Filtro de texto en tiempo real

Ahora vamos a añadir un filtro que se ejecute cada vez que el usuario escribe en el input de búsqueda:
Paso 1: Añadir onChange al input

// src/components/SearchForm.jsx
export function SearchForm({ onSearch, onChangeText }) {
  /* ... */

  const handleChangeText = (event) => {
    onChangeText(event.target.value) // <-----
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor={idText}>Búsqueda</label>
        <input
          type="text"
          name={idText}
          id={idText}
          placeholder="Buscar trabajos..."
          onChange={handleChangeText}
        />
      </div>

      {/* ... resto de los campos */}

      <button type="submit">Buscar</button>
    </form>
  )
}
        
          
        
        
        
      

Paso 2: Manejar el cambio en App.jsx

// src/App.jsx
function App() {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: '',
  })
  const [textToFilter, setTextToFilter] = useState('') // <-----
  const [currentPage, setCurrentPage] = useState(1)

  // ... resto del código
}
        
          
        
        
        
      

Flujo del filtro en tiempo real:

Usuario escribe en el input
       ↓
onChange dispara handleChangeText
       ↓
onChangeText(value) llama a la función del padre
       ↓
App actualiza textToFilter con setTextToFilter
       ↓
jobsWithTextFilter se recalcula automáticamente
       ↓
Los trabajos filtrados se muestran inmediatamente
        
          
        
        
        
      

Entendiendo el filtro por texto

Ahora en App.jsx vamos a filtrar los trabajos por texto:

const jobsWithTextFilter =
  textToFilter === ''
    ? jobsFilteredByFilters
    : jobsFilteredByFilters.filter((job) => {
        return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
      })
        
          
        
        
        
      

Lógica:

    Si textToFilter está vacío → no filtrar, devolver todos
    Si textToFilter tiene texto → filtrar por título

Ejemplo:

// textToFilter = "desarrollador"

// Job 1: { titulo: "Desarrollador Frontend" }
"desarrollador frontend".includes("desarrollador") = ✅ true

// Job 2: { titulo: "Analista de Datos" }
"analista de datos".includes("desarrollador") = ❌ false

// Job 3: { titulo: "Desarrollador Senior React" }
"desarrollador senior react".includes("desarrollador") = ✅ true
        
          
        
        
        
      

Usamos .toLowerCase() para hacer la búsqueda insensible a mayúsculas:

'Desarrollador'.toLowerCase() // "desarrollador"
'DESARROLLADOR'.toLowerCase() // "desarrollador"
'dEsArRoLlAdOr'.toLowerCase() // "desarrollador"
        
          
        
        
        
      

Orden completo de estados y filtrado

Aquí está el flujo completo de cómo funcionan los estados:

function App() {
  // 1. Estados
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: '',
  })
  const [textToFilter, setTextToFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // 2. Handlers
  const handleSearch = (newFilters) => {
    setFilters({
      technology: newFilters.technology,
      location: newFilters.location,
      experienceLevel: newFilters.experienceLevel,
    })
    setTextToFilter(newFilters.search)
  }

  const handleChangeText = (text) => {
    setTextToFilter(text)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // 3. Filtrado en cascada
  // Paso 1: Filtrar por selects
  const jobsFilteredByFilters = jobsData.filter((job) => {
    return (
      (filters.technology === '' || job.data.technology === filters.technology) &&
      (filters.location === '' || job.data.modalidad === filters.location) &&
      (filters.experienceLevel === '' || job.data.nivel === filters.experienceLevel)
    )
  })

  // Paso 2: Filtrar por texto
  const jobsWithTextFilter =
    textToFilter === ''
      ? jobsFilteredByFilters
      : jobsFilteredByFilters.filter((job) => {
          return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
        })

  // 4. Paginación
  const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE)

  const pagedResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )

  // 5. Render
  return (
    <>
      <Header />
      <main>
        <SearchForm onSearch={handleSearch} onChangeText={handleChangeText} />
        <JobListings jobs={pagedResults} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </>
  )
}
        
          
        
        
        
      

Diagrama del flujo de datos

╔════════════════════════════════════╗
║         Estados en App             ║
║  - filters (technology, location)  ║
║  - textToFilter                    ║
║  - currentPage                     ║
╚════════════════════════════════════╝
              ↓
╔════════════════════════════════════╗
║         jobsData (todos)           ║
╚════════════════════════════════════╝
              ↓
       Filtro 1: Selects
              ↓
╔════════════════════════════════════╗
║      jobsFilteredByFilters         ║
╚════════════════════════════════════╝
              ↓
       Filtro 2: Texto
              ↓
╔════════════════════════════════════╗
║       jobsWithTextFilter           ║
╚════════════════════════════════════╝
              ↓
      Calcular totalPages
              ↓
        Aplicar slice()
              ↓
╔════════════════════════════════════╗
║         pagedResults               ║
║      (5 trabajos máximo)           ║
╚════════════════════════════════════╝
              ↓
    ┌─────────────────┐
    │   JobListings   │
    │  Renderiza los  │
    │  5 trabajos     │
    └─────────────────┘
        
          
        
        
        
      

Diferencia entre submit y onChange
Submit (botón “Buscar”)

<form onSubmit={handleSubmit}>
  <select name={idTechnology}>{/* ... */}</select>
  <select name={idLocation}>{/* ... */}</select>
  <button type="submit">Buscar</button>
</form>
        
          
        
        
        
      

    Se ejecuta al hacer clic en “Buscar”
    Se ejecuta al presionar Enter en cualquier input
    Actualiza todos los filtros a la vez
    Útil para filtros que no necesitan actualizarse constantemente

onChange (tiempo real)

<input type="text" onChange={handleChangeText} />
        
          
        
        
        
      

    Se ejecuta cada vez que cambia el valor
    Actualiza en tiempo real mientras escribes
    Útil para búsquedas de texto donde quieres ver resultados inmediatamente

Ventajas de esta arquitectura
1. ✅ Estado centralizado

App (tiene todos los estados)
 ↓
 ├─→ SearchForm (recibe onSearch y onChangeText)
 ├─→ JobListings (recibe trabajos ya filtrados)
 └─→ Pagination (recibe totalPages calculadas)
        
          
        
        
        
      

    El estado está en un solo lugar
    Fácil de debuggear
    Los componentes hijos son más simples

2. ✅ Componentes reutilizables

// SearchForm solo se preocupa de capturar datos
<SearchForm onSearch={handleSearch} onChangeText={handleChangeText} />

// JobListings solo se preocupa de renderizar
<JobListings jobs={pagedResults} />

// Pagination solo se preocupa de la navegación
<Pagination currentPage={currentPage} totalPages={totalPages} />
        
          
        
        
        
      

3. ✅ Filtrado en cascada

Datos → Filtro 1 → Filtro 2 → Paginación → Render
        
          
        
        
        
      

    Cada paso procesa el resultado del anterior
    Fácil de añadir más filtros
    Fácil de cambiar el orden

4. ✅ Reactividad automática

Cuando cambias cualquier estado, React automáticamente:

    Recalcula jobsFilteredByFilters
    Recalcula jobsWithTextFilter
    Recalcula totalPages
    Recalcula pagedResults
    Re-renderiza JobListings y Pagination

No necesitas hacer nada más, React lo hace por ti.
Lo que hemos visto en esta clase

    📝 FormData - API nativa para acceder a datos de formularios
    🔄 Levantar estado - Mover el estado al componente padre
    🎯 Props de callback - Pasar funciones a componentes hijos
    🔍 Filtrado en cascada - Aplicar múltiples filtros secuencialmente
    ⚡ Filtro en tiempo real - Con onChange para búsqueda instantánea
    📊 Orden de operaciones - Filtrar primero, paginar después
    🏗️ Arquitectura limpia - Estado centralizado, componentes reutilizables
    🎨 Flujo de datos - De padre a hijo con props, de hijo a padre con callbacks

En la próxima clase exploraremos más conceptos avanzados de React como custom hooks y optimización de rendimiento.

    💡 Recuerda: El orden importa: primero filtras los datos, luego calculas las páginas totales, y finalmente aplicas la paginación. El estado debe estar en el componente padre que necesita manipular los datos, no en los componentes hijos que solo los muestran.

---
<a id="ejercicios-formularios"></a>
Ejercicios: Formularios y Eventos

En esta clase vamos a practicar todo lo que hemos aprendido sobre gestión de formularios, filtros y eventos en React. Estos ejercicios te ayudarán a consolidar los conceptos de la clase anterior y a mejorar tu aplicación DevJobs.
Objetivo de los ejercicios

Los ejercicios de esta clase se centran en mejorar la experiencia de usuario del formulario de búsqueda:

    Implementar el resto de filtros - Añadir filtros adicionales que aún no hemos implementado
    Usar onFocus y onBlur - Mejorar la UX con feedback visual al interactuar con los inputs
    Pasar eventos a tiempo real o usar submit - Decidir qué filtros se aplican instantáneamente y cuáles al hacer submit

Ejercicio 1: Implementar el resto de filtros

En la clase anterior implementamos filtros básicos, pero aún nos faltan algunos. Vamos a completar todos los filtros disponibles en el formulario.
Filtros a implementar

Si tu formulario tiene estos campos pero no están funcionando todavía, es hora de implementarlos:
1. Filtro por tecnología

// src/App.jsx
const jobsFilteredByFilters = jobsData.filter((job) => {
  return (
    (filters.technology === '' || job.data.technology === filters.technology) &&
    (filters.location === '' || job.data.modalidad === filters.location) &&
    (filters.experienceLevel === '' || job.data.nivel === filters.experienceLevel)
  )
})
        
          
        
        
        
      

Si aún no lo tienes implementado:

    Añade un select con las tecnologías disponibles (React, Node, Python, etc.)
    Asegúrate de que el campo tenga un name con useId()
    Captura el valor en handleSubmit con FormData
    Añade la tecnología al estado filters

2. Filtro por salario

// src/components/SearchForm.jsx
const idSalary = useId()

return (
  <form className="search-form" onSubmit={handleSubmit}>
    {/* ... otros campos ... */}

    <div className="form-group">
      <label htmlFor={idSalary}>Salario mínimo</label>
      <input type="number" name={idSalary} id={idSalary} placeholder="30000" min="0" step="1000" />
    </div>

    <button type="submit">Buscar</button>
  </form>
)
        
          
        
        
        
      

En App.jsx, añade el filtro de salario:

const jobsFilteredByFilters = jobsData.filter((job) => {
  // Convertir el salario del job a número (asumiendo que job.data.salary es un string)
  const jobSalary = parseInt(job.data.salary) || 0
  const minSalary = filters.salary ? parseInt(filters.salary) : 0

  return (
    (filters.technology === '' || job.data.technology === filters.technology) &&
    (filters.location === '' || job.data.modalidad === filters.location) &&
    (filters.experienceLevel === '' || job.data.nivel === filters.experienceLevel) &&
    jobSalary >= minSalary
  )
})
        
          
        
        
        
      

3. Filtro por tipo de contrato

// src/components/SearchForm.jsx
const idContractType = useId()

<div className="form-group">
  <label htmlFor={idContractType}>Tipo de contrato</label>
  <select name={idContractType} id={idContractType}>
    <option value="">Todos</option>
    <option value="full-time">Full Time</option>
    <option value="part-time">Part Time</option>
    <option value="freelance">Freelance</option>
    <option value="internship">Prácticas</option>
  </select>
</div>
        
          
        
        
        
      

Añade el filtro en App.jsx:

const jobsFilteredByFilters = jobsData.filter((job) => {
  return (
    // ... filtros anteriores ...
    filters.contractType === '' || job.data.contractType === filters.contractType
  )
})
        
          
        
        
        
      

Checklist del Ejercicio 1

    Todos los selects del formulario tienen su filtro correspondiente
    Los filtros se capturan correctamente con FormData
    El estado filters en App.jsx incluye todos los campos
    La función jobsFilteredByFilters aplica todos los filtros correctamente
    Los resultados se filtran correctamente cuando cambias cada select

Ejercicio 2: Usar onFocus y onBlur

Los eventos onFocus y onBlur mejoran la experiencia de usuario dando feedback visual cuando el usuario interactúa con los campos del formulario.
¿Qué son onFocus y onBlur?

<input
  onFocus={() => console.log('El input está activo')}
  onBlur={() => console.log('El input perdió el foco')}
/>
        
          
        
        
        
      

    onFocus - Se ejecuta cuando el usuario hace clic en el input (o usa Tab para llegar a él)
    onBlur - Se ejecuta cuando el usuario sale del input (hace clic fuera o presiona Tab)

Implementación con estado local

Vamos a añadir un borde de color cuando un campo está activo:

// src/components/SearchForm.jsx
import { useId, useState } from 'react'

export function SearchForm({ onSearch, onChangeText }) {
  const idText = useId()
  const idTechnology = useId()
  const idLocation = useId()
  const idExperienceLevel = useId()

  // Estado para saber qué campo está activo
  const [focusedField, setFocusedField] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const filters = {
      search: formData.get(idText),
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel),
    }

    onSearch(filters)
  }

  const handleChangeText = (event) => {
    onChangeText(event.target.value)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor={idText}>Búsqueda</label>
        <input
          type="text"
          name={idText}
          id={idText}
          placeholder="Buscar trabajos..."
          onChange={handleChangeText}
          onFocus={() => setFocusedField('search')}
          onBlur={() => setFocusedField(null)}
          style={{
            borderColor: focusedField === 'search' ? '#4f46e5' : '#d1d5db',
            outline: focusedField === 'search' ? '2px solid #4f46e5' : 'none',
          }}
        />
        {focusedField === 'search' && (
          <small className="input-hint">Busca por título de trabajo, empresa o tecnología</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor={idTechnology}>Tecnología</label>
        <select
          name={idTechnology}
          id={idTechnology}
          onFocus={() => setFocusedField('technology')}
          onBlur={() => setFocusedField(null)}
          style={{
            borderColor: focusedField === 'technology' ? '#4f46e5' : '#d1d5db',
          }}
        >
          <option value="">Todas</option>
          <option value="react">React</option>
          <option value="node">Node.js</option>
          <option value="python">Python</option>
        </select>
      </div>

      {/* ... resto de los campos con onFocus y onBlur ... */}

      <button type="submit">Buscar</button>
    </form>
  )
}
        
          
        
        
        
      

¿Cómo funciona?

Flujo del evento:

Usuario hace clic en el input
       ↓
onFocus se ejecuta
       ↓
setFocusedField('search')
       ↓
El componente se re-renderiza
       ↓
El input muestra el borde de color
       ↓
Usuario hace clic fuera del input
       ↓
onBlur se ejecuta
       ↓
setFocusedField(null)
       ↓
El componente se re-renderiza
       ↓
El input vuelve a su estado normal
        
          
        
        
        
      

Mejorando con CSS en lugar de inline styles

En lugar de usar style inline, puedes usar clases CSS:

// src/components/SearchForm.jsx
<input
  type="text"
  name={idText}
  id={idText}
  placeholder="Buscar trabajos..."
  onChange={handleChangeText}
  onFocus={() => setFocusedField('search')}
  onBlur={() => setFocusedField(null)}
  className={focusedField === 'search' ? 'input-focused' : ''}
/>
        
          
        
        
        
      

Y en tu CSS:

/* src/styles/SearchForm.css */
.form-group input,
.form-group select {
  border: 2px solid #d1d5db;
  transition: border-color 0.2s ease;
}

.input-focused {
  border-color: #4f46e5 !important;
  outline: 2px solid #4f46e5;
}

.input-hint {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
}
        
          
        
        
        
      

Checklist del Ejercicio 2

    Los inputs tienen eventos onFocus y onBlur
    Hay estado local para saber qué campo está activo
    Los campos activos muestran feedback visual (borde de color, outline, etc.)
    Opcionalmente: Muestra hints o mensajes de ayuda cuando un campo está activo
    El feedback visual se elimina cuando el usuario sale del campo

Ejercicio 3: Pasar eventos a tiempo real o usar submit

En este ejercicio vas a decidir qué filtros se aplican en tiempo real y cuáles solo al hacer submit del formulario.
Estrategias de filtrado
Opción A: Todo en tiempo real (onChange)

// src/components/SearchForm.jsx
export function SearchForm({ onSearch }) {
  const idText = useId()
  const idTechnology = useId()
  const idLocation = useId()

  const handleChange = (event) => {
    const formData = new FormData(event.target.form)

    const filters = {
      search: formData.get(idText),
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
    }

    onSearch(filters)
  }

  return (
    <form className="search-form">
      <input type="text" name={idText} id={idText} onChange={handleChange} />

      <select name={idTechnology} id={idTechnology} onChange={handleChange}>
        <option value="">Todas</option>
        <option value="react">React</option>
      </select>

      <select name={idLocation} id={idLocation} onChange={handleChange}>
        <option value="">Todas</option>
        <option value="remoto">Remoto</option>
      </select>

      {/* No necesitas botón de submit */}
    </form>
  )
}
        
          
        
        
        
      

Ventajas:

    ✅ Resultados instantáneos
    ✅ UX más fluida
    ✅ No necesitas botón de submit

Desventajas:

    ❌ Muchas re-renderizaciones
    ❌ Puede ser lento con muchos datos
    ❌ El usuario no puede “preparar” varios filtros antes de buscar

Opción B: Solo submit (onSubmit)

// src/components/SearchForm.jsx
export function SearchForm({ onSearch }) {
  const idText = useId()
  const idTechnology = useId()
  const idLocation = useId()

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const filters = {
      search: formData.get(idText),
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
    }

    onSearch(filters)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input type="text" name={idText} id={idText} />

      <select name={idTechnology} id={idTechnology}>
        <option value="">Todas</option>
        <option value="react">React</option>
      </select>

      <select name={idLocation} id={idLocation}>
        <option value="">Todas</option>
        <option value="remoto">Remoto</option>
      </select>

      <button type="submit">Buscar</button>
    </form>
  )
}
        
          
        
        
        
      

Ventajas:

    ✅ Mejor rendimiento
    ✅ El usuario puede preparar varios filtros
    ✅ Control sobre cuándo se ejecuta la búsqueda

Desventajas:

    ❌ Menos inmediato
    ❌ Requiere que el usuario haga clic en el botón

Opción C: Híbrido (Recomendado) ⭐

Búsqueda de texto en tiempo real + Selects con submit:

// src/components/SearchForm.jsx
export function SearchForm({ onSearch, onChangeText }) {
  const idText = useId()
  const idTechnology = useId()
  const idLocation = useId()
  const idExperienceLevel = useId()

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const filters = {
      search: formData.get(idText),
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel),
    }

    onSearch(filters)
  }

  // Búsqueda de texto en tiempo real
  const handleChangeText = (event) => {
    onChangeText(event.target.value)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      {/* Input de texto: tiempo real */}
      <div className="form-group">
        <label htmlFor={idText}>Búsqueda</label>
        <input
          type="text"
          name={idText}
          id={idText}
          placeholder="Buscar trabajos..."
          onChange={handleChangeText}
        />
      </div>

      {/* Selects: solo con submit */}
      <div className="form-group">
        <label htmlFor={idTechnology}>Tecnología</label>
        <select name={idTechnology} id={idTechnology}>
          <option value="">Todas</option>
          <option value="react">React</option>
          <option value="node">Node.js</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor={idLocation}>Ubicación</label>
        <select name={idLocation} id={idLocation}>
          <option value="">Todas</option>
          <option value="remoto">Remoto</option>
          <option value="cdmx">Ciudad de México</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor={idExperienceLevel}>Nivel de experiencia</label>
        <select name={idExperienceLevel} id={idExperienceLevel}>
          <option value="">Todos</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid-level</option>
          <option value="senior">Senior</option>
        </select>
      </div>

      <button type="submit">Aplicar filtros</button>
    </form>
  )
}
        
          
        
        
        
      

¿Por qué es mejor el enfoque híbrido?

    ✅ Input de texto en tiempo real - Para búsquedas rápidas, el usuario ve resultados mientras escribe
    ✅ Selects con submit - Para filtros múltiples, el usuario puede ajustar varios antes de buscar
    ✅ Mejor rendimiento - No re-renderizas todo cada vez que cambias un select
    ✅ Mejor UX - Combina inmediatez con control

Implementación del enfoque híbrido en App.jsx

// src/App.jsx
function App() {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: '',
  })
  const [textToFilter, setTextToFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Maneja el submit del formulario (selects)
  const handleSearch = (newFilters) => {
    setFilters({
      technology: newFilters.technology,
      location: newFilters.location,
      experienceLevel: newFilters.experienceLevel,
    })
    // También actualizamos el texto por si acaso
    setTextToFilter(newFilters.search || '')
    // Reiniciamos a la página 1 cuando cambian los filtros
    setCurrentPage(1)
  }

  // Maneja el cambio de texto en tiempo real
  const handleChangeText = (text) => {
    setTextToFilter(text)
    // Reiniciamos a la página 1 cuando cambia el texto
    setCurrentPage(1)
  }

  // ... resto del código de filtrado y paginación

  return (
    <>
      <Header />
      <main>
        <SearchForm onSearch={handleSearch} onChangeText={handleChangeText} />
        <JobListings jobs={pagedResults} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </>
  )
}
        
          
        
        
        
      

Extra: Resetear la página al cambiar filtros

Cuando el usuario cambia los filtros, es buena práctica volver a la página 1:

const handleSearch = (newFilters) => {
  setFilters({
    technology: newFilters.technology,
    location: newFilters.location,
    experienceLevel: newFilters.experienceLevel,
  })
  setTextToFilter(newFilters.search || '')
  setCurrentPage(1) // ← Volver a la primera página
}

const handleChangeText = (text) => {
  setTextToFilter(text)
  setCurrentPage(1) // ← Volver a la primera página
}
        
          
        
        
        
      

¿Por qué?

Imagina que estás en la página 5 mostrando trabajos de React. Si cambias el filtro a Python, puede que Python solo tenga 2 páginas de resultados. Sin el reset, seguirías en la página 5 que no existe para Python.
Checklist del Ejercicio 3

    Has decidido qué filtros van en tiempo real y cuáles con submit
    El input de búsqueda de texto funciona en tiempo real (onChange)
    Los selects se aplican al hacer submit del formulario
    Cuando cambias filtros, la página se resetea a 1
    El botón de submit dice algo descriptivo como “Aplicar filtros” o “Buscar”
    La UX es fluida y los filtros funcionan como esperas

Desafío extra: Botón de limpiar filtros

Añade un botón para limpiar todos los filtros y volver al estado inicial:

// src/components/SearchForm.jsx
export function SearchForm({ onSearch, onChangeText, onReset }) {
  // ... useId's y handlers

  const handleReset = () => {
    // Resetear el formulario
    document.querySelector('.search-form').reset()
    // Notificar al padre
    onReset()
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      {/* ... campos del formulario ... */}

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          Aplicar filtros
        </button>
        <button type="button" className="btn-secondary" onClick={handleReset}>
          Limpiar filtros
        </button>
      </div>
    </form>
  )
}
        
          
        
        
        
      

En App.jsx:

const handleReset = () => {
  setFilters({
    technology: '',
    location: '',
    experienceLevel: '',
  })
  setTextToFilter('')
  setCurrentPage(1)
}

return <SearchForm onSearch={handleSearch} onChangeText={handleChangeText} onReset={handleReset} />
        
          
        
        
        
      

Desafío extra 2: Contador de resultados

Muestra cuántos trabajos se encontraron con los filtros actuales:

// src/App.jsx
function App() {
  // ... estados y handlers

  const jobsFilteredByFilters = jobsData.filter((job) => {
    /* ... */
  })

  const jobsWithTextFilter =
    textToFilter === ''
      ? jobsFilteredByFilters
      : jobsFilteredByFilters.filter((job) => {
          /* ... */
        })

  const totalResults = jobsWithTextFilter.length

  return (
    <>
      <Header />
      <main>
        <SearchForm onSearch={handleSearch} onChangeText={handleChangeText} />

        {/* Contador de resultados */}
        <div className="results-summary">
          <p>
            Se encontraron <strong>{totalResults}</strong> trabajos
            {textToFilter && ` para "${textToFilter}"`}
          </p>
        </div>

        <JobListings jobs={pagedResults} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </>
  )
}
        
          
        
        
        
      

Lo que has practicado en estos ejercicios

    🎯 Implementar filtros completos - Todos los campos del formulario filtran correctamente
    👁️ Eventos onFocus y onBlur - Feedback visual al interactuar con inputs
    ⚡ Estrategias de filtrado - Tiempo real vs submit, y enfoque híbrido
    🔄 Reset de página - Volver a página 1 al cambiar filtros
    🧹 Limpiar filtros - Botón para resetear todos los filtros
    📊 Contador de resultados - Mostrar cuántos trabajos se encontraron
    🎨 UX mejorada - Hints, feedback visual y mejor usabilidad

Comparación de enfoques
Característica	Todo onChange	Todo onSubmit	Híbrido ⭐
Resultados instantáneos	✅	❌	✅ (solo texto)
Rendimiento	❌	✅	✅
Control del usuario	❌	✅	✅
Filtros múltiples	❌	✅	✅
Mejor para búsqueda	✅	❌	✅
Mejor para filtros	❌	✅	✅

Recomendación: Usa el enfoque híbrido para la mejor experiencia de usuario.
Recap de conceptos clave
FormData

const formData = new FormData(event.target)
const value = formData.get('field-name')
        
          
        
        
        
      

onFocus y onBlur

<input onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        
          
        
        
        
      

onChange para tiempo real

<input onChange={(e) => handleChange(e.target.value)} />
        
          
        
        
        
      

onSubmit para formularios

<form onSubmit={(e) => {
  e.preventDefault()
  handleSubmit()
}}>
        
          
        
        
        
      

Reset de formulario

// Con DOM API
document.querySelector('form').reset()

// Con ref
formRef.current.reset()
        
          
        
        
        
      

Siguientes pasos

Ahora que dominas la gestión de formularios en React, en las próximas clases aprenderemos:

    🎣 Custom Hooks - Crear hooks reutilizables para lógica de formularios
    📝 Validación de formularios - Validar datos antes de enviarlos
    🚀 Optimización de rendimiento - useMemo y useCallback para formularios

    💡 Recuerda: La experiencia de usuario es clave. Un formulario con búsqueda en tiempo real para texto y submit para filtros múltiples ofrece la mejor combinación de rapidez y control.

---

Lo de arriba es hasta "Ejercicios: Formularios y Eventos".