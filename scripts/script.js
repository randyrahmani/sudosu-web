if (typeof GLightbox === 'function') {
  const hasPanzoom = typeof Panzoom === 'function';
  const lightbox = GLightbox({
    selector: '.photo-link',
    zoomable: !hasPanzoom,
    draggable: !hasPanzoom,
    touchNavigation: !hasPanzoom
  });

  if (hasPanzoom) {
    const cleanups = [];

    lightbox.on('slide_after_load', ({ slideNode }) => {
      const image = slideNode.querySelector('.gslide-image img');
      if (!image) return;

      const viewport = image.parentElement;
      const panzoom = Panzoom(image, {
        minScale: 1,
        maxScale: 5,
        panOnlyWhenZoomed: true,
        cursor: 'grab'
      });

      viewport.addEventListener('wheel', panzoom.zoomWithWheel, { passive: false });
      cleanups.push(() => {
        viewport.removeEventListener('wheel', panzoom.zoomWithWheel);
        panzoom.destroy();
      });
    });

    lightbox.on('close', () => {
      cleanups.splice(0).forEach((cleanup) => cleanup());
    });
  }
}
