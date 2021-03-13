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
      y: -120,
      opacity: 0,
      duration: 1
    });
  }

  latestPosts() {
    gsap.from('.card-post', {
      scrollTrigger: {
        trigger: 'latest-posts__container',
        toggleActions: "restart none none none"
      },
      y: -120,
      opacity: 0,
      duration: 1, 
      stagger: 0.6
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

    tlMove.from(noteElements, 1, { y: -12, ease: Bounce.out, stagger:0.5})
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

      this.gsapTimeline.play();
      document.querySelector('body').classList.add('menu--hide');
      this.closeTrigger.classList.remove('menu--disable');

    }, false);
  }

  close() {
    this.closeTrigger.addEventListener('click', (e) => {
      e.preventDefault();

      this.gsapTimeline.reverse(.5);
      document.querySelector('body').classList.remove('menu--hide');
      this.closeTrigger.classList.add('menu--disable');

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
      btn.addEventListener('click', (e) => {
        const id = btn.id;
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

// require ('bootstrap');
