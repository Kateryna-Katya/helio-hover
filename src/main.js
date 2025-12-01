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