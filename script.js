const addEmployeesBtn = document.querySelector("#add-employees-btn");

const collectEmployees = function () {
  const result = [];

  let isDone = false;
  while (!isDone) {
    const firstName = window.prompt("Please enter employee first name.");
    const lastName = window.prompt("Please enter employee last name.");
    const salary =
      parseFloat(window.prompt("Please enter employee salary.")) || 0;

    const newEmployee = {
      firstName,
      lastName,
      salary,
    };

    result.push(newEmployee);

    const continueAdding = window.confirm(
      "Would you like to add another employee?"
    );
    if (!continueAdding) {
      isDone = true;
    }
  }

  return result;
};

const displayAverageSalary = function (employeesArray) {
  const totalSalary = employeesArray.reduce(
    (acc, employee) => acc + employee.salary,
    0
  );
  const averageSalary = totalSalary / employeesArray.length;

  console.log(`Average Salary: ${averageSalary}`);
};

const getRandomEmployee = function (employeesArray) {
  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  const randomEmployee = employeesArray[randomIndex];

  const trackEmployeeData = function () {
    const employees = collectEmployees();

    if (employees.length === 0) {
      console.log("No employees added.");
      return;
    }

    console.table(employees);
    displayAverageSalary(employees);
    getRandomEmployee(employees);

    const isContinue = window.confirm(
      "Would you like to add another employee?"
    );

    if (!isContinue) {
      employees.sort((a, b) => a.lastName.localeCompare(b.lastName));
      displayEmployees(employees);

      return;
    }
  };

  console.log(
    `Random Employee: ${randomEmployee.firstName} ${randomEmployee.lastName}`
  );
};

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector("#employee-table");

  // Clear the employee table
  employeeTable.innerHTML = "";

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log("==============================");

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener("click", trackEmployeeData);
