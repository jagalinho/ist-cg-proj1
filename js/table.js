function addTableTop(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CubeGeometry(60, 3, 30);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addTableLeg(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CylinderGeometry(1.5, 1.5, 19, 12);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);
}

function createTable(x, y, z) {
    'use strict';
    var table = new THREE.Object3D();
   
    addTableTop(table, 0, 8, 0);
    addTableLeg(table, -27, 0, -12);
    addTableLeg(table, -27, 0, 12);
    addTableLeg(table, 27, 0, 12);
    addTableLeg(table, 27, 0, -12);
    
    table.position.x = x;
    table.position.y = y;
    table.position.z = z;

    scene.add(table);

    return table;
}