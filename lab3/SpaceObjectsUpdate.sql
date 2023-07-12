-- �������� �������� �������� ��� ������� � ��������� id
UPDATE [planet]
    SET [diameter] = 6139.1
    WHERE [id_planet] = 5;

-- �������� �������� ���������� ��� ���������� ������� �����������
UPDATE [planet_type]
    SET [name] = '���������� �������'
    WHERE [name] = '������';

-- �������� �������� ������ ��� ���� ����� � ���������, ��������������� �������
UPDATE [dbo].[star]
    SET [name] = 'RS 01-6'
    WHERE [name] LIKE 'RS 0-6%';

-- �������� �������� date_end ��� ������ ������ � NULL, ���� ��� �������� ��������� ��������� �� ������ ������
WITH [cte] AS (
    SELECT *,
        ROW_NUMBER() OVER (PARTITION BY id_star ORDER BY [date_end] DESC) AS rn
    FROM [star_has_absolute_magnitude]
)
UPDATE [cte]
    SET [date_end] = NULL
    WHERE rn < 2; 

UPDATE [dbo].[star_type]
    SET [name] = '��� ����������'
    WHERE [name] BETWEEN '��� A' AND '��� F'
