// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using System.Collections.Generic;

namespace CalculatorUI.Models
{
    public class VerticalFormArithmeticOperation : ArithmeticOperation
    {
        public List<int> LeftOperandDigits { get; set; } = new();
        public List<int> RightOperandDigits { get; set; } = new();
        public List<int> ResultDigits { get; set; } = new();

        public List<int> AuxiliaryDigits { get; set; } = new();

        public bool NeedOperandsSwap { get; set; } = false;

        public override void Execute()
        {
            base.Execute();

            List<int> leftOperandDigits = SplitIntoDigits(LeftOperand);
            List<int> rightOperandDigits = SplitIntoDigits(RightOperand);

            NeedOperandsSwap = (leftOperandDigits.Count < rightOperandDigits.Count);

            LeftOperandDigits = NeedOperandsSwap
                ? rightOperandDigits
                : leftOperandDigits;
            RightOperandDigits = NeedOperandsSwap
                ? leftOperandDigits
                : rightOperandDigits;
            ResultDigits = SplitIntoDigits(Result);

            CalculateAuxiliaryDigits();
        }

        protected static List<int> SplitIntoDigits(int number)
        {
            List<int> digits = new List<int>();
            if (number < 0)
            {
                number = -number;
            }

            while (number > 0)
            {
                int digit = number % 10;
                digits.Add(digit);
                number /= 10;
            }

            digits.Reverse();

            return digits;
        }

        private void CalculateAuxiliaryDigits()
        {
            List<int> leftOperandDigits = new(LeftOperandDigits);
            List<int> rightOperandDigits = new(RightOperandDigits);

            leftOperandDigits.Reverse();
            rightOperandDigits.Reverse();

            ResizeAuxiliaryDigits(leftOperandDigits.Count);

            switch (Operator)
            {
                case OperatorType.Addition:
                    for (int i = 0; i < rightOperandDigits.Count; ++i)
                    {
                        if (leftOperandDigits[i] + rightOperandDigits[i] > 10)
                        {
                            AuxiliaryDigits[i + 1] += 1;
                        }
                    }
                    break;
                case OperatorType.Subtraction:
                    for (int i = 0; i < rightOperandDigits.Count; ++i)
                    {
                        if (leftOperandDigits[i] - rightOperandDigits[i] < 0)
                        {
                            AuxiliaryDigits[i] += 10;
                            AuxiliaryDigits[i + 1] += -1;
                        }
                    }
                    break;
                case OperatorType.Division:
                    throw new NotImplementedException();
                case OperatorType.Multiplication:
                    throw new NotImplementedException();
                case OperatorType.Invalid:
                    Console.Error.WriteLine("Attempt to perform an invalid operation.");
                    break;
                default:
                    Console.Error.WriteLine("Internal error while calculating auxiliary digits");
                    break;
            }

            AuxiliaryDigits.Reverse();
        }

        private void ResizeAuxiliaryDigits(int count)
        {
            int oldCount = AuxiliaryDigits.Count;
            if (count < oldCount)
                AuxiliaryDigits.RemoveRange(count, oldCount - count);
            else if (count > oldCount)
            {
                if (count > AuxiliaryDigits.Capacity)
                    AuxiliaryDigits.Capacity = count;
                AuxiliaryDigits.AddRange(Enumerable.Repeat(0, count - oldCount));
            }
        }
    }
}
