(function () {
    // Функция для измерения времени загрузки страницы
    function measurePageLoadTime() {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        console.log(`Время загрузки страницы: ${loadTime} мс`);
    }

    // Функция для выделения активного пункта меню
    function highlightActiveMenuItem() {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            if (window.location.pathname.includes(item.getAttribute('href'))) {
                item.classList.add('active');
                console.log('Active class added to:', item);
            }
        });
    }

    function addMenuEventListeners() {
        const menuItems = document.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.classList.add('hovered');
            });

            item.addEventListener('mouseleave', () => {
                item.classList.remove('hovered');
            });
        });
    }

    function addDropdownEventListeners() {
        const dropdowns = document.querySelectorAll('.dropdown');

        dropdowns.forEach(dropdown => {
            const dropdownContent = dropdown.querySelector('.dropdown-content');

            dropdown.addEventListener('mouseenter', () => {
                dropdownContent.style.display = 'block';
            });

            dropdown.addEventListener('mouseleave', () => {
                dropdownContent.style.display = 'none';
            });
        });
    }

    // Обработчик события загрузки страницы
    window.addEventListener('load', () => {
        measurePageLoadTime();
        highlightActiveMenuItem();
        addMenuEventListeners();
        addDropdownEventListeners();
    });
})();