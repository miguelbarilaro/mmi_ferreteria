create database db_mmi;

use db_mmi;

create table Provincias (
    id_provincia int auto_increment primary key,
    nombre varchar(100)
);

create table Departamentos (
    id_departamento int auto_increment primary key,
    nombre varchar(100),
    id_provincia int,
    foreign key (id_provincia) references Provincias (id_provincia)
);

create table Municipios (
    id_municipio int auto_increment primary key,
    nombre varchar(100),
    cp varchar(100),
    id_departamento int,
    foreign key (id_departamento) references Departamentos (id_departamento)
);

create table Direcciones (
    id_direccion int auto_increment primary key,
    id_municipio int,
    calle varchar(100),
    numero varchar(100),
    ubicacion varchar(100),
    observaciones varchar(100),
    foreign key (id_municipio) references Municipios (id_municipio)
);

create table Personas (
    id_persona int auto_increment primary key,
    cuil varchar(100),
    dni varchar(100),
    fecha_nacimiento varchar(100),
    edad varchar(100),
    id_direccion int,
    foreign key (id_direccion) references Direcciones (id_direccion)
);

create table Roles (
    id_rol int auto_increment primary key,
    nombre_rol varchar(100)
);

create table Usuarios (
    id_usuario int auto_increment primary key,
    email varchar(100),
    contrasena varchar(100),
    id_persona int,
    id_rol int,
    foreign key (id_rol) references Roles (id_rol),
    foreign key (id_persona) references Personas (id_persona)
);



create table Clientes (
    id_cliente int auto_increment primary key,
    tipo varchar(100),
    categoria_fiscal varchar(100),
    id_usuario int,
    foreign key (id_usuario) references Usuarios (id_usuario)
);

create table Categorias (
    id_categoria int auto_increment primary key,
    nombre varchar(100)
);

create table Subcategorias(
	id_subcategoria int auto_increment primary key,
    nombre varchar(100)
);

create table Tipos(
	id_tipo int auto_increment primary key,
    nombre varchar(100)
);

create table Marcas(
	id_marca int auto_increment primary key,
    nombre varchar(100)
);
    
create table Colores(
	id_color int auto_increment primary key,
    nombre varchar(100)
);

create table Capacidades(
	id_capacidad int auto_increment primary key,
    nombre varchar(100)
);

create table Dimensiones(
	id_dimension int auto_increment primary key,
    largo varchar(100),
    ancho varchar(100),
    profundidad varchar(100)
);

create table Potencias(
	id_potencia int auto_increment primary key,
	nombre varchar(100)
);

create table Materiales(
	id_material int auto_increment primary key,
    nombre varchar(100)
);

create table Precios(
	id_precio int auto_increment primary key,
    nombre varchar(100)
);

create table Ofertas(
	id_oferta int auto_increment primary key,
    nombre varchar(100)
);

create table Articulos(
	id_articulo int auto_increment primary key,
    nombre varchar(100),
    descripcion varchar(500),
    id_categoria int,
    id_subcategoria int,
    id_tipo int,
    id_marca int,
    id_color int,
    id_capacidad int,
    id_dimension int,
    id_potencia int,
    id_material int,
    id_precio int,
    id_oferta int,
    foreign key (id_categoria) references Categorias(id_categoria),
    foreign key (id_subcategoria) references Subcategorias(id_subcategoria),
    foreign key (id_tipo) references Tipos(id_tipo),
    foreign key (id_marca) references Marcas(id_marca),
    foreign key (id_color) references Colores(id_color),
    foreign key (id_capacidad) references Capacidades(id_capacidad),
    foreign key (id_dimension) references Dimensiones(id_dimension),
    foreign key (id_potencia) references Potencias(id_potencia),
    foreign key (id_material) references Materiales(id_material),
    foreign key (id_precio) references Precios(id_precio),
    foreign key (id_oferta) references Ofertas(id_oferta)
);

-- Representa el carrito activo o histórico de un usuario
create table Carritos (
    id_carrito int auto_increment primary key,
    id_usuario int,
    fecha_creacion timestamp default current_timestamp,
    estado varchar(50) default 'pendiente', -- 'pendiente', 'completado', 'abandonado'
    foreign key (id_usuario) references Usuarios (id_usuario)
);

-- Representa los artículos específicos dentro de ese carrito
create table Carrito_Articulos (
    id_carrito_articulo int auto_increment primary key,
    id_carrito int,
    id_articulo int,
    cantidad int not null default 1,
    -- Guardamos el precio del momento de la compra para que no varíe el total si el dueño cambia el precio después
    precio_unitario_historico decimal(12, 2), 
    foreign key (id_carrito) references Carritos (id_carrito) on delete cascade,
    foreign key (id_articulo) references Articulos (id_articulo)
);

-- 1. Definir los medios disponibles (Efectivo, Transferencia, Tarjeta, etc.)
create table Metodos_Pago (
    id_metodo_pago int auto_increment primary key,
    nombre_metodo varchar(100) -- Ej: 'Tarjeta de Crédito', 'Transferencia', 'Efectivo'
);

-- 2. El Pedido: Es lo que el Carrito se convierte al "Confirmar Compra"
create table Pedidos (
    id_pedido int auto_increment primary key,
    id_usuario int,
    id_cliente int,
    fecha_pedido timestamp default current_timestamp,
    total_final decimal(12, 2),
    estado_pedido varchar(50), -- 'Pendiente', 'Pagado', 'Enviado', 'Cancelado'
    foreign key (id_usuario) references Usuarios(id_usuario),
    foreign key (id_cliente) references Clientes(id_cliente)
);

-- 3. Registro del Pago realizado
create table Pagos (
    id_pago int auto_increment primary key,
    id_pedido int,
    id_metodo_pago int,
    fecha_pago datetime,
    monto_pagado decimal(12, 2),
    comprobante_nro varchar(100), -- Para guardar el ID de transacción de la pasarela de pagos
    estado_pago varchar(50), -- 'Aprobado', 'Rechazado', 'En revisión'
    foreign key (id_pedido) references Pedidos(id_pedido),
    foreign key (id_metodo_pago) references Metodos_Pago(id_metodo_pago)
);

create table Detalle_Pedidos (
    id_detalle int auto_increment primary key,
    id_pedido int,
    id_articulo int,
    cantidad int not null,
    precio_unitario_historico decimal(12, 2) not null, -- El precio al que se vendió ese día
    subtotal decimal(12, 2) not null, -- cantidad * precio_unitario_historico
    foreign key (id_pedido) references Pedidos(id_pedido),
    foreign key (id_articulo) references Articulos(id_articulo)
);


