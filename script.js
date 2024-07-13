document.addEventListener('DOMContentLoaded', () => {
  const updateDateButton = document.getElementById('updateDateButton');
  const checkStatusButton = document.getElementById('checkStatusButton');
  const viewDatesButton = document.getElementById('viewDatesButton');
  const statusElement = document.getElementById('status');
  const dateList = document.getElementById('dateList');
  
  let numbers = []; // Array to store numbers for the chart

  updateDateButton.addEventListener('click', () => {
    const currentDate = new Date().toISOString();
    numbers.push(currentDate); // Push current date to numbers array

    localStorage.setItem('msUpdateDates', JSON.stringify(numbers));
    alert('Date updated!');

    // Update the chart with numbers array
    updateChart();
  });

  checkStatusButton.addEventListener('click', () => {
    const dates = JSON.parse(localStorage.getItem('msUpdateDates')) || [];
    if (dates.length === 0) {
      statusElement.textContent = 'No dates stored';
      // If no dates stored, reset the chart to show zero
      numbers = [];
      updateChart();
      return;
    }

    const latestDate = new Date(dates[dates.length - 1]);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - latestDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 5) {
      statusElement.textContent = `Sorry, you cannot ms after ${5 - diffDays} days.`;
    } else {
      statusElement.textContent = 'You can ms <br> after ms you will update ms';
    }

    // Update the chart with numbers array
    updateChart();
  });

  viewDatesButton.addEventListener('click', () => {
    const dates = JSON.parse(localStorage.getItem('msUpdateDates')) || [];
    dateList.innerHTML = ''; // Clear the list before displaying
    dates.forEach(date => {
      const listItem = document.createElement('li');
      listItem.textContent = new Date(date).toLocaleString();
      dateList.appendChild(listItem);
    });
  });

  const ctx = document.getElementById('numberChart').getContext('2d');
  const numberChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Show Line Graph',
        data: [],
        borderColor: 'red', // Initial color
        borderWidth: 2,
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true
        }
      }
    }
  });

  function updateChart() {
    const dates = JSON.parse(localStorage.getItem('msUpdateDates')) || [];
    
    // If no dates are stored, set the numbers array to empty
    if (dates.length === 0) {
      numbers = [];
    } else {
      numbers = dates.map((_, index) => index + 1); // Generate numbers based on number of dates
    }

    numberChart.data.labels = dates.map(date => new Date(date).toLocaleDateString());
    numberChart.data.datasets[0].data = numbers;
    numberChart.update();
  }

  // Initial update to display the chart
  updateChart();
});
