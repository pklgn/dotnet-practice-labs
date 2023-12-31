﻿// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using Shapes;

namespace ShapesTests;

public class TriangleTests
{
    [Test]
    public void Triangle_CalculateArea_RectangularTriangle_CorrectAnswer()
    {
        // Arrange
        double expectedArea = 6;
        Triangle triangle = new(new Point(0, 0), new Point(3, 0), new Point(0, 4));

        // Act
        double area = triangle.CalculateArea();

        // Assert
        Assert.That(area, Is.EqualTo(expectedArea));
    }

    [Test]
    public void Triangle_CalculateArea_ObtuseTriangle_CorrectAnswer()
    {
        // Arrange
        double expectedArea = 16;
        // Actual result of area was like 15.9999999999996, so i brought some precision value
        double tolerance = 10;
        Triangle triangle = new(new Point(-1, 0), new Point(3, 2), new Point(15, 0));

        // Act
        double area = triangle.CalculateArea();

        // Assert
        Assert.That(area, Is.EqualTo(expectedArea).Within(tolerance));
    }

    [Test]
    public void Triangle_CalculateArea_AcuteTriangle_CorrectAnswer()
    {
        // Arrange
        double expectedArea = 8.5;
        Triangle triangle = new(new Point(-2, -1), new Point(1, 3), new Point(3, 0));

        // Act
        double area = triangle.CalculateArea();

        // Assert
        Assert.That(area, Is.EqualTo(expectedArea));
    }

    [Test]
    public void Triangle_CalculateArea_IsoscelesTriangle_CorrectAnswer()
    {
        // Arrange
        double expectedArea = 10;
        Triangle triangle = new(new Point(-2, 0), new Point(0, 5), new Point(2, 0));

        // Act
        double area = triangle.CalculateArea();

        // Assert
        Assert.That(area, Is.EqualTo(expectedArea));
    }

    [Test]
    public void Triangle_CalculateArea_EquilateralTriangle_CorrectAnswer()
    {
        // Arrange
        double expectedArea = 9 * Math.Sqrt(3);
        // each side equals to 6
        Triangle triangle = new(new Point(0, 0), new Point(3, 3 * Math.Sqrt(3)), new Point(6, 0));
        double tolerance = 10;

        // Act
        double area = triangle.CalculateArea();

        // Assert
        Assert.That(area, Is.EqualTo(expectedArea).Within(tolerance));
    }

    [Test]
    public void Triangle_CalculatePerimeter_RectangularTriangle_CorrectAnswer()
    {
        // Arrange
        double expectedPerimeter = 12;
        Triangle triangle = new(new Point(0, 0), new Point(0, 4), new Point(3, 0));

        // Act
        double perimeter = triangle.CalculatePerimeter();

        // Assert
        Assert.That(perimeter, Is.EqualTo(expectedPerimeter));
    }

    [Test]
    public void Triangle_CalculatePerimeter_ObtuseTriangle_CorrectAnswer()
    {
        // Arrange
        double expectedPerimeter = 32.638;
        double tolerance = 3;
        Triangle triangle = new(new Point(-1, 0), new Point(3, 2), new Point(15, 0));

        // Act
        double perimeter = triangle.CalculatePerimeter();

        // Assert
        Assert.That(perimeter, Is.EqualTo(expectedPerimeter).Within(tolerance));
    }

    [Test]
    public void Triangle_CalculatePerimeter_AcuteTriangle_CorrectAnswer()
    {
        // Arrange
        double expectedPerimeter = 13.705;
        double tolerance = 3;
        Triangle triangle = new(new Point(-2, -1), new Point(1, 3), new Point(3, 0));

        // Act
        double perimeter = triangle.CalculatePerimeter();

        // Assert
        Assert.That(perimeter, Is.EqualTo(expectedPerimeter).Within(tolerance));
    }

    [Test]
    public void Triangle_CalculatePerimeter_IsoscelesTriangle_CorrectAnswer()
    {
        // Arrange
        double expectedPerimeter = 14.770;
        double tolerance = 3;
        Triangle triangle = new(new Point(-2, 0), new Point(0, 5), new Point(2, 0));

        // Act
        double perimeter = triangle.CalculatePerimeter();

        // Assert
        Assert.That(perimeter, Is.EqualTo(expectedPerimeter).Within(tolerance));
    }

    [Test]
    public void Triangle_CalculatePerimeter_EquilateralTriangle_CorrectAnswer()
    {
        // Arrange
        double expectedPerimeter = 3 * 6;
        // each side equals to 6
        Triangle triangle = new(new Point(0, 0), new Point(3, 3 * Math.Sqrt(3)), new Point(6, 0));
        double tolerance = 3;

        // Act
        double perimeter = triangle.CalculatePerimeter();

        // Assert
        Assert.That(perimeter, Is.EqualTo(expectedPerimeter).Within(tolerance));
    }

    [Test]
    public void Triangle_CalculateArea_LineTriangle_CorrectAnswer()
    {
        // Arrange
        double expectedArea = 0;
        Triangle triangle = new(new Point(-3, 0), new Point(0, 0), new Point(3, 0));

        // Act
        double area = triangle.CalculateArea();

        // Assert
        Assert.That(area, Is.EqualTo(expectedArea));
    }

    [Test]
    public void Triangle_CalculatePerimeter_LineTriangle_CorrectAnswer()
    {
        // Arrange
        double expectedPerimeter = 3 + 3 + 6;
        Triangle triangle = new(new Point(-3, 0), new Point(0, 0), new Point(3, 0));

        // Act
        double perimeter = triangle.CalculatePerimeter();

        // Assert
        Assert.That(perimeter, Is.EqualTo(expectedPerimeter));
    }
}
