(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./web-src/canvas.js":
/*!***************************!*\
  !*** ./web-src/canvas.js ***!
  \***************************/
/*! exports provided: canvas, ctx, getDimensions, clientToLocalCoords, correctCanvasDimensions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"canvas\", function() { return canvas; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ctx\", function() { return ctx; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDimensions\", function() { return getDimensions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clientToLocalCoords\", function() { return clientToLocalCoords; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"correctCanvasDimensions\", function() { return correctCanvasDimensions; });\nconst canvas = document.getElementById('nzsc-canvas');\n\nconst ctx = canvas.getContext('2d');\n\nconst DIMENSIONS = {\n  width: 1800,\n  height: 1000,\n};\n\nconst sizeCanvas = (canvas, dimensions) => {\n  const wFactor = window.innerWidth / dimensions.width;\n  const hFactor = window.innerHeight / dimensions.height;\n  const scaleFactor = Math.min(wFactor, hFactor);\n  const cssWidth = dimensions.width * scaleFactor;\n  const cssHeight = dimensions.height * scaleFactor;\n\n  canvas.width = dimensions.width;\n  canvas.height = dimensions.height;\n\n  canvas.style.width = cssWidth + 'px';\n  canvas.style.height = cssHeight + 'px';\n\n  canvas.style.position = 'fixed';\n  canvas.style.left = (window.innerWidth - cssWidth) / 2 + 'px';\n  canvas.style.top = (window.innerHeight - cssHeight) / 2 + 'px';\n};\n\nconst correctCanvasDimensions = () => {\n  sizeCanvas(canvas, DIMENSIONS);\n}\n\ncorrectCanvasDimensions();\n\nconst getDimensions = () => {\n  return {\n    width: canvas.width,\n    height: canvas.height,\n  };\n};\n\nconst clientToLocalCoords = (x, y) => {\n  const br = canvas.getBoundingClientRect();\n\n  x -= br.left;\n  y -= br.top;\n\n  const wFactor = window.innerWidth / canvas.width;\n  const hFactor = window.innerHeight / canvas.height;\n  const scaleFactor = Math.min(wFactor, hFactor);\n\n  x /= scaleFactor;\n  y /= scaleFactor;\n\n  return [x, y];\n};\n\n\n\n\n//# sourceURL=webpack:///./web-src/canvas.js?");

/***/ }),

/***/ "./web-src/circle.js":
/*!***************************!*\
  !*** ./web-src/circle.js ***!
  \***************************/
/*! exports provided: nthCircle, getCircleIndexAt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nthCircle\", function() { return nthCircle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCircleIndexAt\", function() { return getCircleIndexAt; });\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ \"./web-src/canvas.js\");\n\n\nconst CIRCLE = {\n  radius: 210,\n  margin: 100,\n};\n\n// Returns an array representing a circle: [x, y, r]\nconst nthCircle = (n) => {\n  const dimensions = Object(_canvas__WEBPACK_IMPORTED_MODULE_0__[\"getDimensions\"])();\n  const w = dimensions.width;\n  const h = dimensions.height;\n  const r = CIRCLE.radius;\n  const m = CIRCLE.margin;\n\n  // Top horizontal margin\n  const thm = (w - 6*r - 2*m) / 2;\n  // Bottom horizontal margin\n  const bhm = (w - 4*r - m) / 2;\n  // Vertical margin\n  const vm = (h - 4*r -m) / 2;\n\n  const circleCoords = [\n    [thm + r, vm + r],\n    [thm + 3*r + m, vm + r],\n    [thm + 5*r + 2*m, vm + r],\n    [bhm + r, vm + 3*r + m],\n    [bhm + 3*r + m, vm + 3*r + m]\n  ];\n\n  if (!(n in circleCoords)) {\n    throw new RangeError('nthCircle() expects 0 <= n <= 4');\n  }\n\n  return circleCoords[n].concat([r]);\n};\n\nconst getCircleIndexAt = (x, y) => {\n  const dimensions = Object(_canvas__WEBPACK_IMPORTED_MODULE_0__[\"getDimensions\"])();\n  const circles = [0, 1, 2, 3, 4].map(i => nthCircle(i, dimensions.width, dimensions.height));\n\n  for (const i in circles) {\n    const [cx, cy, cr] = circles[i];\n\n    const dx = cx - x;\n    const dy = cy - y;\n\n    if (dx*dx + dy*dy <= cr*cr) {\n      return i;\n    }\n  }\n\n  return -1;\n};\n\n\n\n\n//# sourceURL=webpack:///./web-src/circle.js?");

/***/ }),

/***/ "./web-src/getBackgroundColorOf.js":
/*!*****************************************!*\
  !*** ./web-src/getBackgroundColorOf.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _logos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logos */ \"./web-src/logos.js\");\n\n\nconst colors = {\n  '#111': `\n    NoBooster\n    Kick\n    Nunchucks\n    ShadowFireball\n    RunInCircles\n    LightningFastKarateChop\n    Rampage\n    Muscle\n    Zap\n    Gravedigger\n    ZombieCorps\n    Apocalypse\n    Helmet\n    Smash\n    Lightning\n    Earthquake\n    Nose\n    NoseOfTheTaunted\n  `.trim().split('\\n').map(str => str.trim()),\n\n  '#ddd': `\n    NinjaSword\n    ShadowSlip\n    Regenerate\n    SamuraiSword\n    Twist\n    Bend\n    AcidSpray\n    MustacheMash\n    BigHairyDeal\n  `.trim().split('\\n').map(str => str.trim()),\n  '#888': `\n    BackwardsMoustachio\n    JugglingKnives\n  `.trim().split('\\n').map(str => str.trim()),\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((moveName) => {\n  for (const color in colors) {\n    if (colors[color].includes(Object(_logos__WEBPACK_IMPORTED_MODULE_0__[\"noSpace\"])(moveName))) {\n      return color;\n    }\n  }\n\n  throw new TypeError(moveName + ' has no defined background color!');\n});\n\n\n//# sourceURL=webpack:///./web-src/getBackgroundColorOf.js?");

/***/ }),

