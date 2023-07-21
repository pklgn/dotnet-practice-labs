using CalculatorUI.Models.Math;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CalculatorUI.Pages
{
    public class CalculatorModel : PageModel
    {
        [BindProperty]
        public VerticalFormArithmeticOperation? Operation { get; set; }

        public void OnGet()
        {
        }

        public IActionResult OnPost()
        {
            try
            {
                Operation!.Execute();
                Operation!.PrependEmptyCells();
            }
            catch (Exception)
            {
                // TODO: maintain detailed exception page
                return RedirectToPage("/Error");
            }

            return Page();
        }
    }
}
