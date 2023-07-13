namespace Core.Models;

public class PlanetType
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public List<Planet> Planets { get; set; }

    public override string ToString()
    {
        return $"{Name} - {Description}";
    }
}
