const NUM_FIREFLIES = 20; 
const fireflies = [];
let mouseTimeout;
let isInsideContainer = false;


for (let i = 0; i < NUM_FIREFLIES; i++) {
  const firefly = document.createElement('div');
  firefly.classList.add('firefly');
  firefly.style.opacity = '0'; 
  document.body.appendChild(firefly);
  fireflies.push(firefly);
}


function showFireflies() {
  if (!isInsideContainer) {
    fireflies.forEach((firefly) => {
      firefly.style.opacity = '1';
    });
  }
}


function hideFireflies() {
  if (!isInsideContainer) {
    fireflies.forEach((firefly) => {
      firefly.style.opacity = '1';
    });
  } else {
    fireflies.forEach((firefly) => {
      firefly.style.opacity = '0'; 
    });
  }
}


function pauseFireflies() {
  fireflies.forEach((firefly) => {
    firefly.classList.add('paused');
  });
}


function resumeFireflies() {
  fireflies.forEach((firefly) => {
    firefly.classList.remove('paused');
  });
}


document.addEventListener('mousemove', (e) => {
  if (isInsideContainer) {
    hideFireflies();
    return; 
  }

  
  showFireflies();
  resumeFireflies();

  fireflies.forEach((firefly, index) => {
    const delay = index * 100; 
    setTimeout(() => {
      let offsetX = Math.random() * 100 - 50; 
      let offsetY = Math.random() * 100 - 50;

      
      offsetX = Math.min(Math.max(offsetX, 10), window.innerWidth - 10); 
      offsetY = Math.min(Math.max(offsetY, 10), window.innerHeight - 10); 

      firefly.style.left = `${e.pageX + offsetX}px`;
      firefly.style.top = `${e.pageY + offsetY}px`;
    }, delay);
  });

  
  clearTimeout(mouseTimeout);
  mouseTimeout = setTimeout(() => {
    hideFireflies(); 
    pauseFireflies(); 
  }, 500); 
});

// Detecta se o cursor entra no container
const container = document.querySelector('.container');
container.addEventListener('mouseover', () => {
  isInsideContainer = true;
  hideFireflies(); 
  pauseFireflies(); 
});

// Detecta se o cursor sai do container
container.addEventListener('mouseleave', () => {
  isInsideContainer = false;
  showFireflies(); 
  resumeFireflies(); 
});
