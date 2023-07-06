// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using Shapes;

namespace ShapesTests;

public class CircleTests
{
    [Test]
    public void Circle_CalculateArea_PositiveRadius_CorrectAnswer()
    {
        // Arrange
        double expectedArea = 25 * Math.PI;
        Circle circle = new(new Point(0, 0), 5);

        // Act
        double area = circle.CalculateArea();

        // Assert
        Assert.That(area, Is.EqualTo(expectedArea));
    }

    [Test]
    public void Circle_CalculatePerimeter_PositiveRadius_CorrectAnswer()
    {
        // Arrange
        double expectedPerimeter = 2 * Math.PI * 7;
        Circle circle = new(new Point(0, 0), 7);

        // Act
        double perimeter = circle.CalculatePerimeter();

        // Assert
        Assert.That(perimeter, Is.EqualTo(expectedPerimeter));
    }

    [Test]
    public void Circle_CalculateArea_ZeroRadius_CorrectAnswer()
    {
        // Arrange
        double expectedArea = 0;
        Circle circle = new(new Point(0, 0), 0);

        // Act
        double area = circle.CalculateArea();

        // Assert
        Assert.That(area, Is.EqualTo(expectedArea));
    }

    [Test]
    public void Circle_CalculatePerimeter_ZeroRadius_CorrectAnswer()
    {
        // Arrange
        double expectedPerimeter = 0;
        Circle circle = new(new Point(0, 0), 0);

        // Act
        double perimeter = circle.CalculatePerimeter();

        // Assert
        Assert.That(perimeter, Is.EqualTo(expectedPerimeter));
    }

    [Test]
    public void Circle_Constructor_NegativeRadius_CorrectException()
    {
        // Arrange
        string exMessage = "Circle radius cannot be negative";

        // Act
        ArgumentException ex = Assert.Throws<ArgumentException>(() => new Circle(new Point(0, 0), -1));

        // Assert
        Assert.That(ex.Message, Is.EqualTo(exMessage));
    }

    // TODO: extract duplicate code in a function
}
