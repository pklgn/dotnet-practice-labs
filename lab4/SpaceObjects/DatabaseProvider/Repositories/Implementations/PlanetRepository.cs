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

    public List<Planet> GetByAuthorId(int id)
    {
        return Entities.Include(p => p.Star).Where(p => p.StarId == id).ToList();
    }

    public Planet GetById(int id)
    {
        return Entities.Include(p => p.Star).Where(p => p.Id == id).FirstOrDefault();
    }

    public List<Planet> GetByPlanetTypeId(int id)
    {
        return Entities.Include(p => p.PlanetType).Where(pt => pt.Id == id).ToList();
    }

    public List<Planet> GetByStarId(int id)
    {
        return Entities.Include(p => p.Star).Where(s => s.Id == id).ToList();
    }
}
