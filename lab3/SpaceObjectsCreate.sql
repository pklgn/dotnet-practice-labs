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
		[name] NVARCHAR(32) NOT NULL,
		[diameter] FLOAT(10),
		[mass] FLOAT(10),
		[surface_temperature] FLOAT(10),
		[date_discovery] DATETIME NOT NULL
	);

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='planet_type' and xtype='U')
	CREATE TABLE planet_type (
		[id_planet_type] INT IDENTITY PRIMARY KEY NOT NULL,
		[name] NVARCHAR(32) NOT NULL,
		[description] NVARCHAR(256) NOT NULL
	);

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='star' and xtype='U')
	CREATE TABLE star (
		[id_star] INT IDENTITY PRIMARY KEY NOT NULL,
		[id_star_type] INT,
		[name] NVARCHAR(32) NOT NULL,
		[diameter] FLOAT(10),
		[mass] FLOAT(10),
		[magnitude] FLOAT(2),
		[temperature] FLOAT(10),
		[date_discovery] DATETIME NOT NULL
	);	

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='star_type' and xtype='U')
	CREATE TABLE star_type (
		[id_star_type] INT IDENTITY PRIMARY KEY NOT NULL,
		[name] NVARCHAR(32) NOT NULL
	);

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='star_has_absolute_magnitude' and xtype='U')
	CREATE TABLE star_has_absolute_magnitude (
		[id_star_has_absolute_magnitude] INT IDENTITY PRIMARY KEY NOT NULL,
		[id_star] INT,
		[absolute_magnitude] FLOAT(2) NOT NULL,
		[date_start] DATETIME NOT NULL,
		[date_end] DATETIME
	);

-- planet
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='FK_planet_planet_type_id')
BEGIN
    ALTER TABLE planet
    ADD CONSTRAINT FK_planet_planet_type_id
    FOREIGN KEY (id_planet_type)
    REFERENCES planet_type(id_planet_type)
    ON UPDATE CASCADE
    ON DELETE SET NULL;
END

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='FK_planet_star_id')
BEGIN
    ALTER TABLE planet
    ADD CONSTRAINT FK_planet_star_id
    FOREIGN KEY (id_star)
    REFERENCES star(id_star)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
END

-- star
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='FK_star_star_type_id')
BEGIN
    ALTER TABLE star
    ADD CONSTRAINT FK_star_star_type_id
    FOREIGN KEY (id_star_type)
    REFERENCES star_type(id_star_type)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
END

-- star_has_absolute_magnitude
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='FK_star_has_absolute_magnitude_star_id')
BEGIN
    ALTER TABLE star_has_absolute_magnitude
    ADD CONSTRAINT FK_star_has_absolute_magnitude_star_id
    FOREIGN KEY (id_star)
    REFERENCES star(id_star)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
END
