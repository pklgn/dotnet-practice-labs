using Core.Models;
using DatabaseProvider.Repositories.Abstractions;

namespace DatabaseProvider.Repositories.Implementations;

public class PlanetTypeRepository : Repository<PlanetType>, IPlanetTypeRepository
{
    public PlanetTypeRepository(ApplicationContext context)
        : base(context)
    {
    }

    public List<PlanetType> GetAll()
    {
        return Entities.ToList();
    }

    public PlanetType GetById(int id)
    {
        return Entities.Where(pt => pt.Id == id).FirstOrDefault();
    }
}
