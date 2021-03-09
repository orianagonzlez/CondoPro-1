USE db_condopro;

/* PROPIETARIO */

/*Propietarios activos*/
SELECT id ID, nombre Nombre, apellido Apellido, cedula Cedula, correo Correo, telefono Telefono 
FROM Propietarios Propietario 
WHERE Propietario.activo = true;

/* Propietario activo por id */
SELECT id ID, nombre Nombre, apellido Apellido, cedula Cedula, correo Correo, telefono Telefono 
FROM Propietarios Propietario 
WHERE Propietario.id = 1 AND Propietario.activo = true;

/* Propietario activo por cedula */
SELECT id ID, nombre Nombre, apellido Apellido, cedula Cedula, correo Correo, telefono Telefono 
FROM Propietarios Propietario 
WHERE Propietario.cedula = 27796470 AND Propietario.activo = true
LIMIT 1;

/* CONDOMINIO */

SELECT Condominio.id ID, Condominio.nombre Nombre, Condominio.estado Estado, Condominio.ciudad Ciudad, Condominio.direccion Direccion, CONCAT(Admin.nombre, ' ', Admin.apellido) Administrador
FROM condominios AS Condominio
INNER JOIN Admins AS Admin ON Condominio.AdminId = Admin.id
WHERE Condominio.activo = true;

/* CASA */

/* Casas activas */
SELECT Casa.id ID, Casa.nombre Nombre, Casa.numero Numero, Casa.dimensiones Dimensiones, Casa.estado Estado, Casa.alicuota Alicuota, CONCAT(Propietario.nombre, ' ', Propietario.apellido) Propietario
FROM casas AS Casa 
LEFT OUTER JOIN Propietarios AS Propietario ON Casa.PropietarioId = Propietario.id 
WHERE Casa.activo = true;

/* Casas activas de un condominio */
SELECT Casa.id ID, Casa.nombre Nombre, Casa.numero Numero, Casa.dimensiones Dimensiones, Casa.estado Estado, Casa.alicuota Alicuota, CONCAT(Propietario.nombre, ' ', Propietario.apellido) Propietario
FROM casas AS Casa 
LEFT OUTER JOIN Propietarios AS Propietario ON Casa.PropietarioId = Propietario.id 
WHERE Casa.CondominioId = 1 AND Casa.activo = true;

/* Casa activas por id */
SELECT Casa.id ID, Casa.nombre Nombre, Casa.numero Numero, Casa.dimensiones Dimensiones, Casa.estado Estado, Casa.alicuota Alicuota, CONCAT(Propietario.nombre, ' ', Propietario.apellido) Propietario
FROM casas AS Casa 
LEFT OUTER JOIN Propietarios AS Propietario ON Casa.PropietarioId = Propietario.id 
WHERE Casa.id = 1 AND Casa.activo = true;

/* ADMINISTRADOR */

/* Administrador activo por cedula */
SELECT id ID, nombre Nombre, apellido Apellido, cedula Cedula, correo Correo, telefono Telefono 
FROM Admins Admin 
WHERE Admin.cedula = 27796470 AND Admin.activo = true
LIMIT 1;

/* VISITANTES */

/* Visitantes activos de una casa */
SELECT id ID, nombre Nombre, apellido Apellido, cedula Cedula, fecha Fecha 
FROM Visitantes Visitante
WHERE Visitante.CasaId = 2 AND Visitante.activo = true;

/* Visitantes activo por id*/
SELECT id ID, nombre Nombre, apellido Apellido, cedula Cedula, fecha Fecha 
FROM Visitantes Visitante
WHERE Visitante.id = 2 AND Visitante.activo = true;

/* GASTOS */

/* Gastos activos de un condominio */
SELECT Gasto.id ID, Gasto.concepto Concepto, Gasto.tipo Tipo, Gasto.monto Monto, CONCAT('#', C.numero, ' ', C.nombre) Casa
FROM Gastos Gasto 
LEFT OUTER JOIN Casas AS C ON Gasto.CasaId = C.id 
WHERE Gasto.CondominioId = 1 AND Gasto.activo = true;

/* FACTURAS */

/* Facturas activas de un condominio*/
SELECT Factura.id ID, Factura.numero Numero, Factura.estado Estado, Factura.fechaEmision FechaDeEmision, Factura.fechaVenc FechaDeVencimiento, Factura.saldo Saldo, CONCAT('#', C.numero, ' ', C.nombre) Casa
FROM Facturas AS Factura 
INNER JOIN Casas C ON Factura.CasaId = C.id AND C.CondominioId = 1 
WHERE Factura.activo = true;

/* Factura activa por id*/
SELECT Factura.id ID, Factura.numero NumeroFactura, Factura.estado Estado, Factura.fechaEmision FechaDeEmision, Factura.fechaVenc FechaDeVencimiento, Factura.saldo Saldo,  C.nombre NombreCasa, C.numero Numero, CONCAT(P.nombre, ' ', P.apellido) Propietario, P.cedula Cedula  
FROM Facturas Factura 
INNER JOIN Casas C ON Factura.CasaId = C.id 
LEFT OUTER JOIN Propietarios P ON C.PropietarioId = P.id 
WHERE Factura.id = 4 AND Factura.activo = true;

/* Facturas pendientes por casa */
SELECT C.id ID, C.nombre NombreCasa, C.numero Numero, CONCAT(P.nombre, ' ', P.apellido) Propietario, COUNT(Factura.id) FactPen 
FROM Facturas Factura 
RIGHT OUTER JOIN Casas C ON Factura.CasaId = C.id 
LEFT OUTER JOIN Propietarios P ON C.PropietarioId = P.id 
WHERE (Factura.estado = 'Pendiente' AND Factura.activo = true) OR Factura.id is null
GROUP BY C.id;

/* Facturas activas por casa id*/
SELECT Factura.id ID, Factura.numero Numero, Factura.estado Estado, Factura.fechaEmision FechaDeEmision, Factura.fechaVenc FechaDeVencimiento, Factura.saldo Saldo
FROM Facturas AS Factura 
WHERE Factura.CasaId = 2 AND Factura.activo = true;

/* GASTOS DE FACTURA */

/* Gastos de una factura por factura id*/
SELECT Gasto.concepto Concepto, Gasto.tipo Tipo, Gasto.monto TotalGasto, Gasto.CasaId Casa 
FROM GastoDeFacturas GastoDeFactura
INNER JOIN Gastos AS Gasto ON GastoDeFactura.GastoId = Gasto.id 
WHERE GastoDeFactura.FacturaId = 5;
