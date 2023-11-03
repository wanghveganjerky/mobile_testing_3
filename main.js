let lastTime = 0;
let shakeThreshold = 15; // Adjust this value for sensitivity
let lastX = 0, lastY = 0, lastZ = 0;

if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', shakeDetection, false);
} else {
    alert("Sorry, your browser doesn't support DeviceMotion");
}

function shakeDetection(event) {
    const acceleration = event.accelerationIncludingGravity;
    const currentTime = new Date().getTime();

    if ((currentTime - lastTime) > 100) {
        const diffTime = currentTime - lastTime;
        lastTime = currentTime;

        const speed = Math.abs(acceleration.x + acceleration.y + acceleration.z - lastX - lastY - lastZ) / diffTime * 10000;

        if (speed > shakeThreshold) {
            triggerAnimation();
        }

        lastX = acceleration.x;
        lastY = acceleration.y;
        lastZ = acceleration.z;
    }
}

function triggerAnimation() {
    const box = document.getElementById('box');
    // Here, you can add any kind of animation or effect you want
    box.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16); // Change color randomly
}
