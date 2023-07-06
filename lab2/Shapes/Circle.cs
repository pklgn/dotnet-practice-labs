// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace Shapes;

public class Circle : IShape
{
    Point _center;
    double _radius;

    public Circle(Point center, double radius)
    {
        _center = center;
        _radius = radius;
    }

    public double CalculateArea()
    {
        return Math.PI * _radius * _radius;
    }
    public double CalculatePerimeter()
    {
        return 2 * Math.PI * _radius;
    }
}
