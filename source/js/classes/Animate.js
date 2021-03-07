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

