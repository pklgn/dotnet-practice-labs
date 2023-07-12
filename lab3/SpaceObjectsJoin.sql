SELECT *
    FROM [planet] p
    INNER JOIN [planet_type] pt ON p.[id_planet_type] = pt.[id_planet_type];

SELECT *
    FROM [planet] p
    LEFT JOIN [star] s ON p.[id_star] = s.[id_star];

SELECT *
    FROM star s
    RIGHT JOIN star_type st ON s.id_star_type = st.id_star_type;
