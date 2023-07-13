using Core.Models;
using DatabaseProvider.Repositories.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace DatabaseProvider.Repositories.Implementations;

public class PlanetRepository : Repository<Planet>, IPlanetRepository
{
    public PlanetRepository(ApplicationContext context)
        : base(context)
    {
    }

    public List<Planet> GetAll()
    {
        return Entities.Include(p => p.Star).ToList();
    }

    public Planet GetById(int id)
    {
        return Entities.Where(p => p.Id == id).FirstOrDefault();
    }

    public List<Planet> GetByPlanetTypeId(int id)
    {
        return Entities.Where(p => p.PlanetTypeId == id).ToList();
    }

    public List<Planet> GetByStarId(int id)
    {
        return Entities.Where(s => s.StarId == id).ToList();
    }
}
