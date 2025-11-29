
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
 * Allow for full screen of images
 */

const lightbox = document.createElement('div');
lightbox.classList.add('lightbox-overlay');
const lightboxImg = document.createElement('img');

const prevBtn = document.createElement('div');
prevBtn.className = 'lightbox-prev';
prevBtn.innerHTML = '&#10094;';

const nextBtn = document.createElement('div');
nextBtn.className = 'lightbox-next';
nextBtn.innerHTML = '&#10095;';

const closeBtn = document.createElement('div');
closeBtn.className = 'lightbox-close';
closeBtn.innerHTML = '&times;';

lightbox.appendChild(lightboxImg);
lightbox.appendChild(prevBtn);
lightbox.appendChild(nextBtn);
lightbox.appendChild(closeBtn);
document.body.append(lightbox);

let currImgInd = 0;
let currImgsList = [];

function updateLightboxImg() {
    if (currImgsList.length > 0) {
        lightboxImg.src = currImgsList[currImgInd];

        // prevBtn.style.display = currImgInd === 0 ? 'none' : 'block';
        // nextBtn.style.display = currImgInd === currImgsList.length - 1 ? 'none' : 'block';
    }
}

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currImgInd > 0) {
        currImgInd--;
        updateLightboxImg();
    } else {
        currImgInd = currImgsList.length - 1;
        updateLightboxImg();
    }
})

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currImgInd < currImgsList.length - 1) {
        currImgInd++;
        updateLightboxImg();
    } else {
        currImgInd = 0;
        updateLightboxImg();
    }
})

closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    lightbox.classList.remove('active');
})

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
})
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            if (currImgInd > 0){
                currImgInd--;
                updateLightboxImg();
            } else {
                currImgInd = currImgsList.length - 1;
                updateLightboxImg();
            } 
        } else if (e.key === 'ArrowRight') {
            if (currImgInd < currImgsList.length - 1) {
                currImgInd++;
                updateLightboxImg();
            } else {
                currImgInd = 0;
                updateLightboxImg();
            }
        } else if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        }
    }
})

 
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
            role.innerHTML = `<strong>Role:</strong> ${project.Role}`;
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
            

            project.Images.forEach((imgSrc, index) => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = project.Title;
                img.id = `${project.Title}-img-${index}`

                img.classList.add('project-image');

                img.addEventListener('click', () => {
                    currImgsList = project.Images;
                    currImgInd = index;
                    updateLightboxImg();
                    lightbox.classList.add('active');
                })

                gallery.appendChild(img);

                const link = document.createElement('a');
                link.href = `#${img.id}`;

                link.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Remove active class from all dots in this gallery
                    galleryNav.querySelectorAll('a').forEach(dot => dot.classList.remove('active'));
                    
                    // Add active class to clicked dot
                    link.classList.add('active');

                    img.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                })

                galleryNav.appendChild(link);
            });

            // Observer to update nav dot on scroll
            const observerOptions = {
                root: gallery,
                threshold: 0.5
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const visibleInd = Array.from(gallery.children).indexOf(entry.target);

                        galleryNav.querySelectorAll('a').forEach((dot, i) => {
                            if (i === visibleInd) {
                                dot.classList.add('active');
                            } else {
                                dot.classList.remove('active');
                            }
                        })
                    }
                })
            }, observerOptions);

            gallery.querySelectorAll('img').forEach(img => observer.observe(img));

            galleryWrapper.appendChild(gallery);
            galleryWrapper.appendChild(galleryNav);
            galleryCont.appendChild(galleryWrapper);
            card.appendChild(galleryCont);
        }

        if (project.Demo) {
            const demoLink = document.createElement('a');
            demoLink.classList.add("project-demo");
            demoLink.innerHTML = `<button class="demo-btn">View demo</button>`
            demoLink.href = project.Demo;
            demoLink.target = "_blank";
            demoLink.rel = "noopener noreferrer";
            card.appendChild(demoLink);
        }

        const desc = document.createElement('p');
        desc.className = 'project-description';
        desc.innerHTML = `<strong>Description:</strong> ${project.Description}<br><br>`;
        card.appendChild(desc);

        const tech = document.createElement('p');
        tech.innerHTML = `<strong>Technologies:</strong> ${project.Technologies}<br><br>`;
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

