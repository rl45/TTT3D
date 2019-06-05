// HUD/Menu functions go here

function draw2D(menu, hud) {
    // Declare hud properties
    var hudWidth = hud.width;
    var widthCenter = hudWidth / 2;
    var hudHeight = hud.height;
    var heightCenter = hudHeight / 2;
    var h = heightCenter / 10;
    var w = widthCenter / 10;

    // Clear hud on each render
    menu.clearRect(0, 0, hudWidth, hudHeight);

    // Scuba Mask Overlay
        // mask top
    menu.fillStyle = "black";
    menu.beginPath();
    menu.moveTo(widthCenter, h);
    menu.bezierCurveTo(hudWidth, h, hudWidth, heightCenter/2, hudWidth, heightCenter/2);
    menu.lineTo(hudWidth, 0);
    menu.lineTo(0, 0);
    menu.lineTo(0, heightCenter / 2);
    menu.bezierCurveTo(0, heightCenter / 2, 0, h, widthCenter, h);
    menu.closePath();
    menu.fill();
        // mask hud
    menu.fillStyle = "gray";
    menu.fillRect(0, hudHeight - h, hudWidth, hudHeight);
        // mask bottom
    menu.fillStyle = "black";
    menu.beginPath();
    menu.moveTo(widthCenter, hudHeight - heightCenter/2);
    menu.lineTo(widthCenter + h / 2, hudHeight - heightCenter / 2 + 10);
    menu.lineTo(widthCenter + 2*h, hudHeight - h);
    menu.lineTo(hudWidth, hudHeight - 10);
    menu.lineTo(hudWidth, hudHeight);
    menu.lineTo(0, hudHeight);
    menu.lineTo(0, hudHeight - 10);
    menu.lineTo(widthCenter - 2*h, hudHeight - h);
    menu.lineTo(widthCenter - h/2, hudHeight - heightCenter / 2 + 10);
    menu.closePath();
    menu.fill();

    // Playtime HUD
    if (isPaused == false) {
        menu.fillStyle = "gray";
        menu.font = '16px "Times New Roman"';
        menu.fillText("[ESC] - Pause, Controls, & More", w/4, h);
    }

    // Pause Screen Overlay
    if (isPaused == true) {
        // Screen darkness
        menu.fillStyle = "rgba(0, 0, 0, 0.5)";
        menu.fillRect(0, 0, hudWidth, hudHeight);
        // Banner
            // Gradient background
                // Left
        var my_gradient = menu.createLinearGradient(hudWidth/4, 0, widthCenter, 0);
        my_gradient.addColorStop(0, "transparent");
        my_gradient.addColorStop(1, "white");
        menu.fillStyle = my_gradient;   // (from left to right) gradient = white -> black
        menu.fillRect(0, 2 * h + h/4, widthCenter + 1, h);   // Left Gradient
                // Right
        var my_gradient = menu.createLinearGradient(widthCenter, 0, hudWidth - hudWidth/4, 0);
        my_gradient.addColorStop(0, "white");
        my_gradient.addColorStop(1, "transparent");
        menu.fillStyle = my_gradient;   // (from left to right) gradient = black -> white
        menu.fillRect(widthCenter, 2 * h + h/4, hudWidth, h);   // Right Gradient
            // Pause text
        menu.fillStyle = "black";
        menu.font = '18px "Times New Roman"';
        menu.fillText("Game Paused", widthCenter - 60, 3 * h);
        //menu.fillText("Press ESC to unpause", widthCenter - 75, 4 * h);

        // Controls Window
            // Background
        menu.fillStyle = "rgba(1, 1, 1, 0.5)";
        menu.fillRect(widthCenter / 8, heightCenter / 2, widthCenter / 2 + w, heightCenter + heightCenter / 4);
            // Controls
        menu.fillStyle = "white";
        menu.fillText("--CONTROLS--", widthCenter/4, heightCenter/2 + h);
        menu.fillText("[ESC] Pause/Unpause", widthCenter/6, heightCenter/2 + 2*h);
        menu.fillText("< When Unpaused >", widthCenter/5, heightCenter/2 + 3*h);
        menu.fillText("[W] - Move Forward", widthCenter/6, heightCenter/2 + 4*h);
        menu.fillText("[A] - Move Left", widthCenter/6, heightCenter/2 + 5*h);
        menu.fillText("[S] - Move Back", widthCenter/6, heightCenter/2 + 6*h);
        menu.fillText("[D] - Move Right", widthCenter/6, heightCenter/2 + 7*h);
        menu.fillText("Mouse Click and Drag - Look Around", widthCenter/6, heightCenter/2 + 8*h);
        menu.fillText("Scroll up and down", widthCenter/6, heightCenter/2 + 9*h);

    }
}
