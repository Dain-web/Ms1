document.addEventListener('DOMContentLoaded', () => {
  const updateDateButton = document.getElementById('updateDateButton');
  const checkStatusButton = document.getElementById('checkStatusButton');
  const viewDatesButton = document.getElementById('viewDatesButton');
  const statusElement = document.getElementById('status');
  const dateList = document.getElementById('dateList');

  updateDateButton.addEventListener('click', () => {
    const currentDate = new Date().toISOString();
    let dates = JSON.parse(localStorage.getItem('msUpdateDates')) || [];
    dates.push(currentDate);
    localStorage.setItem('msUpdateDates', JSON.stringify(dates));
    alert('Date updated!');
  });

  checkStatusButton.addEventListener('click', () => {
    const dates = JSON.parse(localStorage.getItem('msUpdateDates')) || [];
    if (dates.length === 0) {
      statusElement.textContent = 'No dates stored';
      return;
    }

    const latestDate = new Date(dates[dates.length - 1]);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - latestDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 5) {
      statusElement.textContent = `Sorry, you cannot ms after  ${5-diffDays} days.`;
    } else {
      statusElement.textContent = 'You can ms <br> after ms you will update ms';
    }
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
});