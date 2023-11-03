let shakeThreshold = 20; // Adjust this value for sensitivity
let lastX, lastY, lastZ;

if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    // iOS 13+
    DeviceOrientationEvent.requestPermission()
    .then(response => {
        if (response == 'granted') {
            window.addEventListener('devicemotion', shakeDetection, false);
        }
    })
    .catch(console.error);
} else {
    // non iOS 13+
    window.addEventListener('devicemotion', shakeDetection, false);
}

function shakeDetection(event) {
    const acceleration = event.accelerationIncludingGravity;

    if (!lastX) {
        lastX = acceleration.x;
        lastY = acceleration.y;
        lastZ = acceleration.z;
        return;
    }

    const deltaX = Math.abs(acceleration.x - lastX);
    const deltaY = Math.abs(acceleration.y - lastY);
    const deltaZ = Math.abs(acceleration.z - lastZ);

    if (deltaX + deltaY + deltaZ > shakeThreshold) {
        duplicateBox();
    }

    lastX = acceleration.x;
    lastY = acceleration.y;
    lastZ = acceleration.z;
}

function duplicateBox() {
    const container = document.body;
    const box = document.getElementById('box');
    const newBox = box.cloneNode(true);
    newBox.id = ""; // Removing the id for the cloned box to keep ids unique
    container.appendChild(newBox);
}
