// const themes = [
//     {
//         bg: "linear-gradient(135deg, #0d1117 0%, #1c2526 100%)",
//         button: "linear-gradient(45deg, #00ff9f, #00b4d8)",
//         text: "#e6edf3"
//     },
//     {
//         bg: "linear-gradient(135deg, #1a1a3d 0%, #2a4066 100%)",
//         button: "linear-gradient(45deg, #ff2e63, #6930c3)",
//         text: "#c8d1ff"
//     },
//     {
//         bg: "linear-gradient(135deg, #121212 0%, #2c003e 100%)",
//         button: "linear-gradient(45deg, #ffd700, #ff4500)",
//         text: "#f5f5f5"
//     }
// ];

let currentTheme = 0;

function switchTheme() {
    currentTheme = (currentTheme + 1) % themes.length;
    const theme = themes[currentTheme];

    document.body.style.background = theme.bg;
    document.body.style.color = theme.text;
    document.querySelector(".theme-toggle").style.background = theme.button;
}

document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });

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

document.addEventListener('DOMContentLoaded', () => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const roleElement = document.getElementById('role');
    const roles = ['Web Developer', 'UI/UX Designer'];
    let currentRoleIndex = 0;

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    const toggle = document.getElementById('menu-toggle');
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        document.querySelector('.navbar').classList.toggle('open');
    });

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

    const aboutDetails = document.querySelector('.about-details');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(aboutDetails);
});

document.addEventListener('DOMContentLoaded', () => {
    const skillSections = document.querySelectorAll('.skills');
    const buttons = document.querySelectorAll('.category-btn');

    skillSections.forEach(section => section.classList.add('hidden'));

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('onclick').replace("filterSkills('", "").replace("')", "");
            skillSections.forEach(section => {
                if (category === 'all' || section.id === category) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project');
    const container = document.querySelector('.projects-container');

    projects.forEach(project => {
        project.style.display = 'none';
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            projects.forEach(project => {
                if (filter === 'all' || project.getAttribute('data-category') === filter) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
});

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('#instruction').forEach(instruction => {
            instruction.style.display = 'none';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let particles = [];
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `hsla(${Math.random() * 60 + 330}, 100%, 50%, 0.5)`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }

    let mouse = { x: undefined, y: undefined };

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        let delta = window.scrollY - lastScroll;
        lastScroll = window.scrollY;
        particles.forEach(p => {
            p.speedY += delta / 50;
            if (Math.abs(p.speedY) > 3) p.speedY = Math.sign(p.speedY) * 3;
        });
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            if (mouse.x && mouse.y) {
                let dx = mouse.x - p.x;
                let dy = mouse.y - p.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    let force = (150 - dist) / 150;
                    p.x += dx / dist * force * 2;
                    p.y += dy / dist * force * 2;
                    p.size = Math.min(p.size + force, 5);
                } else {
                    p.size = Math.max(p.size - 0.1, 1);
                }
            }
            p.update();
            p.draw();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - dist / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('#about-main, .skills-container, .projects-container, .services-container, .container');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('section');
        sectionObserver.observe(section);
    });
});
