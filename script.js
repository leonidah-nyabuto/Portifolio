document.addEventListener('DOMContentLoaded', () => {
    // 1. THEME TOGGLE (Works on all pages)
    const themeToggle = document.getElementById('theme-toggle');
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggle) themeToggle.checked = true;
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
    }

    // 2. SYSTEMATIC TYPING (Only runs on Home page)
    const nameSpace = document.getElementById('typing-name');
    const roleSpace = document.getElementById('typing-role');
    
    if (!nameSpace || !roleSpace) return; // Exit quietly if not on index.html

    const nameText = "Nyabuto Leonidah";
    const roleTexts = [" An ICT Support Specialist", " A Software Enthuasist",];
    
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let mode = "NAME"; 

    function playTyping() {
        let currentElement = (mode === "NAME") ? nameSpace : roleSpace;
        let fullString = (mode === "NAME") ? nameText : roleTexts[roleIdx];

        if (isDeleting) {
            currentElement.textContent = fullString.substring(0, charIdx - 1);
            charIdx--;
        } else {
            currentElement.textContent = fullString.substring(0, charIdx + 1);
            charIdx++;
        }

        let delay = isDeleting ? 50 : 100;

        if (!isDeleting && charIdx === fullString.length) {
            delay = 2000; 
            isDeleting = true;
        } 
        else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            currentElement.textContent = ""; 

            if (mode === "NAME") {
                mode = "ROLE";
                nameSpace.style.borderRight = "none"; 
                roleSpace.style.borderRight = "3px solid cyan";
            } else {
                roleIdx++;
                if (roleIdx >= roleTexts.length) {
                    roleIdx = 0;
                    mode = "NAME";
                    roleSpace.style.borderRight = "none";
                    nameSpace.style.borderRight = "3px solid cyan";
                }
            }
            delay = 500;
        }
        setTimeout(playTyping, delay);
    }

    // Start the process
    nameSpace.style.borderRight = "3px solid cyan";
    playTyping();
});
// --- SCROLL TO TOP LOGIC ---
const topBtn = document.getElementById("scrollToTop");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // This makes it glide up instead of jumping
    });
});