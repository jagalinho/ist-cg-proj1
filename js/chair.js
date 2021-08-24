function addChairBaseH(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CubeGeometry(15, 0.7, 1);
    var material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairBaseV(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CubeGeometry(1, 0.7, 15);
    var material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairWheel(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.TorusGeometry(0.5, 0.3, 8, 18);
    var material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotateY(Math.PI/2);
    obj.add(mesh);
    return mesh;
}

function addChairLeg(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CylinderGeometry(0.5, 0.8, 7, 12);
    var material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairBottom(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CubeGeometry(12, 1.5, 12);
    var material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairSupport(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CubeGeometry(3, 3, 1.5);
    var material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairBack(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CubeGeometry(12, 12, 1.5);
    var material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createChair(x, y, z) {
    'use strict';
    var chair = new THREE.Object3D();
    var chair_seat = new THREE.Object3D();
    var chair_wheels = [];

    addChairBaseH(chair, 0, 1, 0);
    addChairBaseV(chair, 0, 1, 0);
    chair_wheels.push(addChairWheel(chair, 0, 0, 7.2));
    chair_wheels.push(addChairWheel(chair, 0, 0, -7.2));
    chair_wheels.push(addChairWheel(chair, 7.2, 0, 0));
    chair_wheels.push(addChairWheel(chair, -7.2, 0, 0));
    addChairLeg(chair, 0, 4.5, 0);
    addChairBottom(chair_seat, 0, 8.7, 0);
    addChairSupport(chair_seat, 0, 9.5, 6.7);
    addChairBack(chair_seat, 0, 17, 6.7);
    
    chair.position.set(x, y, z);

    chair.add(chair_seat);
    scene.add(chair);

    return [chair, chair_seat, chair_wheels];
}