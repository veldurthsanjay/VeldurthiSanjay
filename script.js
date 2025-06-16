
const themes = [
  {
      bg: "linear-gradient(90deg, #000814, #1b1b1b)",
      button: "linear-gradient(45deg, #ff0044, #ff6f61)",
      text: "#ffffff"
  },
  {
      bg: "linear-gradient(90deg,rgb(19, 16, 33), #6a1b9a)",
      button: "linear-gradient(45deg, #9c27b0,rgb(195, 14, 74))",
      text: "#ffffff"
  },
  {
    bg: "linear-gradient(90deg, #0f0c29, #302b63, #24243e)",
    button: "linear-gradient(45deg, #ff00ff, #ff6600)",
    text: "#ffffff"
},

];

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
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const roleElement = document.getElementById('role');
    const roles = ['Web Developer', 'UI/UX Designer'];
    let currentRoleIndex = 0;

    // Toggle nav menu on mobile
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
 const toggle = document.getElementById('menu-toggle');
toggle.addEventListener('click', () => {
  toggle.classList.toggle('active');
  document.querySelector('.navbar').classList.toggle('open'); // Optional: control menu visibility
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
          const filter = this.getAttribute('data-filter');
          // container.style.maxWidth = '1150px';
          // container.style.marginLeft = '200px';

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