/***/ "./web-src/images.js":
/*!***************************!*\
  !*** ./web-src/images.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _images_Kick_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images/Kick.png */ \"./web-src/images/Kick.png\");\n/* harmony import */ var _images_Kick_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_images_Kick_png__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _images_NinjaSword_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/NinjaSword.png */ \"./web-src/images/NinjaSword.png\");\n/* harmony import */ var _images_NinjaSword_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_images_NinjaSword_png__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _images_Nunchucks_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/Nunchucks.png */ \"./web-src/images/Nunchucks.png\");\n/* harmony import */ var _images_Nunchucks_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_images_Nunchucks_png__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _images_ShadowFireball_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/ShadowFireball.png */ \"./web-src/images/ShadowFireball.png\");\n/* harmony import */ var _images_ShadowFireball_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_images_ShadowFireball_png__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _images_ShadowSlip_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./images/ShadowSlip.png */ \"./web-src/images/ShadowSlip.png\");\n/* harmony import */ var _images_ShadowSlip_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_images_ShadowSlip_png__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _images_RunInCircles_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images/RunInCircles.png */ \"./web-src/images/RunInCircles.png\");\n/* harmony import */ var _images_RunInCircles_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_images_RunInCircles_png__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _images_LightningFastKarateChop_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/LightningFastKarateChop.png */ \"./web-src/images/LightningFastKarateChop.png\");\n/* harmony import */ var _images_LightningFastKarateChop_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_images_LightningFastKarateChop_png__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _images_Rampage_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/Rampage.png */ \"./web-src/images/Rampage.png\");\n/* harmony import */ var _images_Rampage_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_images_Rampage_png__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _images_Muscle_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./images/Muscle.png */ \"./web-src/images/Muscle.png\");\n/* harmony import */ var _images_Muscle_png__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_images_Muscle_png__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _images_Zap_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./images/Zap.png */ \"./web-src/images/Zap.png\");\n/* harmony import */ var _images_Zap_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_images_Zap_png__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _images_Regenerate_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./images/Regenerate.png */ \"./web-src/images/Regenerate.png\");\n/* harmony import */ var _images_Regenerate_png__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_images_Regenerate_png__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _images_Gravedigger_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./images/Gravedigger.png */ \"./web-src/images/Gravedigger.png\");\n/* harmony import */ var _images_Gravedigger_png__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_images_Gravedigger_png__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _images_ZombieCorps_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./images/ZombieCorps.png */ \"./web-src/images/ZombieCorps.png\");\n/* harmony import */ var _images_ZombieCorps_png__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_images_ZombieCorps_png__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _images_Apocalypse_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./images/Apocalypse.png */ \"./web-src/images/Apocalypse.png\");\n/* harmony import */ var _images_Apocalypse_png__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_images_Apocalypse_png__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _images_SamuraiSword_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./images/SamuraiSword.png */ \"./web-src/images/SamuraiSword.png\");\n/* harmony import */ var _images_SamuraiSword_png__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_images_SamuraiSword_png__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var _images_Helmet_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./images/Helmet.png */ \"./web-src/images/Helmet.png\");\n/* harmony import */ var _images_Helmet_png__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_images_Helmet_png__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var _images_Smash_png__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./images/Smash.png */ \"./web-src/images/Smash.png\");\n/* harmony import */ var _images_Smash_png__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_images_Smash_png__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var _images_Lightning_png__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./images/Lightning.png */ \"./web-src/images/Lightning.png\");\n/* harmony import */ var _images_Lightning_png__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_images_Lightning_png__WEBPACK_IMPORTED_MODULE_17__);\n/* harmony import */ var _images_Earthquake_png__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./images/Earthquake.png */ \"./web-src/images/Earthquake.png\");\n/* harmony import */ var _images_Earthquake_png__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_images_Earthquake_png__WEBPACK_IMPORTED_MODULE_18__);\n/* harmony import */ var _images_Twist_png__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./images/Twist.png */ \"./web-src/images/Twist.png\");\n/* harmony import */ var _images_Twist_png__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_images_Twist_png__WEBPACK_IMPORTED_MODULE_19__);\n/* harmony import */ var _images_Bend_png__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./images/Bend.png */ \"./web-src/images/Bend.png\");\n/* harmony import */ var _images_Bend_png__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_images_Bend_png__WEBPACK_IMPORTED_MODULE_20__);\n/* harmony import */ var _images_JugglingKnives_png__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./images/JugglingKnives.png */ \"./web-src/images/JugglingKnives.png\");\n/* harmony import */ var _images_JugglingKnives_png__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_images_JugglingKnives_png__WEBPACK_IMPORTED_MODULE_21__);\n/* harmony import */ var _images_AcidSpray_png__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./images/AcidSpray.png */ \"./web-src/images/AcidSpray.png\");\n/* harmony import */ var _images_AcidSpray_png__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_images_AcidSpray_png__WEBPACK_IMPORTED_MODULE_22__);\n/* harmony import */ var _images_Nose_png__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./images/Nose.png */ \"./web-src/images/Nose.png\");\n/* harmony import */ var _images_Nose_png__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_images_Nose_png__WEBPACK_IMPORTED_MODULE_23__);\n/* harmony import */ var _images_BackwardsMoustachio_png__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./images/BackwardsMoustachio.png */ \"./web-src/images/BackwardsMoustachio.png\");\n/* harmony import */ var _images_BackwardsMoustachio_png__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_images_BackwardsMoustachio_png__WEBPACK_IMPORTED_MODULE_24__);\n/* harmony import */ var _images_NoseOfTheTaunted_png__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./images/NoseOfTheTaunted.png */ \"./web-src/images/NoseOfTheTaunted.png\");\n/* harmony import */ var _images_NoseOfTheTaunted_png__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_images_NoseOfTheTaunted_png__WEBPACK_IMPORTED_MODULE_25__);\n/* harmony import */ var _images_MustacheMash_png__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./images/MustacheMash.png */ \"./web-src/images/MustacheMash.png\");\n/* harmony import */ var _images_MustacheMash_png__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_images_MustacheMash_png__WEBPACK_IMPORTED_MODULE_26__);\n/* harmony import */ var _images_BigHairyDeal_png__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./images/BigHairyDeal.png */ \"./web-src/images/BigHairyDeal.png\");\n/* harmony import */ var _images_BigHairyDeal_png__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_images_BigHairyDeal_png__WEBPACK_IMPORTED_MODULE_27__);\n/* harmony import */ var _images_NoBooster_png__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./images/NoBooster.png */ \"./web-src/images/NoBooster.png\");\n/* harmony import */ var _images_NoBooster_png__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_images_NoBooster_png__WEBPACK_IMPORTED_MODULE_28__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst srcs = {Kick: (_images_Kick_png__WEBPACK_IMPORTED_MODULE_0___default()), NinjaSword: (_images_NinjaSword_png__WEBPACK_IMPORTED_MODULE_1___default()), Nunchucks: (_images_Nunchucks_png__WEBPACK_IMPORTED_MODULE_2___default()), ShadowFireball: (_images_ShadowFireball_png__WEBPACK_IMPORTED_MODULE_3___default()), ShadowSlip: (_images_ShadowSlip_png__WEBPACK_IMPORTED_MODULE_4___default()), RunInCircles: (_images_RunInCircles_png__WEBPACK_IMPORTED_MODULE_5___default()), LightningFastKarateChop: (_images_LightningFastKarateChop_png__WEBPACK_IMPORTED_MODULE_6___default()), Rampage: (_images_Rampage_png__WEBPACK_IMPORTED_MODULE_7___default()), Muscle: (_images_Muscle_png__WEBPACK_IMPORTED_MODULE_8___default()), Zap: (_images_Zap_png__WEBPACK_IMPORTED_MODULE_9___default()), Regenerate: (_images_Regenerate_png__WEBPACK_IMPORTED_MODULE_10___default()), Gravedigger: (_images_Gravedigger_png__WEBPACK_IMPORTED_MODULE_11___default()), ZombieCorps: (_images_ZombieCorps_png__WEBPACK_IMPORTED_MODULE_12___default()), Apocalypse: (_images_Apocalypse_png__WEBPACK_IMPORTED_MODULE_13___default()), SamuraiSword: (_images_SamuraiSword_png__WEBPACK_IMPORTED_MODULE_14___default()), Helmet: (_images_Helmet_png__WEBPACK_IMPORTED_MODULE_15___default()), Smash: (_images_Smash_png__WEBPACK_IMPORTED_MODULE_16___default()), Lightning: (_images_Lightning_png__WEBPACK_IMPORTED_MODULE_17___default()), Earthquake: (_images_Earthquake_png__WEBPACK_IMPORTED_MODULE_18___default()), Twist: (_images_Twist_png__WEBPACK_IMPORTED_MODULE_19___default()), Bend: (_images_Bend_png__WEBPACK_IMPORTED_MODULE_20___default()), JugglingKnives: (_images_JugglingKnives_png__WEBPACK_IMPORTED_MODULE_21___default()), AcidSpray: (_images_AcidSpray_png__WEBPACK_IMPORTED_MODULE_22___default()), Nose: (_images_Nose_png__WEBPACK_IMPORTED_MODULE_23___default()), BackwardsMoustachio: (_images_BackwardsMoustachio_png__WEBPACK_IMPORTED_MODULE_24___default()), NoseOfTheTaunted: (_images_NoseOfTheTaunted_png__WEBPACK_IMPORTED_MODULE_25___default()), MustacheMash: (_images_MustacheMash_png__WEBPACK_IMPORTED_MODULE_26___default()), BigHairyDeal: (_images_BigHairyDeal_png__WEBPACK_IMPORTED_MODULE_27___default()), NoBooster: (_images_NoBooster_png__WEBPACK_IMPORTED_MODULE_28___default()), };\n\nconst imageLoadPromises = [];\n\nconst images = Object.keys(srcs).reduce((obj, srcKey) => {\n  const img = new Image();\n  img.src = srcs[srcKey];\n\n  imageLoadPromises.push(new Promise((resolve, reject) => {\n    img.addEventListener('load', () => {\n      resolve();\n    });\n  }));\n\n  return {\n    ...obj,\n    [srcKey]: img,\n  };\n}, {});\n\nimages.waitForAllToLoad = Promise.all(imageLoadPromises);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (images);\n\n\n//# sourceURL=webpack:///./web-src/images.js?");

/***/ }),

/***/ "./web-src/images/AcidSpray.png":
/*!**************************************!*\
  !*** ./web-src/images/AcidSpray.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"33726fbcb7dd80e928f64c19f6b77381.png\";\n\n//# sourceURL=webpack:///./web-src/images/AcidSpray.png?");

/***/ }),

/***/ "./web-src/images/Apocalypse.png":
/*!***************************************!*\
  !*** ./web-src/images/Apocalypse.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"28c483710cff64d10e2f959490227081.png\";\n\n//# sourceURL=webpack:///./web-src/images/Apocalypse.png?");

/***/ }),

/***/ "./web-src/images/BackwardsMoustachio.png":
/*!************************************************!*\
  !*** ./web-src/images/BackwardsMoustachio.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"6dce7f3372a412719d738f3f89b9e6eb.png\";\n\n//# sourceURL=webpack:///./web-src/images/BackwardsMoustachio.png?");

/***/ }),

/***/ "./web-src/images/Bend.png":
/*!*********************************!*\
  !*** ./web-src/images/Bend.png ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"29120fc1cb5592377dd92daf2825faf0.png\";\n\n//# sourceURL=webpack:///./web-src/images/Bend.png?");

/***/ }),

/***/ "./web-src/images/BigHairyDeal.png":
/*!*****************************************!*\
  !*** ./web-src/images/BigHairyDeal.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"812b2f5d5eb73b91442b055527b4b1cf.png\";\n\n//# sourceURL=webpack:///./web-src/images/BigHairyDeal.png?");

/***/ }),

/***/ "./web-src/images/Earthquake.png":
/*!***************************************!*\
  !*** ./web-src/images/Earthquake.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"2fc028ad14099e84fffc65b5c1d1a56c.png\";\n\n//# sourceURL=webpack:///./web-src/images/Earthquake.png?");

/***/ }),

