using System.Text;

namespace Core.Models;

public class Planet
{
    public int Id { get; set; }
    public string Name { get; set; }

    public int PlanetTypeId { get; set; }
    public PlanetType PlanetType { get; set; }
    public int StarId { get; set; }
    public Star Star { get; set; }

    public float Diameter { get; set; }
    public float Mass { get; set; }

    public float SurfaceTemperature { get; set; }
    public DateTime DiscoveryDate { get; set; }

    public override string ToString()
    {
        StringBuilder sb = new StringBuilder();
        sb.AppendFormat("Planet {0}\n", Name);
        sb.AppendFormat("    Diameter: {0}\n", Diameter);
        sb.AppendFormat("    Mass: {0}\n", Mass);
        sb.AppendFormat("    Surface temperature: {0}\n", SurfaceTemperature);
        sb.AppendFormat("    Discovery date: {0}\n", DiscoveryDate);
        sb.AppendFormat("Planet Type: {0}\n", PlanetTypeId);
        sb.AppendFormat("Orbits star: {0}\n", StarId);

        return sb.ToString();
    }
}
