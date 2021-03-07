window.addEventListener('DOMContentLoaded', () => {
  const infoSkills = document.querySelector('#infoSkills');
  const welcomeContent = document.querySelector('.welcome__content');

  
  if (isInPage(infoSkills)) {

    const animate = new Animate();
    animate.skills();
    animate.latestPosts();

  }

  if (isInPage(welcomeContent)) {

    const animate = new Animate();
    animate.welcome();
    animate.noteSet();

  }

});