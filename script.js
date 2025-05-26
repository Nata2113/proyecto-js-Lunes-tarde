const students = [];
const tableBody = document.querySelector("#studentsTable tbody");
const averageDiv = document.getElementById("average");

// Captura el evento del formulario
document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);

    if (!name || !lastName || isNaN(grade) || grade < 1 || grade > 7) {
        alert("Por favor, completa todos los campos con una nota válida entre 1 y 7.");
        return;
    }

    students.push({ name, lastName, grade });
    this.reset();
    renderTable();
});

// Renderiza la tabla de alumnos
function renderTable() {
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const lastNameCell = document.createElement("td");
        lastNameCell.textContent = student.lastName;

        const gradeCell = document.createElement("td");
        gradeCell.textContent = student.grade;

        const actionsCell = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Editar";
        editBtn.addEventListener("click", () => editStudent(index));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.addEventListener("click", () => deleteStudent(index));

        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(deleteBtn);

        row.appendChild(nameCell);
        row.appendChild(lastNameCell);
        row.appendChild(gradeCell);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    });

    calcularPromedio();
}

// Función para eliminar estudiante
function deleteStudent(index) {
    const confirmDelete = confirm("¿Estás seguro de que quieres eliminar este estudiante?");
    if (confirmDelete) {
        students.splice(index, 1);
        renderTable();
    }
}

// Función para editar estudiante
function editStudent(index) {
    const student = students[index];
    const row = tableBody.children[index];

    row.innerHTML = `
        <td><input type="text" value="${student.name}"></td>
        <td><input type="text" value="${student.lastName}"></td>
        <td><input type="number" value="${student.grade}" min="1" max="7" step="0.1"></td>
        <td></td>
    `;

    const actionsCell = row.querySelector("td:last-child");

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Guardar";
    saveBtn.addEventListener("click", () => {
        const inputs = row.querySelectorAll("input");
        const newName = inputs[0].value.trim();
        const newLastName = inputs[1].value.trim();
        const newGrade = parseFloat(inputs[2].value);

        if (!newName || !newLastName || isNaN(newGrade) || newGrade < 1 || newGrade > 7) {
            alert("Por favor, completa todos los campos con una nota válida entre 1 y 7.");
            return;
        }

        students[index] = { name: newName, lastName: newLastName, grade: newGrade };
        renderTable();
    });

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancelar";
    cancelBtn.addEventListener("click", () => renderTable());

    actionsCell.appendChild(saveBtn);
    actionsCell.appendChild(cancelBtn);
}

// Cálculo del promedio
function calcularPromedio() {
    if (students.length === 0) {
        averageDiv.textContent = "Promedio General del Curso: NO DISPONIBLE";
        return;
    }

    const suma = students.reduce((acc, student) => acc + student.grade, 0);
    const promedio = suma / students.length;
    averageDiv.textContent = `Promedio General del Curso: ${promedio.toFixed(2)}`;
}
