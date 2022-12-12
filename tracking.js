AFRAME.registerComponent('camera-tracking', {

  schema: {
    circleR: {type: 'float', default: 1},
    shiftX: {type: 'float', default: 0},
    shiftY: {type: 'float', default: 0}
  },

  tick: function () {
    var camera = document.querySelector('#camera');

    var cameraPosition = camera.object3D.position;
    var cameraRotation = camera.object3D.rotation;

    // center position
    var cameraX = cameraPosition.x;
    var cameraY = cameraPosition.y;
    var cameraZ = cameraPosition.z;

    // rotation degree
    var degreePit = (cameraRotation.x * 180 / Math.PI);
    var degreeYaw = (cameraRotation.y * 180 / Math.PI);

    // circle size
    var r = this.data.circleR;

    // rotation point
    var positionY = Math.sin(degreePit / 180 * Math.PI) * r;
    var xzr = Math.cos(degreePit / 180 * Math.PI) * r;
    var positionX = Math.cos((degreeYaw + 90) / 180 * Math.PI) * xzr;
    var positionZ = Math.sin((degreeYaw + 90) / 180 * Math.PI) * -1 * xzr;

    // shift x value
    var addX = this.data.shiftX;
    var addXPosX = Math.sin((degreeYaw + 90) / 180 * Math.PI) * addX;
    var addXPosZ = Math.cos((degreeYaw + 90) / 180 * Math.PI) * addX;

    // shift y value
    var addY = this.data.shiftY;
    var addYPosX = Math.sin(degreePit / 180 * Math.PI) * Math.cos((degreeYaw + 90) / 180 * Math.PI) * -1 * addY;
    var addYPosY = Math.sin((degreePit + 90) / 180 * Math.PI) * addY;
    var addYPosZ = Math.sin(degreePit / 180 * Math.PI) * Math.sin((degreeYaw + 90) / 180 * Math.PI) * addY;

    // set properties
    this.el.setAttribute('rotation', degreePit +' '+ degreeYaw +'  0');
    this.el.setAttribute('position', (positionX + cameraX + addXPosX + addYPosX)+' '+ (positionY + cameraY + addYPosY) +' '+ (positionZ + cameraZ + addXPosZ + addYPosZ));

  }
});