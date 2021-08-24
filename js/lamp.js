function addLampBase(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CylinderGeometry(6, 6, 1, 16);
    var material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addLampLeg(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CylinderGeometry(0.7, 0.7, 35);
    var material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addLampTop(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CylinderGeometry(1.7, 7, 7, 16, 1, true);
    var material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true, side: THREE.DoubleSide});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addLampBulb(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.SphereGeometry(1.5);
    var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createLamp(x, y, z) {
    'use strict';
    var lamp = new THREE.Object3D();

    addLampBase(lamp, 0, 0, 0);
    addLampLeg(lamp, 0, 18, 0);
    addLampTop(lamp, 0, 36, 0);
    addLampBulb(lamp, 0, 36, 0);

    lamp.position.x = x;
    lamp.position.y = y;
    lamp.position.z = z;

    scene.add(lamp);

    return lamp;
}