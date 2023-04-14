const tableBody = document.getElementById('table-body');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const urlInput = document.getElementById('url');
const addButton = document.getElementById('add');
const updateButton = document.getElementById('update');
const deleteButton = document.getElementById('delete');
const loadButton = document.getElementById('load');
 

// Array para almacenar los datos
let data = [];

// Función para agregar un nuevo registro
function addData() {
    // Validar que los campos no estén vacíos
    if (titleInput.value.trim() === '' || descriptionInput.value.trim() === '' || urlInput.value.trim() === '') {
        alert('Por favor, complete todos los campos');
        return;
    }

    // Crear un nuevo objeto con los datos ingresados por el usuario
    const newData = {
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        url: urlInput.value.trim()
    };

    // Agregar el nuevo objeto al array de datos
    data.push(newData);

    // Limpiar los campos del formulario
    titleInput.value = '';
    descriptionInput.value = '';
    urlInput.value = '';

    // Actualizar la tabla
    updateTable();
}

// Función para actualizar un registro existente
function updateData() {
    // Validar que se haya seleccionado un registro para actualizar
    const selectedRow = document.querySelector('.selected');
    if (!selectedRow) {
        alert('Por favor, seleccione un registro para actualizar');
        return;
    }

    // Actualizar los datos del objeto correspondiente en el array
    data[selectedRow.rowIndex - 1].title = titleInput.value.trim();
    data[selectedRow.rowIndex - 1].description = descriptionInput.value.trim();
    data[selectedRow.rowIndex - 1].url = urlInput.value.trim();

    // Limpiar los campos del formulario
    titleInput.value = '';
    descriptionInput.value = '';
    urlInput.value = '';

    // Desmarcar la fila seleccionada
    selectedRow.classList.remove('selected');

    // Actualizar la tabla
    updateTable();
}

// Función para eliminar un registro existente
function deleteData() {
    // Validar que se haya seleccionado un registro para eliminar
    const selectedRow = document.querySelector('.selected');
    if (!selectedRow) {
        alert('Por favor, seleccione un registro para eliminar');
        return;
    }

    // Eliminar el objeto correspondiente del array
    data.splice(selectedRow.rowIndex - 1, 1);

    // Limpiar los campos del formulario
    titleInput.value = '';
    descriptionInput.value = '';
    urlInput.value = '';

    // Desmarcar la fila seleccionada
    selectedRow.classList.remove('selected');

    // Actualizar la tabla
    updateTable();
}

// Función para cargar los datos existentes en la tabla
function loadData() {
    // Limpiar el array de datos y la tabla
    data = [];
    tableBody.innerHTML = '';

    // Obtener los datos del almacenamiento local
    const storedData = localStorage.getItem('data');
    if (storedData) {
        // Parsear los datos y agregarlos al array
        data = JSON.parse(storedData);

        // Actualizar la tabla
        updateTable();
    }
}

// Función para actualizar la tabla
function updateTable() {
    // Limpiar la tabla
    tableBody.innerHTML = '';

    // Recorrer el array de datos y crear una fila por cada objeto
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        const titleCell = document.createElement('td');
        const descriptionCell = document.createElement('td');
        const urlCell = document.createElement('td');

        titleCell.textContent = item.title;
        descriptionCell.textContent = item.description;
        urlCell.innerHTML = `<a href="${item.url}" target="_blank">${item.url}</a>`;

        row.appendChild

        // Crear botones de acciones para cada fila
        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        actionsCell.classList.add('botones' );
        editButton.textContent = 'Editar';
        editButton.classList.add('btn', 'btn-primary', 'btn-sm');
        editButton.addEventListener('click', () => {
            // Marcar la fila como seleccionada
            if (row.classList.contains('selected')) {
                row.classList.remove('selected');
            } else {
                document.querySelectorAll('tr').forEach((row) => {
                    row.classList.remove('selected');
                });
                row.classList.add('selected');

                // Cargar los datos del objeto seleccionado en el formulario
                titleInput.value = item.title;
                descriptionInput.value = item.description;
                urlInput.value = item.url;
            }
        });

        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', () => {
        // Eliminar el objeto correspondiente del array
        data.splice(index, 1);
        // Actualizar la tabla
        updateTable();

        });

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(titleCell);
        row.appendChild(descriptionCell);
        row.appendChild(urlCell);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    });

    // Guardar los datos en el almacenamiento local
    localStorage.setItem('data', JSON.stringify(data));
}

// Cargar los datos existentes en la tabla al cargar la página
loadData();

// Agregar event listener para el botón de actualizar
loadButton.addEventListener('click', () => {
    loadData();
});


// Agregar event listener para el botón de agregar
addButton.addEventListener('click', () => {
    addData();
});

// Agregar event listener para el botón de actualizar
updateButton.addEventListener('click', () => {
    updateData();
});

// Agregar event listener para el botón de eliminar
deleteButton.addEventListener('click', () => {
    deleteData();
});


