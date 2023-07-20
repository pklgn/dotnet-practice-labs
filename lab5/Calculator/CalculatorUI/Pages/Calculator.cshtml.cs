using System;
using CalculatorUI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CalculatorUI.Pages
{
    public class CalculatorModel : PageModel
    {
        [BindProperty]
        public ArithmeticOperation? ArithmeticOperation { get; set; }

        public List<int> LeftOperandDigits { get; set; } = new();
        public List<int> RightOperandDigits { get; set; } = new();
        public List<int> ResultDigits { get; set; } = new();

        public List<int> AuxiliaryDigits { get; set; } = new();

        public bool NeedOperandsSwap { get; set; } = false;

        public void OnGet()
        {
        }

        public IActionResult OnPost()
        {
            ArithmeticOperation!.ExecuteOperation();

            List<int> leftOperandSplitted = SplitDigits(ArithmeticOperation.LeftOperand);
            List<int> rightOperandSplitted = SplitDigits(ArithmeticOperation.RightOperand);

            NeedOperandsSwap = (leftOperandSplitted.Count < rightOperandSplitted.Count);

            LeftOperandDigits = NeedOperandsSwap
                ? rightOperandSplitted
                : leftOperandSplitted;
            RightOperandDigits = NeedOperandsSwap
                ? leftOperandSplitted
                : rightOperandSplitted;
            ResultDigits = SplitDigits(ArithmeticOperation.Result);

            List<int> leftOperandSplittedCopy = new(leftOperandSplitted);
            leftOperandSplittedCopy.Reverse();
            List<int> rightOperandSplittedCopy = new(rightOperandSplitted);
            rightOperandSplittedCopy.Reverse();
            if (NeedOperandsSwap)
            {
                AuxiliaryDigits = new(rightOperandSplittedCopy);
                for (int i = 0; i < AuxiliaryDigits.Count; i++)
                {
                    AuxiliaryDigits[i] = 0;
                }

                if (ArithmeticOperation.OperatorSymbol == "+")
                {
                    for (int i = 0; i < leftOperandSplitted.Count; ++i)
                    {
                        if (leftOperandSplitted[i] + rightOperandSplitted[i] > 10)
                        {
                            AuxiliaryDigits[i + 1] = 1;
                        }
                    }
                }
                else if (ArithmeticOperation.OperatorSymbol == "-")
                {
                    for (int i = 0; i < leftOperandSplittedCopy.Count; ++i)
                    {
                        if (rightOperandSplittedCopy[i] - leftOperandSplittedCopy[i] < 0)
                        {
                            AuxiliaryDigits[i] = 10;
                            AuxiliaryDigits[i + 1] = -1;
                        }
                    }
                }
            }
            else
            {
                // TODO: подумать, как избавиться от этого дублирующегося кода
                AuxiliaryDigits = new(leftOperandSplitted);
                for (int i = 0; i < AuxiliaryDigits.Count; i++)
                {
                    AuxiliaryDigits[i] = 0;
                }

                if (ArithmeticOperation.OperatorSymbol == "+")
                {
                    for (int i = 0; i < rightOperandSplitted.Count; ++i)
                    {
                        if (leftOperandSplittedCopy[i] + rightOperandSplittedCopy[i] >= 10)
                        {
                            AuxiliaryDigits[i + 1] = 1;
                        }
                    }
                }
                else if (ArithmeticOperation.OperatorSymbol == "-")
                {
                    for (int i = 0; i < rightOperandSplittedCopy.Count; ++i)
                    {
                        if (leftOperandSplittedCopy[i] - rightOperandSplittedCopy[i] < 0)
                        {
                            AuxiliaryDigits[i] = 10;
                            AuxiliaryDigits[i + 1] = -1;
                        }
                    }
                }
            }
            AuxiliaryDigits.Reverse();


            return Page();
        }

        private static List<int> SplitDigits(int number)
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
    }
}
