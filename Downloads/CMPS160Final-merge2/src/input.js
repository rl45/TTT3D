var _inputHandler = null;
var isMouseDown = false;
var numClicks = 0;
var keys = {};

var moveFwd = false;
var moveBkwd = false;
var moveLeft = false;
var moveRight = false;

var isPerspectiveOn = true;
var wall_size = 5;  // declare wall size here
var delta = 0;
var isPaused = false;

var harpoon;

/**
 * Specifies a Input Handler. Used to parse input events from a HTML page.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */
class InputHandler {
    /**
     * Initializes the event handeling functions within the program.
     */
    constructor(canvas, scene, camera, walls, hud) {
        this.canvas = canvas;
        this.scene  = scene;
        this.camera = camera;
        this.walls = walls;
        this.hud = hud;

        _inputHandler = this;

        // User Input
        // Mouse Events
        this.hud.onmousedown = function () {
            console.log("mousedown");
            isMouseDown = true;
        }
        this.hud.onmouseup = function () {
            isMouseDown = false;
        }
        this.hud.onmousemove = function (ev) {
            if (isPaused == false) {
                if (isMouseDown == true) {
                    var movementX = ev.movementX;
                    if (movementX != 0) {
                        camera.pan(movementX);
                    }

                    var movementY = ev.movementY;
                    if (movementY != 0) {
                        camera.tilt(movementY);
                    }
                }
            }
        }

        // Keyboard Events
        document.addEventListener('keydown', function (ev) {
            _inputHandler.keyDown(ev);
        }, false);

        document.addEventListener('keyup', function (ev) {
            _inputHandler.keyUp(ev);
        }, false);

        document.addEventListener('click', function (ev) {
            _inputHandler.mouseClick(ev);
        }, false);


        // Mousewheel Events
        document.addEventListener("wheel", function (ev) {
            _inputHandler.wheel(ev);
        }, false);


        // Create sky cube
        _inputHandler.readTexture("objs/skyblue.jpg", function (sky_image) {
            var shape = new WallCube(texture_shader, 0, 0, 200, sky_image, 1);
            scene.addGeometry(shape);
            console.log("added sky cube");
        });

        var seascape = new Seascape(this.scene, this.camera);
        var waves = new Waves(this.scene, this.camera);


        document.getElementById('OBJButton').onclick = function() { _inputHandler.readSelectedFile() };

        // Create spheres
        var sphere1 = new Sphere(textureless_shader, 10, 0, 0, -1);
        var sphere2 = new Sphere(textureless_shader, 32, 1, 0, -3);
        this.scene.addGeometry(sphere1);
        this.scene.addGeometry(sphere2);

        const sound = new Audio();
        sound.src = "sounds/water.mp3"
        sound.play();

        /*_inputHandler.httpGetUrl("/objs/spear.obj", function(objStr) {
            harpoon =  new CustomObj(shader, objStr);
            this.scene.addGeometry(spear);
            console.log("Added Spear");

        });*/


    }

    /**
     * Function called upon mouse click.
     **/
    mouseClick(ev) {
        // Print x,y coordinates.
        console.log(ev.clientX, ev.clientY);

        //var shape = new Triangle(shader,0,0, _inputHandler.image);
        //this.scene.addGeometry(shape);

        const sound = new Audio();
        sound.src = "sounds/hit.mp3"
        sound.play();

        if(harpoon != null){
          harpoon.attack();
        }


    }

    keyUp(ev) {
        var keyName = ev.key;

        if (keyName == "a") {
            moveLeft = false;
        }
        else if (keyName == "d") {
            moveRight = false;
        }
        else if (keyName == "w") {
            moveFwd = false;
        }
        else if (keyName == "s") {
            moveBkwd = false;
        }
    }

    keyDown(ev) {
        var keyName = ev.key;
        if (isPaused == false) {
            //console.log("keydown");
            if (keyName == "a") {
                moveLeft = true;
                //console.log(keyName, ": truck -");
            }
            else if (keyName == "d") {
                moveRight = true;
                //console.log(keyName, ": truck +");
            }
            else if (keyName == "w") {
                moveFwd = true;
                //console.log(keyName, ": dolly +");
            }
            else if (keyName == "s") {
                moveBkwd = true;
                const sound = new Audio();
                sound.src = "sounds/swim.mp3"
                sound.play();
                //console.log(keyName, ": dolly -");
            }
            else if (keyName == "Escape") {
                isPaused = true;
                //_inputHandler.drawPauseMenu();
                console.log("escape down, ispaused = true");
            }
        }
        else {
            if (keyName == "Escape") {
                isPaused = false;
                //_inputHandler.drawPauseMenu();
                console.log("escape down, ispaused = false");
            }
        }

    }

    moveCamera() {
        //console.log("moveCamera");
        // Move based on direction booleans
        if (moveFwd == true) {
            _inputHandler.camera.dolly(-1);
        }
        if (moveBkwd == true) {
            _inputHandler.camera.dolly(1);
        }
        if (moveLeft == true) {
            _inputHandler.camera.truck(-1);
        }
        if (moveRight == true) {
            _inputHandler.camera.truck(1);
        }
        return true;
    }

    drawPauseMenu() {
        if (isPaused == true) {
            // draw pause screen
            _inputHandler.readTexture("objs/pause_screen_v1.jpg", function (hud_image) {
                var HUD = new FlatSquare(texture_shader, 0, 0, 100, hud_image, 1);
                _inputHandler.scene.addGeometry(HUD);
                console.log("added HUD");
            });
        }
        else {
            // remove pause screen
            _inputHandler.scene.removeGeometry(HUD);
            console.log("removed HUD");
        }
    }

    wheel(ev) {
        if (isPaused == false) {
            if (ev.deltaY < 0) {
                console.log('scrolling up');
                if (delta < 80) {
                    delta = delta + 1;
                }
                _inputHandler.camera.zoom(delta);
            }
            if (ev.deltaY > 0) {
                console.log('scrolling down');
                if (delta > -80) {
                    delta = delta - 1;
                }
                _inputHandler.camera.zoom(delta)
            }
        }
    }


    /**
     * Function called to read a selected file.
     */
    readSelectedFile() {
        var fileReader = new FileReader();
        var objFile = document.getElementById("fileInput").files[0];

        if (!objFile) {
            alert("OBJ file not set!");
            return;
        }

        fileReader.readAsText(objFile);
        fileReader.onloadend = function() {
            //alert(fileReader.result);
            harpoon =  new CustomOBJ(shader, fileReader.result)
            _inputHandler.scene.addGeometry(harpoon);
        }

    }


    readTexture(src, onTexLoad) {
        // Create the image object
        var image = new Image();
        if (!image) {
          console.log('Failed to create the image object');
          return false;
        }

        // Register the event handler to be called on loading an image
        image.onload = function() {
            _inputHandler.image = image;
            onTexLoad(image);
        };

        // Tell the browser to load an image
        image.src = src
        return true;
    }

    /**
<<<<<<< HEAD
     * Author: {Lucas Ferreira}
    * Pulls a file from a local server
    *    you can call this function as follows (assuming you started a web server on port 8000): httpGetUrl("localhost:8000/objs/cat.obj")
    *    If you want to read about XMLHttpRequest:https://www.w3schools.com/xml/xml_http.asp
    *
    * For this project, used to load in an OBJ without FileReader, which demands a user input
    *
    * To use, first start a local server on your project's folder via your computer's terminal and entering "python -m http.server"
    */

    //httpGetUrl("objs/cat.obj", function(objStr) {
        //  var cat = new CUstomObj(shader, objStr, image)
     //});
    httpGetUrl(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    }
}
