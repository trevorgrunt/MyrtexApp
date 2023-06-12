namespace MyrtexApp.Models
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Surname { get; set; }
        public int Salary { get; set; }
        public string Department { get; set; }
        public string DateOfBirth { get; set; }
        public string DateOfHire { get; set; }
    }
}
