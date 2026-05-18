# ¿Cómo se había instalado Vite en 02-react? paso a paso: 
Se instaló usando el template oficial de Vite para React en 2 pasos:
1. Crear el proyecto con el template (en el directorio 02-react/):
      npm create vite@latest . -- --template react
      Esto genera toda la estructura base: package.json, vite.config.js, index.html, src/main.jsx, src/App.jsx, etc.
2. Instalar dependencias:
      npm install
      Esto instala React, ReactDOM, Vite, el plugin de React para Vite, ESLint, etc.
Después de eso, el proyecto ya incluía el template base (el logo de Vite, el contador, etc.), y luego se fue modificando hasta convertirse en DevJobs.

---
# Start Vite dev server in /mnt/c/MyFiles/proyectos/DevJobs/02-react
$ npm run dev
> 02-react@0.0.0 dev
> vite
  VITE v8.0.13  ready in 1218 ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose

Ctrl + C : to stop it

--- 
# Kill running Vite process
$ pkill -f "vite"