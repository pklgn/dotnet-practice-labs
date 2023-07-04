void RunPersonDialog(TextReader input, TextWriter output, out Person person)
{
    void ReadLine(out string data)
    {
        string? rawData = input.ReadLine();
        if (rawData == null)
        {
            rawData = "*No data was provided*";
        }

        data = rawData;
    }

    output.WriteLine("Enter person info, please:");
    output.Write("Name: ");
    ReadLine(out string name);

    output.Write("Age: ");
    int.TryParse(input.ReadLine(), out int age);

    output.Write("Email: ");
    ReadLine(out string email);

    output.Write("Github: ");
    ReadLine(out string github);

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

