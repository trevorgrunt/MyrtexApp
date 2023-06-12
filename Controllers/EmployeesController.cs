using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyrtexApp.Data;
using MyrtexApp.Models;
using System.Numerics;

namespace MyrtexApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeDbContext employeeDbContext;

        public EmployeesController(EmployeeDbContext employeeDbContext)
        {
            this.employeeDbContext = employeeDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var Employees = await this.employeeDbContext.Employees.ToListAsync();
            return Ok(Employees);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var result = await this.employeeDbContext.Employees.FindAsync(id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee EmployeeRequest)
        {
            EmployeeRequest.Id = Guid.NewGuid();
            await this.employeeDbContext.Employees.AddAsync(EmployeeRequest);
            await this.employeeDbContext.SaveChangesAsync();

            return Ok(EmployeeRequest);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id, Employee updateEmployeeRequest)
        {
            var employee = await this.employeeDbContext.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            employee.FirstName = updateEmployeeRequest.FirstName;
            employee.SecondName = updateEmployeeRequest.SecondName;
            employee.Surname = updateEmployeeRequest.Surname;
            employee.Salary = updateEmployeeRequest.Salary;
            employee.Department = updateEmployeeRequest.Department;
            employee.DateOfBirth = updateEmployeeRequest.DateOfBirth;
            employee.DateOfHire = updateEmployeeRequest.DateOfHire;

            await this.employeeDbContext.SaveChangesAsync();

            return Ok(employee);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id)
        {
            var employee = await this.employeeDbContext.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            this.employeeDbContext.Employees.Remove(employee);
            await this.employeeDbContext.SaveChangesAsync();

            return Ok(employee);
        }
    }
}
