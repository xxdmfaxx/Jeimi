const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('closeBtn');

document.querySelectorAll('.gallery a').forEach(link => {
    link.addEventListener('click', function(e){
        e.preventDefault();
        const imgSrc = this.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
});

lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox){
        lightbox.style.display = 'none';
        lightboxImg.src = '';
    }
});
