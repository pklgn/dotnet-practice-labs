using System.Text;

namespace Core.Models;

public class Star
{
    public int Id { get; set; }
    public string Name { get; set; }

    public int StarTypeId { get; set; }
    public StarType StarType { get; set; }

    public float Diameter { get; set; }
    public float Mass { get; set; }

    public float Magnitude { get; set; }
    public float Temperature { get; set; }

    public DateTime DiscoveryDate { get; set; }

    public List<Planet> Planets { get; set; }
    public List<StarHasAbsoluteMagnitude> AbsoluteMagnitudes { get; set; }

    public override string ToString()
    {
        StringBuilder sb = new StringBuilder();
        sb.AppendFormat("Star {0}\n", Name);
        sb.AppendFormat("    Diameter: {0}\n", Diameter);
        sb.AppendFormat("    Mass: {0}\n", Mass);
        sb.AppendFormat("    Magnitude: {0}\n", Magnitude);
        sb.AppendFormat("    Temperature: {0}\n", Temperature);
        sb.AppendFormat("    Discovery date: {0}\n", DiscoveryDate);
        sb.AppendFormat("Star Type: {0}\n", StarTypeId);

        return sb.ToString();
    }
}
