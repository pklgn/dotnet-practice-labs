using Core.Models;

namespace DatabaseProvider.Repositories.Abstractions;

public interface IPlanetRepository : IRepository<Planet>
{
    public List<Planet> GetAll();
    public Planet GetById(int id);

    public List<Planet> GetByStarId(int id);
    public List<Planet> GetByPlanetTypeId(int id);
}
