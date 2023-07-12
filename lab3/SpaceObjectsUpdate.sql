-- обновить значение диаметра для планеты с указанным id
UPDATE [planet]
    SET [diameter] = 6139.1
    WHERE [id_planet] = 5;

-- обновить название обозначния для указанного старого обозначения
UPDATE [planet_type]
    SET [name] = 'Карликовая планета'
    WHERE [name] = 'Карлик';

-- обновить название звезды для всех звезд с названием, удовлетворяющим шаблону
UPDATE [dbo].[star]
    SET [name] = 'RS 01-6'
    WHERE [name] LIKE 'RS 0-6%';

-- обновить значение date_end для каждой звезды в NULL, если оно является последним известным на данный момент
WITH [cte] AS (
    SELECT *,
        ROW_NUMBER() OVER (PARTITION BY id_star ORDER BY [date_end] DESC) AS rn
    FROM [star_has_absolute_magnitude]
)
UPDATE [cte]
    SET [date_end] = NULL
    WHERE rn < 2; 

UPDATE [dbo].[star_type]
    SET [name] = 'Тип Обобщенный'
    WHERE [name] BETWEEN 'Тип A' AND 'Тип F'
