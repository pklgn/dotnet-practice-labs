// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace Shapes;

public class Triangle : IShape
{
    Point _vertex1;
    Point _vertex2;
    Point _vertex3;

    public Triangle(Point vertex1, Point vertex2, Point vertex3)
    {
        _vertex1 = vertex1;
        _vertex2 = vertex2;
        _vertex3 = vertex3;
    }

    public double CalculateArea()
    {
        double perimeter = CalculatePerimeter();

        return Math.Sqrt(perimeter / 2 *
            (perimeter / 2 - _vertex1.GetDistance(_vertex2)) *
            (perimeter / 2 - _vertex2.GetDistance(_vertex3)) *
            (perimeter / 2 - _vertex1.GetDistance(_vertex3)));
    }

    public double CalculatePerimeter()
    {
        return _vertex1.GetDistance(_vertex2) +
            _vertex2.GetDistance(_vertex3) +
            _vertex1.GetDistance(_vertex3);
    }
}
