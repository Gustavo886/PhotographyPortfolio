document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const overlay = document.getElementById('carousel-overlay');
    const carouselImage = document.getElementById('carousel-image');
    const carouselTitle = document.getElementById('carousel-title');
    const closeBtn = document.getElementById('carousel-close');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    let currentIndex = 0;
    const itemsData = [];

    // Collect data from gallery items
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-title').textContent;
        
        itemsData.push({
            src: img.src,
            alt: img.alt,
            title: title
        });

        item.addEventListener('click', (e) => {
            e.preventDefault();
            openCarousel(index);
        });
    });

    function openCarousel(index) {
        currentIndex = index;
        updateCarousel();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeCarousel() {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    function updateCarousel() {
        const item = itemsData[currentIndex];
        carouselImage.src = item.src;
        carouselImage.alt = item.alt;
        carouselTitle.textContent = item.title;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % itemsData.length;
        updateCarousel();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + itemsData.length) % itemsData.length;
        updateCarousel();
    }

    // Event Listeners
    closeBtn.addEventListener('click', closeCarousel);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Click outside to close
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeCarousel();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeCarousel();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});
