--query dando resultado del fan que ha visto mas minutos de peliculas de tom cruise
SELECT v.id_usuario, SUM(v.tiempo_visto) 
FROM vistas v INNER JOIN peliculas p ON(v.id_pelicula = p.id_pelicula) 
WHERE p.id_actor_principal IN(
	SELECT id_actor 
	FROM actores 
	WHERE nombre = 'Tom' AND apellido = 'Cruise'
) 
GROUP BY id_usuario ORDER BY SUM DESC LIMIT 1

--query de prueba
SELECT nombre, COUNT(*) as total FROM usuario WHERE (id_usuario, total) IN (
	SELECT v.id_usuario, SUM(v.tiempo_visto) 
	FROM vistas v INNER JOIN peliculas p ON(v.id_pelicula = p.id_pelicula) 
	WHERE p.id_actor_principal IN(
		SELECT id_actor 
		FROM actores 
		WHERE nombre = 'Tom' AND apellido = 'Cruise'
	) 
	GROUP BY id_usuario ORDER BY SUM DESC
) GROUP BY nombre ORDER BY COUNT DESC LIMIT 1