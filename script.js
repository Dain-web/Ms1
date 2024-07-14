document.addEventListener('DOMContentLoaded', () => {
  const updateDateButton = document.getElementById('updateDateButton');
  const checkStatusButton = document.getElementById('checkStatusButton');
  const viewDatesButton = document.getElementById('viewDatesButton');
  const statusElement = document.getElementById('status');
  const dateList = document.getElementById('dateList');
  
  let dates = JSON.parse(localStorage.getItem('msUpdateDates')) || []; // Retrieve stored dates or initialize to an empty array

  updateDateButton.addEventListener('click', () => {
    const currentDate = new Date();
    dates.push(currentDate); // Push current date to dates array

    localStorage.setItem('msUpdateDates', JSON.stringify(dates));
    alert(`Date updated to: ${currentDate.toLocaleString()}`);

    // Update the chart with dates array
    updateChart();
  });

  checkStatusButton.addEventListener('click', () => {
    if (dates.length === 0) {
      statusElement.textContent = 'No dates stored';
      // If no dates stored, reset the chart to show zero
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
      statusElement.innerHTML = 'You can ms <br> after ms you will update ms';
    }

    // Update the chart with dates array
    updateChart();
  });

  viewDatesButton.addEventListener('click', () => {
    dateList.innerHTML = ''; // Clear the list before displaying

    dates.forEach((date, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = new Date(date).toLocaleString(); // Convert to local date and time string
      listItem.classList.add('fade-in'); // Add fade-in class for animation
      setTimeout(() => {
        dateList.appendChild(listItem);
      }, index * 100); // Stagger the display of each date by 100ms
    });

    // Play sound on click
    const audio = new Audio('Sounds.mp3');
    audio.play();
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
    const storedDates = JSON.parse(localStorage.getItem('msUpdateDates')) || [];
    
    numberChart.data.labels = storedDates.map(date => new Date(date).toLocaleDateString());
    numberChart.data.datasets[0].data = storedDates.map((_, index) => index + 1);
    numberChart.update();
  }

  // Initial update to display the chart
  updateChart();
});




document.getElementById('updateDateButton').addEventListener('click', function() {
    var audio = new Audio('Sound2.mp3');
    audio.play();
});



if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, error => {
      console.log('ServiceWorker registration failed: ', error);
    });
  });
}