/***/ "./web-src/images/Gravedigger.png":
/*!****************************************!*\
  !*** ./web-src/images/Gravedigger.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"598356ddf665c325e46453ed3ac2449d.png\";\n\n//# sourceURL=webpack:///./web-src/images/Gravedigger.png?");

/***/ }),

/***/ "./web-src/images/Helmet.png":
/*!***********************************!*\
  !*** ./web-src/images/Helmet.png ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"6756022bbef7a298400f8a244f778919.png\";\n\n//# sourceURL=webpack:///./web-src/images/Helmet.png?");

/***/ }),

/***/ "./web-src/images/JugglingKnives.png":
/*!*******************************************!*\
  !*** ./web-src/images/JugglingKnives.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"426f6d43f5528bc2c7f1e112609c90c5.png\";\n\n//# sourceURL=webpack:///./web-src/images/JugglingKnives.png?");

/***/ }),

/***/ "./web-src/images/Kick.png":
/*!*********************************!*\
  !*** ./web-src/images/Kick.png ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"d7fc054174122b3227838a30243d994b.png\";\n\n//# sourceURL=webpack:///./web-src/images/Kick.png?");

/***/ }),

/***/ "./web-src/images/Lightning.png":
/*!**************************************!*\
  !*** ./web-src/images/Lightning.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"545e9144c338a09d0964fe686cb1fdf0.png\";\n\n//# sourceURL=webpack:///./web-src/images/Lightning.png?");

/***/ }),

/***/ "./web-src/images/LightningFastKarateChop.png":
/*!****************************************************!*\
  !*** ./web-src/images/LightningFastKarateChop.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"46e20d86d16e1aa9b62e718d08147eef.png\";\n\n//# sourceURL=webpack:///./web-src/images/LightningFastKarateChop.png?");

/***/ }),

/***/ "./web-src/images/Muscle.png":
/*!***********************************!*\
  !*** ./web-src/images/Muscle.png ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"2ed09b57e356edad8d9cdef4218babe7.png\";\n\n//# sourceURL=webpack:///./web-src/images/Muscle.png?");

/***/ }),

/***/ "./web-src/images/MustacheMash.png":
/*!*****************************************!*\
  !*** ./web-src/images/MustacheMash.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"b43550c7072049581379897a765026a8.png\";\n\n//# sourceURL=webpack:///./web-src/images/MustacheMash.png?");

/***/ }),

/***/ "./web-src/images/NinjaSword.png":
/*!***************************************!*\
  !*** ./web-src/images/NinjaSword.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"8a030ae90ecc7b074af4eeba6de5fad9.png\";\n\n//# sourceURL=webpack:///./web-src/images/NinjaSword.png?");

/***/ }),

/***/ "./web-src/images/NoBooster.png":
/*!**************************************!*\
  !*** ./web-src/images/NoBooster.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"a6567a75cd44a18e8a431f57014b4948.png\";\n\n//# sourceURL=webpack:///./web-src/images/NoBooster.png?");

/***/ }),

/***/ "./web-src/images/Nose.png":
/*!*********************************!*\
  !*** ./web-src/images/Nose.png ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"8e28dae4b0729f881e7039cd45f66508.png\";\n\n//# sourceURL=webpack:///./web-src/images/Nose.png?");

/***/ }),

/***/ "./web-src/images/NoseOfTheTaunted.png":
/*!*********************************************!*\
  !*** ./web-src/images/NoseOfTheTaunted.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"23f8548f2a79bdfbf5c75d567167ae82.png\";\n\n//# sourceURL=webpack:///./web-src/images/NoseOfTheTaunted.png?");

/***/ }),

/***/ "./web-src/images/Nunchucks.png":
/*!**************************************!*\
  !*** ./web-src/images/Nunchucks.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"c18eadb805abd3e802803c4423aec15c.png\";\n\n//# sourceURL=webpack:///./web-src/images/Nunchucks.png?");

/***/ }),

/***/ "./web-src/images/Rampage.png":
/*!************************************!*\
  !*** ./web-src/images/Rampage.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"5c41cffad63a5b67a3072fd52273218d.png\";\n\n//# sourceURL=webpack:///./web-src/images/Rampage.png?");

/***/ }),

/***/ "./web-src/images/Regenerate.png":
/*!***************************************!*\
  !*** ./web-src/images/Regenerate.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"95abe119d6b03eeee48562e7e028a6a4.png\";\n\n//# sourceURL=webpack:///./web-src/images/Regenerate.png?");

/***/ }),

/***/ "./web-src/images/RunInCircles.png":
/*!*****************************************!*\
  !*** ./web-src/images/RunInCircles.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"2f3b1be627a28b780321e09343274106.png\";\n\n//# sourceURL=webpack:///./web-src/images/RunInCircles.png?");

/***/ }),

/***/ "./web-src/images/SamuraiSword.png":
/*!*****************************************!*\
  !*** ./web-src/images/SamuraiSword.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"9e27cf6edbe1d107a385d0f7046124ca.png\";\n\n//# sourceURL=webpack:///./web-src/images/SamuraiSword.png?");

/***/ }),

/***/ "./web-src/images/ShadowFireball.png":
/*!*******************************************!*\
  !*** ./web-src/images/ShadowFireball.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"140948bb3ebb27033f3ed626a87cc485.png\";\n\n//# sourceURL=webpack:///./web-src/images/ShadowFireball.png?");

/***/ }),

/***/ "./web-src/images/ShadowSlip.png":
/*!***************************************!*\
  !*** ./web-src/images/ShadowSlip.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"cd70c5d54494f3b652628c9edf7625c7.png\";\n\n//# sourceURL=webpack:///./web-src/images/ShadowSlip.png?");

/***/ }),

/***/ "./web-src/images/Smash.png":
/*!**********************************!*\
  !*** ./web-src/images/Smash.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"c18823d9bf72ff812ca449cb30547723.png\";\n\n//# sourceURL=webpack:///./web-src/images/Smash.png?");

/***/ }),

/***/ "./web-src/images/Twist.png":
/*!**********************************!*\
  !*** ./web-src/images/Twist.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"257ddeaa56614f57476f17fe845e4cfa.png\";\n\n//# sourceURL=webpack:///./web-src/images/Twist.png?");

/***/ }),

/***/ "./web-src/images/Zap.png":
/*!********************************!*\
  !*** ./web-src/images/Zap.png ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"7329f3b81c7bab3d555f1945e0585fcd.png\";\n\n//# sourceURL=webpack:///./web-src/images/Zap.png?");

/***/ }),

/***/ "./web-src/images/ZombieCorps.png":
/*!****************************************!*\
  !*** ./web-src/images/ZombieCorps.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"28d9191ddfef0382fd21cc712cc6dee9.png\";\n\n//# sourceURL=webpack:///./web-src/images/ZombieCorps.png?");

/***/ }),

