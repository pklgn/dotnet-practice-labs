using Core.Models;

namespace DatabaseProvider.Repositories.Abstractions;

public interface IStarRepository : IRepository<Star>
{
    public List<Star> GetAll();
    public Star GetById(int id);

    public List<Star> GetByStarTypeId(int id);
}
