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
            ArithmeticOperation!.Execute();

            List<int> leftOperandSplitted = SplitDigits(ArithmeticOperation.LeftOperand);
            List<int> rightOperandSplitted = SplitDigits(ArithmeticOperation.RightOperand);

            NeedOperandsSwap = (leftOperandSplitted.Count < rightOperandSplitted.Count)
                || (ArithmeticOperation!.Operator == ArithmeticOperation.OperatorType.Subtraction && ArithmeticOperation.LeftOperand < ArithmeticOperation.RightOperand);

            LeftOperandDigits = NeedOperandsSwap
                ? rightOperandSplitted
                : leftOperandSplitted;
            RightOperandDigits = NeedOperandsSwap
                ? leftOperandSplitted
                : rightOperandSplitted;
            ResultDigits = SplitDigits(ArithmeticOperation.Result);

            CalculateAuxiliaryDigits();

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

        private void CalculateAuxiliaryDigits()
        {
            List<int> leftOperandSplitted = new(LeftOperandDigits);
            List<int> rightOperandSplitted = new(RightOperandDigits);
            
            leftOperandSplitted.Reverse();
            rightOperandSplitted.Reverse();

            ResizeAuxiliaryDigits(leftOperandSplitted.Count);

            switch (ArithmeticOperation!.Operator)
            {
                case ArithmeticOperation.OperatorType.Addition:
                    for (int i = 0; i < rightOperandSplitted.Count; ++i)
                    {
                        if (leftOperandSplitted[i] + rightOperandSplitted[i] > 10)
                        {
                            AuxiliaryDigits[i + 1] += 1;
                        }
                    }
                    break;
                case ArithmeticOperation.OperatorType.Subtraction:
                    for (int i = 0; i < rightOperandSplitted.Count; ++i)
                    {
                        if (leftOperandSplitted[i] - rightOperandSplitted[i] < 0)
                        {
                            AuxiliaryDigits[i] += 10;
                            AuxiliaryDigits[i + 1] += -1;
                        }
                    }
                    break;
                case ArithmeticOperation.OperatorType.Division:
                    throw new NotImplementedException();
                case ArithmeticOperation.OperatorType.Multiplication:
                    throw new NotImplementedException();
                case ArithmeticOperation.OperatorType.Invalid:
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
            for (int i = 0; i < count; i++)
            {
                AuxiliaryDigits.Add(0);
            }
        }
    }
}
