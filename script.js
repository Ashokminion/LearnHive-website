document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('active');
});

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let course = document.getElementById('course').value;
    alert(`Thank you ${name}! Your registration for ${course} has been submitted successfully. We'll contact you soon at ${email}.`);
    this.reset();
});

function learnMore(courseName) {
    alert(`More information about ${courseName} will be available soon! Please register to get notified.`);
}

// Countdown Timer
const countdownTarget = new Date(Date.now() + 7*24*60*60*1000);
const countdown = document.getElementById('countdown');
setInterval(() => {
    const now = new Date();
    const diff = countdownTarget - now;
    if (diff <= 0) return countdown.innerHTML = "Webinar Started!";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    countdown.innerHTML = `${days}d ${hours}h ${mins}m ${secs}s`;
}, 1000);
