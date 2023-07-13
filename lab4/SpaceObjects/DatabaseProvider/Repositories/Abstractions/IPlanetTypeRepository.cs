using Core.Models;

namespace DatabaseProvider.Repositories.Abstractions;

public interface IPlanetTypeRepository : IRepository<PlanetType>
{
    public List<PlanetType> GetAll();
    public PlanetType GetById(int id);
}
