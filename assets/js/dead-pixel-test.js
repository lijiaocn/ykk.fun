// Dead Pixel Test Tool - Image Modal JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initImageModal();
});

function initImageModal() {
    // Create modal HTML
    const modalHTML = `
        <div id="imageModal" class="image-modal">
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img id="modalImage" src="" alt="">
                <div class="modal-caption" id="modalCaption"></div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.modal-close');
    
    // Get all screenshot images
    const screenshotImages = document.querySelectorAll('.screenshot-item img');
    
    // Add click event to each screenshot image
    screenshotImages.forEach(function(img) {
        img.addEventListener('click', function() {
            const src = this.src;
            const alt = this.alt;
            const caption = this.nextElementSibling ? this.nextElementSibling.textContent : '';
            
            // Set image source and attributes
            modalImg.src = src;
            modalImg.alt = alt;
            modalCaption.textContent = caption;
            
            // Show modal
            modal.classList.add('show');
            
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
            
            // Ensure image loads properly and fits screen
            modalImg.onload = function() {
                // Calculate optimal display size
                const maxWidth = window.innerWidth * 0.95;
                const maxHeight = window.innerHeight * 0.95 - 120; // Reserve space for close button and caption
                
                const imgWidth = this.naturalWidth;
                const imgHeight = this.naturalHeight;
                
                // Calculate scale factor to fit image within bounds
                const scaleX = maxWidth / imgWidth;
                const scaleY = maxHeight / imgHeight;
                const scale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond original size
                
                // Apply calculated dimensions
                this.style.width = (imgWidth * scale) + 'px';
                this.style.height = (imgHeight * scale) + 'px';
            };
        });
    });
    
    // Close modal when clicking close button
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // Clear image src to stop loading
        setTimeout(function() {
            modalImg.src = '';
            modalCaption.textContent = '';
        }, 300);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (modal.classList.contains('show')) {
            // Re-center modal on resize
            modal.style.display = 'flex';
            
            // Recalculate image size if image is loaded
            if (modalImg.src && modalImg.complete) {
                const maxWidth = window.innerWidth * 0.95;
                const maxHeight = window.innerHeight * 0.95 - 120;
                
                const imgWidth = modalImg.naturalWidth;
                const imgHeight = modalImg.naturalHeight;
                
                const scaleX = maxWidth / imgWidth;
                const scaleY = maxHeight / imgHeight;
                const scale = Math.min(scaleX, scaleY, 1);
                
                modalImg.style.width = (imgWidth * scale) + 'px';
                modalImg.style.height = (imgHeight * scale) + 'px';
            }
        }
    });
}

// Utility function to preload images for better performance
function preloadImages(imageUrls) {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Preload carousel images when page loads
window.addEventListener('load', function() {
    const carouselImages = [
        '/assets/img/deadpixeltest/1-home.png',
        '/assets/img/deadpixeltest/2-usage.png',
        '/assets/img/deadpixeltest/3-black.png',
        '/assets/img/deadpixeltest/4-red.png',
        '/assets/img/deadpixeltest/5-yellow.png'
    ];
    preloadImages(carouselImages);
});