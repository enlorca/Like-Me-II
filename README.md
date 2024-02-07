Desafio de backend donde se crea un servidor que disponibilice las rutas PUT y DELETE para modificar un sistema de likes y borrar posts en una base de datos PostgreSQL con uso de paquete pg. FEBRERO 2024

■ Se utiliza el frontend proporcionado para el desafio, pero solo se sube el backend al repositorio.

■ Se utiliza el puerto 3000 según instrucciones.

■ Se utiliza dotenv para proporcionar las credenciales.

■ Se utiliza el desafio anterior como base → Repositorio ubicado en: https://github.com/enlorca/Like-Me-I

■ Comandos para PostgreSQL especificados según desafio:

CREATE DATABASE likeme;

CREATE TABLE posts (id SERIAL, titulo VARCHAR(25), img VARCHAR(1000), descripcion VARCHAR(255), likes INT);