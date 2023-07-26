// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using System.Text;

Person RunPersonDialog(TextReader input, TextWriter output)
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

    return new Person(name, age, email, github);
}

Person person = RunPersonDialog(Console.In, Console.Out);
Console.WriteLine(person.GetFormattedInfo());

internal class Person
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
        StringBuilder sb = new StringBuilder();
        sb.AppendFormat("[name]: {0}\n", _name);
        sb.AppendFormat("[age]:  {0}\n", _age);
        sb.AppendLine("[contact info]:");
        sb.AppendFormat("    [email]:  {0}\n", _email);
        sb.AppendFormat("    [github]: {0}\n", _github);

        return sb.ToString();
    }
}

