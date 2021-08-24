var currCamera, scene, renderer;

var view_size = 100;
var cameras = [], cameraTrackball;

var table, lamp, chair;

var clock, delta, arrow_set;
var chair_speed = 0, chair_accel = 0.5, chair_max_speed = 1;
var chair_rot_speed = 0, chair_rot_accel = 0.05, chair_rot_max_speed = 0.05;
var chair_speed_dir = new THREE.Vector3(0, 0, 1);

//trackball stuff
var trackballControls, trackball_clock;

function createScene() {
    'use strict';
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(10));
    
    table = createTable(0, 12.5, 0);
    lamp = createLamp(-37, 0.5, 0);
    chair = createChair(0, 0.7, 20);
}

function createCameras() {
    'use strict';
    var camera1, camera2, camera3, camera4;
    var aspect_ratio = innerWidth / innerHeight;

    //1
    camera1 = new THREE.OrthographicCamera(aspect_ratio * view_size / -2, aspect_ratio * view_size / 2, view_size / 2, view_size / -2, view_size * -1.5, view_size * 1.5);
    camera1.position.set(0, 1, 0);
    camera1.lookAt(scene.position);

    //2
    camera2 = new THREE.OrthographicCamera(aspect_ratio * view_size / -2, aspect_ratio * view_size / 2, view_size / 1.5, view_size / -2.5, view_size * -1.5, view_size * 1.5);
    camera2.position.set(0, 0, 1);
    camera2.lookAt(scene.position);
 
    //3 
    camera3 = new THREE.OrthographicCamera(aspect_ratio * view_size / -2, aspect_ratio * view_size / 2, view_size / 1.5, view_size / -2.5, view_size * -1.5, view_size * 1.5);
    camera3.position.set(-1, 0, 0);
    camera3.lookAt(scene.position);

    //3 
    camera4 = new THREE.OrthographicCamera(aspect_ratio * view_size / -2, aspect_ratio * view_size / 2, view_size / 1.5, view_size / -2.5, view_size * -1.5, view_size * 1.5);
    camera4.position.set(2, 1, 2);
    camera4.lookAt(scene.position);

    cameras.push(camera1, camera2, camera3, camera4);

    //Trackball
    cameraTrackball = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    cameraTrackball.position.set(50, 50, 50);
    cameraTrackball.lookAt(scene.position);

    trackballControls = new THREE.TrackballControls(cameraTrackball);
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 0.5;
    trackballControls.panSpeed = 1.0;

    //Set Default
    currCamera = cameras[3];
}

function moveChair() {
    'use strict';
    var move_accel = delta * chair_accel, rot_accel = delta * chair_rot_accel;

    chair_speed = chair_speed < 0 ? Math.min(chair_speed + move_accel, 0) : Math.max(chair_speed - move_accel, 0);
    chair_rot_speed = chair_rot_speed < 0 ? Math.min(chair_rot_speed + rot_accel, 0) : Math.max(chair_rot_speed - rot_accel, 0);

    move_accel *= 2, rot_accel *= 2;

    for (var arrowKey of arrow_set)
        switch (arrowKey) {
        case 38: //Up
            chair_speed -= move_accel;
            break;
        case 40: //Down
            chair_speed += move_accel;
            break;
        case 37: //Left
            chair_rot_speed += rot_accel;
            break;
        case 39: //Right
            chair_rot_speed -= rot_accel;
            break;
        }
    
    chair_speed = Math.min(Math.max(chair_speed, -chair_max_speed), chair_max_speed);
    chair_rot_speed = Math.min(Math.max(chair_rot_speed, -chair_rot_max_speed), chair_rot_max_speed);

    chair[1].rotateY(chair_rot_speed);
    chair[2].forEach(wheel => wheel.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), chair_rot_speed).rotateZ(chair_speed / (wheel.geometry.parameters.radius + wheel.geometry.parameters.tube)));
    chair_speed_dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), chair_rot_speed);
    chair[0].position.add(chair_speed_dir.clone().setLength(chair_speed));
}

function toggleWireframe() {
    'use strict';
    scene.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.material.wireframe = !node.material.wireframe;
        }
    });
}

function toggleAxisHelper() {
    'use strict';
    scene.traverse(function (node) {
        if (node instanceof THREE.AxesHelper) {
            node.visible = !node.visible;
        }
    });
}

function onResize() {
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        var aspect_ratio = innerWidth / innerHeight;
        cameras.forEach(camera => {
            camera.left = aspect_ratio * view_size / -2;
            camera.right = aspect_ratio * view_size / 2;
            camera.updateProjectionMatrix();
        });
    }
}

function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        toggleWireframe();
        break;
    case 69:  //E
    case 101: //e
        toggleAxisHelper();
        break;
    case 49: //1
        currCamera = cameras[0];
        break;
    case 50: //2
        currCamera = cameras[1];
        break;
    case 51: //3
        currCamera = cameras[2];
        break;
    case 52: //4
        currCamera = cameras[3];
        break;
    case 48: //0
        currCamera = cameraTrackball;
        break;
    case 38: //Up
    case 40: //Down
    case 37: //Left
    case 39: //Right
        arrow_set.add(e.keyCode);
        break;
    }
}

function onKeyUp(e) {
    'use strict';
    switch (e.keyCode) {
        case 38: //Up
        case 40: //Down
        case 37: //Left
        case 39: //Right
            arrow_set.delete(e.keyCode);
            break;
    }
}

function render() {
    'use strict';
    renderer.render(scene, currCamera);
    
    //trackball stuff
    if (currCamera === cameraTrackball)
        trackballControls.update(trackball_clock.getDelta());
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    clock = new THREE.Clock();
    arrow_set = new Set();

    //trackball stuff
    trackball_clock = new THREE.Clock();
   
    createScene();
    createCameras();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';
    delta = clock.getDelta();
    moveChair();
    render();
    requestAnimationFrame(animate);
}