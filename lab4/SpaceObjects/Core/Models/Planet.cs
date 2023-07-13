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
        return
$@"Planet {Name}
    Diameter: {Diameter}
    Mass: {Mass}
    Surface temperature: {SurfaceTemperature}
    Discovery date: {DiscoveryDate}
Planet Type: {PlanetTypeId}
Orbits star: {StarId}
";
    }
}
