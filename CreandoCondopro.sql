CREATE DATABASE IF NOT EXISTS db_condopro;

USE db_condopro;

CREATE TABLE IF NOT EXISTS admins(
id integer auto_increment,
nombre varchar(255) not null,
apellido varchar(255) not null,
cedula varchar(255) not null,
correo varchar(255) not null,
telefono varchar(255) not null,
activo tinyint(1) not null,
 primary key(id)
);

CREATE TABLE IF NOT EXISTS condominios(
id integer auto_increment,
nombre varchar(255) not null,
estado varchar(255) not null,
ciudad varchar(255) not null,
direccion varchar(255) not null,
AdminId integer not null,
activo tinyint(1) not null,
 primary key(id),
 foreign key(AdminId) references admins(id)
);

CREATE TABLE IF NOT EXISTS propietarios(
id integer auto_increment,
nombre varchar(255) not null,
apellido varchar(255) not null,
cedula varchar(255) not null,
correo varchar(255) not null,
telefono varchar(255) not null,
activo tinyint(1) not null,
 primary key(id)
);

CREATE TABLE IF NOT EXISTS casas(
id integer auto_increment,
numero integer not null,
dimensiones integer not null,
alicuota float not null,
estado varchar(255) not null,
PropietarioId integer,
CondominioId integer not null,
activo tinyint(1) not null,
 primary key(id),
 foreign key(PropietarioId) references propietarios(id),
 foreign key(CondominioId) references condominios(id)
);

CREATE TABLE IF NOT EXISTS facturas(
id integer auto_increment,
numero integer not null,
estado varchar(255) not null,
fechaEmision date not null,
fechaVenc date not null,
saldo integer not null,
CasaId integer not null,
activo tinyint(1) not null,
 primary key(id),
 foreign key(CasaId) references casas(id)
);

CREATE TABLE IF NOT EXISTS instrumentoDePagos(
id integer auto_increment,
numero varchar(255) not null,
fecha date not null,
tipo varchar(255) not null,
monto integer not null,
activo tinyint(1) not null,
 primary key(id)
);

CREATE TABLE IF NOT EXISTS pagos(
id integer auto_increment,
FacturaId integer not null,
InstrumentoDePagoId integer not null,
 primary key(id),
 foreign key(FacturaId) references facturas(id),
 foreign key(InstrumentoDePagoId) references instrumentoDePagos(id)
);

CREATE TABLE IF NOT EXISTS gastos(
id integer auto_increment,
concepto varchar(255) not null,
tipo varchar(255) not null,
monto integer not null,
CondominioId integer not null,
CasaId integer,
activo tinyint(1) not null,
 primary key(id),
 foreign key(CondominioId) references condominios(id),
 foreign key(CasaId) references casas(id)
);

CREATE TABLE IF NOT EXISTS gastoDeFacturas(
id integer auto_increment,
GastoId integer not null,
FacturaId integer not null,
 primary key(id),
 foreign key(GastoId) references gastos(id),
 foreign key(FacturaId) references facturas(id)
);

CREATE TABLE IF NOT EXISTS visitantes(
id integer auto_increment,
nombre varchar(255) not null,
apellido varchar(255) not null,
cedula varchar(255) not null,
fecha date not null,
CasaId integer not null,
activo tinyint(1) not null,
 primary key(id),
 foreign key(CasaId) references casas(id)
);

