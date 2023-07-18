// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using Microsoft.AspNetCore.Mvc;

namespace CalculatorUI.Models
{
    public class ArithmeticOperation
    {
        public static readonly int NO_RESULT = int.MinValue;

        public int LeftOperand { get; set; }
        public string OperatorSymbol { get; set; } = "";
        public int RightOperand { get; set; }

        public int Result { get; set; } = NO_RESULT;

        public void ExecuteOperation()
        {
            switch (OperatorSymbol)
            {
                case "+":
                    Result = LeftOperand + RightOperand;
                    break;
                case "-":
                    Result = LeftOperand - RightOperand;
                    break;
                case "*":
                    Result = LeftOperand * RightOperand;
                    break;
                case "/":
                    Result = LeftOperand / RightOperand;
                    break;
                default:
                    Console.WriteLine("Unsupported operator.");
                    break;
            }
        }
    }
}
