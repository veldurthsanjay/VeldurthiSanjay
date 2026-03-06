// const themes = [

//     {
//         bg: "linear-gradient(135deg, #121212 0%, #2c003e 100%)",
//         button: "linear-gradient(45deg, #ffd700, #ff4500)",
//         text: "#f5f5f5"
//     }
// ];

// let currentTheme = 0;

// function switchTheme() {
//     currentTheme = (currentTheme + 1) % themes.length;
//     const theme = themes[currentTheme];

//     document.body.style.background = theme.bg;
//     document.body.style.color = theme.text;
//     document.querySelector(".theme-toggle").style.background = theme.button;
// }


// ================= MAIN =================
document.addEventListener('DOMContentLoaded', () => {

    window.scrollTo(0, 0);

    // ================= NAVIGATION =================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.querySelector('.navbar').classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelectorAll('.nav-links a')
                .forEach(link => link.classList.remove('active'));

            this.classList.add('active');

            const target = document.querySelector(this.getAttribute('href'));
            const offset = 60;
            const bodyRect = document.body.getBoundingClientRect().top;
            const targetRect = target.getBoundingClientRect().top;
            const targetPosition = targetRect - bodyRect - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });


    // ================= ROLE ANIMATION =================
    const roleElement = document.getElementById('role');
    const roles = ['Web Developer', 'UI/UX Designer'];
    let currentRoleIndex = 0;

    function changeRole() {
        roleElement.style.opacity = 0;
        setTimeout(() => {
            roleElement.textContent = roles[currentRoleIndex];
            roleElement.style.opacity = 1;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        }, 500);
    }

    changeRole();
    setInterval(changeRole, 3500);


    // ================= SKILLS FILTER =================
    const skillSections = document.querySelectorAll('.skills');
    const categoryButtons = document.querySelectorAll('.category-btn');

    // Show FRONTEND by default
    skillSections.forEach(section => {
        if (section.id === 'frontend') {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });

    categoryButtons.forEach(btn => {
        if (btn.getAttribute('onclick')?.includes("frontend")) {
            btn.classList.add('active');
        }
    });

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('onclick')
                .replace("filterSkills('", "")
                .replace("')", "");

            skillSections.forEach(section => {
                if (category === 'all' || section.id === category) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });


    // ================= PROJECT FILTER =================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project');

    // Show FULLSTACK by default
    projects.forEach(project => {
        if (project.getAttribute('data-category') === 'fullstack') {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });

    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === 'fullstack') {
            btn.classList.add('active');
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            projects.forEach(project => {
                if (filter === 'all' ||
                    project.getAttribute('data-category') === filter) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });

            document.querySelectorAll('#instruction')
                .forEach(i => i.style.display = 'none');
        });
    });


    // ================= SECTION ANIMATION =================
    const sections = document.querySelectorAll(
        '#about-main, .skills-container, .projects-container, .services-container, .container'
    );

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('section');
        sectionObserver.observe(section);
    });


