-- обновить значение диаметра дл€ планеты с указанным id
UPDATE [planet]
    SET [diameter] = 6139.1
    WHERE [id_planet] = 5;

-- обновить название обозначни€ дл€ указанного старого обозначени€
UPDATE [planet_type]
    SET [name] = ' арликова€ планета'
    WHERE [name] = ' арлик';

-- обновить название звезды дл€ всех звезд с названием, удовлетвор€ющим шаблону
UPDATE [dbo].[star]
    SET [name] = 'RS 01-6'
    WHERE [name] LIKE 'RS 0-6%';

-- обновить значение date_end дл€ каждой звезды в NULL, если оно €вл€етс€ последним известным на данный момент
WITH [cte] AS (
    SELECT *,
        ROW_NUMBER() OVER (PARTITION BY id_star ORDER BY [date_end] DESC) AS rn
    FROM [star_has_absolute_magnitude]
)
UPDATE [cte]
    SET [date_end] = NULL
    WHERE rn < 2; 

UPDATE [dbo].[star_type]
    SET [name] = '“ип ќбобщенный'
    WHERE [name] BETWEEN '“ип A' AND '“ип F'
