using Core.Models;
using DatabaseProvider.Repositories.Abstractions;

namespace DatabaseProvider.Repositories.Implementations;

public class StarRepository : Repository<Star>, IStarRepository
{
    public StarRepository(ApplicationContext context)
        : base(context)
    {
    }

    public List<Star> GetAll()
    {
        return Entities.ToList();
    }

    public Star GetById(int id)
    {
        return Entities.Where(a => a.Id == id).FirstOrDefault();
    }

    public List<Star> GetByStarTypeId(int id)
    {
        return Entities.Where(a => a.StarTypeId == id).ToList();
    }
}
