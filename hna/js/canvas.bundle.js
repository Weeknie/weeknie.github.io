/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");
/* harmony import */ var _circle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./circle */ "./src/js/circle.js");
/* harmony import */ var _utils_poissonDisc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/poissonDisc */ "./src/js/utils/poissonDisc.js");



var stepAnimation = false;
var runAnimation = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].initialRunAnimation;
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
addEventListener('keypress', function (event) {
  switch (event.code) {
    case 'Space':
      stepAnimation = true;
      break;

    case 'KeyP':
      runAnimation = !runAnimation;
      break;

    case 'KeyR':
      init();
      break;
  }
});
var circles;

function init() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  var k = 30;
  var dimensions = 2;
  var myPoisson = new _utils_poissonDisc__WEBPACK_IMPORTED_MODULE_2__["default"](canvas.width - _constants__WEBPACK_IMPORTED_MODULE_0__["default"].padding * 2, canvas.height - _constants__WEBPACK_IMPORTED_MODULE_0__["default"].padding * 2, _constants__WEBPACK_IMPORTED_MODULE_0__["default"].placementRadius, k, dimensions);
  myPoisson.run();
  circles = []; // circles.push(new Circle(context, canvas.width / 2, canvas.height / 2, canvas.width, canvas.height))

  circles = myPoisson.points.map(function (point) {
    return new _circle__WEBPACK_IMPORTED_MODULE_1__["default"](context, point.px + _constants__WEBPACK_IMPORTED_MODULE_0__["default"].padding, point.py + _constants__WEBPACK_IMPORTED_MODULE_0__["default"].padding, canvas.width, canvas.height);
  });
  circles.forEach(function (circle) {
    circle.draw();
  });
}

function animate(time) {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(function (circle) {
    circle.draw();
  });
}

var previousFrameTime = 0;

function updatePhysics() {
  var time = new Date().getTime();

  if (previousFrameTime == 0) {
    previousFrameTime = time;
    return;
  }

  var deltaTime = time - previousFrameTime;
  previousFrameTime = time;

  if (deltaTime > 20) {
    // Drop frame
    return;
  }

  if (stepAnimation) {
    stepAnimation = false;
  } else if (!runAnimation) {
    return;
  }

  circles.forEach(function (circle) {
    circle.calculateNewPosition(deltaTime, circles);
    circle.update();
  });

  if (circles.every(function (circle) {
    return circle.isInert();
  })) {
    // Restart the simulation
    init();
  }
}

setInterval(updatePhysics, 10);
init();
requestAnimationFrame(animate);

/***/ }),

