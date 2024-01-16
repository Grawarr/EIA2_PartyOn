document.addEventListener('DOMContentLoaded', function () {
    // Get references to the models
    const model1 = document.getElementById('model1');
    const model2 = document.getElementById('model2');
    const model3 = document.getElementById('model3');

    // Get references to the additional models for shuffling
    const model4 = document.getElementById('model4');
    const model5 = document.getElementById('model5');

    // Get references to the ambient sounds
    const winterSound = document.getElementById('winterSound');
    const rainSound = document.getElementById('rainSound');
    const summerSound = document.getElementById('summerSound');
    const litModelSound = document.getElementById('techno'); // Replace 'techno' with your actual sound element ID

    // Get references to the particle systems
    const summerParticles = document.getElementById('insectParticles');
    const winterParticles = document.getElementById('snowParticles');
    const rainyParticles = document.getElementById('rainParticles');

    // Get reference to the A-Frame scene
    const myScene = document.querySelector('a-scene');

    // Get reference to the camera
    const myCamera = document.getElementById('myCamera');

    // Set initial camera rotation
    myCamera.setAttribute('rotation', { x: -20, y: 0, z: 0 });

    // Variable to track spacebar cooldown
    let spacebarCooldown = false;

    function switchModels(modelToShow, modelToHide1, modelToHide2, soundToShow, soundToHide1, soundToHide2, particlesToShow, particlesToHide1, particlesToHide2) {
        modelToShow.setAttribute('visible', true);
        modelToHide1.setAttribute('visible', false);
        modelToHide2.setAttribute('visible', false);
    
        soundToShow.components.sound.playSound();
        soundToHide1.components.sound.pause();
        soundToHide2.components.sound.pause();
    
        // Check if the particle systems are defined before attempting to set visibility
        if (particlesToShow) particlesToShow.setAttribute('visible', true);
        if (particlesToHide1) particlesToHide1.setAttribute('visible', false);
        if (particlesToHide2) particlesToHide2.setAttribute('visible', false);
    }

    // Function to toggle visibility of the lit and unlit models
    function toggleLitModel() {
        if (spacebarCooldown) {
            // If in cooldown, do nothing
            return;
        }

        const litModelVisible = model5.getAttribute('visible');

        // Toggle visibility of the lit and unlit models
        model4.setAttribute('visible', litModelVisible);
        model5.setAttribute('visible', !litModelVisible);

        // Play the sound when switching from unlit to lit version
        if (!litModelVisible) {
            litModelSound.components.sound.playSound();
        }

        // Set a timeout to switch back to the unlit version after 8 seconds
        setTimeout(function () {
            model4.setAttribute('visible', true);
            model5.setAttribute('visible', false);
            litModelSound.components.sound.pause();
        }, 8000);

        // Set cooldown to prevent spacebar from triggering during timeout
        spacebarCooldown = true;
        setTimeout(function () {
            spacebarCooldown = false;
        }, 8000);
    }

// Trigger the summer soundscape and insectParticles on page load
switchModels(model1, model2, model3, summerSound, winterSound, rainSound, insectParticles, snowParticles, rainParticles);

    // Event listener for the Enter key
    document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        // Determine which model is currently visible
        if (model1.getAttribute('visible')) {
            // Switch to rainy scene
            switchModels(model2, model1, model3, rainSound, winterSound, summerSound, rainParticles, insectParticles, snowParticles);
        } else if (model2.getAttribute('visible')) {
            // Switch to winter scene
            switchModels(model3, model1, model2, winterSound, rainSound, summerSound, snowParticles, insectParticles, rainParticles);
        } else if (model3.getAttribute('visible')) {
            // Switch back to summer scene
            switchModels(model1, model2, model3, summerSound, winterSound, rainSound, insectParticles, snowParticles, rainParticles);
        }
    }

    // Event listener for spacebar
    if (event.key === ' ') {
        // Toggle visibility of the lit and unlit models
        toggleLitModel();
    }
});

    // Function to update camera pivot rotation continuously
    function updateCameraPivotRotation() {
        const rotationSpeed = -0.002; // Adjust the rotation speed as needed

        // Increment the rotation of the camera pivot every frame
        cameraPivot.object3D.rotation.y += rotationSpeed;

        // Request the next animation frame
        requestAnimationFrame(updateCameraPivotRotation);
    }

    // Start the camera pivot rotation animation loop
    updateCameraPivotRotation();
});
