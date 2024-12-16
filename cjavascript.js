document.addEventListener('DOMContentLoaded', function () {
  const orderForm = document.getElementById('order-form');
  const customerName = document.getElementById('customer-name');
  const coffeeTypeRadios = document.getElementsByName('coffee-type');
  const coffeeSizeRadios = document.getElementsByName('coffee-size');
  const orderTable = document.getElementById('order-table').getElementsByTagName('tbody')[0];
  const orderSummaryTable = document.getElementById('orderSummary').getElementsByTagName('tbody')[0];

  // Event listener for form submission
  orderForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get selected coffee type and size
    let selectedCoffeeType = '';
    let selectedCoffeeSize = '';
    
    for (const radio of coffeeTypeRadios) {
      if (radio.checked) {
        selectedCoffeeType = radio.value;
        break;
      }
    }

    for (const radio of coffeeSizeRadios) {
      if (radio.checked) {
        selectedCoffeeSize = radio.value;
        break;
      }
    }

    // Validate if the user has selected both coffee type and size
    if (selectedCoffeeType && selectedCoffeeSize) {
      const newRow = orderTable.insertRow();
      const customerNameCell = newRow.insertCell(0);
      const coffeeTypeCell = newRow.insertCell(1);
      const coffeeSizeCell = newRow.insertCell(2);
      const actionsCell = newRow.insertCell(3);
      
      customerNameCell.textContent = customerName.value;
      coffeeTypeCell.textContent = selectedCoffeeType;
      coffeeSizeCell.textContent = selectedCoffeeSize;

      // Adding remove button functionality
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove ❌';
      removeButton.onclick = function () {
        newRow.remove();
        updateSummary();  // Update the summary after removing an item
      };
      actionsCell.appendChild(removeButton);

      // Update the order summary
      updateSummary();

      // Reset the form after submitting
      orderForm.reset();
    } else {
      alert("Please select both coffee type and size.");
    }
  });

  // Function to update the coffee summary table
  function updateSummary() {
    // Clear the current summary
    orderSummaryTable.innerHTML = '';

    const coffeeCount = {};
    
    // Iterate over all rows in the order table to count the types and sizes
    for (const row of orderTable.rows) {
      const coffeeType = row.cells[1].textContent;
      const coffeeSize = row.cells[2].textContent;
      
      const key = `${coffeeType}-${coffeeSize}`;
      
      if (!coffeeCount[key]) {
        coffeeCount[key] = 1;
      } else {
        coffeeCount[key]++;
      }
    }

    // Insert the summary rows into the summary table
    for (const [coffee, count] of Object.entries(coffeeCount)) {
      const [coffeeType, coffeeSize] = coffee.split('-');
      const newRow = orderSummaryTable.insertRow();
      const coffeeTypeCell = newRow.insertCell(0);
      const coffeeSizeCell = newRow.insertCell(1);
      const countCell = newRow.insertCell(2);
      
      coffeeTypeCell.textContent = coffeeType;
      coffeeSizeCell.textContent = coffeeSize;
      countCell.textContent = count;
    }
  }
});
