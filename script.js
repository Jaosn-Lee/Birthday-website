/**
 * JavaScript for May 4th Birthday Countdown
 * Integrates with the provided HTML/CSS structure.
 */

// --- CONFIGURATION ---
const targetMonth = 4;      // May (Months are 0-indexed: 4 is May)
const targetDay = 4;
const birthYear = 2012;     // Your birth year
// ---------------------

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // 1. Determine the correct target date
    let targetDate = new Date(currentYear, targetMonth, targetDay);

    // If May 4th has already passed this year (2025), set the target for the next year (2026)
    // The target year will be the year you turn the calculated age.
    let targetAgeYear = currentYear;
    if (now > targetDate) {
        targetDate = new Date(currentYear + 1, targetMonth, targetDay);
        targetAgeYear = currentYear + 1; // The year you turn the age
    }

    // Calculate the age you are turning in the target year
    const age = targetAgeYear - birthYear;

    // Calculate the difference in time (milliseconds)
    const timeDifference = targetDate - now;

    const countdownElement = document.getElementById('countdown');
    const messageElement = document.getElementById('message');

    // 2. Check if the countdown has ended
    if (timeDifference <= 0) {
        // COUNTDOWN ENDED: Display the celebratory message
        
        // Hide the timer units
        countdownElement.style.display = 'none';

        // Display the celebratory message with the new age
        messageElement.style.display = 'block';
        // Note: The age is calculated again here to be precise at the moment of the birthday
        const finalAge = new Date().getFullYear() - birthYear; 
        messageElement.innerHTML = `Happy **${finalAge}th** Birthday! yayay it's my birthday!🥳🥳🎉`; 

        return; 
    }

    // COUNTDOWN RUNNING: Ensure the timer is visible and the message is hidden

    // Ensure the timer units are visible
    countdownElement.style.display = 'flex'; 

    // Hide the message while the countdown is running
    messageElement.style.display = 'none'; 

    // 3. Calculate time and format numbers
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(timeDifference / day);
    const hours = Math.floor((timeDifference % day) / hour);
    const minutes = Math.floor((timeDifference % hour) / minute);
    const seconds = Math.floor((timeDifference % minute) / second);

    // 4. Update the DOM elements with the calculated time
    document.getElementById('days').innerText = String(days); // Days don't need two digits
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

// Initial call and update every second
updateCountdown();
setInterval(updateCountdown, 1000);