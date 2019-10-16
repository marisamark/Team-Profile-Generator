const inquirer = require('inquirer');
const open = require('open');
const path = require('path');
const fs = require('fs');
const { Manager, Employee, Intern, CreateHTML } = require('./lib');
const generateHTML = require('./generateHTML');

const idArray = [];
const empArray = [];

const new_questions = {
    makeTeamQuestion: {
        type: "list",
        choices: ["engineer", "intern", "manager", "finished creating team!"],
        name: "role",
        message: "What is the role of the team member?"
    },
    makeManager: [
        {
            name: "name",
            type: "input",
            message: "What Name would you like?",
            validate: function (val) {
                return val.length > 0
            }
        },
        {
            name: "id",
            type: "input",
            message: "What unique Id would you like?",
            validate: function (val) {
                return !idArray.includes(val)
            }
        },
        {
            name: "email",
            type: "input",
            message: "What Email would you like?",
            validate: function (val) {
                return val.includes("@")
            }
        },
        {
            name: "officeNumber",
            type: "input",
            message: "What Office would you like?",
            validate: function (val) {
                return !isNaN(val)
            }
        },
    ],

    makeEngineer: [
        {
            name: "name",
            type: "input",
            message: "What Name would you like?",
            validate: function (val) {
                return val.length > 0
            }
        },
        {
            name: "id",
            type: "input",
            message: "What unique Id would you like?",
            validate: function (val) {
                return !idArray.includes(val)
            }
        },
        {
            name: "email",
            type: "input",
            message: "What Email would you like?",
            validate: function (val) {
                return val.includes("@")
            }
        },
        {
            name: "GitHubprofile",
            type: "input",
            message: "What is the link to their Github profile?",
            validate: function (val) {
                return val.includes("git")
            }
        },
    ],
    
    makeIntern: [
        {
            name: "name",
            type: "input",
            message: "What Name would you like?",
            validate: function (val) {
                return val.length > 0
            }
        },
        {
            name: "id",
            type: "input",
            message: "What unique Id would you like?",
            validate: function (val) {
                return !idArray.includes(val)
            }
        },
        {
            name: "email",
            type: "input",
            message: "What Email would you like?",
            validate: function (val) {
                return val.includes("@")
            }
        },
        {
            name: "school",
            type: "input",
            message: "What is the name of the school of the team member?",
            validate: function (val) {
                return val.length > 0
            }
        },
    ]
}


async function initAsync() {
    try {
        let data = {};
        const {role, name, id, email, officeNumber, GitHubprofile, school} = await inquirer.prompt(new_questions);
        data.role = role;
        data.name = name;
        data.id= id;
        data.email = email;
        data.officeNumber = officeNumber;
        data.GitHubprofile = GitHubprofile;
        data.school = school;

        const html = generateHTML(data);

        function writeToFile(data) {
            fs.writeFile('index.html', html, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        }

        writeToFile(html);
        console.log(html)
    } catch (error) {
        console.log(error)
    }
};

initAsync();
Start();
async function Start() {
    try {
        const { role } = await inquirer.prompt(new_questions["makeTeamQuestion"]);
        switch (role) {
            case 'manager':
                return createManager();
            case 'intern':
                return createIntern();
            case 'engineer':
                return createEngineer();
            case 'finished creating team!':
                return createHTMLOutput();
            default:
                console.log("ERR")
        }

    } catch (error) {
        console.log(error)
    }
}
async function createManager() {
    try {
        const { name, id, email, officeNumber } = await inquirer.prompt(new_questions["makeManager"]);
        empArray.push(new Manager(name, id, email, officeNumber));

        // Start()
    } catch (error) {
        console.log(error)
    }
}

async function createEngineer() {
    try {
        const { name, id, email, GitHubprofile } = await inquirer.prompt(new_questions["makeEngineer"]);
        empArray.push(new Engineer(name, id, email, GitHubprofile));

        // Start()
    } catch (error) {
        console.log(error)
    }
}

async function createIntern() {
    try {
        const { name, id, email, school } = await inquirer.prompt(new_questions["makeIntern"]);
        empArray.push(new Intern(name, id, email, school));

        // Start()
    } catch (error) {
        console.log(error)
    }
}

//do i still need this
async function createHTMLOutput(){
    try {
        const html = await CreateHTML(empArray);
        console.log(html)
    } catch (error) {
        console.log(error)
    }
}