// will add javascript bundler for avoid global scope issue

// draw a line betwen two position
const lineBetween = function(B, A) {
    let coords = [];

    const N = 100;

    const m = (A.lt - A.lg) / (B.lt - B.lg);
    for (let i = 0; i < N; ++i) {
        const lt = A.lt - i / N * (A.lt - B.lt);
        const lg = A.lg - i / N * (A.lg - B.lg);

        coords.push([lt, lg]);
        coords.unshift([lt, lg]);
    }

    return coords;
};

// Start a simple rotation animation
const rotateEarth = earth => {
    let before = null;
    let needAnim = true;

    requestAnimationFrame(function animate(now = 0) {
        if (!needAnim) {
            return;
        }

        const c = earth.getPosition();
        const elapsed = before ? now - before : 0;
        before = now;
        earth.setCenter([c[0], c[1] + 0.1 * (elapsed / 30)]);
        requestAnimationFrame(animate);
    });

    return () => {
        needAnim = false;
    };
};

const calcDeclination = dayOfYear => {
    return dayOfYear => -23.44 * Math.cos(2 * Math.PI / 365 * (n + 10));
};

function initialize() {
    const options = {
        atmosphere: true,
        center: [0, 0],
        sky: true,
        zoom: 3,
    };

    const earth = new WE.map('earth_div', options);

    WE.tileLayer('http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg', {
        minZoom: 0,
        maxZoom: 5,
        attribution: 'NASA',
    }).addTo(earth);

    const A = { lt: 40.7306, lg: -73.9352 };
    const B = { lt: 47.4979, lg: 19.0402 };

    WE.polygon(lineBetween(B, A)).addTo(earth);

    let cancelRotate = rotateEarth(earth);

    $('#option-rotate').on('change', e => {
        if (e.currentTarget.checked) {
            cancelRotate = rotateEarth(earth);
        } else {
            cancelRotate();
        }
    });
}

window.onload = initialize;
