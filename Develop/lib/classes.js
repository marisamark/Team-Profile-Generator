//The first class is an Employee parent class with the following properties and methods:
class Employee {
    constructor(name, id, title) {
        this.name = name;
        this.id = id;
        this.title = title;
    }

    getName() {

    }
    getId() {

    }
    getEmail() {

    }
    getRole() {
        return Employee
    }

    }

    class Manager extends Employee {
        constructor(name,id, title, officeNumber) {
          super(name, id, title);
          this.officeNumber = officeNumber;
        }
      
        getRole()
        //Overridden to return Manager
    }    
    
    class Engineer extends Employee {
        constructor(name,id, title, github) {
          super(name, id, title);
          this.github = github; //GitHub username
        }
      
        getGithub()

        getRole()
        // Overridden to return 'Engineer'
    }    
    
    class Intern extends Employee {
        constructor(name,id, title, school) {
          super(name, id, title);
          this.school = school; 
        }
      
        getSchool()

        getRole()
        // Overridden to return 'Intern'
    } 
    
