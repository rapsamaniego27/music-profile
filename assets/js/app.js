class Animate {
  constructor() {
    
  }

  //Methods
  skills() {
    gsap.from('#infoSkills', {
      scrollTrigger: {
        trigger: 'infoSkills',
        toggleActions: "restart none none none"
      },
      y: -80,
      opacity: 0,
      duration: 0.5
    });
  }

  latestPosts() {
    gsap.from('.card-post', {
      scrollTrigger: {
        trigger: 'latest-posts__container',
        toggleActions: "restart none none none"
      },
      y: -100,
      opacity: 0,
      duration: 0.6, 
      stagger: 0.6,
      delay: 1
    });
  }
  
  welcome() {
    gsap.from('.welcome__content', {
      x: -120,
      opacity: 0,
      duration: 1
    });
  }

  noteSet() {
    /* setInterval(() => {
      gsap.fromTo('.note-element', {
        y: -20,
        duration: 0.5,
        stagger: 0.6,
        ease: "Linear.easeNone"
      });
    }, 5000); */

    const noteElements = document.querySelectorAll('.note-element');
    const tl = new TimelineMax({ repeat: -1 });
    const tlMove = new TimelineMax({ repeat: -1 });

    TweenLite.defaultEase = Bounce.out;

    tlMove.from(noteElements, 1, { y: -15, ease: Bounce.out, stagger:0.5})
          .from(noteElements, 1, { y: 0, ease: Bounce.out, stagger:0.5});
    
    tlMove.timeScale(3);
  }
}


class Data{
 constructor(){
  
 }

 //Methods
 async fetchSiblings(){
    let api = '../data/siblings.json';
    let response = await fetch(api);
    let data = await response.json();
 
    return data;
  }
}

/* Run this for testing API fetching */

/* const data = new Data();

data.fetchSiblings()
    .then(data => {
     console.log(data);
    })
    .catch(err => console.log(err)); */
/* Notes:
  <a> should always be the one clickable having a full height and width

  always use max-height to transition height
*/

class Menuet {
  constructor({
    nav,
    openTrigger,
    closeTrigger,
    overlay,
    subMenus
  }) {
    /* Arguments */
    this.nav = nav;
    this.openTrigger = openTrigger;
    this.overlay = overlay;
    this.closeTrigger = closeTrigger;
    this.subMenus = subMenus

    /* Parents */
    this.header = document.querySelector('header');
    this.body = document.querySelector('body');
    this.header = document.querySelector('.header');
    this.wrapper = document.querySelector('#wrapper');
    this.main = document.querySelector('#main');

    this.gsapTimeline = gsap.timeline({ defaults: { duration: 1, ease: Back.easeOut.config(2) } });

    this.gsapTimeline.paused(true);
    this.gsapTimeline.to('#menuOverlay', { clipPath: 'circle(100%)' });

    /* 
      -=1 is an offset to delay menu item animation and waits for overlay to finish first
     */

    this.gsapTimeline.to('.menu-item', {
      opacity: 1,
      y: '0',
      stagger: 0.1,
      ease: 'elastic.out'
    }, "-=1");



    //Automatic runs these functions
    this.open();
    this.close();
    this.stick();

  }

  // Properties

  open() {
    this.openTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const menuItems = document.querySelectorAll('.menu-item');

      this.gsapTimeline.play();
      document.querySelector('body').classList.add('menu--hide');
      this.closeTrigger.classList.remove('menu--disable');


      menuItems.forEach(item => {
        item.firstElementChild.classList.remove('pointer-events-none');
      });


    }, false);
  }

  close() {
    this.closeTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const menuItems = document.querySelectorAll('.menu-item');

      this.gsapTimeline.reverse(.5);
      document.querySelector('body').classList.remove('menu--hide');
      this.closeTrigger.classList.add('menu--disable');
      
      menuItems.forEach(item => {
        item.firstElementChild.classList.add('pointer-events-none');
      });

    });
  }

  stick() {
    /* The scrollbar is in the wrapper div */
    this.wrapper.addEventListener('scroll', () => {
      let fromTop = this.wrapper.scrollTop;
      let screenWidth = document.body.clientWidth;
      const headerHeight = this.header.clientHeight;


      /* Detects if screen width is mobile or not
         then it declares a height trigger when scrolled.
      */
      const TRIGGER_HEIGHT = screenWidth > 800 ? 30 : 5;

      /* Adds fixed head and a dynamic top 
         padding for main content */
      if (fromTop >= TRIGGER_HEIGHT) {
        this.header.classList.add('header--sticky');
        /* this.main.style.paddingTop = `${headerHeight}px`; */
      } else {
        this.header.classList.remove('header--sticky');
        /* this.main.style.paddingTop = `0`; */
      }

    });
  }

  setGsapDefaults() {
    let tl = gsap.timeline({ defaults: { duration: 1, ease: Back.easePit.config(2) } })
  }


  /* Checks if device is mobile */
  isMobile() {
    if (navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i))

      return true;
  }

}
class Scroll {
  constructor() {

  }

  //Methods

  smoothScroll(target, duration) {
    //This Function gets the target Section and your desired duration
    const targetted = document.querySelector(target);
    const targetPosition = targetted.getBoundingClientRect().top - 100;

    //Gets the window PageY off set and substract by target position
    //to get the distance
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);

      window.scrollTo(0, run);

      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

}




window.addEventListener('DOMContentLoaded', () => {
  const infoSkills = document.querySelector('#infoSkills');
  const welcomeContent = document.querySelector('.welcome__content');
  const bioMapper = document.querySelector('#bioMapper');

  
  if (isInPage(infoSkills)) {

    const animate = new Animate();
    animate.skills();
    animate.latestPosts();

  }

  /* Homepage */
  if (isInPage(welcomeContent)) {

    const animate = new Animate();
    animate.welcome();
    animate.noteSet();

  }

  /* Biography page */
  if (isInPage(bioMapper)) {

    const bioSections = document.querySelectorAll('.bio-section');
    const bioMapperBtns = document.querySelectorAll('.bio-mapper__item');
    const scroll = new Scroll();
  
    bioMapperBtns.forEach(btn => {
      const id = btn.id;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        scroll.smoothScroll(`.${id}`, 1000);
        console.log(id);
        
        /* Remove former active class and apply to new one */
        const formerActiveBtn = document.querySelector('.bio-mapper__item--active');
        formerActiveBtn.classList.remove('bio-mapper__item--active'); 
        
        btn.classList.add('bio-mapper__item--active');
        

      });
    });

    

  }

});

let pattern;

/* Regular expression pattern */
pattern = /hello/i;

//String to match
const str = 'Hello';

//Log Results
const result = pattern.exec(str);
/* console.log(result); */


/* Function to test if the str passes the pattern. */
function patternTest(pattern, str){
 if(pattern.test(str)){
  console.log(`${str} matches ${pattern.source}`);
 }else{
  console.log(`${str} does NOT match ${pattern.source}`);
 }
}

/* patternTest(pattern, str); */
const navOpen = document.querySelector('#menuOpen');
const navOverlay = document.querySelector('#menuOverlay');
const nav = document.querySelector('#menuNav');
const navClose = document.querySelector('#menuClose');

//Instantiate
const menuet = new Menuet({
  nav: nav,
  openTrigger: navOpen,
  closeTrigger: navClose,
  overlay: navOverlay,
  subMenus: ''
});

//Display output

function isInPage(node) {
  return (node === document.body) ? false : document.body.contains(node);
}
