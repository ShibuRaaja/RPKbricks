function initSpreadsheet(month) {
    const key = `SpreadSheetData_${month}`;
    const storedData = JSON.parse(localStorage.getItem(key)) || getDefaultData();

    const spreadsheet = document.getElementById('spreadsheet');
    for (let row = 0; row < storedData.length; row++) {
        const currentRow = spreadsheet.insertRow();

        for (let col = 0; col < storedData[row].length; col++) {
            const currentCell = currentRow.insertCell(col);

            if (row === 0 || col === 0) {
                // Header cells or cells in the first column
                currentCell.innerHTML = `<strong>${storedData[row][col]}</strong>`;
            } else {
                // Data cells
                currentCell.innerHTML = `<input type="text" value="${storedData[row][col]}" oninput="updateCellValue(this, '${key}', ${row}, ${col})">`;
            }
        }
    }

    // Calculate totals after initializing the spreadsheet
    calculateTotals(key);
}

function updateCellValue(input, key, row, col) {
    
    const value = input.value;
    const spreadsheetData = JSON.parse(localStorage.getItem(key)) || getDefaultData();

    spreadsheetData[row][col] = value;

    localStorage.setItem(key, JSON.stringify(spreadsheetData));

    // Recalculate totals after updating a cell value
    calculateTotals(key);
}

function calculateTotals(key) {
    const spreadsheetData = JSON.parse(localStorage.getItem(key)) || getDefaultData();
    const totalsRow = spreadsheetData[spreadsheetData.length - 1];

    // Initialize sum values for each column
    for (let col = 1; col < totalsRow.length; col++) {
        totalsRow[col] = 0;
    }

    // Calculate the sum of each column
    for (let row = 2; row < spreadsheetData.length - 1; row++) {
        for (let col = 1; col < spreadsheetData[row].length; col++) {
            totalsRow[col] += spreadsheetData[row][col] === '' ? 0 : parseInt(spreadsheetData[row][col]);
        }
    }

    // Update the 'Total' row in the spreadsheet
    const spreadsheet = document.getElementById('spreadsheet');
    for (let col = 1; col < totalsRow.length; col++) {
        spreadsheet.rows[spreadsheet.rows.length - 1].cells[col].innerHTML = `<strong>${totalsRow[col]}</strong>`;
    }

    // Update the totals in local storage
    localStorage.setItem(key, JSON.stringify(spreadsheetData));
}

// Helper function to get default data structure
function getDefaultData() {
    
    return [['Date'],
            ['', '', '', '', '', '','', '', '', '',''],
            ['1', '', '', '', '', '', '','', '', '', ''],
            ['2', '', '', '', '', '', '','', '', '', ''],
            ['3', '', '', '', '', '', '','', '', '', ''],
            ['4', '', '', '', '', '', '','', '', '', ''],
            ['5', '', '', '', '', '', '','', '', '', ''],
            ['6', '', '', '', '', '', '','', '', '', ''],
            ['7', '', '', '', '', '', '','', '', '', ''],
            ['8', '', '', '', '', '', '','', '', '', ''],
            ['9', '', '', '', '', '', '','', '', '', ''],
            ['10', '', '', '', '', '', '','', '', '', ''], 
            ['11', '', '', '', '', '', '','', '', '', ''],
            ['12', '', '', '', '', '', '','', '', '', ''],
            ['13', '', '', '', '', '', '','', '', '', ''],
            ['14', '', '', '', '', '', '','', '', '', ''],
            ['15', '', '', '', '', '', '','', '', '', ''],
            ['16', '', '', '', '', '', '','', '', '', ''],
            ['17', '', '', '', '', '', '','', '', '', ''],
            ['18', '', '', '', '', '', '','', '', '', ''],
            ['19', '', '', '', '', '', '','', '', '', ''],
            ['20', '', '', '', '', '', '','', '', '', ''], 
            ['21', '', '', '', '', '', '','', '', '', ''],
            ['22', '', '', '', '', '', '','', '', '', ''],
            ['23', '', '', '', '', '', '','', '', '', ''],
            ['24', '', '', '', '', '', '','', '', '', ''],
            ['25', '', '', '', '', '', '','', '', '', ''],
            ['26', '', '', '', '', '', '','', '', '', ''],
            ['27', '', '', '', '', '', '','', '', '', ''],
            ['28', '', '', '', '', '', '','', '', '', ''],
            ['29', '', '', '', '', '', '','', '', '', ''],
            ['30', '', '', '', '', '', '','', '', '', ''], 
            ['31', '', '', '', '', '', '','', '', '', ''],
            ['Total', '', '', '', '', '', '','', '', '', '']];
}

// Usage example for January
document.addEventListener('DOMContentLoaded', () => initSpreadsheet('Jannannnyy'));
