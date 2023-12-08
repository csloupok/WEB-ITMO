document.addEventListener('DOMContentLoaded', function () {
    const tableForm = document.getElementById('tableForm');
    const tableContainer = document.getElementById('tableContainer');

    // Сохраненные параметры из локального хранилища
    const savedParams = JSON.parse(localStorage.getItem('tableParams')) || {};
    document.getElementById('days').value = savedParams.days || 3;
    document.getElementById('maxShoots').value = savedParams.maxShoots || 2;
    document.getElementById('device').value = savedParams.device || 'sony';

    // Сохраненная таблица из локального хранилища
    const savedTable = JSON.parse(localStorage.getItem('savedTable')) || [];
    if (savedTable.length > 0) {
        tableContainer.innerHTML = savedTable;
    }

    tableForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const days = parseInt(document.getElementById('days').value);
        const maxShoots = parseInt(document.getElementById('maxShoots').value);
        const device = document.getElementById('device').value;

        const tableParams = {days, maxLessons: maxShoots, device: device};
        localStorage.setItem('tableParams', JSON.stringify(tableParams));

        generateTable(days, maxShoots, device);
    });

    function generateTable(days, maxShoots, device) {
        const sonyNames = ["Alpha 7 IV", "Alpha 7 II", "Alpha 6600 APS-C"];
        const kodakNames = ["PIX-PRO", "ORBIT360", "WPZ67"];

        const table = document.createElement('table');
        table.classList.add('generated-table');

        // Заголовок таблицы
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>Date</th>';
        for (let j = 0; j < maxShoots; j++) {
            if (device === "Sony")
                headerRow.innerHTML += `<th>${device} ${sonyNames[j]}</th>`;
            else
                headerRow.innerHTML += `<th>${device} ${kodakNames[j]}</th>`;
        }
        table.appendChild(headerRow);

        const currentDate = new Date();

        // Заполняем таблицу данными
        for (let i = 0; i < days; i++) {
            const row = document.createElement('tr');
            const currentDateCell = new Date(currentDate);
            currentDateCell.setDate(currentDate.getDate() + i);
            row.innerHTML = `<td>${currentDateCell.toDateString()}</td>`;

            for (let j = 0; j < maxShoots; j++) {
                const cell = document.createElement('td');
                const randomPrice = (Math.random() * 100).toFixed(2);
                cell.textContent = `$${randomPrice}`;
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        // Очищаем предыдущее содержимое таблицы
        tableContainer.innerHTML = '';

        // Добавляем сгенерированную таблицу в контейнер
        tableContainer.appendChild(table);

        // Сохраняем таблицу в локальное хранилище
        localStorage.setItem('savedTable', JSON.stringify(tableContainer.innerHTML));
    }
});
