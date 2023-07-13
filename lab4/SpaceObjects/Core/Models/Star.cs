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
        return
$@"Star {Name}
    Diameter: {Diameter}
    Mass: {Mass}
    Magnitude: {Magnitude}
    Temperature: {Temperature}
    Discovery date: {DiscoveryDate}
Star Type: {StarTypeId}
";
    }
}
