USE db_condopro;

/* CONDOMINIO */

SELECT Condominio.id ID, Condominio.nombre Nombre, Condominio.estado Estado, Condominio.ciudad Ciudad, Condominio.direccion Direccion, CONCAT(Admin.nombre, ' ', Admin.apellido) Administrador
FROM condominios AS Condominio
INNER JOIN Admins AS Admin ON Condominio.AdminId = Admin.id
WHERE Condominio.activo = true;

/* CASA */

SELECT Casa.id ID, Casa.nombre Nombre, Casa.numero Numero, Casa.dimensiones Dimensiones, Casa.estado Estado, Casa.alicuota Alicuota, CONCAT(Propietario.nombre, ' ', Propietario.apellido) Propietario
FROM casas AS Casa 
LEFT OUTER JOIN Propietarios AS Propietario ON Casa.PropietarioId = Propietario.id 
WHERE Casa.CondominioId = 1 AND Casa.activo = true;




