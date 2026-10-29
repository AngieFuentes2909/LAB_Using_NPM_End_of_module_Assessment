# Lab NASA 🚀

Aplicación web interactiva para explorar la **Foto Astronómica del Día (APOD)** publicada por la NASA. Permite consultar la publicación actual, buscar contenido astronómico desde el 16 de junio de 1995 hasta la fecha y gestionar una lista de favoritos persistente.


## 🛠️ Tecnologías e Instalación

### Tecnologías utilizadas
* **HTML5 / CSS3** (Estructura y estilos)
* **JavaScript (ES6+)** Async/Await, Fetch API, LocalStorage
* **Node.js & NPM** (Gestor de paquetes)
* **Day.js** (Manejo, validación y formateo de fechas)


## ⚙️ Funcionalidades Principales

* **Carga Automática:** Muestra la foto astronómica del día al iniciar la aplicación con su fecha formateada al español.
* **Búsqueda Personalizada:** Búsqueda por fechas específicas mediante `<input type="date">`.
* **Validación de Fechas (Day.js):**
  * Control de campo vacío.
  * Restricción de fechas futuras o previas al 16 de junio de 1995.
* **Soporte Multimedia:** Identificación automática de formato (imagen o video con enlace directo a la NASA).
* **Favoritos Persistentes:** Guardado local mediante `localStorage`, evitando duplicados.

---

## 📁 Estructura del Proyecto

```text
explorador-apod/
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── .gitignore
├── index.html
├── package.json
└── package-lock.json
```

---
## 👤👤👤 Equipo 8

* Angie Saray Fuentes Carreño
* Manuel Ramirez
* Miguel Ángel Quintero Rodríguez
* Camilo Andrés Ospina Villa


## link de la pagina ##
https://angiefuentes2909.github.io/LAB_Using_NPM_End_of_module_Assessment/