//burger-menu

const burger = document.querySelector('.burger');
const burgerNav  = document.querySelector('.burger__nav');
const navigation = document.querySelector('.navigation');
const body = document.querySelector('body');
const navLinks = document.querySelectorAll('.link');
burger.addEventListener('click', function(){ 
    if (!burger.classList.contains('burger-open')) {
    burger.classList.add('burger-open');
    burgerNav.classList.add('burger__nav-open');
    navigation.classList.add('navigation-open');
    body.classList.add('no-scroll');}
    else {
        burger.classList.remove('burger-open');
    burgerNav.classList.remove('burger__nav-open');
    navigation.classList.remove('navigation-open');
    body.classList.remove('no-scroll');}
    }
)
for (let link of navLinks) {
    link.addEventListener("click", function () {
        burger.classList.remove('burger-open');
        burgerNav.classList.remove('burger__nav-open');
        navigation.classList.remove('navigation-open');
        body.classList.remove('no-scroll');
    });
  }














async function getQuotesEn() {
    const pets = "pets.json";
    const res = await fetch(pets);
    const data = await res.json();
  
    console.log(data[1].name) ;
}
getQuotesEn();