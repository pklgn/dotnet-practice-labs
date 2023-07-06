// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using Shapes;

namespace ShapesTests;

public class SquareTests
{
    [Test]
    public void Square_CalculateArea_PositiveSide_CorrectAnswer()
    {
        // Arrange
        double expectedArea = 25;
        Square square = new(new Point(0, 0), 5);

        // Act
        double area = square.CalculateArea();

        // Assert
        Assert.That(area, Is.EqualTo(expectedArea));
    }

    [Test]
    public void Square_CalculatePerimeter_PositiveSide_CorrectAnswer()
    {
        // Arrange
        double expectedPerimeter = 24;
        Square square = new(new Point(0, 0), 6);

        // Act
        double perimiter = square.CalculatePerimeter();

        // Assert
        Assert.That(perimiter, Is.EqualTo(expectedPerimeter));
    }

    [Test]
    public void Square_CalculateArea_ZeroSide_CorrectAnswer()
    {
        // Arrange
        double expectedArea = 0;
        Square square = new(new Point(0, 0), 0);

        // Act
        double area = square.CalculateArea();

        // Assert
        Assert.That(area, Is.EqualTo(expectedArea));
    }

    [Test]
    public void Square_CalculatePerimeter_ZeroSide_CorrectAnswer()
    {
        // Arrange
        double expectedPerimeter = 0;
        Square square = new(new Point(0, 0), 0);

        // Act
        double perimiter = square.CalculatePerimeter();

        // Assert
        Assert.That(perimiter, Is.EqualTo(expectedPerimeter));
    }

    [Test]
    public void Square_Constructor_NegativeSide_CorrectException()
    {
        // Arrange
        string exMessage = "Square side cannot be negative";

        ArgumentException ex = Assert.Throws<ArgumentException>(() => new Square(new Point(0, 0), -1));

        Assert.That(ex.Message, Is.EqualTo(exMessage));
    }
}
