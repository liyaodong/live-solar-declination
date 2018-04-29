function initialize() {
    const options = {atmosphere: true, center: [0, 0], zoom: 3};
    const earth = new WE.map('earth_div', options);

    WE.tileLayer('http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg', {
        minZoom: 0,
        maxZoom: 5,
        attribution: 'NASA'
    }).addTo(earth);

    // Start a simple rotation animation
    let before = null;

    requestAnimationFrame(function animate(now = 0) {
        const c = earth.getPosition();
        const elapsed = before ? now - before: 0;
        before = now;
        earth.setCenter([c[0], c[1] + 0.1 * (elapsed/30)]);
        requestAnimationFrame(animate);
    });
}

window.onload = initialize;
