const cards = document.querySelectorAll('.card');

const options = {
  threshold: 1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('show', entry.isIntersecting);
    // if (entry.isIntersecting) observer.unobserve(entry.target); // dosen't repeat the animation
  });
}, options);

cards.forEach((card) => {
  observer.observe(card);
});

const cardContainer = document.querySelector('.card-container');
function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement('div');
    card.textContent = 'New Card';
    card.classList.add('card');
    observer.observe(card);
    cardContainer.append(card);
  }
}

const lastCardObserver = new IntersectionObserver(
  (entries) => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) return;
    loadNewCards();
    lastCardObserver.unobserve(lastCard.target);
    //recursive call
    lastCardObserver.observe(document.querySelector('.card:last-child'));
  },
  {
    rootMargin: '100px',
  }
);

lastCardObserver.observe(document.querySelector('.card:last-child'));
