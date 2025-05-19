const students = [];
const tableBody = document.querySelector("#studentsTable tbody");
const averageDiv = document.getElementById("average");

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);

    if (!name) {
        alert("Por favor, ingresa un nombre.");
        return;
    }
    if (!lastName) {
        alert("Por favor, ingresa un apellido.");
        return;
    }
    if (isNaN(grade) || grade < 1 || grade > 7) {
        alert("La nota debe ser un número entre 1 y 7.");
        return;
    }

    const student = { name, lastName, grade };
    students.push(student);
    addStudentToTable(student);
    calcularPromedio();
    this.reset();
});

function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>`;
    tableBody.appendChild(row);
}

function calcularPromedio() {
    if (students.length === 0) {
        averageDiv.textContent = "Promedio General del Curso: N/A";
        return;
    }

    const sumaNotas = students.reduce((sum, student) => sum + student.grade, 0);
    const promedio = sumaNotas / students.length;
    averageDiv.textContent = "Promedio General del Curso: " + promedio.toFixed(2);
}