/***/ "./src/js/circle.js":
/*!**************************!*\
  !*** ./src/js/circle.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Circle; });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./src/js/constants.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Circle = /*#__PURE__*/function () {
  function Circle(context, x, y, canvasWidth, canvasHeight) {
    _classCallCheck(this, Circle);

    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = _constants_js__WEBPACK_IMPORTED_MODULE_0__["default"].circleRadius;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.hue = Math.round(Math.random() * 360);
    this.color = "hsl(" + this.hue + ", 100%, 50%)";
    this.speed = {
      x: (Math.random() * 2 - 1) * _constants_js__WEBPACK_IMPORTED_MODULE_0__["default"].initialSpeed,
      y: (Math.random() * 2 - 1) * _constants_js__WEBPACK_IMPORTED_MODULE_0__["default"].initialSpeed
    };
    this.deleted = false;
  }

  _createClass(Circle, [{
    key: "draw",
    value: function draw() {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      this.context.fillStyle = this.color;
      this.context.fill();
      this.context.closePath();
    }
  }, {
    key: "calculateNewPosition",
    value: function calculateNewPosition(deltaTime, circles) {
      var _this = this;

      var accelerationFromCircles = circles.filter(function (circle) {
        return circle != _this && !circle.deleted;
      }).map(function (circle) {
        return _this.calculateAccelerationFromCircle(circle);
      }).reduce(function (acc, item) {
        return {
          x: acc.x + item.x,
          y: acc.y + item.y
        };
      }, {
        x: 0,
        y: 0
      });
      var accelerationFromBorder = this.calculateRepulsionFromBorder();
      this.speed.x += accelerationFromCircles.x + accelerationFromBorder.x - this.speed.x * _constants_js__WEBPACK_IMPORTED_MODULE_0__["default"].friction;
      this.speed.y += accelerationFromCircles.y + accelerationFromBorder.y - this.speed.y * _constants_js__WEBPACK_IMPORTED_MODULE_0__["default"].friction;
      this.newX = this.x + this.speed.x * deltaTime / 1000;
      this.newY = this.y + this.speed.y * deltaTime / 1000;
    }
  }, {
    key: "update",
    value: function update() {
      if (this.deleted) {
        return;
      }

      this.x = this.newX;
      this.y = this.newY;
    }
  }, {
    key: "isInert",
    value: function isInert() {
      return Math.sqrt(this.speed.x * this.speed.x + this.speed.y * this.speed.y) <= _constants_js__WEBPACK_IMPORTED_MODULE_0__["default"].inertThreshold;
    }
  }, {
    key: "calculateAccelerationFromCircle",
    value: function calculateAccelerationFromCircle(circle) {
      if (circle == this) {
        return;
      }

      var repulsion = this.calculateRepulsionFromCircle(circle);
      var attraction = this.calculateAttractionToCircle(circle);
      var direction = this.calculateDirectionToCircle(circle);
      return {
        x: direction.x * (attraction - repulsion),
        y: direction.y * (attraction - repulsion)
      };
    }
  }, {
    key: "calculateDistanceToCircle",
    value: function calculateDistanceToCircle(circle) {
      var deltaX = circle.x - this.x;
      var deltaY = circle.y - this.y;
      return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
  }, {
    key: "calculateDirectionToCircle",
    value: function calculateDirectionToCircle(circle) {
      var distance = this.calculateDistanceToCircle(circle);
      return {
        x: (circle.x - this.x) / distance,
        y: (circle.y - this.y) / distance
      };
    }
  }, {
    key: "calculateRepulsionFromBorder",
    value: function calculateRepulsionFromBorder() {
      var acceleration = {
        x: 0,
        y: 0
      };
      acceleration.x = this.calculateRepulsionFromDistance(Math.max(Math.min(this.x, this.canvasWidth - this.x), 0)) * (this.x > this.canvasWidth / 2 ? -1 : 1);
      acceleration.y = this.calculateRepulsionFromDistance(Math.max(Math.min(this.y, this.canvasHeight - this.y), 0)) * (this.y > this.canvasHeight / 2 ? -1 : 1);
      return acceleration;
    }
  }, {
    key: "calculateRepulsionFromCircle",
    value: function calculateRepulsionFromCircle(circle) {
      var distance = this.calculateDistanceToCircle(circle);
      return this.calculateRepulsionFromDistance(distance);
    }
  }, {
    key: "calculateRepulsionFromDistance",
    value: function calculateRepulsionFromDistance(distance) {
      return Math.exp(-distance / _constants_js__WEBPACK_IMPORTED_MODULE_0__["default"].repulsionScale) * _constants_js__WEBPACK_IMPORTED_MODULE_0__["default"].repulsionAmplitude;
    }
  }, {
    key: "calculateAttractionToCircle",
    value: function calculateAttractionToCircle(circle) {
      var distance = this.calculateDistanceToCircle(circle);
      var deltaHue = Math.min(Math.abs(this.hue - circle.hue), 360 - Math.abs(this.hue - circle.hue));
      var deltaHueFactor = 1 - deltaHue / 180;
      var attractionFactor = deltaHueFactor;
      return (distance - _constants_js__WEBPACK_IMPORTED_MODULE_0__["default"].attractionOffset) / Math.exp(distance / _constants_js__WEBPACK_IMPORTED_MODULE_0__["default"].attractionScale) * _constants_js__WEBPACK_IMPORTED_MODULE_0__["default"].attractionAmplitude * attractionFactor;
    }
  }]);

  return Circle;
}();



/***/ }),

/***/ "./src/js/constants.js":
/*!*****************************!*\
  !*** ./src/js/constants.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  initialRunAnimation: true,
  circleRadius: 10,
  placementRadius: 40,
  padding: 200,
  initialSpeed: 0,
  repulsionAmplitude: 1000,
  repulsionScale: 20,
  attractionScale: 90,
  attractionAmplitude: 0.15,
  attractionOffset: 20,
  friction: 0.22,
  inertThreshold: 1
});

/***/ }),

/***/ "./src/js/utils/poissonDisc.js":
/*!*************************************!*\
  !*** ./src/js/utils/poissonDisc.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PoissonDisc; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * A Poisson Disc Sampling routine - randomly but evenly place dots on the screen..
 *
 * @property {Number} width - Width of the display in pixels
 * @property {Number} height - Height of the display in pixels
 * @property {Number} r - The minimum distance between points
 * @property {Number} k - Number of tries to make a new point before giving up
 * @property {Number} n - n-dimensional grid
 * @property {Number} cellSize - The size of the grid cell = r / sqrt(n)
 * @property {Number} cols - Number of columns in the grid
 * @property {Number} rows - Number of rows in the grid
 * @property {Object[]} points - Array of points already plotted
 * @property {Number[]} active - Array of active points indices
 * @property {Number[]} grid - Grid array of point indices
 * @author Matthew Page <work@mjp.co>
 */
