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
 * Clicking the window brings it to the front
 */
function increaseZIndex() {
    const windows = document.querySelectorAll('.pane');
    windows.forEach((window) => {
        window.addEventListener('mousedown', () => {
            windows.forEach((w) => {
                w.style.zIndex = 1;
            });

            window.style.zIndex = 2;
        });
    });
}

increaseZIndex();

/**
 * Opens window when button is clicked
 */
function openWindow(windowId) {
    var wind = document.getElementById(windowId);
    wind.style.display = "flex";

    const allWindows = document.querySelectorAll('.pane');
    let highestZ = 1;
    allWindows.forEach((w) => {
        if (w.style.display !== 'none') {
            const z = parseInt(window.getComputedStyle(w).zIndex) || 0;
            if (z > highestZ) {
                highestZ = z;
            }
        }
    });
    
    wind.style.zIndex = highestZ + 1;
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



/**
 * Moving the windows around and resizing them
 */
const windows = document.querySelectorAll('.pane');

windows.forEach((window) => {
    const header = window.querySelector('.header');

    header.addEventListener('mousedown', (event) => {
        event.preventDefault();

        window.classList.add('is-dragging');

        let l = window.offsetLeft;
        let t = window.offsetTop;

        let startX = event.pageX;
        let startY = event.pageY;

        const drag = (event) => {
            event.preventDefault();

            window.style.left = l + (event.pageX - startX) + 'px';
            window.style.top = t + (event.pageY - startY) + 'px';
        }

        const mouseup = () => {
            window.classList.remove('is-dragging');

            document.body.style.userSelect = '';    

            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', mouseup);
        }

        document.body.style.userSelect = 'none';

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', mouseup);

    });
});

/**
 * CV download
 */
function downloadCV() {
    const link = document.createElement('a');
    link.href = 'files/csResume.pdf';
    link.download = 'NidhaNureen_CV.pdf';
    link.click();
}

/**
 * Adding description to the windows
 */
function abtMeDescription() {

    fetch('files/about.txt')
    .then(repsonse => repsonse.text())
    .then(data => {
        document.getElementById('abt-me-description').innerText = data;
    })
    .catch(error => {
        console.error('Error with loading file:', error);
    });
}

abtMeDescription();

let px = window.innerWidth * 0.03;
console.log("25vw =", px, "px");
