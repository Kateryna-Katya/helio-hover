document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Инициализация Smooth Scroll (Lenis)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 2. Регистрация плагинов GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 3. Логика Хедера (Скрыть/Показать при скролле)
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Если мы в самом верху — убираем все классы
        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
            return;
        }
        
        // Скролл вниз — скрываем хедер
        if (currentScroll > lastScroll && currentScroll > 80) {
            header.style.transform = 'translateY(-100%)';
        } 
        // Скролл вверх — показываем хедер
        else if (currentScroll < lastScroll) {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // 4. Логика Мобильного Меню
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    const navLinks = document.querySelectorAll('.header__link');
    const body = document.body;

    function toggleMenu() {
        burger.classList.toggle('is-active');
        nav.classList.toggle('is-active');
        body.classList.toggle('no-scroll'); // Блокируем скролл страницы
    }

    // Клик по бургеру
    if (burger) {
        burger.addEventListener('click', toggleMenu);
    }

    // Закрытие меню при клике на ссылку (для SPA навигации)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('is-active')) {
                toggleMenu();
            }
        });
    });

    // 5. Инициализация иконок Lucide
    lucide.createIcons();
    
    console.log('Helio-Hover System: Online');
});
// --- HERO ANIMATION: DIGITAL WAVES ---
const waveCanvas = document.getElementById('hero-waves');

if (waveCanvas) {
    const ctx = waveCanvas.getContext('2d');
    let width, height;
    
    // Настройки волн
    const waves = [
        { y: 0.5, length: 0.01, amplitude: 100, speed: 0.02, color: 'rgba(59, 130, 246, 0.2)' }, // Синяя прозрачная
        { y: 0.5, length: 0.02, amplitude: 50, speed: 0.015, color: 'rgba(59, 130, 246, 0.5)' }, // Основная
        { y: 0.5, length: 0.005, amplitude: 150, speed: 0.005, color: 'rgba(255, 255, 255, 0.05)' } // Фоновая широкая
    ];
    
    let increment = 0;

    function resize() {
        width = waveCanvas.width = window.innerWidth;
        height = waveCanvas.height = window.innerHeight;
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        increment += 0.01;

        waves.forEach(wave => {
            ctx.beginPath();
            
            // Начинаем рисовать волну
            for (let i = 0; i < width; i++) {
                // Формула синусоиды: y = sin(x * length + time) * amplitude
                const y = height * wave.y + Math.sin(i * wave.length + increment * (wave.speed * 100)) * wave.amplitude;
                
                if (i === 0) {
                    ctx.moveTo(i, y);
                } else {
                    ctx.lineTo(i, y);
                }
            }

            // Настройка стиля линии
            ctx.strokeStyle = wave.color;
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        requestAnimationFrame(draw);
    }

    // Init
    resize();
    draw();

    window.addEventListener('resize', resize);
}