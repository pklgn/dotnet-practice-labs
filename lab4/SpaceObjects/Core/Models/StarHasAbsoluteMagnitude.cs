using System.Xml.Linq;

namespace Core.Models;

public class StarHasAbsoluteMagnitude
{
    public int Id { get; set; }

    public int StarId { get; set; }
    public Star Star { get; set; }

    public float AbsoluteMagnitude { get; set; }

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public override string ToString()
    {
        string result = "Star";
        if (Star == null)
        {
            result += $" {StarId}";
        }
        else
        {
            result += $" {Star.Name}";
        }
        return result += $" has {AbsoluteMagnitude} from {StartDate} to {EndDate}";
    }
}
