// Tab switching
const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname) {
  for (let tablink of tablinks) tablink.classList.remove("active-link");
  for (let tabcontent of tabcontents) tabcontent.classList.remove("active-tab");
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// Responsive menu
// const sidemenu = document.getElementById("sidemenu");
// function openmenu() { sidemenu.style.right = "0"; }
// function closemenu() { sidemenu.style.right = "-200px"; }
function openmenu() {
  document.getElementById("sidemenu").classList.add("open");
}
function closemenu() {
  document.getElementById("sidemenu").classList.remove("open");
}

// Dark mode toggle
const darkToggle = document.getElementById('dark-toggle');
function setDarkMode(on) {
  if (on) {
    document.body.classList.add('dark');
    localStorage.setItem('darkMode', 'on');
    darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('darkMode', 'off');
    darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}
if (darkToggle) {
  setDarkMode(localStorage.getItem('darkMode') === 'on');
  darkToggle.addEventListener('click', () => {
    setDarkMode(!document.body.classList.contains('dark'));
  });
}

// Contact form (Google Sheets)
const scriptURL = 'https://script.google.com/macros/s/AKfycbxxZiTTiOryywXE6uBcj_mybYjixg8SJmUyfUmQmDqAtMg2n1ga4g39ZwKqfX_fzxY/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        msg.innerHTML = "Message sent successfully";
        setTimeout(() => { msg.innerHTML = ""; }, 5000);
        form.reset();
      })
      .catch(error => console.error('Error!', error.message));
  });
}