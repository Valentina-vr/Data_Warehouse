# Advantage Data Warehouse

Estamos pensando en el equipo de Marketing, esta herramienta les permitirá gestionar sus clientes y leads en un mismo lugar

### 📢 Bienvenidos a la guía de instalación


Sigue los pasos para iniciar este proyecto en tu equipo.


### 🚩 Pre-requisitos


1. Instale y configure el motor de base de datos [MYSQL](https://www.mysql.com/downloads/).
2. Instale [NodeJS](https://nodejs.org/es/).
3. Debe contar con un editor de codigo, te recomiendo [VScode](https://code.visualstudio.com/)

### ⚓ Instalación


1. Ejecute el comando npm install dentro de la carpeta /Back, para instar todos los paquetes necesarios para ejecutar el proyecto.

```Bash
npm install
```

Base de datos del proyecto: *Para iniciar el proyecto debe haber por lo menos un usuario con rol Administrator registrado en la base de datos*

2. Ejecuta el script  en su Base de datos MYSQL **database.sql** ubicado en la raíz, se encargará de crear la base de datos con su respectivas tablas y le añadira informacion como un usuario administrador con el que iniciarás el proyecto.

3. En la carpeta {./Back} debes crear el archivo **.env** para guardar sus variables de entorno:

```Bash
USER = Su usuario de base de datos
PASS = Su Contraseña de su usuario de base de datos
DB_NAME = Data_warehouse
HOST = 127.0.0.1
PORT = 8000
SECRET = Elija una clave secreta para validadcion del Json Web Token
```

### 🚀 Vamos a ejecutar

4. En la carpeta {./Back}, abre la terminal y ejecuta el comando:

```Bash
npm start
```

### ✔️ Accede al proyecto 

Abre el archivo **login.html** que se encuentra en la carpeta {./front}
vas a acceder con el usuario administrador predeterminado para ejecutar sus respectivas pruebas


```Bash
Email : admin@advantage.com
Contraseña : admin
```
---


Por [Valentina Villada Rendón](https://www.linkedin.com/in/valentina-villada-rend%C3%B3n/)