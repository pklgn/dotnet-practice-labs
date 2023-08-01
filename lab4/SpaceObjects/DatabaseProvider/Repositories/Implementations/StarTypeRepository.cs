using Core.Models;
using DatabaseProvider.Repositories.Abstractions;

namespace DatabaseProvider.Repositories.Implementations;

public class StarTypeRepository : Repository<StarType>, IStarTypeRepository
{
    public StarTypeRepository(ApplicationContext context)
        : base(context)
    {
    }

    public List<StarType> GetAll()
    {
        return Entities.ToList();
    }

    public StarType GetById(int id)
    {
        return Entities.Where(s => s.Id == id).FirstOrDefault();
    }
}