/***/ "./web-src/index.js":
/*!**************************!*\
  !*** ./web-src/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _nzsc_single_player_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nzsc_single_player_web */ \"./web-src/nzsc_single_player_web.js\");\n/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ \"./web-src/query.js\");\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvas */ \"./web-src/canvas.js\");\n/* harmony import */ var _rect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rect */ \"./web-src/rect.js\");\n/* harmony import */ var _circle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./circle */ \"./web-src/circle.js\");\n/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./renderer */ \"./web-src/renderer.js\");\n/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images */ \"./web-src/images.js\");\n\n\n\n\n\n\n\n\n////////////////\n////////////////\n////////////////\n// Set up constants.\n////////////////\n////////////////\n////////////////\n\nconst MAX32 = 2 ** 32 - 1;\n\nconst RIGHT_START = -225; // canvas.width / ACCELERATOR\n\n////////////////\n////////////////\n////////////////\n// Cache\n////////////////\n////////////////\n////////////////\n\nlet currentOutput = null;\nlet previousOutput = null;\nlet repaint = null;\n\n////////////////\n////////////////\n////////////////\n// Helpers.\n////////////////\n////////////////\n////////////////\n\nconst generateSeed = () => (\n  _query__WEBPACK_IMPORTED_MODULE_1__[\"default\"].overrideSeed === null\n    ? Math.random() * MAX32\n    : _query__WEBPACK_IMPORTED_MODULE_1__[\"default\"].overrideSeed\n);\n\n\n\n\n////////////////\n////////////////\n////////////////\n// Main logic.\n////////////////\n////////////////\n////////////////\n\nconst newGame = () => {\n  // Setup\n\n  const seed = generateSeed();\n  const game = _nzsc_single_player_web__WEBPACK_IMPORTED_MODULE_0__[\"SinglePlayerNZSCWebInterface\"].new(seed);\n  currentOutput = game.initial_output();\n\n  // Listeners\n\n  const characterScreenListener = (e) => {\n    const [x, y] = Object(_canvas__WEBPACK_IMPORTED_MODULE_2__[\"clientToLocalCoords\"])(e.clientX, e.clientY);\n\n    const rectIndex = Object(_rect__WEBPACK_IMPORTED_MODULE_3__[\"getRectIndexAt\"])(x, y);\n\n    const { availableCharacters } = JSON.parse(currentOutput.question());\n\n    if (!(rectIndex in availableCharacters)) {\n      return;\n    }\n\n    const character = availableCharacters[rectIndex];\n\n    previousOutput = currentOutput;\n    currentOutput = game.next(character);\n\n    _canvas__WEBPACK_IMPORTED_MODULE_2__[\"canvas\"].removeEventListener('click', characterScreenListener);\n\n    // Check to see if computer chose same move as human.\n    if (JSON.parse(currentOutput.question()).type === 'CHOOSE_CHARACTER') {\n      transitionFromCharacterToCharacterScreen();\n    } else {\n      transitionFromCharacterToBoosterScreen();\n    }\n  };\n\n  const boosterScreenListener = (e) => {\n    const [x, y] = Object(_canvas__WEBPACK_IMPORTED_MODULE_2__[\"clientToLocalCoords\"])(e.clientX, e.clientY);\n\n    const rectIndex = Object(_rect__WEBPACK_IMPORTED_MODULE_3__[\"getRectIndexAt\"])(x, y);\n\n    const { availableBoosters } = JSON.parse(currentOutput.question());\n\n    if (!(rectIndex in availableBoosters)) {\n      return;\n    }\n\n    const booster = availableBoosters[rectIndex];\n\n    previousOutput = currentOutput;\n    currentOutput = game.next(booster);\n\n    _canvas__WEBPACK_IMPORTED_MODULE_2__[\"canvas\"].removeEventListener('click', boosterScreenListener);\n\n    transitionFromBoosterToMoveScreen();\n  };\n\n  const moveScreenListener = (e) => {\n    const [x, y] = Object(_canvas__WEBPACK_IMPORTED_MODULE_2__[\"clientToLocalCoords\"])(e.clientX, e.clientY);\n\n    const circleIndex = Object(_circle__WEBPACK_IMPORTED_MODULE_4__[\"getCircleIndexAt\"])(x, y);\n\n    const { availableMoves } = JSON.parse(currentOutput.question());\n\n    if (!(circleIndex in availableMoves)) {\n      return;\n    }\n\n    const move = availableMoves[circleIndex];\n\n    previousOutput = currentOutput;\n    currentOutput = game.next(move);\n\n    _canvas__WEBPACK_IMPORTED_MODULE_2__[\"canvas\"].removeEventListener('click', moveScreenListener);\n\n    // Check if game is over\n    if (JSON.parse(currentOutput.question()).type === 'DONE') {\n      transitionToFinalMoveClash();\n    } else {\n      transitionToMoveClash();\n    }\n  };\n\n  // Transition-animators\n\n  const transitionFromNothingToCharacterScreen = () => {\n    let last = Date.now();\n    let t = 0;\n    const finishTime = 500;\n\n    const availableCharacters = JSON.parse(currentOutput.question()).availableCharacters;\n\n    repaint = () => {\n      _renderer__WEBPACK_IMPORTED_MODULE_5__[\"default\"].render({\n        type: 'NOTHING_TO_CHARACTER',\n        availableCharacters,\n        completionFactor: 1,\n      });\n    };\n\n    const render = () => {\n      const now = Date.now();\n      t += now - last;\n      last = now;\n\n      if (t > finishTime) {\n        t = finishTime;\n      }\n\n      _renderer__WEBPACK_IMPORTED_MODULE_5__[\"default\"].render({\n        type: 'NOTHING_TO_CHARACTER',\n        availableCharacters,\n        completionFactor: t / finishTime,\n      });\n\n      if (t < finishTime) {\n        requestAnimationFrame(render);\n      } else {\n        _canvas__WEBPACK_IMPORTED_MODULE_2__[\"canvas\"].addEventListener('click', characterScreenListener);\n      }\n    };\n\n    requestAnimationFrame(render);\n  };\n\n  const transitionFromCharacterToCharacterScreen = () => {\n    let last = Date.now();\n    let t = 0;\n    const finishTime = 500;\n\n    const previouslyAvailableCharacters = JSON.parse(previousOutput.question()).availableCharacters;\n    const availableCharacters = JSON.parse(currentOutput.question()).availableCharacters;\n\n    repaint = () => {\n      _renderer__WEBPACK_IMPORTED_MODULE_5__[\"default\"].render({\n        type: 'CHARACTER_TO_CHARACTER',\n        previouslyAvailableCharacters,\n        availableCharacters,\n        completionFactor: 1,\n      });\n    };\n\n    const render = () => {\n      const now = Date.now();\n      t += now - last;\n      last = now;\n\n      if (t > finishTime) {\n        t = finishTime;\n      }\n\n      _renderer__WEBPACK_IMPORTED_MODULE_5__[\"default\"].render({\n        type: 'CHARACTER_TO_CHARACTER',\n        previouslyAvailableCharacters,\n        availableCharacters,\n        completionFactor: t / finishTime,\n      });\n\n      if (t < finishTime) {\n        requestAnimationFrame(render);\n      } else {\n        _canvas__WEBPACK_IMPORTED_MODULE_2__[\"canvas\"].addEventListener('click', characterScreenListener);\n      }\n    };\n\n    requestAnimationFrame(render);\n  };\n\n  const transitionFromCharacterToBoosterScreen = () => {\n    let last = Date.now();\n    let t = 0;\n    const finishTime = 500;\n\n    const previouslyAvailableCharacters = JSON.parse(previousOutput.question()).availableCharacters;\n    const availableBoosters = JSON.parse(currentOutput.question()).availableBoosters;\n\n    repaint = () => {\n      _renderer__WEBPACK_IMPORTED_MODULE_5__[\"default\"].render({\n        type: 'CHARACTER_TO_BOOSTER',\n        previouslyAvailableCharacters,\n        availableBoosters,\n        completionFactor: 1,\n      });\n    };\n\n    const render = () => {\n      const now = Date.now();\n      t += now - last;\n      last = now;\n\n      if (t > finishTime) {\n        t = finishTime;\n      }\n\n      _renderer__WEBPACK_IMPORTED_MODULE_5__[\"default\"].render({\n        type: 'CHARACTER_TO_BOOSTER',\n        previouslyAvailableCharacters,\n        availableBoosters,\n        completionFactor: t / finishTime,\n      });\n\n      if (t < finishTime) {\n        requestAnimationFrame(render);\n      } else {\n        _canvas__WEBPACK_IMPORTED_MODULE_2__[\"canvas\"].addEventListener('click', boosterScreenListener);\n      }\n    };\n\n    requestAnimationFrame(render);\n  };\n\n  const transitionFromBoosterToMoveScreen = () => {\n    let last = Date.now();\n    let t = 0;\n    const finishTime = 500;\n\n    const previouslyAvailableBoosters = JSON.parse(previousOutput.question()).availableBoosters;\n    const availableMoves = JSON.parse(currentOutput.question()).availableMoves;\n\n    repaint = () => {\n      _renderer__WEBPACK_IMPORTED_MODULE_5__[\"default\"].render({\n        type: 'BOOSTER_TO_MOVE',\n        previouslyAvailableBoosters,\n        availableMoves,\n        completionFactor: 1,\n      });\n    };\n\n    const render = () => {\n      const now = Date.now();\n      t += now - last;\n      last = now;\n\n      if (t > finishTime) {\n        t = finishTime;\n      }\n\n      _renderer__WEBPACK_IMPORTED_MODULE_5__[\"default\"].render({\n        type: 'BOOSTER_TO_MOVE',\n        previouslyAvailableBoosters,\n        availableMoves,\n        completionFactor: t / finishTime,\n      });\n\n      if (t < finishTime) {\n        requestAnimationFrame(render);\n      } else {\n        _canvas__WEBPACK_IMPORTED_MODULE_2__[\"canvas\"].addEventListener('click', moveScreenListener);\n      }\n    };\n\n    requestAnimationFrame(render);\n  };\n\n  const transitionToMoveClash = () => {\n    let last = Date.now();\n    let t = 0;\n    const finishTime = 1500;\n\n    const previouslyAvailableMoves = JSON.parse(previousOutput.question()).availableMoves;\n    const availableMoves = JSON.parse(currentOutput.question()).availableMoves;\n\n    const moveSelectionAndOutcome = JSON.parse(currentOutput.notifications()).find((notification) => {\n      return notification.type === 'MOVE_SELECTION_AND_OUTCOME';\n    });\n    const score = JSON.parse(currentOutput.notifications()).find((notification) => {\n      return notification.type === 'SCORE_UPDATE';\n    });\n\n    const { humanMove, computerMove, whoGetsThePoint } = moveSelectionAndOutcome;\n    const { humanPoints, computerPoints } = score;\n\n    repaint = () => {\n      _renderer__WEBPACK_IMPORTED_MODULE_5__[\"default\"].render({\n        type: 'MOVE_CLASH',\n        previouslyAvailableMoves,\n        availableMoves,\n        humanMove,\n        computerMove,\n        whoGetsThePoint,\n        humanPoints,\n        computerPoints,\n        completionFactor: 1,\n      });\n    };\n\n    const render = () => {\n      const now = Date.now();\n      t += now - last;\n      last = now;\n\n      if (t > finishTime) {\n        t = finishTime;\n      }\n\n      _renderer__WEBPACK_IMPORTED_MODULE_5__[\"default\"].render({\n        type: 'MOVE_CLASH',\n        previouslyAvailableMoves,\n        availableMoves,\n        humanMove,\n        computerMove,\n        whoGetsThePoint,\n        humanPoints,\n        computerPoints,\n        completionFactor: t / finishTime,\n      });\n\n      if (t < finishTime) {\n        requestAnimationFrame(render);\n      } else {\n        _canvas__WEBPACK_IMPORTED_MODULE_2__[\"canvas\"].addEventListener('click', moveScreenListener);\n      }\n    };\n\n    requestAnimationFrame(render);\n  };\n\n  const transitionToFinalMoveClash = () => {\n    let last = Date.now();\n    let t = 0;\n    const finishTime = 1500;\n\n    const previouslyAvailableMoves = JSON.parse(previousOutput.question()).availableMoves;\n\n    const moveSelectionAndOutcome = JSON.parse(currentOutput.notifications()).find((notification) => {\n      return notification.type === 'MOVE_SELECTION_AND_OUTCOME';\n    });\n    const score = JSON.parse(currentOutput.notifications()).find((notification) => {\n      return notification.type === 'SCORE_UPDATE';\n    });\n\n    const { humanMove, computerMove, whoGetsThePoint } = moveSelectionAndOutcome;\n    const { humanPoints, computerPoints } = score;\n\n    repaint = () => {\n      _renderer__WEBPACK_IMPORTED_MODULE_5__[\"default\"].render({\n        type: 'FINAL_MOVE_CLASH',\n        previouslyAvailableMoves,\n        humanMove,\n        computerMove,\n        whoGetsThePoint,\n        humanPoints,\n        computerPoints,\n        completionFactor: 1,\n      });\n    };\n\n    const render = () => {\n      const now = Date.now();\n      t += now - last;\n      last = now;\n\n      if (t > finishTime) {\n        t = finishTime;\n      }\n\n      _renderer__WEBPACK_IMPORTED_MODULE_5__[\"default\"].render({\n        type: 'FINAL_MOVE_CLASH',\n        previouslyAvailableMoves,\n        humanMove,\n        computerMove,\n        whoGetsThePoint,\n        humanPoints,\n        computerPoints,\n        completionFactor: t / finishTime,\n      });\n\n      if (t < finishTime) {\n        requestAnimationFrame(render);\n      } else {\n        //canvas.addEventListener('click', finalScreenListener);\n      }\n    };\n\n    requestAnimationFrame(render);\n  };\n\n  _images__WEBPACK_IMPORTED_MODULE_6__[\"default\"].waitForAllToLoad.then(() => {\n    transitionFromNothingToCharacterScreen();\n  });\n};\n\n////////////////\n////////////////\n////////////////\n// Start a game.\n////////////////\n////////////////\n////////////////\n\nwindow.addEventListener('resize', () => {\n  Object(_canvas__WEBPACK_IMPORTED_MODULE_2__[\"correctCanvasDimensions\"])();\n\n  if (repaint) {\n    repaint();\n  }\n});\n\nnewGame();\n\n(function() {\n  if('serviceWorker' in navigator) {\n    navigator.serviceWorker.register('./service-worker.js');\n    navigator.serviceWorker.register('./handwritten-sw.js');\n  }\n})();\n\n\n//# sourceURL=webpack:///./web-src/index.js?");

