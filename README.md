# Gestor de Finanzas Personales

## Descripción del Proyecto

El Gestor de Finanzas Personales es una aplicación web que permite a los usuarios llevar un registro de sus ingresos y gastos, así como administrar su dinero de manera efectiva. La aplicación es accesible desde dispositivos móviles, tablets, notebooks y desktops.

## Procedimiento de Inicialización del Proyecto

1. **Clonar el Repositorio**: Clone el repositorio del proyecto desde [URL del Repositorio](https://github.com/OrnellaGrigolato/Finance-Manager) en su máquina local.

2. **Instalar Dependencias**: Asegúrese de tener Node.js y npm instalados en su sistema. En el directorio raíz del proyecto, ejecute el siguiente comando para instalar las dependencias:

   ```bash
   npm install

Configuración de Variables de Entorno: Cree un archivo .env en la raíz del proyecto y configure las siguientes variables de entorno:

env

ACA IRIAN LAS KEYS

Base de Datos: Configure y migre la base de datos utilizando Prisma:

bash

npx prisma migrate dev

Ejecución del Proyecto: Inicie la aplicación con el siguiente comando:

bash

    npm run dev

    Acceso a la Aplicación: La aplicación estará disponible en http://localhost:3000. Abra su navegador y acceda a esta URL para utilizar el Gestor de Finanzas Personales.

Historias de Usuario y Agregados de Valor Implementados
Historias de Usuario

HU1 - Registro de Usuario: Los usuarios pueden registrarse en la aplicación proporcionando un nombre de usuario, correo electrónico, contraseña y repetición de contraseña. Se valida que el correo electrónico sea válido y que la contraseña tenga al menos 8 caracteres, letras, números y un carácter especial. Se envía un correo de confirmación para activar la cuenta.

HU2 - Inicio de Sesión: Los usuarios registrados pueden iniciar sesión ingresando su correo electrónico y contraseña. Después de 4 intentos fallidos, se muestra un mensaje de bloqueo y se envía un correo al usuario para recuperar la contraseña.

HU3 - Registrar Movimiento de Dinero: Los usuarios pueden registrar movimientos financieros, ya sea ingresos o gastos. El formulario de registro incluye un monto con hasta dos decimales, título, descripción, moneda, ubicación y posibilidad de realizar un cambio de moneda.

HU4 - Página Principal (Home): En la página principal, los usuarios pueden ver su balance total, nombre de usuario, botón para registrar un movimiento, botón para ocultar el balance y un listado paginado de los últimos movimientos ordenados por fecha.
Agregados de Valor Implementados

    Se ha agregado un gráfico de torta que muestra el tipo de dinero por ubicación.
    Se ha establecido una conexión con una API para mostrar el valor actual del dólar y saber el valor dolarizado.
    
Contribuir al Proyecto

Autores

    nosotros jeje

Licencia

MIT License