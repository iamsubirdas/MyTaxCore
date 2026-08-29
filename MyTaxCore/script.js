// ===============================
// Mobile Menu
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

// ===============================
// Contact Form → WhatsApp
// ===============================
const contactForm = document.getElementById("contactForm");

if (contactForm) {

contactForm.addEventListener("submit", function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const mobile = document.getElementById("mobile").value;
const email = document.getElementById("email").value;
const service = document.getElementById("service").value;
const message = document.getElementById("message").value;

const text =
`*New Service Booking*

👤 Name: ${name}

📞 Mobile: ${mobile}

📧 Email: ${email}

📂 Service: ${service}

📝 Message:
${message}`;

window.open(
"https://wa.me/919775515990?text=" + encodeURIComponent(text),
"_blank"
);

});

}
// Back To Top Button

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

if(window.scrollY > 300){
topBtn.style.display = "block";
}else{
topBtn.style.display = "none";
}

});

topBtn.addEventListener("click", () => {

window.scrollTo({

top:0,
behavior:"smooth"

});

});