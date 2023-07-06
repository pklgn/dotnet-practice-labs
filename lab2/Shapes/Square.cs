// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace Shapes;

public class Square : IShape
{
    Point _leftTop;
    double _side;

    public Square(Point leftTop, double side)
    {
        if (side < 0)
        {
            throw new ArgumentException("Square side cannot be negative");
        }

        _leftTop = leftTop;
        _side = side;
    }

    public double CalculateArea()
    {
        return _side * _side;
    }
    public double CalculatePerimeter()
    {
        return 4 * _side;
    }
}
