CREATE DATABASE IF NOT EXISTS condoprodb;

USE condoprodb;

CREATE TABLE IF NOT EXISTS condominios(
id integer auto_increment,
nombre varchar(255) not null,
estado varchar(255) not null,
ciudad varchar(255) not null,
direccion varchar(255) not null,
activo tinyint(1) not null,
 primary key(id)
);

CREATE TABLE IF NOT EXISTS propietarios(
id integer auto_increment,
nombre varchar(255) not null,
apellido varchar(255) not null,
cedula varchar(255) not null,
correo varchar(255) not null,
telefono varchar(255) not null,
casaId integer,
activo tinyint(1) not null,
 primary key(id)
);

CREATE TABLE IF NOT EXISTS casas(
id integer auto_increment,
numero integer not null,
dimensiones integer not null,
alicuota float not null,
estado varchar(255) not null,
propietarioId integer,
condominioId integer,
activo tinyint(1) not null,
 primary key(id),
 foreign key(propietarioId) references propietarios(id),
 foreign key(condominioId) references condominios(id)
);

CREATE TABLE IF NOT EXISTS administradores(
id integer auto_increment,
nombre varchar(255) not null,
apellido varchar(255) not null,
cedula varchar(255) not null,
correo varchar(255) not null,
telefono varchar(255) not null,
condominioId integer not null,
activo tinyint(1) not null,
 primary key(id),
 foreign key(condominioId) references condominios(id)
);

CREATE TABLE IF NOT EXISTS facturas(
id integer auto_increment,
numero varchar(255) not null,
estado varchar(255) not null,
fecha date not null,
casaId integer not null,
 primary key(id),
 foreign key(casaId) references casas(id)
);

CREATE TABLE IF NOT EXISTS instrumentosDePago(
id integer auto_increment,
numero varchar(255) not null,
fecha date not null,
tipo varchar(255) not null,
monto integer not null,
 primary key(id)
);

CREATE TABLE IF NOT EXISTS pagos(
id integer auto_increment,
facturaId integer not null,
instDePagoId integer not null,
 primary key(id),
 foreign key(facturaId) references facturas(id),
 foreign key(instDePagoId) references instrumentosDePago(id)
);

CREATE TABLE IF NOT EXISTS gastos(
id integer auto_increment,
concepto varchar(255) not null,
tipo varchar(255) not null,
monto integer not null,
condominioId integer not null,
activo tinyint(1) not null,
 primary key(id),
 foreign key(condominioId) references condominios(id)
);

CREATE TABLE IF NOT EXISTS gastosDeFacturas(
id integer auto_increment,
gastoId integer not null,
facturaId integer not null,
 primary key(id),
 foreign key(gastoId) references gastos(id),
 foreign key(facturaId) references facturas(id)
);

CREATE TABLE IF NOT EXISTS gastosDeCasas(
id integer auto_increment,
gastoId integer not null,
casaId integer not null,
 primary key(id),
 foreign key(gastoId) references gastos(id),
 foreign key(casaId) references casas(id)
);

CREATE TABLE IF NOT EXISTS visitantes(
id integer auto_increment,
nombre varchar(255) not null,
apellido varchar(255) not null,
cedula varchar(255) not null,
fecha date not null,
casaId integer not null,
 primary key(id),
 foreign key(casaId) references casas(id)
);

