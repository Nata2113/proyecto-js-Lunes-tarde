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
        <td>${student.grade}</td>
        <td><button class="delete-btn">Eliminar</button>
            <button class="Editar-btn">Editar</button>
        </td>
        
    `;
    row.querySelector(".Editar-btn").addEventListener("click", function () {
        editEstudiante(student, row);
    });

    row.querySelector(".delete-btn").addEventListener("click", function () {
        deleteEstudiante(student, row);
    });

    tableBody.appendChild(row);
}

function deleteEstudiante(student, row) {
    const index = students.indexOf(student);
    if (index > -1) {
        students.splice(index, 1);  
        row.remove();
    }
}
function editEstudiante(student, row) {
    const originalStudent = { ...student };  // Guarda el estado original del estudiante

    row.innerHTML = `
        <td><input type="text" value="${student.name}"></td>
        <td><input type="text" value="${student.lastName}"></td>
        <td><input type="number" value="${student.grade}"></td>
        <td>
            <button class="save-btn">Guardar</button>
            <button class="cancel-btn">Cancelar</button>
        </td>
    `;

    // Guardar los cambios cuando se presiona "Guardar"
    row.querySelector(".save-btn").addEventListener("click", function () {
        const updatedName = row.querySelector("input[type='text']:nth-child(1)").value;
        const updatedLastName = row.querySelector("input[type='text']:nth-child(2)").value;
        const updatedGrade = parseFloat(row.querySelector("input[type='number']").value);

        // Valida los nuevos valores
        if (!updatedName || !updatedLastName || isNaN(updatedGrade) || updatedGrade < 1 || updatedGrade > 7) {
            alert("Por favor, ingresa una nota válida entre 1 y 7.");
            return;
        }

        // Actualiza los datos del estudiante
        student.name = updatedName;
        student.lastName = updatedLastName;
        student.grade = updatedGrade;

        // Actualiza la fila de la tabla con los nuevos valores
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.lastName}</td>
            <td>${student.grade}</td>
            <td><button class="delete-btn">Eliminar</button>
                <button class="Editar-btn">Editar</button>
            </td>
        `;

        // Vuelve a asignar los eventos a los botones (Eliminar y Editar) después de la actualización
        row.querySelector(".Editar-btn").addEventListener("click", function () {
            editEstudiante(student, row);
        });

        row.querySelector(".delete-btn").addEventListener("click", function () {
            deleteEstudiante(student, row);
        });

        // Recalcula el promedio
        calcularPromedio();
    });

    // Cancela la edición y restaura los valores originales
    row.querySelector(".cancel-btn").addEventListener("click", function () {
        // Restaura los valores originales sin eliminar la fila
        row.innerHTML = `
            <td>${originalStudent.name}</td>
            <td>${originalStudent.lastName}</td>
            <td>${originalStudent.grade}</td>
            <td><button class="delete-btn">Eliminar</button>
                <button class="Editar-btn">Editar</button>
            </td>
        `;

        // Vuelve a asignar los eventos a los botones después de restaurar los valores
        row.querySelector(".Editar-btn").addEventListener("click", function () {
            editEstudiante(originalStudent, row);
        });

        row.querySelector(".delete-btn").addEventListener("click", function () {
            deleteEstudiante(originalStudent, row);
        });
    });
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