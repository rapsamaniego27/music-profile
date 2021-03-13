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