# SQX Utility

Utilitario de escritorio basado en Electron y Python.

## Requisitos
- [Node.js](https://nodejs.org/) instalado
- [Python 3](https://www.python.org/) disponible en la ruta (`python --version`)

## Instalación
```bash
npm install
```

## Ejecutar en modo desarrollo
```bash
npm run dev
```

## Añadir nuevos módulos Python
1. Crear `backend/modules/<nuevo_modulo>.py` con una función `run(payload: dict) -> dict`.
2. Desde la UI, llamar a:
```javascript
window.api.runModule('<nuevo_modulo>', { /* payload */ })
```
3. Añade un nuevo botón en `electron/renderer/app.js` para invocar el módulo.

## Notas
Este es un MVP que incluye el módulo `create_sqx_building_blocks` como ejemplo.
