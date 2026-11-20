if (typeof PhotoSwipeLightbox === 'function' && typeof PhotoSwipe === 'function') {
  const lightbox = new PhotoSwipeLightbox({
    gallery: '.photo-link',
    pswpModule: PhotoSwipe,
    wheelToZoom: true,
    imageClickAction: false
  });

  lightbox.init();
}
