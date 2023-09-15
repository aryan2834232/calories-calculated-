let totalCalories = 0;

function addFoodItem() {
    const foodItem = document.getElementById('foodItem').value.trim();
    const calories = parseFloat(document.getElementById('calories').value);

    if (foodItem === "" || isNaN(calories) || calories <= 0) {
        alert("Please enter valid values for the food item and calories.");
        return;
    }

    totalCalories += calories;

    const foodList = document.getElementById('foodList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>${foodItem}</span><span>${calories.toFixed(2)} Calories</span><button onclick="editFoodItem(this)">Edit</button><button onclick="deleteFoodItem(this)">Delete</button>`;
    foodList.appendChild(listItem);

    document.getElementById('totalCalories').textContent = totalCalories.toFixed(2);

    // Clear input fields
    document.getElementById('foodItem').value = '';
    document.getElementById('calories').value = '';
}

function editFoodItem(button) {
    const listItem = button.parentElement;
    const foodItemSpan = listItem.querySelector('span:first-child');
    const caloriesSpan = listItem.querySelector('span:nth-child(2)');
    const foodItem = foodItemSpan.textContent;
    const calories = parseFloat(caloriesSpan.textContent);

    const newFoodItem = prompt("Edit Food Item:", foodItem);
    const newCalories = parseFloat(prompt("Edit Calories:", calories));

    if (newFoodItem !== null && newCalories !== null && !isNaN(newCalories) && newCalories > 0) {
        foodItemSpan.textContent = newFoodItem;
        caloriesSpan.textContent = newCalories.toFixed(2);

        // Update the total calories
        totalCalories += newCalories - calories;
        document.getElementById('totalCalories').textContent = totalCalories.toFixed(2);
    }
}

function deleteFoodItem(button) {
    const listItem = button.parentElement;
    const calories = parseFloat(listItem.querySelector('span:nth-child(2)').textContent);

    totalCalories -= calories;
    document.getElementById('totalCalories').textContent = totalCalories.toFixed(2);

    listItem.remove();
}

function clearData() {
    totalCalories = 0;
    document.getElementById('totalCalories').textContent = '0.00';
    document.getElementById('foodList').innerHTML = '';
}
function setCustomGoal() {
    const customGoal = parseFloat(document.getElementById('customGoal').value);

    if (isNaN(customGoal) || customGoal <= 0) {
        alert("Please enter a valid calorie goal.");
        return;
    }

    // Create a new tab with the calorie goal chart
    const newTab = window.open('', '_blank');

    // Generate the chart in the new tab
    const ctx = newTab.document.createElement('canvas');
    newTab.document.body.appendChild(ctx);

    const chartData = {
        labels: ['Calories Consumed', 'Remaining Calories'],
        datasets: [{
            data: [totalCalories, customGoal - totalCalories],
            backgroundColor: ['#007BFF', '#FFC107'],
        }],
    };

    const chart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Calorie Goal Progress',
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                }],
            },
        },
    });
}

function generateDietChart() {
    const calorieGoal = parseFloat(document.getElementById('calorieGoal').value);

    if (isNaN(calorieGoal) || calorieGoal <= 0) {
        alert("Please enter a valid calorie goal.");
        return;
    }

    // Calculate macronutrient ratios (simplified)
    const proteinRatio = 0.25;
    const carbsRatio = 0.50;
    const fatRatio = 0.25;

    const proteinCalories = calorieGoal * proteinRatio;
    const carbsCalories = calorieGoal * carbsRatio;
    const fatCalories = calorieGoal * fatRatio;

    // Add items to the diet chart
    const dietList = document.getElementById('dietList');
    dietList.innerHTML = `
        <li>Protein: ${proteinCalories.toFixed(2)} Calories</li>
        <li>Carbohydrates: ${carbsCalories.toFixed(2)} Calories</li>
        <li>Fat: ${fatCalories.toFixed(2)} Calories</li>
    `;
}




