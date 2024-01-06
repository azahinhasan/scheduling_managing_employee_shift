const generateRandomTime=() =>{
  const hours = Math.floor(Math.random() * 12) + 1; // Random hour between 1 and 12
  const minutes = Math.floor(Math.random() * 60); // Random minute between 0 and 59
  const period = Math.random() < 0.5 ? "AM" : "PM"; // Randomly choose between AM and PM

  // Format the time
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;

  return formattedTime;
}

module.exports = { generateRandomTime };