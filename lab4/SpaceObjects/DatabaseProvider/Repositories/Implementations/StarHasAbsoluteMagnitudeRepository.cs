using Core.Models;
using DatabaseProvider.Repositories.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace DatabaseProvider.Repositories.Implementations;

public class StarHasAbsoluteMagnitudeRepository : Repository<StarHasAbsoluteMagnitude>, IStarHasAbsoluteMagnitudeRepository
{
    public StarHasAbsoluteMagnitudeRepository(ApplicationContext context)
        : base(context)
    {
    }

    public List<StarHasAbsoluteMagnitude> GetAll()
    {
        return Entities.ToList();
    }

    public StarHasAbsoluteMagnitude GetById(int id)
    {
        return Entities.Where(s => s.Id == id).FirstOrDefault();
    }

    public List<StarHasAbsoluteMagnitude> GetByStarId(int id)
    {
        return Entities.Include(s => s.Star).Where(s => s.Id == id).ToList();
    }
}
