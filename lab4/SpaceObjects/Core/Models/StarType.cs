namespace Core.Models;

public class StarType
{
    public int Id { get; set; }
    public string Name { get; set; }

    public List<Star> Stars { get; set; }

    public override string ToString()
    {
        return Name;
    }
}
