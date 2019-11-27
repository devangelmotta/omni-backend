# Demo backend

Este proyecto tiene una arquitecura típida de MVC intentando seguir los principios de Clean Software.

Corre en una instancia EC2. http://ec2-3-136-125-107.us-east-2.compute.amazonaws.com:3010/

Está configurado para Docker pero me dio algunos problemas, de la misma forma el projecto frontend.
Sin embargo el proyecto frontend no lo he desplegado por un problema que surgió al integrar soporte de SVG
y me impedía usar babel para mimificar por tanto se mantiene en modo dev. 

Para correr este proyecto en local

- Clone el repositorio
- Ejecuta en la termina: yarn
- Una vez termine la descarga ejecute yarn dev o yarn start (para modo producción).


