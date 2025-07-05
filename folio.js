
/**
 * Updates the date and time on the main page
 */
function updateDateTime() {
    var dateElem = document.getElementById('date');
    var timeElem = document.getElementById('time');

    const date = new Date();

    const dateFormat = { weekday: 'short', day: 'numeric', month: 'short'};
    const formattedDate = date.toLocaleDateString('en-GB', dateFormat);

    const timeFormat = { hour: '2-digit', minute: '2-digit', hour12: true};
    const formattedTime = date.toLocaleTimeString('en-GB', timeFormat).toUpperCase();

    timeElem.textContent = formattedTime;
    dateElem.textContent = formattedDate;
}

updateDateTime()
setInterval(updateDateTime, 1000)

/**
 * Opens window when button is clicked
 */
function openWindow(windowId) {
    var window = document.getElementById(windowId);
    window.style.display = "flex";
}

document.getElementById("abt-me-button").addEventListener("click", () => openWindow('about-me-window'));
document.getElementById("skills-button").addEventListener("click", () => openWindow('skills-window'));
document.getElementById("projects-button").addEventListener("click", () => openWindow('projects-window'));
document.getElementById("contact-button").addEventListener("click", () => openWindow('contact-window'));

/**
 * Closing the windows
 */
function closeWindow(windowId) {
    var window = document.getElementById(windowId);
    window.style.display = "none";
}

document.querySelectorAll(".close-button").forEach(button => {
    button.addEventListener("click", () => {
        var windowId = button.getAttribute('data-window');
        closeWindow(windowId);
    });
});