var PoissonDisc = /*#__PURE__*/function () {
  /**
   * Create a new disc sampler
   *
   * @param {Number} w - Width of the display in pixels
   * @param {Number} h - Height of the display in pixels
   * @param {Number} r - The minimum distance between points
   * @param {Number} k - Number of tries to make a new point before giving up
   * @param {Number} n - n-dimensional grid
   */
  function PoissonDisc(w, h, r, k, n) {
    _classCallCheck(this, PoissonDisc);

    this.width = w;
    this.height = h;
    this.r = r;
    this.k = k;
    this.n = n;
    this.cellSize = Math.floor(this.r / Math.sqrt(this.n));
    this.cols = Math.floor(this.width / this.cellSize);
    this.rows = Math.floor(this.height / this.cellSize);
    this.points = [];
    this.active = [];
    this.grid = [];
    this.reset();
  }
  /**
   * Reset the algorithm and data
   */


  _createClass(PoissonDisc, [{
    key: "reset",
    value: function reset() {
      this.points = [];
      this.active = [];
      this.grid = [];
      this.initialiseGrid();
      this.addPoint(this.getRandom(0, this.width), this.getRandom(0, this.height));
    }
    /**
     * Run the algorithm till the end
     */

  }, {
    key: "run",
    value: function run() {
      this.reset();

      while (this.active.length > 0) {
        this.step(1);
      }
    }
    /**
     * Take a single or n steps through the algorithm
     */

  }, {
    key: "step",
    value: function step(n) {
      /* Take one or 'n' steps */
      for (var l = 0; l < n; l += 1) {
        /* While there are still active points */
        if (this.active.length > 0) {
          /* Get a random point from the Active list */
          var randomActive = this.getRandom(0, this.active.length);
          var currentPoint = this.points[this.active[randomActive]];
          /* Track if we manage to find a new point from this one */

          var foundNewPoint = false;
          /* Generate up to k points randomly between r and 2r */

          for (var tries = 0; tries < this.k; tries += 1) {
            /* Is the new point valid, start assuming it is */
            var pointValid = true;
            /* Uniformly distribute the angle or random, not clear in the docs */

            var newAngle = Math.floor(Math.random() * (Math.PI * 2));
            /* Get a random distance r to 2r */

            var newDist = this.getRandom(this.r, this.r * 2);
            /* Calculate the new position */

            var offsetX = Math.cos(newAngle) * newDist;
            var offsetY = Math.sin(newAngle) * newDist;
            var newX = Math.floor(currentPoint.px + offsetX);
            var newY = Math.floor(currentPoint.py + offsetY);
            var newGridX = Math.floor(newX / this.cellSize);
            var newGridY = Math.floor(newY / this.cellSize);

            if (newX > 0 && newX < this.width && newY > 0 && newY < this.height) {
              /* It is inside the screen area */
              if (this.grid[newGridY][newGridX] < 0) {
                /* There is not a point at this grid reference - get the neighbours */
                for (var i = -1; i <= 1; i++) {
                  for (var j = -1; j <= 1; j++) {
                    /* Each neighbour grid location */
                    var neighbourGridX = newGridX + j;
                    var neighbourGridY = newGridY + i;

                    if (neighbourGridX >= 0 && neighbourGridY >= 0 && neighbourGridX <= this.cols && neighbourGridY <= this.rows && (neighbourGridX !== newGridX || neighbourGridY !== newGridY)) {
                      /* Neighbour is within the grid and not the centre point */
                      if (this.grid[neighbourGridY][neighbourGridX] >= 0) {
                        /* It has a point in it - check how far away it is */
                        var neighbourIndex = this.grid[neighbourGridY][neighbourGridX];
                        var neighbour = this.points[neighbourIndex];
                        var dist = Math.sqrt((newX - neighbour.px) * (newX - neighbour.px) + (newY - neighbour.py) * (newY - neighbour.py));
                        /* Invalid, to close to a neighbour point */

                        if (dist < this.r) pointValid = false;
                      }
                    }
                  }
                }
              } else {
                /* Invalid, there is already a point in this cell */
                pointValid = false;
              }
            } else {
              /* Invalid, point is outside the grid */
              pointValid = false;
            }

            if (pointValid) {
              /* Valid, add this point */
              foundNewPoint = true;
              this.addPoint(newX, newY);
            }
          } // For tries...


          if (!foundNewPoint) {
            /* Didn't find a new point after k tries - remove this point from Active list */
            this.active.splice(randomActive, 1);
          }
        }
      } // n loop

    }
    /**
     * Add a new point to the points, grid and active arrays. Points array holds the
     * point data and grid / active hold indices to the points array.
     *
     * @param {Number} x - The pixel X position of the point
     * @param {Number} y - The pixel Y position of the point
     */

  }, {
    key: "addPoint",
    value: function addPoint(x, y) {
      var point = {
        px: parseInt(x),
        py: parseInt(y),
        gx: Math.floor(parseInt(x) / this.cellSize),
        gy: Math.floor(parseInt(y) / this.cellSize)
      };
      var pointIndex = this.points.length;
      this.points.push(point);
      this.grid[point.gy][point.gx] = pointIndex;
      this.active.push(pointIndex);
    }
    /**
     * Initialise the empty background grid array 
     */

  }, {
    key: "initialiseGrid",
    value: function initialiseGrid() {
      for (var y = 0; y <= this.rows; y += 1) {
        this.grid[y] = [];

        for (var x = 0; x <= this.cols; x += 1) {
          this.grid[y][x] = -1;
        }
      }
    }
    /**
     * Get a random integar between min and max
     *
     * @param {Number} min - The minimum value
     * @param {Number} max - The maximum value
     * @returns {Number} Random number from min to max
     */

  }, {
    key: "getRandom",
    value: function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }]);

  return PoissonDisc;
}();



/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map