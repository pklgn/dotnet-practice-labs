void RunPersonDialog(TextReader input, TextWriter output, out Person person)
{
    output.WriteLine("Enter person info, please:");
    output.Write("Name: ");
    string? name = input.ReadLine();
    if (name == null)
    {
        name = "*No name was provided*";
    }

    output.Write("Age: ");
    int.TryParse(input.ReadLine(), out int age);

    output.Write("Email: ");
    string? email = input.ReadLine();
    if (email == null)
    {
        email = "*No email was provided*";
    }

    output.Write("Github: ");
    string? github = input.ReadLine();
    if (github == null)
    {
        github = "*No github was provided*";
    }

    person = new Person(name, age, email, github);
}

RunPersonDialog(Console.In, Console.Out, out Person person);
Console.WriteLine(person.GetFormattedInfo());

class Person
{
    string _name;
    int _age;
    string _email;
    string _github;

    public Person(string name, int age, string email, string github)
    {
        _name = name;
        _age = age;
        _email = email;
        _github = github;
    }

    public string GetFormattedInfo()
    {
        return
$@"[name]: {_name}
[age]:  {_age}
[contact info]:
    [email]:  {_email}
    [github]: {_github}";
    }
}

