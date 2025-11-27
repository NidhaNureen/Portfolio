
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
const isDesktopViewport = () => window.matchMedia('(min-width: 1025px)').matches;

windows.forEach((window) => {
    const header = window.querySelector('.header');

    header.addEventListener('mousedown', (event) => {
        if (!isDesktopViewport()) {
            return;
        }

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


/**
 * Grabbing project data and adding it to the html doc w/ pagination
 */

const pageSize = 1;
let currPage = 1;
let projectData = [];

const projectsContainer = document.querySelector('#projects-window .content');

const pager = document.createElement('div');
pager.className = 'projects-pager';

fetch('proj_data.json')
    .then(r => r.json())
    .then(data => {
        projectData = data;
        renderProjectPage(currPage);
        renderPager();
    })
    .catch(err => console.error('Failed to load project pages:', err));

// Render a page of projects 
function renderProjectPage(page) {
    // Clear curr content
    projectsContainer.innerHTML = '';

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageItems = projectData.slice(start, end);

    pageItems.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('project-card');

        const title = document.createElement('h3');
        title.classList.add("project-title")
        title.textContent = project.Title;
        card.appendChild(title);
        
        if (project.Role) {
            const role = document.createElement('p');
            role.classList.add("project-role");
            role.innerHTML = `Role: ${project.Role}`;
            card.appendChild(role);
        }

        if (project.Images && project.Images.length > 0) {
            const galleryCont = document.createElement('div')
            galleryCont.classList.add('gallery-container')

            const galleryWrapper = document.createElement('div')
            galleryWrapper.classList.add('gallery-wrapper')

            const gallery = document.createElement('div');
            gallery.classList.add('gallery');

            const galleryNav = document.createElement('div');
            galleryNav.classList.add("gallery-nav");
            
            let imgCounter = 1;

            project.Images.forEach(imgSrc => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = project.Title;
                img.id = `${project.Title}-img-${imgCounter}`

                img.classList.add('project-image');
                gallery.appendChild(img);

                const link = document.createElement('a');
                link.href = `#${img.id}`;
                galleryNav.appendChild(link);

                imgCounter++;
            });

            galleryWrapper.appendChild(gallery);
            galleryWrapper.appendChild(galleryNav);
            galleryCont.appendChild(galleryWrapper);
            card.appendChild(galleryCont);
        }

        if (project.Demo) {
            const demoLink = document.createElement('a');
            demoLink.classList.add("project-demo");
            demoLink.textContent = "View demo"
            demoLink.href = project.Demo;
            card.appendChild(demoLink);
        }

        const desc = document.createElement('p');
        desc.innerHTML = `Description: ${project.Description}`;
        card.appendChild(desc);

        const tech = document.createElement('p');
        tech.innerHTML = `Technologies: ${project.Technologies}`;
        card.appendChild(tech);

        projectsContainer.appendChild(card);
    });

    if (!projectsContainer.contains(pager)) {
        projectsContainer.appendChild(pager);
    }

    projectsContainer.scrollTop = 0;

}

// Build pager UI 
function renderPager() {
    pager.innerHTML = '';

    const totalPages = projectData.length;

    // prev button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Prev';
    prevBtn.className = 'pager-button';
    prevBtn.disabled = currPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currPage > 1) {
            currPage--;
            renderProjectPage(currPage);
            renderPager();
        }
    });

    pager.appendChild(prevBtn)

    // next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next'
    nextBtn.className = 'pager-button';
    nextBtn.disabled = currPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currPage < totalPages) {
            currPage++;
            renderProjectPage(currPage);
            renderPager();
        }
    });

    pager.appendChild(nextBtn)
}