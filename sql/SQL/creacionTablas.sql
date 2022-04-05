CREATE TABLE administradores(
	id_admin varchar (50) PRIMARY KEY,
	nombre varchar(50),
	correo varchar(50) UNIQUE,
	lugar_creacion varchar(50),
	contrasena varchar(100) NOT NULL,
	ultimo_login DATE
);

CREATE TABLE usuarios(
	id_usuario varchar (50) PRIMARY KEY,
	nombre_persona varchar(50) NOT NULL,
	correo varchar(50) NOT NULL UNIQUE,
	lugar_creacion varchar(50) NOT NULL,
	contrasena varchar(100) NOT NULL,
	lugar_actualizacion varchar(50),
	ultimo_login DATE
);

CREATE TABLE intentos_fallidos(
	id_intento VARCHAR(50) PRIMARY KEY,
	id_usuario VARCHAR(50),
	fecha DATE,
	hora TIME,
	FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE perfiles(
	id_perfil varchar (50) PRIMARY KEY,
	id_usuario varchar(50),
	nombre varchar(50) NOT NULL,
	fecha_creacion DATE,
	estatus INT,
	FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE planes (
	id_plan VARCHAR(50) PRIMARY KEY,
	nombre_plan VARCHAR(50),
	costo FLOAT,
	numero_perfiles INT
);

CREATE TABLE suscripciones(
	id_suscripcion VARCHAR(50) PRIMARY KEY,
	id_usuario VARCHAR(50),
	id_plan VARCHAR(50),
	valido_hasta DATE,
	fecha_inicio DATE,
	FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
	FOREIGN KEY(id_plan) REFERENCES planes(id_plan) ON DELETE CASCADE
);
CREATE TABLE actores (
	id_actor VARCHAR(50) PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL UNIQUE,
	genero VARCHAR(1) NOT NULL,
	edad INT NOT NULL
);

CREATE TABLE peliculas (
	id_pelicula VARCHAR(50) PRIMARY KEY,
	titulo VARCHAR(50) NOT NULL UNIQUE,
	resumen VARCHAR(300) NOT NULL,
	url VARCHAR(200) NOT NULL,
	duracion FLOAT NOT NULL,
	fecha_estreno DATE NOT NULL,
	clasificacion_contenido VARCHAR(10) NOT NULL,
	rating FLOAT NOT NULL
);

CREATE TABLE reparto (
	id_pelicula VARCHAR(50),
	id_actor VARCHAR(50),
	PRIMARY KEY(id_pelicula, id_actor),
	FOREIGN KEY(id_pelicula) REFERENCES peliculas(id_pelicula) ON DELETE CASCADE,
	FOREIGN KEY(id_actor) REFERENCES actores(id_actor) ON DELETE CASCADE
);

CREATE TABLE favoritos(
	id_perfil VARCHAR(50),
	id_pelicula VARCHAR(50),
	FOREIGN KEY(id_pelicula) REFERENCES peliculas(id_pelicula) ON DELETE CASCADE,
	FOREIGN KEY(id_perfil) REFERENCES perfiles(id_perfil) ON DELETE CASCADE
);

CREATE TABLE peliculas_vistas(
	id_usuario VARCHAR(50),
	perfil VARCHAR(50),
	id_pelicula VARCHAR(50)
);

CREATE TABLE sugerencias(
	id_perfil VARCHAR(50),
	id_pelicula VARCHAR(50),
	FOREIGN KEY(id_pelicula) REFERENCES peliculas(id_pelicula) ON DELETE CASCADE,
	FOREIGN KEY(id_perfil) REFERENCES perfiles(id_perfil) ON DELETE CASCADE
);

CREATE TABLE continuar_viendo(
	id_perfil VARCHAR(50),
	id_pelicula VARCHAR(50),
	time_stamp FLOAT,
	FOREIGN KEY(id_pelicula) REFERENCES peliculas(id_pelicula) ON DELETE CASCADE,
	FOREIGN KEY(id_perfil) REFERENCES perfiles(id_perfil) ON DELETE CASCADE
);

CREATE TABLE vistas (
	id_vista VARCHAR(50) PRIMARY KEY,
	id_usuario VARCHAR(50),
	id_pelicula VARCHAR(50),
	tiempo_visto FLOAT,
	FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
	FOREIGN KEY(id_pelicula) REFERENCES peliculas(id_pelicula) ON DELETE CASCADE
);

CREATE TABLE premios(
	id_premio VARCHAR(50) PRIMARY KEY,
	nombre_premio VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE premios_pelicula(
	id_pelicula VARCHAR(50),
	id_premio VARCHAR(50),
	PRIMARY KEY(id_pelicula, id_premio),
	FOREIGN KEY(id_pelicula) REFERENCES peliculas(id_pelicula) ON DELETE CASCADE,
	FOREIGN KEY(id_premio) REFERENCES premios(id_premio) ON DELETE CASCADE
);

CREATE TABLE generos(
	id_genero VARCHAR(50) PRIMARY KEY,
	nombre_genero VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE generos_pelicula(
	id_pelicula VARCHAR(50),
	id_genero VARCHAR(50),
	PRIMARY KEY(id_pelicula, id_genero),
	FOREIGN KEY(id_pelicula) REFERENCES peliculas(id_pelicula) ON DELETE CASCADE,
	FOREIGN KEY(id_genero) REFERENCES generos(id_genero) ON DELETE CASCADE
);

CREATE TABLE directores(
	id_director VARCHAR(50) PRIMARY KEY,
	id_pelicula VARCHAR(50),
	nombre VARCHAR(50) NOT NULL UNIQUE,
	edad INT NOT NULL,
	FOREIGN KEY(id_pelicula) REFERENCES peliculas(id_pelicula) ON DELETE CASCADE
);