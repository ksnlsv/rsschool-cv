document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const headerLinks = document.querySelectorAll('.header_link');
    const body = document.body;
    const scrollToAbout = document.getElementById('scrollToAbout');
    const faqItems = document.querySelectorAll('.faq-item');
    const storageKey = 'activeFAQ';

    console.log('Debug - Elements found:', {
        menuToggle: menuToggle ? 'found' : 'not found',
        scrollToAbout: scrollToAbout ? 'found' : 'not found',
        aboutSection: document.getElementById('about') ? 'found' : 'not found',
        introSection: document.getElementById('intro-section') ? 'found' : 'not found'
    });

    
    if (menuToggle) {
        menuToggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('no-scroll');
                console.log('Menu opened');
            } else {
                body.classList.remove('no-scroll');
                console.log('Menu closed');
            }
        });
    }

    
    headerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            console.log('Menu link clicked:', targetId);
            
            if (targetId.startsWith('#')) {
                
                if (menuToggle) {
                    menuToggle.checked = false;
                }
                body.classList.remove('no-scroll');
                
                
                setTimeout(() => {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        console.log('Scrolled to:', targetId, 'at position:', targetPosition);
                    } else {
                        console.log('Target element not found:', targetId);
                    }
                }, 300);
            }
        });
    });

    
    if (scrollToAbout) {
        scrollToAbout.addEventListener('click', function() {
            console.log('Scroll button clicked');
            const aboutSection = document.getElementById('about');
            
            if (aboutSection) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = aboutSection.offsetTop - headerHeight;
                
                console.log('Scrolling to About section at position:', targetPosition);
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.log('About section not found');
            }
        });
        
        
        scrollToAbout.style.cursor = 'pointer';
    }




    function closeAllFAQs() {
        faqItems.forEach(item => {
            item.classList.remove('active');
        });
    }
    
    
    function openFAQ(item) {
        item.classList.add('active');
    }
    
    
    function saveFAQState(faqId) {
        localStorage.setItem(storageKey, faqId);
    }
    
    
    function loadFAQState() {
        const savedFAQ = localStorage.getItem(storageKey);
        
        if (savedFAQ) {
            
            closeAllFAQs();
            
            const savedItem = document.querySelector(`[data-faq="${savedFAQ}"]`);
            if (savedItem) {
                openFAQ(savedItem);
            }
        } else {
            
            if (faqItems.length > 0) {
                openFAQ(faqItems[0]);
            }
        }
    }
    
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-header');
            const faqId = item.getAttribute('data-faq');
            
            header.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                
                closeAllFAQs();
                
                
                if (!isActive) {
                    openFAQ(item);
                    saveFAQState(faqId);
                } else {
                    
                    localStorage.removeItem(storageKey);
                }
            });
        });
        
        
        loadFAQState();
        
        console.log('FAQ accordion initialized');
    }
});