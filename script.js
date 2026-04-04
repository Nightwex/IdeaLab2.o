document.addEventListener('DOMContentLoaded', () => {
    
    // ПРИШВИДШЕНА АНІМАЦІЯ ПОЯВИ
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // АНІМАЦІЯ ЦИФР (СУПЕР-ШВИДКА)
    const counters = document.querySelectorAll('.stat-val');
    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 100; // швидкість
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const statsSection = document.querySelector('.stats-row');
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            statsObserver.disconnect();
        }
    });
    statsObserver.observe(statsSection);

    // ПЛАВНА НАВІГАЦІЯ
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
// --- CAROUSEL LOGIC ---
const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
const dots = Array.from(document.querySelectorAll('.dot'));

let currentIndex = 0;

const updateCarousel = (index) => {
    // Рух стрічки
    track.style.transform = `translateX(-${index * 100}%)`;
    
    // Оновлення активної крапки
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    currentIndex = index;
};

// Подія для кнопки "Вперед"
nextBtn.addEventListener('click', () => {
    let index = currentIndex + 1;
    if (index >= slides.length) index = 0; // Зациклення
    updateCarousel(index);
});

// Подія для кнопки "Назад"
prevBtn.addEventListener('click', () => {
    let index = currentIndex - 1;
    if (index < 0) index = slides.length - 1; // Зациклення
    updateCarousel(index);
});

// Подія для натискання на крапки
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => updateCarousel(i));
});
