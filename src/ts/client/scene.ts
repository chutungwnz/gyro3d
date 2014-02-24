/// <reference path="../definitions/threejs/three.d.ts" />

THREE = require('threejs');

exports.scene = {

  init: function(container) {

    var WIDTH: number = 1024;
    var HEIGHT: number = 800;
    var ASPECT: number = WIDTH / HEIGHT;

    var renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
    var scene: THREE.Scene = new THREE.Scene();
    var camera: THREE.Camera;
    var cube: THREE.Mesh;
    var initialPitch: number = Math.PI / -2;

    function createGeometry(): void {
      var length: number = 100;
      var segments: number = 16;
      var point: number = 0.1;
      var tail: number = 10;

      var sphereMaterial: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial(
        {
          color: 0xCC0000
        });
      var pointGeometry: THREE.Geometry = new THREE.CylinderGeometry(point, tail, length, segments);
      var wingGeometry: THREE.Geometry = new THREE.CubeGeometry(50, 10, 5);
      
      for (var i = 0 ; i < wingGeometry.vertices.length; i++) {
        wingGeometry.vertices[i].y -= 50;
      }
      THREE.GeometryUtils.merge(pointGeometry, wingGeometry);

      cube = new THREE.Mesh(
          pointGeometry,
          sphereMaterial);
      cube.rotation.x = initialPitch;
      scene.add(cube);
    }

    function buildAxis(src: THREE.Vector3, dst: THREE.Vector3, colorHex: number, dashed:boolean): THREE.Line {
      var geom = new THREE.Geometry(), mat; 

      if (dashed) {
        mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
      } else {
        mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
      }

      geom.vertices.push( src.clone() );
      geom.vertices.push( dst.clone() );
      geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

      var axis = new THREE.Line( geom, mat, THREE.LinePieces );

      return axis;
    }

    function createAxes(): void {
      var axes = new THREE.Object3D();
      var length = 100;
      axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
      axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
      axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
      axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
      axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
      axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z

      scene.add(axes);
    }

    function createCamera(): void {
      var VIEW_ANGLE: number = 45;
      var NEAR: number = 0.1;
      var FAR: number = 10000;

      camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR);

      camera.position.z = 250;
      scene.add(camera);
    }

    function createLight(): void {
      var pointLight: THREE.Light = new THREE.PointLight(0xFFFFFF);
      pointLight.position.x = 10;
      pointLight.position.y = 50;
      pointLight.position.z = 130;

      scene.add(pointLight);
    }

    function render(): void {
      requestAnimationFrame(render);

      renderer.render(scene, camera);
    };

    function setup(): void {
      renderer.setSize(WIDTH, HEIGHT);
      container.append(renderer.domElement);
    }

    function getCubeRotation(): number[] {
      return [cube.rotation.x, cube.rotation.y, cube.rotation.z];
    }

    function setCubeRotation(axis: string, val: number) {
      switch (axis) {
        case 'x':
          cube.rotation.x = val + initialPitch;
          break;
        case 'y':
          cube.rotation.y = val;
          break;
        case 'z':
          cube.rotation.z = val;
          break;
      }
    }

    function setCameraPositionY(y: number) {
      camera.position.y = y;
    }

    function setCameraPositionZ(z: number) {
      camera.position.z = z;
    }

    function setCubeRotationWorld(axis: string, val: number) {
      switch (axis) {
        case 'x':
          var xAxis = new THREE.Vector3(1,0,0);
          rotateAroundWorldAxis(cube, xAxis, val);
          break;
        case 'y':
          var yAxis = new THREE.Vector3(0,1,0);
          rotateAroundWorldAxis(cube, yAxis, val);
          break;
        case 'z':
          var zAxis = new THREE.Vector3(0,0,1);
          rotateAroundWorldAxis(cube, zAxis, val);
          break;
      }
    }

    function setCubeRotationObject(axis: string, val: number) {
      switch (axis) {
        case 'x':
          var xAxis = new THREE.Vector3(1,0,0);
          rotateAroundObjectAxis(cube, xAxis, val);
          break;
        case 'y':
          var yAxis = new THREE.Vector3(0,1,0);
          rotateAroundObjectAxis(cube, yAxis, val);
          break;
        case 'z':
          var zAxis = new THREE.Vector3(0,0,1);
          rotateAroundObjectAxis(cube, zAxis, val);
          break;
      }
    }

    return {
      init: function (): void {
        createCamera();
        createLight();
        createGeometry();
        createAxes();
        setup();
        render();
      },

      getCubeRotation: function (): number[] {
        return getCubeRotation();
      },

      setCubeRotation: function(x: number, y: number, z: number): void {
        setCubeRotation('x', x);
        setCubeRotation('y', y);
        setCubeRotation('z', z);
      }

    }
  }
};