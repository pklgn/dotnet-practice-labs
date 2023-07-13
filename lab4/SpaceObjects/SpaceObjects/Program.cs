using Core.Models;
using DatabaseProvider;
using DatabaseProvider.Repositories.Abstractions;
using DatabaseProvider.Repositories.Implementations;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BookShop
{
    public class Program
    {
        private const string ConnectionString =
            "Data Source=LAPTOP-TTKQ5B2C\\SQLEXPRESS;Initial Catalog=SpaceObjectsDb;Pooling=true;Integrated Security=SSPI;Encrypt=True;TrustServerCertificate=True";

        private static ApplicationContext _applicationContext;
        private static IPlanetRepository _planetRepository;
        private static IPlanetTypeRepository _planetTypeRepository;
        private static IStarHasAbsoluteMagnitudeRepository _absoluteMagnitudeRepository;
        private static IStarRepository _starRepository;
        private static IStarTypeRepository _starTypeRepository;

        public static void Main(string[] args)
        {
            _applicationContext = new ApplicationContext(ConnectionString);
            _planetRepository = new PlanetRepository(_applicationContext);
            _planetTypeRepository = new PlanetTypeRepository(_applicationContext);
            _absoluteMagnitudeRepository = new StarHasAbsoluteMagnitudeRepository(_applicationContext);
            _starRepository = new StarRepository(_applicationContext);
            _starTypeRepository = new StarTypeRepository(_applicationContext);

            ProcessCommands();
        }

        public static void ProcessCommands()
        {
            while (true)
            {
                Console.Write("Enter command: ");
                string[] commandLine = Console.ReadLine().Split(' ');
                string command = commandLine[0];
                List<string> parameters = commandLine.Skip(1).ToList();
                switch (command)
                {
                    case "exit":
                        return;
                    case "add-star":
                        AddStar(parameters);
                        break;
                    case "add-planet":
                        AddPlanet(parameters);
                        break;
                    case "delete-star":
                        DeleteStar(parameters);
                        break;
                    case "delete-planet":
                        DeletePlanet(parameters);
                        break;
                    case "list-planets":
                        ListPlanets();
                        break;
                    case "list-planets-by-star":
                        ListPlanetsByStar(parameters);
                        break;
                    case "list-stars":
                        ListStars();
                        break;
                }
            }
        }

        public static void AddStar(List<string> parameters)
        {
            Star star = new Star
            {
                Name = parameters[0],
                StarTypeId = int.Parse(parameters[1]),
                Diameter = float.Parse(parameters[2]),
                Mass = float.Parse(parameters[3]),
                Magnitude = float.Parse(parameters[4]),
                Temperature = float.Parse(parameters[5]),
                DiscoveryDate = DateTime.Parse(parameters[6])
            };
            _starRepository.Add(star);
            _starRepository.SaveChanges();
        }

        public static void AddPlanet(List<string> parameters)
        {
            Planet planet = new Planet
            {
                Name = parameters[0],
                PlanetTypeId = int.Parse(parameters[1]),
                StarId = int.Parse(parameters[2]),
                Diameter = float.Parse(parameters[3]),
                Mass = float.Parse(parameters[4]),
                SurfaceTemperature = float.Parse(parameters[5]),
                DiscoveryDate = DateTime.Parse(parameters[6])
            };
            _planetRepository.Add(planet);
            _planetRepository.SaveChanges();
        }

        public static void DeleteStar(List<string> parameters)
        {
            int starId = int.Parse(parameters[0]);
            Star star = _starRepository.GetById(starId);
            _starRepository.Remove(star);
            _starRepository.SaveChanges();
        }

        public static void DeletePlanet(List<string> parameters)
        {
            int planetId = int.Parse(parameters[0]);
            Planet planet = _planetRepository.GetById(planetId);
            _planetRepository.Remove(planet);
            _planetRepository.SaveChanges();
        }

        public static void ListPlanets()
        {
            foreach (Planet planet in _planetRepository.GetAll())
            {
                Console.WriteLine(planet);
            }
        }

        public static void ListPlanetsByStar(List<string> parameters)
        {
            int starId = int.Parse(parameters[0]);
            foreach (Planet planet in _planetRepository.GetByStarId(starId))
            {
                Console.WriteLine(planet);
            }
        }

        public static void ListStars()
        {
            foreach (Star star in _starRepository.GetAll())
            {
                Console.WriteLine(star);
            }
        }
    }
}
