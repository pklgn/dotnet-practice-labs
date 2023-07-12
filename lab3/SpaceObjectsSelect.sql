SELECT *
    FROM [dbo].[planet];

-- выбираем те звезды, чья звездная величина больше -20
SELECT *
	FROM [dbo].[star]
	WHERE [magnitude] > -20;

-- выбираем те планеты, имя которых начинается с RS
SELECT *
	FROM [dbo].[planet]
	WHERE [name] LIKE 'RS%';

-- выбираем звезды с перечисленными идентификаторами
SELECT *
    FROM [dbo].[star]
    WHERE [id_star] IN (1, 2);

-- выбираем планеты с массой от 100 до 500 масс Солнца
SELECT *
    FROM [dbo].[planet]
    WHERE [mass] BETWEEN 100 AND 500;

-- выбираем планеты, открытые либо в 2000, либо в 2001 году
SELECT *
    FROM [dbo].[planet]
    WHERE YEAR([date_discovery]) = '2000' OR YEAR([date_discovery]) = '2001';

-- выбираем все типы звезд, кроме типа O
SELECT *
    FROM [dbo].[star_type]
    WHERE NOT [name] = 'Тип O';

-- выбираем звезды с отсутствующей датой открытия
SELECT *
    FROM [dbo].[star]
    WHERE [date_discovery] IS NULL;

-- выбираем планеты, открытые в промежутке между 1999 и 2005 годами
SELECT *
    FROM [dbo].[planet]
    WHERE YEAR([date_discovery]) BETWEEN '1999' AND '2005'
    ORDER BY [date_discovery];

-- подсчитываем количество планет, открытых в каждый из упомянутых годов
SELECT YEAR([date_discovery]), COUNT(*) AS [planets_number]
    FROM [dbo].[planet]
    GROUP BY YEAR([date_discovery]);
