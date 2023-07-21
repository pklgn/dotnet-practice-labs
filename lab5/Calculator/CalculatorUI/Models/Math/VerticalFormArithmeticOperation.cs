// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using CalculatorUI.Models.Common;

namespace CalculatorUI.Models.Math
{
    public class VerticalFormArithmeticOperation : ArithmeticOperation
    {
        public const int EMPTY_CELL = -1;

        public List<int> LeftOperandDigits { get; private set; } = new();
        public List<int> RightOperandDigits { get; private set; } = new();
        public List<int> ResultDigits { get; private set; } = new();

        public List<List<int>> SubtotalsDigits { get; private set; } = new();
        public List<int> AuxiliaryDigits { get; private set; } = new();

        public bool NeedOperandsSwap { get; private set; } = false;

        public override void Execute()
        {
            base.Execute();

            List<int> leftOperandDigits = SplitIntoDigits(LeftOperand);
            List<int> rightOperandDigits = SplitIntoDigits(RightOperand);

            NeedOperandsSwap = leftOperandDigits.Count < rightOperandDigits.Count
                || Operator == OperatorType.Subtraction && LeftOperand < RightOperand;

            LeftOperandDigits = NeedOperandsSwap
                ? rightOperandDigits
                : leftOperandDigits;
            RightOperandDigits = NeedOperandsSwap
                ? leftOperandDigits
                : rightOperandDigits;
            ResultDigits = SplitIntoDigits(Result);

            switch (Operator)
            {
                case OperatorType.Addition:
                case OperatorType.Subtraction:
                    FillAuxiliaryDigits();
                    break;
                case OperatorType.Multiplication:
                    FillAuxiliaryDigits();
                    FillSubtotalsDigits();
                    break;
            }

        }

        public void PrependEmptyCells(int value = EMPTY_CELL)
        {
            int subtotalsMaxCount = SubtotalsDigits.Count > 0
                ? SubtotalsDigits.Last().Count
                : 0;
            int rowCount = new[] {
                LeftOperandDigits.Count,
                RightOperandDigits.Count,
                ResultDigits.Count,
                subtotalsMaxCount }.Max();

            for (int i = LeftOperandDigits.Count; i < rowCount; ++i)
            {
                LeftOperandDigits = LeftOperandDigits.Prepend(value).ToList();
            }
            for (int i = RightOperandDigits.Count; i < rowCount; ++i)
            {
                RightOperandDigits = RightOperandDigits.Prepend(value).ToList();
            }
            for (int i = ResultDigits.Count; i < rowCount; ++i)
            {
                ResultDigits = ResultDigits.Prepend(value).ToList();
            }
            for (int i = 0; i < SubtotalsDigits.Count; ++i)
            {
                for (int j = SubtotalsDigits[i].Count; j < rowCount; ++j)
                {
                    SubtotalsDigits[i] = SubtotalsDigits[i].Prepend(value).ToList();
                }
            }
        }

        protected static List<int> SplitIntoDigits(int number)
        {
            List<int> digits = new List<int>();

            if (number == 0)
            {
                digits.Add(0);

                return digits;
            }

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

        private void FillAuxiliaryDigits()
        {
            List<int> leftOperandDigits = new(LeftOperandDigits);
            List<int> rightOperandDigits = new(RightOperandDigits);

            leftOperandDigits.Reverse();
            rightOperandDigits.Reverse();

            AuxiliaryDigits.Resize(
                new[] {
                    LeftOperandDigits.Count,
                    RightOperandDigits.Count,
                    ResultDigits.Count }.Max(),
                0
                );

            switch (Operator)
            {
                case OperatorType.Addition:
                    for (int i = 0; i < rightOperandDigits.Count; ++i)
                    {
                        if (leftOperandDigits[i] + rightOperandDigits[i] + AuxiliaryDigits[i] > 10)
                        {
                            AuxiliaryDigits[i + 1] += 1;
                        }
                    }
                    break;
                case OperatorType.Subtraction:
                    for (int i = 0; i < rightOperandDigits.Count; ++i)
                    {
                        if (leftOperandDigits[i] - rightOperandDigits[i] + AuxiliaryDigits[i] < 0)
                        {
                            AuxiliaryDigits[i] += 10;
                            AuxiliaryDigits[i + 1] += -1;
                        }
                    }
                    break;
            }

            AuxiliaryDigits.Reverse();
        }

        private void FillSubtotalsDigits()
        {
            List<int> leftOperandDigits = new(LeftOperandDigits);
            List<int> rightOperandDigits = new(RightOperandDigits);

            leftOperandDigits.Reverse();
            rightOperandDigits.Reverse();

            int leftOperand = NeedOperandsSwap
                ? RightOperand
                : LeftOperand;

            for (int i = 0; i < rightOperandDigits.Count; ++i)
            {
                var digits = SplitIntoDigits(rightOperandDigits[i] * leftOperand);
                for (int j = 0; j < i; ++j)
                {
                    digits.Add(EMPTY_CELL);
                }
                SubtotalsDigits.Add(digits);
            }
        }
    }
}
