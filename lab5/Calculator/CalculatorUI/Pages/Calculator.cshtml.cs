using CalculatorUI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CalculatorUI.Pages
{
    public class CalculatorModel : PageModel
    {
        [BindProperty]
        public ArithmeticOperation? ArithmeticOperation { get; set; }

        [BindProperty]
        public List<int> LeftOperandDigits { get; set; } = new();

        public List<int> RightOperandDigits { get; set; } = new();
        public List<int> ResultDigits { get; set; } = new();

        public bool NeedOperandsSwap { get; set; } = false;

        public void OnGet()
        {
        }

        public IActionResult OnPost()
        {
            ArithmeticOperation!.ExecuteOperation();
            NeedOperandsSwap = (ArithmeticOperation.LeftOperand < ArithmeticOperation.RightOperand);
            LeftOperandDigits = NeedOperandsSwap
                ? SplitDigits(ArithmeticOperation.RightOperand)
                : SplitDigits(ArithmeticOperation.LeftOperand);
            RightOperandDigits = NeedOperandsSwap
                ? SplitDigits(ArithmeticOperation.LeftOperand)
                : SplitDigits(ArithmeticOperation.RightOperand);
            ResultDigits = SplitDigits(ArithmeticOperation.Result);

            return Page();
        }

        private static List<int> SplitDigits(int number)
        {
            List<int> digits = new List<int>();

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
