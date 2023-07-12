IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'SpaceObjects')
BEGIN
    CREATE DATABASE SpaceObjects;
END

USE SpaceObjects;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='planet' and xtype='U')
	CREATE TABLE planet (
		[id_planet] INT IDENTITY PRIMARY KEY NOT NULL,
		[id_planet_type] INT,
		[id_star] INT,
		[name] NVARCHAR(32),
		[diameter] FLOAT(10),
		[mass] FLOAT(10),
		[surface_temperature] FLOAT(10),
		[date_discovery] DATETIME
	);

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='planet_type' and xtype='U')
	CREATE TABLE planet_type (
		[id_planet_type] INT IDENTITY PRIMARY KEY NOT NULL,
		[name] NVARCHAR(32),
		[description] NVARCHAR(256)
	);

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='star' and xtype='U')
	CREATE TABLE star (
		[id_star] INT IDENTITY PRIMARY KEY NOT NULL,
		[id_star_type] INT,
		[name] NVARCHAR(32),
		[diameter] FLOAT(10),
		[mass] FLOAT(10),
		[magnitude] FLOAT(2),
		[temperature] FLOAT(10),
		[date_discovery] DATETIME
	);	

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='star_type' and xtype='U')
	CREATE TABLE star_type (
		[id_star_type] INT IDENTITY PRIMARY KEY NOT NULL,
		[name] NVARCHAR(32)
	);

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='star_has_absolute_magnitude' and xtype='U')
	CREATE TABLE star_has_absolute_magnitude (
		[id_star_has_absolute_magnitude] INT IDENTITY PRIMARY KEY NOT NULL,
		[id_star] VARCHAR(1),
		[absolute_magnitude] FLOAT(2),
		[date_start] DATETIME,
		[date_end] DATETIME
	);
