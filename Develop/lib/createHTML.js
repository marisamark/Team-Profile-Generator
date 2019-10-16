const fs = require('fs');
const path = require('path')
const templatesDir = path.resolve(__dirname, "../templates");

const render = data => {
    const Managers = data.filter(emp => emp.getRole() === "Manager")
    const Employees = data.filter(emp => emp.getRole() === "Employees")
    const Interns = data.filter(emp => emp.getRole() === "Interns")

    return renderMain(data)
}

const renderMain = async html => {
    try {       
        //write file  or generate HTML? 
        const template = await fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
        return template;
    } catch (error) {
        console.log(error)
    }
}
module.exports = render;