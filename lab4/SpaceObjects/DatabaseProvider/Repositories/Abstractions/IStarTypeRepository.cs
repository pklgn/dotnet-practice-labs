using Core.Models;

namespace DatabaseProvider.Repositories.Abstractions;

public interface IStarTypeRepository : IRepository<StarType>
{
    public List<StarType> GetAll();
    public StarType GetById(int id);
}
