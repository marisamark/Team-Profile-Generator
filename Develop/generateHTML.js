
function getContent(empArray) {
    console.log(empArray)
    return `<div> ${createCard(empArray)}</div>`;
}


function createCard(empArray) {

    return empArray.map(employee => {
        return `
            <div class="card bg-success text-white mr-3 ml-3 mt-3 mb-3" style="width: 18rem;">
            <div class="card-header text-center">${employee.getRole()}</div>
            <div class="card-header text-center">${employee.name}</div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item text-monospace text-center text-success">
                    ${employee.id}</li>
                <li class="list-group-item text-monospace text-center text-success">
                    ${employee.email}</li>
                

            </ul>

        </div>`;

    });

}
console.log(createCardlowerdiv())
function createCardlowerdiv(employee){
    try {
        switch (employee.getRole()) {
            case 'Manager': {
                `<li class="list-group-item text-monospace text-center text-success">
                ${employee.officeNumber}</li>`}
            case 'Intern': {
                `<li class="list-group-item text-monospace text-center text-success">
                ${employee.school}</li>`}
            case 'Engineer': {
                `<li class="list-group-item text-monospace text-center text-success">
                ${employee.GitHubprofile}</li>`}

        }
    } catch (error) {
    console.log(error)
}
}


async function generateHTML(empArray) {
    try {
        return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Document</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <style>
        </style>
    
    </head>
    
    <body>
    <div class="jumbotron jumbotron-fluid bg-success text-white">
    <div class="container">
      <h1 class="display-4 text-center font-weight-bold text-monospace">My team</h1>

    </div>
  </div>

    <div> 
    ${getContent(empArray)}
    </div>
   
    </body>
    </html>`

    } catch (err) {

    }
}





module.exports = generateHTML