/***/ }),

/***/ "./web-src/lerp.js":
/*!*************************!*\
  !*** ./web-src/lerp.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst lerp = (a, b, factor) => a + factor * (b - a);\n/* harmony default export */ __webpack_exports__[\"default\"] = (lerp);\n\n\n//# sourceURL=webpack:///./web-src/lerp.js?");

/***/ }),

/***/ "./web-src/logos.js":
/*!**************************!*\
  !*** ./web-src/logos.js ***!
  \**************************/
/*! exports provided: logoOfCharacter, logoOfBooster, noSpace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"logoOfCharacter\", function() { return logoOfCharacter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"logoOfBooster\", function() { return logoOfBooster; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"noSpace\", function() { return noSpace; });\nconst logoOfCharacter = (character) => {\n  switch (character) {\n    case 'Ninja': return 'Kick';\n    case 'Zombie': return 'Rampage';\n    case 'Samurai': return 'Helmet';\n    case 'Clown': return 'Nose';\n    default: throw new Error('Illegal character: ' + character);\n  }\n};\n\nconst logoOfBooster = (booster) => {\n  booster = noSpace(booster);\n\n  switch (booster) {\n    case 'Shadow': return 'ShadowSlip';\n    case 'Speedy': return 'RunInCircles';\n    case 'Regenerative': return 'Regenerate';\n    case 'ZombieCorps': return 'ZombieCorps';\n    case 'Atlas': return 'Lightning';\n    case 'Strong': return 'Bend';\n    case 'Backwards': return 'BackwardsMoustachio';\n    case 'Moustachio': return 'BigHairyDeal';\n    case 'NoBooster': return 'NoBooster';\n    default: throw new Error('Illegal booster: ' + booster)\n  }\n};\n\nconst noSpace = str => str.split('').filter(char => char !== ' ').join('');\n\n\n\n\n//# sourceURL=webpack:///./web-src/logos.js?");

/***/ }),

/***/ "./web-src/nzsc_single_player_web.js":
/*!*******************************************!*\
  !*** ./web-src/nzsc_single_player_web.js ***!
  \*******************************************/
/*! exports provided: OutputWebInterface, SinglePlayerNZSCWebInterface, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OutputWebInterface\", function() { return OutputWebInterface; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SinglePlayerNZSCWebInterface\", function() { return SinglePlayerNZSCWebInterface; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nzsc_single_player_web_bg */ \"./web-src/nzsc_single_player_web_bg.wasm\");\n/* tslint:disable */\n\n\nconst TextDecoder = typeof self === 'object' && self.TextDecoder\n    ? self.TextDecoder\n    : __webpack_require__(/*! util */ \"./node_modules/util/util.js\").TextDecoder;\n\nlet cachedDecoder = new TextDecoder('utf-8');\n\nlet cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null ||\n        cachegetUint8Memory.buffer !== _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer)\n        cachegetUint8Memory = new Uint8Array(_nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    return cachegetUint8Memory;\n}\n\nfunction getStringFromWasm(ptr, len) {\n    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n\nlet cachedGlobalArgumentPtr = null;\nfunction globalArgumentPtr() {\n    if (cachedGlobalArgumentPtr === null)\n        cachedGlobalArgumentPtr = _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_global_argument_ptr\"]();\n    return cachedGlobalArgumentPtr;\n}\n\nlet cachegetUint32Memory = null;\nfunction getUint32Memory() {\n    if (cachegetUint32Memory === null ||\n        cachegetUint32Memory.buffer !== _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer)\n        cachegetUint32Memory = new Uint32Array(_nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    return cachegetUint32Memory;\n}\n\nconst TextEncoder = typeof self === 'object' && self.TextEncoder\n    ? self.TextEncoder\n    : __webpack_require__(/*! util */ \"./node_modules/util/util.js\").TextEncoder;\n\nlet cachedEncoder = new TextEncoder('utf-8');\n\nfunction passStringToWasm(arg) {\n\n    const buf = cachedEncoder.encode(arg);\n    const ptr = _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"](buf.length);\n    getUint8Memory().set(buf, ptr);\n    return [ptr, buf.length];\n}\n\nclass OutputWebInterface {\n\n                static __construct(ptr) {\n                    return new OutputWebInterface(ptr);\n                }\n\n                constructor(ptr) {\n                    this.ptr = ptr;\n                }\n\n            free() {\n                const ptr = this.ptr;\n                this.ptr = 0;\n                _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_outputwebinterface_free\"](ptr);\n            }\n        notifications() {\n    const retptr = globalArgumentPtr();\n    _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"outputwebinterface_notifications\"](retptr, this.ptr);\n    const mem = getUint32Memory();\n    const ptr = mem[retptr / 4];\n    const len = mem[retptr / 4 + 1];\n    const realRet = getStringFromWasm(ptr, len).slice();\n    _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](ptr, len * 1);\n    return realRet;\n}\nquestion() {\n    const retptr = globalArgumentPtr();\n    _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"outputwebinterface_question\"](retptr, this.ptr);\n    const mem = getUint32Memory();\n    const ptr = mem[retptr / 4];\n    const len = mem[retptr / 4 + 1];\n    const realRet = getStringFromWasm(ptr, len).slice();\n    _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](ptr, len * 1);\n    return realRet;\n}\n}\n\nclass SinglePlayerNZSCWebInterface {\n\n                static __construct(ptr) {\n                    return new SinglePlayerNZSCWebInterface(ptr);\n                }\n\n                constructor(ptr) {\n                    this.ptr = ptr;\n                }\n\n            free() {\n                const ptr = this.ptr;\n                this.ptr = 0;\n                _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_singleplayernzscwebinterface_free\"](ptr);\n            }\n        static new(arg0) {\n    return SinglePlayerNZSCWebInterface.__construct(_nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"singleplayernzscwebinterface_new\"](arg0));\n}\ninitial_output() {\n    return OutputWebInterface.__construct(_nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"singleplayernzscwebinterface_initial_output\"](this.ptr));\n}\nnext(arg0) {\n    const [ptr0, len0] = passStringToWasm(arg0);\n    try {\n        return OutputWebInterface.__construct(_nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"singleplayernzscwebinterface_next\"](this.ptr, ptr0, len0));\n    } finally {\n        _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](ptr0, len0 * 1);\n    }\n}\n}\n\nfunction __wbindgen_throw(ptr, len) {\n    throw new Error(getStringFromWasm(ptr, len));\n}\n\n\n\n//# sourceURL=webpack:///./web-src/nzsc_single_player_web.js?");

/***/ }),

