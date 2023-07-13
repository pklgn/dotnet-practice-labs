using Core.Models;

namespace DatabaseProvider.Repositories.Abstractions;

public interface IStarHasAbsoluteMagnitudeRepository : IRepository<StarHasAbsoluteMagnitude>
{
    public List<StarHasAbsoluteMagnitude> GetAll();
    public StarHasAbsoluteMagnitude GetById(int id);

    public List<StarHasAbsoluteMagnitude> GetByStarId(int id);
}
