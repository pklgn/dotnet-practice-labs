// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace Shapes;

public class Point
{
    private double _x;
    private double _y;

    public Point(double x, double y)
    {
        X = x;
        Y = y;
    }

    public double X { get => _x; set => _x = value; }
    public double Y { get => _y; set => _y = value; }

    public double GetDistance(Point point)
    {
        double xDistance = point.X - X;
        double yDistance = point.Y - Y;

        return Math.Sqrt(xDistance * xDistance + yDistance * yDistance);
    }
}