/***/ "./web-src/nzsc_single_player_web_bg.wasm":
/*!************************************************!*\
  !*** ./web-src/nzsc_single_player_web_bg.wasm ***!
  \************************************************/
/*! exports provided: memory, __wbg_singleplayernzscwebinterface_free, __wbg_outputwebinterface_free, outputwebinterface_notifications, outputwebinterface_question, singleplayernzscwebinterface_new, singleplayernzscwebinterface_initial_output, singleplayernzscwebinterface_next, __wbindgen_malloc, __wbindgen_free, __wbindgen_global_argument_ptr */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar instance = __webpack_require__.w[module.i];\n// export exports from WebAssembly module\nmodule.exports = instance.exports;\n// exec imports from WebAssembly module (for esm order)\n__webpack_require__(/*! ./nzsc_single_player_web */ \"./web-src/nzsc_single_player_web.js\");\n// exec wasm module\ninstance.exports.__webpack_init__()\n\n//# sourceURL=webpack:///./web-src/nzsc_single_player_web_bg.wasm?");

/***/ }),

/***/ "./web-src/phases.js":
/*!***************************!*\
  !*** ./web-src/phases.js ***!
  \***************************/
/*! exports provided: getPhase, getPhaseTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPhase\", function() { return getPhase; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPhaseTime\", function() { return getPhaseTime; });\nconst getPhase = (t, phaseLengths) => {\n  let boundary = 0;\n\n  for (let phase = 0; phase < phaseLengths.length; phase++) {\n    const phaseLength = phaseLengths[phase];\n    boundary += phaseLength;\n    if (t <= boundary) {\n      return phase;\n    }\n  }\n\n  throw new RangeError(t + ' is not in a phase!');\n};\n\nconst getPhaseTime = (t, phaseLengths) => {\n  let boundary = 0;\n\n  for (let phase = 0; phase < phaseLengths.length; phase++) {\n    const phaseLength = phaseLengths[phase];\n    boundary += phaseLength;\n    if (t <= boundary) {\n      return t - (boundary - phaseLength);\n    }\n  }\n\n  throw new RangeError(t + ' is not in a phase!');\n};\n\n\n\n\n//# sourceURL=webpack:///./web-src/phases.js?");

/***/ }),

/***/ "./web-src/query.js":
/*!**************************!*\
  !*** ./web-src/query.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! query-string */ \"./node_modules/query-string/index.js\");\n/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst MAX32 = 2 ** 32 - 1;\n\nconst parsedQuery = query_string__WEBPACK_IMPORTED_MODULE_0___default.a.parse(location.search);\n\nconst parsedSeed = parseInt(parsedQuery.seed);\nconst overrideSeed = isNaN(parsedSeed) || parsedSeed > MAX32\n  ? null\n  : parsedSeed;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  overrideSeed,\n});\n\n\n//# sourceURL=webpack:///./web-src/query.js?");

/***/ }),

/***/ "./web-src/rect.js":
/*!*************************!*\
  !*** ./web-src/rect.js ***!
  \*************************/
/*! exports provided: nthRect, getRectIndexAt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nthRect\", function() { return nthRect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRectIndexAt\", function() { return getRectIndexAt; });\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ \"./web-src/canvas.js\");\n\n\nconst RECT = {\n  width: 400,\n  height: 800,\n  horizontalMargin: 40,\n  verticalMargin: 100,\n};\n\n// Returns an array representing a rectangle: [x, y, w, h]\nconst nthRect = (n) => {\n  if (n < 0 || n > 3) {\n    throw new RangeError('nthRect() requires 0 <= n <= 3');\n  }\n\n  const hm = RECT.horizontalMargin;\n  const vm = RECT.verticalMargin;\n  const bw = RECT.width;\n  const bh = RECT.height;\n\n  const x = hm + n * (400 + hm);\n  return [x, vm, bw, bh];\n};\n\n// Takes a coordinate and returns the index of a box clicked.\n// Or -1 if none is clicked.\nconst getRectIndexAt = (x, y) => {\n  const hm = RECT.horizontalMargin;\n  const vm = RECT.verticalMargin;\n  const bw = RECT.width;\n  const bh = RECT.height;\n\n  if (y < vm || y > (Object(_canvas__WEBPACK_IMPORTED_MODULE_0__[\"getDimensions\"])().height - vm)) {\n    return -1;\n  }\n\n  if (((x - hm) % (bw + hm)) > bw) {\n    return -1;\n  }\n\n  return Math.floor((x - hm) / (bw + hm));\n};\n\n\n\n\n//# sourceURL=webpack:///./web-src/rect.js?");

/***/ }),

