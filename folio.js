
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

/**
 * Moving the windows around and resizing them
 */

const windows = document.querySelectorAll('.pane');

windows.forEach((window) => {
    const header = window.querySelector('.header');
    const cornerTl = window.querySelector('.corner-tl');
    const cornerTr = window.querySelector('.corner-tr');
    const cornerBl = window.querySelector('.corner-bl');
    const cornerBr = window.querySelector('.corner-br');
    

    header.addEventListener('mousedown', (event) => {
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

            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', mouseup);
        }

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', mouseup);

    });

    cornerTl.addEventListener('mousedown', (event) => {

        let w = window.clientWidth;
        let h = window.clientHeight;

        let startX = event.pageX;
        let startY = event.pageY;

        const drag = (event) => {
            event.preventDefault();

            window.style.width = w + (event.pageX - startX) + 'px';
            window.style.height = h + (event.pageY - startY) + 'px';
        }

        const mouseup = () => {
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', mouseup);
        }

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', mouseup);

    });

    cornerTr.addEventListener('mousedown', (event) => {

        let w = window.clientWidth;
        let h = window.clientHeight;

        let startX = event.pageX;
        let startY = event.pageY;

        const drag = (event) => {
            event.preventDefault();

            window.style.width = w + (event.pageX - startX) + 'px';
            window.style.height = h + (event.pageY - startY) + 'px';
        }

        const mouseup = () => {
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', mouseup);
        }

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', mouseup);

    });

    cornerBl.addEventListener('mousedown', (event) => {

        let w = window.clientWidth;
        let h = window.clientHeight;

        let startX = event.pageX;
        let startY = event.pageY;

        const drag = (event) => {
            event.preventDefault();

            window.style.width = w + (event.pageX - startX) + 'px';
            window.style.height = h + (event.pageY - startY) + 'px';
        }

        const mouseup = () => {
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', mouseup);
        }

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', mouseup);

    });

    cornerBr.addEventListener('mousedown', (event) => {

        let w = window.clientWidth;
        let h = window.clientHeight;

        let startX = event.pageX;
        let startY = event.pageY;

        const drag = (event) => {
            event.preventDefault();

            window.style.width = w + (event.pageX - startX) + 'px';
            window.style.height = h + (event.pageY - startY) + 'px';
        }

        const mouseup = () => {
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', mouseup);
        }

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', mouseup);

    });
});
