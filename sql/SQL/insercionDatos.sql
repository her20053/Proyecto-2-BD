--insertando datos de los administradores
INSERT INTO administrador VALUES ('ad001','Luis Archila','luiarch@gmail.com','Guatemala','2019-03-03','peperoni123');
INSERT INTO administrador VALUES ('ad002','Pablo Alburez','pabal98@gmail.com','Honduras','2022-02-12','Bulerz98');
INSERT INTO administrador VALUES ('ad003','Selena Leal','seleleal4@gmail.com','Guatemala','2022-03-01','Casablanca3');

--insertando datos de los usuarios
INSERT INTO usuarios VALUES ('u001','Saul Herrera','saulh001@gmail.com','Guatemala', 'barvar3');
INSERT INTO usuarios VALUES ('u002','Andrea Alfarado','alfaand@gmail.com','Honduras', 'alfaandr0001');
INSERT INTO usuarios VALUES ('u003','Mariana Escobedo','marescob@gmail.com','Guatemala', 'sinsinati14eee');

--insertando datos de los intentos_fallidos
INSERT INTO intentos_fallidos VALUES ('i001','u003','2022-01-01','12:30:21');
INSERT INTO intentos_fallidos VALUES ('i002','u003','2022-01-01','12:30:32');
INSERT INTO intentos_fallidos VALUES ('i003','u002','2022-02-02','13:10:00');

--insertando datos de los perfiles
INSERT INTO perfiles VALUES ('pe001','u001','Sau','2022-01-02');
INSERT INTO perfiles VALUES ('pe002','u002','Andy','2022-03-01');
INSERT INTO perfiles VALUES ('pe003','u003','Mariana','2021-12-13');

--insertando datos de los planes
INSERT INTO planes VALUES('pl1', 'basico', 0.0, 1);
INSERT INTO planes VALUES('pl2', 'estandar', 4.99, 4);
INSERT INTO planes VALUES('pl3', 'avanzado', 7.99, 8);

--insertando datos de los suscripciones
INSERT INTO suscripciones VALUES('s001', 'u001', 'p1', '2021-09-24', '2022-09-24');
INSERT INTO suscripciones VALUES('s002', 'u002', 'p2', '2022-02-06', '2023-02-06');
INSERT INTO suscripciones VALUES('s003', 'u003', 'p3', '2022-03-12', '2023-03-12');

--insertando datos de los actores
INSERT INTO actores VALUES('ac001', 'Tom', 'Cruise', 'M', 59);
INSERT INTO actores VALUES('ac002', 'Margot', 'Robbie', 'F', 31);
INSERT INTO actores VALUES('ac003', 'Dwayne', 'Jhonson', 'M', 49);

--insertando datos de los peliculas
INSERT INTO peliculas VALUES('p001','Top Gun','After losing his friend, top pilot Maverick is given a second chance to redeem himself.','www.tomcruise.com',110,'1986-05-16','NC-17',8.5)
INSERT INTO peliculas VALUES('p002','Suicide squad','El gobierno envía a los supervillanos más peligrosos del mundo a la remota isla de Corto Maltés, atestada de enemigos.','www.suicidesquad.com',132,'2016-10-01','NC-17',8.5);
INSERT INTO peliculas VALUES('p003','Red Notice','En el mundo del crimen internacional, un agente de la Interpol intenta capturar al ladrón de arte más buscado del mundo.','www.rednotice.com',118,'2021-11-04','NC-17',8.5);

--insertando datos de reparto 
INSERT INTO reparto VALUES('p001', 'ac001');
INSERT INTO reparto VALUES('p002', 'ac002');
INSERT INTO reparto VALUES('p003', 'ac003');

--insertando datos de los favoritos
INSERT INTO favoritos VALUES('pe001','p001');
INSERT INTO favoritos VALUES('pe002','p002');
INSERT INTO favoritos VALUES('pe003','p003');

--insertando datos de los continuar_viendo
INSERT INTO continuar_viendo VALUES('pe001','p001', 55.46);
INSERT INTO continuar_viendo VALUES('pe002','p002', 15.75);
INSERT INTO continuar_viendo VALUES('pe003','p003', 25.01);

--insertando datos de los vistas
INSERT INTO vistas VALUES('v001','u001','p001',55);
INSERT INTO vistas VALUES('v002','u001','p001',55);
INSERT INTO vistas VALUES('v003','u002','p001',98);

--insertando datos de los generos
INSERT INTO generos VALUES('g001','accion');
INSERT INTO generos VALUES('g002','romance');
INSERT INTO generos VALUES('g003','Infantil')

--insertando datos de generos_pelicula
INSERT INTO generos_pelicula VALUES('p001', 'g001');
INSERT INTO generos_pelicula VALUES('p002', 'g002');
INSERT INTO generos_pelicula VALUES('p003', 'g003');

--insertando datos de los premios
INSERT INTO premios VALUES('pr001','Oscar');
INSERT INTO premios VALUES('pr002','AC');
INSERT INTO premios VALUES('pr003','Global movie');

--insertando datos de premios_pelicula
INSERT INTO premios_pelicula VALUES('p001', 'pr001');
INSERT INTO premios_pelicula VALUES('p002', 'pr002');
INSERT INTO premios_pelicula VALUES('p002', 'pr003');

--insertando datos de los directores
INSERT INTO directores VALUES("d001","p001","Tony","Scott",68)
INSERT INTO directores VALUES("d002","p002","David","Ayer",54)
INSERT INTO directores VALUES("d003","p003","Rawson","Marshall",47)