/***/ "./web-src/renderer.js":
/*!*****************************!*\
  !*** ./web-src/renderer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ \"./web-src/canvas.js\");\n/* harmony import */ var _rect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rect */ \"./web-src/rect.js\");\n/* harmony import */ var _circle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./circle */ \"./web-src/circle.js\");\n/* harmony import */ var _lerp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lerp */ \"./web-src/lerp.js\");\n/* harmony import */ var _phases__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./phases */ \"./web-src/phases.js\");\n/* harmony import */ var _logos__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./logos */ \"./web-src/logos.js\");\n/* harmony import */ var _getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getBackgroundColorOf */ \"./web-src/getBackgroundColorOf.js\");\n/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images */ \"./web-src/images.js\");\n\n\n\n\n\n\n\n\n\n//const ACCELERATOR = 8.0;\n\nconst BACKGROUND = '#F1F1F1';\nconst OVERLAY = '#333A';\nconst SCORE_COLOR = '#111';\n\nconst render = (snap) => {\n  switch (snap.type) {\n    case 'NOTHING_TO_CHARACTER': {\n      _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = BACKGROUND;\n      _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(0, 0, 1800, 1000);\n\n      const characterLogoMoves = snap.availableCharacters.map(_logos__WEBPACK_IMPORTED_MODULE_5__[\"logoOfCharacter\"]);\n\n      for (let i = 0; i < characterLogoMoves.length; i++) {\n        const rect = Object(_rect__WEBPACK_IMPORTED_MODULE_1__[\"nthRect\"])(i);\n        const x = rect[0] + 1800 * (1 - snap.completionFactor);\n        const [, y, w, h] = rect;\n\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(characterLogoMoves[i]);\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(x, y, w, h);\n\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][characterLogoMoves[i]], x, 300, 400, 400);\n      }\n\n      break;\n    }\n\n    case 'CHARACTER_TO_CHARACTER': {\n      _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = BACKGROUND;\n      _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(0, 0, 1800, 1000);\n\n      const previouslyAvailableCharacterLogoMoves = snap.previouslyAvailableCharacters.map(_logos__WEBPACK_IMPORTED_MODULE_5__[\"logoOfCharacter\"]);\n      const availableCharacterLogoMoves = snap.availableCharacters.map(_logos__WEBPACK_IMPORTED_MODULE_5__[\"logoOfCharacter\"]);\n\n      for (let i = 0; i < previouslyAvailableCharacterLogoMoves.length; i++) {\n        const rect = Object(_rect__WEBPACK_IMPORTED_MODULE_1__[\"nthRect\"])(i);\n        const x = rect[0] + 1800 * (0 - snap.completionFactor);\n        const [, y, w, h] = rect;\n\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(previouslyAvailableCharacterLogoMoves[i]);\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(x, y, w, h);\n\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][previouslyAvailableCharacterLogoMoves[i]], x, 300, 400, 400);\n      }\n\n      for (let i = 0; i < availableCharacterLogoMoves.length; i++) {\n        const rect = Object(_rect__WEBPACK_IMPORTED_MODULE_1__[\"nthRect\"])(i);\n        const x = rect[0] + 1800 * (1 - snap.completionFactor);\n        const [, y, w, h] = rect;\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(x, y, w, h);\n\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][availableCharacterLogoMoves[i]], x, 300, 400, 400);\n      }\n\n      break;\n    }\n\n    case 'CHARACTER_TO_BOOSTER': {\n      _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = BACKGROUND;\n      _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(0, 0, 1800, 1000);\n\n      const characterLogoMoves = snap.previouslyAvailableCharacters.map(_logos__WEBPACK_IMPORTED_MODULE_5__[\"logoOfCharacter\"]);\n      const boosterLogoMoves = snap.availableBoosters.map(_logos__WEBPACK_IMPORTED_MODULE_5__[\"logoOfBooster\"]);\n\n      for (let i = 0; i < characterLogoMoves.length; i++) {\n        const rect = Object(_rect__WEBPACK_IMPORTED_MODULE_1__[\"nthRect\"])(i);\n        const x = rect[0] + 1800 * (0 - snap.completionFactor);\n        const [, y, w, h] = rect;\n\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(characterLogoMoves[i]);\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(x, y, w, h);\n\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][characterLogoMoves[i]], x, 300, 400, 400);\n      }\n\n      for (let i = 0; i < boosterLogoMoves.length; i++) {\n        const rect = Object(_rect__WEBPACK_IMPORTED_MODULE_1__[\"nthRect\"])(i);\n        const x = rect[0] + 1800 * (1 - snap.completionFactor);\n        const [, y, w, h] = rect;\n\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(boosterLogoMoves[i]);\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(x, y, w, h);\n\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][boosterLogoMoves[i]], x, 300, 400, 400);\n      }\n\n      break;\n    }\n\n    case 'BOOSTER_TO_MOVE': {\n      _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = BACKGROUND;\n      _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(0, 0, 1800, 1000);\n\n      const boosterLogoMoves = snap.previouslyAvailableBoosters.map(_logos__WEBPACK_IMPORTED_MODULE_5__[\"logoOfBooster\"]);\n      const availableMoves = snap.availableMoves.map(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"]);\n\n      for (let i = 0; i < boosterLogoMoves.length; i++) {\n        const rect = Object(_rect__WEBPACK_IMPORTED_MODULE_1__[\"nthRect\"])(i);\n        const x = rect[0] + 1800 * (0 - snap.completionFactor);\n        const [, y, w, h] = rect;\n\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(boosterLogoMoves[i]);\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(x, y, w, h);\n\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][boosterLogoMoves[i]], x, 300, 400, 400);\n      }\n\n      for (let i = 0; i < availableMoves.length; i++) {\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(availableMoves[i]);\n\n        const circle = Object(_circle__WEBPACK_IMPORTED_MODULE_2__[\"nthCircle\"])(i);\n        const x = circle[0] + 1800 * (1 - snap.completionFactor);\n        const [, y, r] = circle;\n        const d = 2 * r;\n\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][availableMoves[i]], x - r, y - r, d, d);\n      }\n\n      break;\n    }\n\n    case 'MOVE_CLASH': {\n      // This animation is divided into 5 phases:\n      //\n      // 0. Grow - Human move circle expands from starting position into end position.\n      // 1. Oppose - Computer move circle enters from the right and moves to the end position.\n      // 2. Clash - One, none, or both of the circles disappears.\n      // 3. Exit - Human move circle exits left, computer move circle exits right. Overlay is removed.\n\n      // This is the amount of time apportioned to each phase:\n      const PHASE_LENGTHS = [0.15, 0.15, 0.55, 0.15];\n\n      _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = BACKGROUND;\n      _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(0, 0, 1800, 1000);\n\n      const previouslyAvailableMoves = snap.previouslyAvailableMoves.map(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"]);\n      const availableMoves = snap.availableMoves.map(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"]);\n\n      const selectedHumanMoveIndex = previouslyAvailableMoves.findIndex(move => move === Object(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"])(snap.humanMove));\n\n      if (snap.completionFactor !== 1) {\n        for (let i = 0; i < previouslyAvailableMoves.length; i++) {\n          // Don't draw selected human move.\n          if (i === selectedHumanMoveIndex) {\n            continue;\n          }\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(previouslyAvailableMoves[i]);\n\n          const circle = Object(_circle__WEBPACK_IMPORTED_MODULE_2__[\"nthCircle\"])(i);\n          const x = circle[0];\n          const [, y, r] = circle;\n          const d = 2 * r;\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][previouslyAvailableMoves[i]], x - r, y - r, d, d);\n        }\n\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = OVERLAY;\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(0, 0, 1800, 1000);\n      } else {\n        for (let i = 0; i < availableMoves.length; i++) {\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(availableMoves[i]);\n\n          const circle = Object(_circle__WEBPACK_IMPORTED_MODULE_2__[\"nthCircle\"])(i);\n          const x = circle[0];\n          const [, y, r] = circle;\n          const d = 2 * r;\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][availableMoves[i]], x - r, y - r, d, d);\n        }\n\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = SCORE_COLOR;\n\n        for (let i = 0; i < snap.humanPoints; i++) {\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(100 + i * 30, 850, 20, 100);\n        }\n\n        for (let i = 0; i < snap.computerPoints; i++) {\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(1700 - i * 30, 850, 20, 100);\n        }\n      }\n\n      const phase = Object(_phases__WEBPACK_IMPORTED_MODULE_4__[\"getPhase\"])(snap.completionFactor, PHASE_LENGTHS);\n      const phaseLength = PHASE_LENGTHS[phase];\n      const phaseTime = Object(_phases__WEBPACK_IMPORTED_MODULE_4__[\"getPhaseTime\"])(snap.completionFactor, PHASE_LENGTHS);\n\n      switch (phase) {\n        case 0: {\n          // Draw human move\n          const selectedHumanMoveStartCircle = Object(_circle__WEBPACK_IMPORTED_MODULE_2__[\"nthCircle\"])(selectedHumanMoveIndex);\n          const selectedHumanMoveEndCircle = [490, 500, 360];\n          const selectedHumanMoveCurrentCircle = selectedHumanMoveStartCircle.map((n, i) => Object(_lerp__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(n, selectedHumanMoveEndCircle[i], phaseTime / phaseLength));\n\n          const x = selectedHumanMoveCurrentCircle[0];\n          const [, y, r] = selectedHumanMoveCurrentCircle;\n          const d = 2 * r;\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(snap.humanMove);\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][Object(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"])(snap.humanMove)], x - r, y - r, d, d);\n\n          break;\n        }\n\n        case 1: {\n          // Draw human move\n          {\n            const selectedHumanMoveEndCircle = [490, 500, 360];\n\n            const x = selectedHumanMoveEndCircle[0];\n            const [, y, r] = selectedHumanMoveEndCircle;\n            const d = 2 * r;\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(snap.humanMove);\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][Object(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"])(snap.humanMove)], x - r, y - r, d, d);\n          }\n\n          // Draw computer move\n          const selectedComputerMoveStartCircle = [1800, 500, 360];\n          const selectedComputerMoveEndCircle = [1310, 500, 360];\n\n          const selectedComputerMoveCurrentCircle = selectedComputerMoveStartCircle.map((n, i) => Object(_lerp__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(n, selectedComputerMoveEndCircle[i], phaseTime / phaseLength));\n          const x = selectedComputerMoveCurrentCircle[0];\n          const [, y, r] = selectedComputerMoveCurrentCircle;\n          const d = 2 * r;\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(snap.computerMove);\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][Object(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"])(snap.computerMove)], x - r, y - r, d, d);\n\n          break;\n        }\n\n        case 2: {\n          // Draw human move\n          console.log(snap.whoGetsThePoint, snap.humanMove, snap.computerMove);\n          const FADE_RATE = 5;\n\n          {\n            if (snap.whoGetsThePoint === 'COMPUTER' || snap.whoGetsThePoint === 'BOTH') {\n              _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].globalAlpha = Object(_lerp__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(1, 0, Math.min(phaseTime * FADE_RATE, 1));\n            }\n\n            const selectedHumanMoveEndCircle = [490, 500, 360];\n\n            const x = selectedHumanMoveEndCircle[0];\n            const [, y, r] = selectedHumanMoveEndCircle;\n            const d = 2 * r;\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(snap.humanMove);\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][Object(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"])(snap.humanMove)], x - r, y - r, d, d);\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].globalAlpha = 1;\n          }\n\n          // Draw computer move\n          {\n            if (snap.whoGetsThePoint === 'HUMAN' || snap.whoGetsThePoint === 'BOTH') {\n              _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].globalAlpha = Object(_lerp__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(1, 0, Math.min(phaseTime * FADE_RATE, 1));\n            }\n\n            const selectedComputerMoveEndCircle = [1310, 500, 360];\n\n            const x = selectedComputerMoveEndCircle[0];\n            const [, y, r] = selectedComputerMoveEndCircle;\n            const d = 2 * r;\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(snap.computerMove);\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][Object(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"])(snap.computerMove)], x - r, y - r, d, d);\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].globalAlpha = 1;\n          }\n\n          break;\n        }\n\n        case 3: {\n          if (!(snap.whoGetsThePoint === 'COMPUTER' || snap.whoGetsThePoint === 'BOTH')) {\n            const selectedHumanMoveEndCircle = [490, 500, 360];\n\n            const x = selectedHumanMoveEndCircle[0] - 850 * (phaseTime / phaseLength);\n            const [, y, r] = selectedHumanMoveEndCircle;\n            const d = 2 * r;\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(snap.humanMove);\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][Object(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"])(snap.humanMove)], x - r, y - r, d, d);\n          }\n\n          // Draw computer move\n          if (!(snap.whoGetsThePoint === 'HUMAN' || snap.whoGetsThePoint === 'BOTH')) {\n            const selectedComputerMoveEndCircle = [1310, 500, 360];\n\n            const x = selectedComputerMoveEndCircle[0] + 850 * (phaseTime / phaseLength);\n            const [, y, r] = selectedComputerMoveEndCircle;\n            const d = 2 * r;\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(snap.computerMove);\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][Object(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"])(snap.computerMove)], x - r, y - r, d, d);\n          }\n\n          break;\n        }\n      }\n\n      break;\n    }\n\n    case 'FINAL_MOVE_CLASH': {\n      // This animation is divided into 5 phases:\n      //\n      // 0. Grow - Human move circle expands from starting position into end position.\n      // 1. Oppose - Computer move circle enters from the right and moves to the end position.\n      // 2. Clash - One, none, or both of the circles disappears.\n      // 3. Exit - Human move circle exits left, computer move circle exits right. Overlay is removed.\n\n      // This is the amount of time apportioned to each phase:\n      const PHASE_LENGTHS = [0.2, 0.2, 0.4, 0.2];\n\n      _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = BACKGROUND;\n      _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(0, 0, 1800, 1000);\n\n      const previouslyAvailableMoves = snap.previouslyAvailableMoves.map(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"]);\n\n      const selectedHumanMoveIndex = previouslyAvailableMoves.findIndex(move => move === Object(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"])(snap.humanMove));\n\n      if (snap.completionFactor !== 1) {\n        for (let i = 0; i < previouslyAvailableMoves.length; i++) {\n          // Don't draw selected human move.\n          if (i === selectedHumanMoveIndex) {\n            continue;\n          }\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(previouslyAvailableMoves[i]);\n\n          const circle = Object(_circle__WEBPACK_IMPORTED_MODULE_2__[\"nthCircle\"])(i);\n          const x = circle[0];\n          const [, y, r] = circle;\n          const d = 2 * r;\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(previouslyAvailableMoves[i]);\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][previouslyAvailableMoves[i]], x - r, y - r, d, d);\n        }\n\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = OVERLAY;\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(0, 0, 1800, 1000);\n      } else {\n        _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = SCORE_COLOR;\n\n        for (let i = 0; i < snap.humanPoints; i++) {\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(100 + i * 30, 850, 20, 100);\n        }\n\n        for (let i = 0; i < snap.computerPoints; i++) {\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillRect(1700 - i * 30, 850, 20, 100);\n        }\n      }\n\n      const phase = Object(_phases__WEBPACK_IMPORTED_MODULE_4__[\"getPhase\"])(snap.completionFactor, PHASE_LENGTHS);\n      const phaseLength = PHASE_LENGTHS[phase];\n      const phaseTime = Object(_phases__WEBPACK_IMPORTED_MODULE_4__[\"getPhaseTime\"])(snap.completionFactor, PHASE_LENGTHS);\n\n      switch (phase) {\n        case 0: {\n          // Draw human move\n          const selectedHumanMoveStartCircle = Object(_circle__WEBPACK_IMPORTED_MODULE_2__[\"nthCircle\"])(selectedHumanMoveIndex);\n          const selectedHumanMoveEndCircle = [490, 500, 360];\n          const selectedHumanMoveCurrentCircle = selectedHumanMoveStartCircle.map((n, i) => Object(_lerp__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(n, selectedHumanMoveEndCircle[i], phaseTime / phaseLength));\n\n          const x = selectedHumanMoveCurrentCircle[0];\n          const [, y, r] = selectedHumanMoveCurrentCircle;\n          const d = 2 * r;\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(snap.humanMove);\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][Object(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"])(snap.humanMove)], x - r, y - r, d, d);\n\n          break;\n        }\n\n        case 1: {\n          // Draw human move\n          {\n            const selectedHumanMoveEndCircle = [490, 500, 360];\n\n            const x = selectedHumanMoveEndCircle[0];\n            const [, y, r] = selectedHumanMoveEndCircle;\n            const d = 2 * r;\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(snap.humanMove);\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][Object(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"])(snap.humanMove)], x - r, y - r, d, d);\n          }\n\n          // Draw computer move\n          const selectedComputerMoveStartCircle = [1800, 500, 360];\n          const selectedComputerMoveEndCircle = [1310, 500, 360];\n\n          const selectedComputerMoveCurrentCircle = selectedComputerMoveStartCircle.map((n, i) => Object(_lerp__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(n, selectedComputerMoveEndCircle[i], phaseTime / phaseLength));\n          const x = selectedComputerMoveCurrentCircle[0];\n          const [, y, r] = selectedComputerMoveCurrentCircle;\n          const d = 2 * r;\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(snap.computerMove);\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n          _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][Object(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"])(snap.computerMove)], x - r, y - r, d, d);\n\n          break;\n        }\n\n        case 2: {\n          // Draw human move\n          console.log(snap.whoGetsThePoint, snap.humanMove, snap.computerMove);\n          const FADE_RATE = 5;\n\n          {\n            if (snap.whoGetsThePoint === 'COMPUTER' || snap.whoGetsThePoint === 'BOTH') {\n              _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].globalAlpha = Object(_lerp__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(1, 0, Math.min(phaseTime * FADE_RATE, 1));\n            }\n\n            const selectedHumanMoveEndCircle = [490, 500, 360];\n\n            const x = selectedHumanMoveEndCircle[0];\n            const [, y, r] = selectedHumanMoveEndCircle;\n            const d = 2 * r;\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(snap.humanMove);\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][Object(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"])(snap.humanMove)], x - r, y - r, d, d);\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].globalAlpha = 1;\n          }\n\n          // Draw computer move\n          {\n            if (snap.whoGetsThePoint === 'HUMAN' || snap.whoGetsThePoint === 'BOTH') {\n              _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].globalAlpha = Object(_lerp__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(1, 0, Math.min(phaseTime * FADE_RATE, 1));\n            }\n\n            const selectedComputerMoveEndCircle = [1310, 500, 360];\n\n            const x = selectedComputerMoveEndCircle[0];\n            const [, y, r] = selectedComputerMoveEndCircle;\n            const d = 2 * r;\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(snap.computerMove);\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][Object(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"])(snap.computerMove)], x - r, y - r, d, d);\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].globalAlpha = 1;\n          }\n\n          break;\n        }\n\n        case 3: {\n          if (!(snap.whoGetsThePoint === 'COMPUTER' || snap.whoGetsThePoint === 'BOTH')) {\n            const selectedHumanMoveEndCircle = [490, 500, 360];\n\n            const x = selectedHumanMoveEndCircle[0] - 850 * (phaseTime / phaseLength);\n            const [, y, r] = selectedHumanMoveEndCircle;\n            const d = 2 * r;\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(snap.humanMove);\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][Object(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"])(snap.humanMove)], x - r, y - r, d, d);\n          }\n\n          // Draw computer move\n          if (!(snap.whoGetsThePoint === 'HUMAN' || snap.whoGetsThePoint === 'BOTH')) {\n            const selectedComputerMoveEndCircle = [1310, 500, 360];\n\n            const x = selectedComputerMoveEndCircle[0] + 850 * (phaseTime / phaseLength);\n            const [, y, r] = selectedComputerMoveEndCircle;\n            const d = 2 * r;\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fillStyle = Object(_getBackgroundColorOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(snap.computerMove);\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].beginPath();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].arc(x, y, r, 0, 2 * Math.PI);\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].fill();\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].closePath();\n\n            _canvas__WEBPACK_IMPORTED_MODULE_0__[\"ctx\"].drawImage(_images__WEBPACK_IMPORTED_MODULE_7__[\"default\"][Object(_logos__WEBPACK_IMPORTED_MODULE_5__[\"noSpace\"])(snap.computerMove)], x - r, y - r, d, d);\n          }\n\n          break;\n        }\n      }\n\n      break;\n    }\n\n    default: console.log('TODO: ' + snap.type)\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  render,\n});\n\n// Snap types:\n//\n// NOTHING_TO_CHARACTER(availableCharacters, completionFactor)\n// CHARACTER_TO_BOOSTER(previouslyAvailableCharacters, availableBoosters, completionFactor)\n// CHARACTER_TO_CHARACTER(previouslyAvailableCharacters, availableCharacters, completionFactor)\n// BOOSTER_TO_MOVE(previouslyAvailableBoosters, availableMoves, completionFactor)\n// MOVE_CLASH(previouslyAvailableMoves, availableMoves, humanMove, computerMove, whoGetsThePoint, humanPoints, computerPoints, completionFactor)\n// FINAL_MOVE_CLASH(previouslyAvailableMoves, humanMove, computerMove, whoGetsThePoint, humanPoints, computerPoints, completionFactor)\n\n\n//# sourceURL=webpack:///./web-src/renderer.js?");

/***/ })

}]);