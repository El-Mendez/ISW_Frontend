# Estructura del proyecto
En la carpeta inicial se pueden encontrar los siguientes archivos:
- **[config](https://github.com/El-Mendez/ISW_Frontend/tree/dev/config)**: En esta carpeta se encuentra la configuración de webpack que se utilizó para este proyecto.
- **[doc](https://github.com/El-Mendez/ISW_Frontend/tree/dev/doc)**: En esta carpeta se encuentra la documentación del proyecto (como está organizado, la función de cada archivo, etc.)
- **[src](https://github.com/El-Mendez/ISW_Frontend/tree/dev/src):** En esta carpeta se encuentra el proyecto desarrollado.
- **Archivos de configuraciones**: Esto hace referencia a todos los archivos de configuraciones que se utilizaron para el proyecto (eslint, babel, webpack). 


## Carpeta SRC
En esta carpeta se encuentra todo el código del proyecto. En esta carpeta se encuentran los siguientes archivos: 
| Archivo | Descripción |
| --- | --- |
| `assets` | Aqui se guardan todas las imágenes usadas en el proyecto |
| `components` | Aqui se encuentran todos los componentes usados (*React*) |
| `style` | Aqui se encuentran las constantes para los estilos (*SASS*), el estilo general de algunas cosas y el importe que se utilizó para cada componente individual  |
| `index.html e index.jsx` | Estos son los archivos principales que se utilizan para react |
### Ruta del proyecto (revisar nombre)
- El proyecto inicia en los documentos [index.html](https://github.com/El-Mendez/ISW_Frontend/blob/dev/src/index.html) e [index.jsx](https://github.com/El-Mendez/ISW_Frontend/blob/dev/src/index.jsx). [index.html](https://github.com/El-Mendez/ISW_Frontend/blob/dev/src/index.html) se crea un div que posee el ID "root", el cual en [index.jsx](https://github.com/El-Mendez/ISW_Frontend/blob/dev/src/index.jsx) se hace referencia para crear el componente que contendrá a todos los demás componentes de react.
- Luego el proyecto continua en el archivo [App.jsx](https://github.com/El-Mendez/ISW_Frontend/blob/dev/src/components/App.jsx). En este se importa el componente llamado [mainRoutes.jsx](https://github.com/El-Mendez/ISW_Frontend/blob/dev/src/components/mainRoutes.jsx), el cual posee la función de la sesión persistente y las rutas que se utilizaron para el proyecto.
- Las rutas se dividen de la siguiente manera:

| Ruta | Descripción |
| --- | --- |
| `/home` | Esta hace referencia al dashboard del proyecto. Solo se puede acceder si se inicia sesión con anterioridad. De lo contrario, se redirige a la pantalla de inicio de sesión |
| `/signUp` | Esta hace referencia a la pantalla de registro de usuario |
| `/data` | Esta ruta hace referencia a la pantalla en donde se recolecta la información del usuario a la hora de registrarse. Se accede por medio de la ruta "/signUp" |
| `/recovery` | Esta ruta hace referencia a la pantalla en donde el usuario puede cambiar su contraseña | 
| `/reset-password` | Esta ruta hace referencia a la pantalla en donde se le pregunta al usuario su carne para enviarle un correo de recuperación de contraseña | 
| `/confirm` | Esta ruta hace referencia a la pantalla en donde se le pide al usuario su confirmación para cambiar su contraseña. Esta se accede por medio del correo que se le envió en la ruta "/reset-password" | 
| `/test` | Esta ruta sirve para hacer test de componentes | 
| `/*` | Esta ruta hace referencia a la página 404 utilizada para mostrar que la página está fuera de servicio | 

### Componentes
