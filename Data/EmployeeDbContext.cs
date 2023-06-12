using Microsoft.EntityFrameworkCore;
using MyrtexApp.Models;

namespace MyrtexApp.Data
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Employee> Employees { get; set; }
    }
}
