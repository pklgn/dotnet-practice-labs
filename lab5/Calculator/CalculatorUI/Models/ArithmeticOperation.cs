// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using Microsoft.AspNetCore.Mvc;

namespace CalculatorUI.Models
{
    public class ArithmeticOperation
    {
        private string _operatorSymbol = "";

        public enum OperatorType
        {
            Addition,
            Subtraction,
            Division,
            Multiplication,
            Invalid
        };
        public static readonly int NO_RESULT = int.MinValue;

        public string OperatorSymbol
        {
            get
            {
                return _operatorSymbol;
            }
            set
            {
                switch (value)
                {
                    case "+":
                        Operator = OperatorType.Addition;
                        break;
                    case "-":
                        Operator = OperatorType.Subtraction;
                        break;
                    case "*":
                        Operator = OperatorType.Multiplication;
                        break;
                    case "/":
                        Operator = OperatorType.Division;
                        break;
                    default:
                        Operator = OperatorType.Invalid;
                        break;
                }
                _operatorSymbol = value;
            }
        }

        public int LeftOperand { get; set; }
        public OperatorType Operator { get; set; } = OperatorType.Invalid;
        public int RightOperand { get; set; }

        public int Result { get; set; } = NO_RESULT;

        public virtual void Execute()
        {
            switch (Operator)
            {
                case OperatorType.Addition:
                    Result = LeftOperand + RightOperand;
                    break;
                case OperatorType.Subtraction:
                    Result = LeftOperand - RightOperand;
                    break;
                case OperatorType.Division:
                    Result = LeftOperand / RightOperand;
                    break;
                case OperatorType.Multiplication:
                    Result = LeftOperand * RightOperand;
                    break;
                case OperatorType.Invalid:
                    Console.Error.WriteLine("Invalid operator.");
                    break;
                default:
                    Console.Error.WriteLine("Internal error.");
                    break;
            }
        }
    }
}
