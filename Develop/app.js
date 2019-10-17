const inquirer = require('inquirer');
const open = require('open');
const path = require('path');
const fs = require('fs');
const { Manager, Employee, Intern, Engineer } = require('./lib');
const generateHTML = require('./GenerateHTML');

const idArray = [];
const empArray = [];

const new_questions = {
    makeTeamQuestion: [{
        type: "list",
        choices: ["Engineer", "Intern", "finished creating team!"],
        name: "role",
        message: "What is the role of the team member you would like to add?"
    }],
    makeManager: [
        {
            name: "name",
            type: "input",
            message: "What is the name of your manager?",
            // validate: function (val) {
            //     return val.length > 0
            // }
        },
        {
            name: "id",
            type: "input",
            message: "What unique Id would you like?",
            // validate: function (val) {
            //     return !idArray.includes(val)
            // }
        },
        {
            name: "email",
            type: "input",
            message: "What Email would you like?",
            // validate: function (val) {
            //     // return val.includes("@")
            // }
        },
        {
            name: "officeNumber",
            type: "input",
            message: "What is their office number?",
            // validate: function (val) {
            //     // return !isNaN(val)
            // }
        },
    ],

    makeEngineer: [
        {
            name: "name",
            type: "input",
            message: "What is their name?",
            // validate: function (val) {
            //     return val.length > 0
            // }
        },
        {
            name: "id",
            type: "input",
            message: "What unique Id would you like?",
            // validate: function (val) {
            //     return !idArray.includes(val)
            // }
        },
        {
            name: "email",
            type: "input",
            message: "What is their email?",
            // validate: function (val) {
            //     // return val.includes("@")
            // }
        },
        {
            name: "GitHubprofile",
            type: "input",
            message: "What is the link to their Github profile?",
            // validate: function (val) {
            //     // return val.includes("git")
            // }
        },
    ],

    makeIntern: [
        {
            name: "name",
            type: "input",
            message: "What is their name?",
            // validate: function (val) {
            //     return val.length > 0
            // }
        },
        {
            name: "id",
            type: "input",
            message: "What unique Id would you like?",
            // validate: function (val) {
            //     return !idArray.includes(val)
            // }
        },
        {
            name: "email",
            type: "input",
            message: "What is their email?",
            // validate: function (val) {
            //     return val.includes("@")
            // }
        },
        {
            name: "school",
            type: "input",
            message: "What is the name of the school of the team member?",
            // validate: function (val) {
            //     return val.length > 0
            // }
        },
    ]
}

async function createManager() {
    try {
        let { name, id, email, officeNumber } = await inquirer.prompt(new_questions["makeManager"]);
        empArray.push(new Manager(name, id, email, officeNumber));
        // console.log(empArray)
        let rval = await buildTeam();
        // console.log('saving', empArray)
        return rval;
    } catch (error) {
        console.log(error)
    }

}


async function buildTeam() {
    return new Promise(async (resolve, reject) => {
        try {
            const { role } = await inquirer.prompt(new_questions["makeTeamQuestion"]);
            switch (role) {
                case 'Intern': {
                    let { name, id, email, school } = await createIntern();
                    empArray.push(new Intern(name, id, email, school));
                    // console.log(empArray);
                    await buildTeam();
                    resolve()
                }
                    break;

                case 'Engineer': {
                    let { name, id, email, GitHubprofile } = await createEngineer();
                    empArray.push(new Engineer(name, id, email, GitHubprofile));
                    // console.log(empArray);
                    await buildTeam();
                    resolve()
                }
                    break;

                case 'finished creating team!':
                    // console.log(empArray);
                    resolve();

                    break;
                default:
                    console.log("ERR")
            }

        } catch (error) {
            console.log(error)
        }
    })
}


async function createIntern() {
    try {
        return inquirer.prompt(new_questions["makeIntern"]);
    } catch (error) {
        console.log(error)
    }
}

async function createEngineer() {
    try {
        return inquirer.prompt(new_questions["makeEngineer"]);
    } catch (error) {
        console.log(error)
    }
}


async function initAsync() {
    try {
        await createManager();
        const html = await generateHTML(empArray);

        function writeToFile(empArray) {
            fs.writeFile('index.html', html, function (err) {
                if (err) throw err;
                console.log(empArray);
            });
        }

        writeToFile(html);
        console.log(html)
    } catch (error) {
        console.log(error)
    }
};

initAsync();







