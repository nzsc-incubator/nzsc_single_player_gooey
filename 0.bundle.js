(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./web-src/box.js":
/*!************************!*\
  !*** ./web-src/box.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  width: 400,\n  height: 800,\n  horizontalMargin: 40,\n  verticalMargin: 100,\n});\n\n\n//# sourceURL=webpack:///./web-src/box.js?");

/***/ }),

/***/ "./web-src/circle.js":
/*!***************************!*\
  !*** ./web-src/circle.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst circle = {\n  radius: 210,\n  margin: 100,\n};\n\n// Returns an array representing a circle: [x, y, r]\nconst nthCircle = (n, canvasWidth, canvasHeight) => {\n  const w = canvasWidth;\n  const h = canvasHeight;\n  const r = circle.radius;\n  const m = circle.margin;\n\n  // Top horizontal margin\n  const thm = (w - 6*r - 2*m) / 2;\n  // Bottom horizontal margin\n  const bhm = (w - 4*r - m) / 2;\n  // Vertical margin\n  const vm = (h - 4*r -m) / 2;\n\n  const circleCoords = [\n    [thm + r, vm + r],\n    [thm + 3*r + m, vm + r],\n    [thm + 5*r + 2*m, vm + r],\n    [bhm + r, vm + 3*r + m],\n    [bhm + 3*r + m, vm + 3*r + m]\n  ];\n\n  if (!(n in circleCoords)) {\n    throw new RangeError('nthCircle() expects 0 <= n <= 4');\n  }\n\n  return circleCoords[n].concat([r]);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (nthCircle);\n\n\n//# sourceURL=webpack:///./web-src/circle.js?");

/***/ }),

/***/ "./web-src/createRenderer.js":
/*!***********************************!*\
  !*** ./web-src/createRenderer.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images */ \"./web-src/images.js\");\n/* harmony import */ var _box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./box */ \"./web-src/box.js\");\n/* harmony import */ var _circle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./circle */ \"./web-src/circle.js\");\n/* harmony import */ var _logos__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logos */ \"./web-src/logos.js\");\n\n\n\n\n\nconst BACKGROUND = '#F1F1F1';\nconst BOX_BACKGROUND = '#111';\nconst TEMP_BG = '#111'; // TODO dynamically calculate circle bgcolor based on move\n\nconst ACCELERATOR = 8.0; // Makes animations faster\n\nconst hm = _box__WEBPACK_IMPORTED_MODULE_1__[\"default\"].horizontalMargin;\nconst bw = _box__WEBPACK_IMPORTED_MODULE_1__[\"default\"].width;\nconst bh = _box__WEBPACK_IMPORTED_MODULE_1__[\"default\"].height;\n\nconst createRenderer = (ctx) => (output, t = 0) => {\n  const question = JSON.parse(output.question());\n  const notifications = JSON.parse(output.notifications());\n\n  switch (question.type) {\n    case 'CHOOSE_CHARACTER':\n      ctx.fillStyle = BACKGROUND;\n      ctx.fillRect(0, 0, 1800, 1000);\n\n      const logoMoves = question.availableCharacters.map(_logos__WEBPACK_IMPORTED_MODULE_3__[\"logoOfCharacter\"]);\n      ctx.fillStyle = BOX_BACKGROUND;\n\n      for (let i = 0; i < 4; i++) {\n        const x = hm + i * (400 + hm) - (t * ACCELERATOR);\n        ctx.fillRect(x, 100, bw, bh);\n\n        ctx.drawImage(_images__WEBPACK_IMPORTED_MODULE_0__[\"default\"][logoMoves[i]], x, 300, 400, 400);\n\n        /*const img = new Image();\n        img.src = srcs[i];\n        img.addEventListener('load', () => {\n          ctx.drawImage(img, x, 300, 400, 400);\n        });*/\n      }\n      break;\n    case 'CHOOSE_BOOSTER':\n      ctx.fillStyle = BACKGROUND;\n      ctx.fillRect(0, 0, 1800, 1000);\n\n      const boosterLogoMoves = question.availableBoosters.map(_logos__WEBPACK_IMPORTED_MODULE_3__[\"logoOfBooster\"]);\n      ctx.fillStyle = BOX_BACKGROUND;\n\n      for (let i = 0; i < boosterLogoMoves.length; i++) {\n        const x = hm + i * (400 + hm) - (t * ACCELERATOR);\n        ctx.fillRect(x, 100, bw, bh);\n        ctx.drawImage(_images__WEBPACK_IMPORTED_MODULE_0__[\"default\"][boosterLogoMoves[i]], x, 300, 400, 400);\n\n        /*const img = new Image();\n        img.src = srcs[i];\n        img.addEventListener('load', () => {\n          ctx.drawImage(img, x, 300, 400, 400);\n        });*/\n      }\n      break;\n    case 'CHOOSE_MOVE':\n      ctx.fillStyle = BACKGROUND;\n      ctx.fillRect(0, 0, 1800, 1000);\n\n      const availableMoves = question.availableMoves.map(_logos__WEBPACK_IMPORTED_MODULE_3__[\"noSpace\"]);\n\n      ctx.fillStyle = TEMP_BG;\n      for (let i = 0; i < availableMoves.length; i++) {\n        const circle = Object(_circle__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(i, ctx.canvas.width, ctx.canvas.height);\n        const cx = circle[0] - (t * ACCELERATOR);\n        const [, cy, cr] = circle;\n        const cd = 2 * cr;\n\n        ctx.beginPath();\n        ctx.arc(cx, cy, cr, 0, 2* Math.PI);\n        ctx.fill();\n        ctx.closePath();\n\n        ctx.drawImage(_images__WEBPACK_IMPORTED_MODULE_0__[\"default\"][availableMoves[i]], cx - cr, cy - cr, cd, cd);\n      }\n\n      break;\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createRenderer);\n\n\n//# sourceURL=webpack:///./web-src/createRenderer.js?");

/***/ }),

/***/ "./web-src/getBoxIndexAt.js":
/*!**********************************!*\
  !*** ./web-src/getBoxIndexAt.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./box */ \"./web-src/box.js\");\n\n\n// Takes a coordinate and returns the index of a box clicked.\n// Or -1 if none is clicked.\n/* harmony default export */ __webpack_exports__[\"default\"] = ((x, y, ch) => {\n  const hm = _box__WEBPACK_IMPORTED_MODULE_0__[\"default\"].horizontalMargin;\n  const vm = _box__WEBPACK_IMPORTED_MODULE_0__[\"default\"].verticalMargin;\n  const bw = _box__WEBPACK_IMPORTED_MODULE_0__[\"default\"].width;\n  const bh = _box__WEBPACK_IMPORTED_MODULE_0__[\"default\"].height;\n\n  if (y < vm || y > (ch - vm)) {\n    return -1;\n  }\n\n  if (((x - hm) % (bw + hm)) > bw) {\n    return -1;\n  }\n\n  return Math.floor((x - hm) / (bw + hm));\n});\n\n\n//# sourceURL=webpack:///./web-src/getBoxIndexAt.js?");

/***/ }),

/***/ "./web-src/getCircleIndexAt.js":
/*!*************************************!*\
  !*** ./web-src/getCircleIndexAt.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _circle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./circle */ \"./web-src/circle.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((x, y, canvasWidth, canvasHeight) => {\n  const circles = [0, 1, 2, 3, 4].map(i => Object(_circle__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(i, canvasWidth, canvasHeight));\n\n  for (const i in circles) {\n    const [cx, cy, cr] = circles[i];\n\n    const dx = cx - x;\n    const dy = cy - y;\n\n    if (dx*dx + dy*dy <= cr*cr) {\n      return i;\n    }\n  }\n\n  return -1;\n});\n\n\n//# sourceURL=webpack:///./web-src/getCircleIndexAt.js?");

/***/ }),

/***/ "./web-src/images.js":
/*!***************************!*\
  !*** ./web-src/images.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _images_Kick_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images/Kick.png */ \"./web-src/images/Kick.png\");\n/* harmony import */ var _images_Kick_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_images_Kick_png__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _images_NinjaSword_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/NinjaSword.png */ \"./web-src/images/NinjaSword.png\");\n/* harmony import */ var _images_NinjaSword_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_images_NinjaSword_png__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _images_Nunchucks_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/Nunchucks.png */ \"./web-src/images/Nunchucks.png\");\n/* harmony import */ var _images_Nunchucks_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_images_Nunchucks_png__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _images_Rampage_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/Rampage.png */ \"./web-src/images/Rampage.png\");\n/* harmony import */ var _images_Rampage_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_images_Rampage_png__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _images_Muscle_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./images/Muscle.png */ \"./web-src/images/Muscle.png\");\n/* harmony import */ var _images_Muscle_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_images_Muscle_png__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _images_Zap_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images/Zap.png */ \"./web-src/images/Zap.png\");\n/* harmony import */ var _images_Zap_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_images_Zap_png__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _images_SamuraiSword_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/SamuraiSword.png */ \"./web-src/images/SamuraiSword.png\");\n/* harmony import */ var _images_SamuraiSword_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_images_SamuraiSword_png__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _images_Helmet_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/Helmet.png */ \"./web-src/images/Helmet.png\");\n/* harmony import */ var _images_Helmet_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_images_Helmet_png__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _images_Smash_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./images/Smash.png */ \"./web-src/images/Smash.png\");\n/* harmony import */ var _images_Smash_png__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_images_Smash_png__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _images_JugglingKnives_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./images/JugglingKnives.png */ \"./web-src/images/JugglingKnives.png\");\n/* harmony import */ var _images_JugglingKnives_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_images_JugglingKnives_png__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _images_AcidSpray_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./images/AcidSpray.png */ \"./web-src/images/AcidSpray.png\");\n/* harmony import */ var _images_AcidSpray_png__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_images_AcidSpray_png__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _images_Nose_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./images/Nose.png */ \"./web-src/images/Nose.png\");\n/* harmony import */ var _images_Nose_png__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_images_Nose_png__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _images_Placeholder_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./images/Placeholder.png */ \"./web-src/images/Placeholder.png\");\n/* harmony import */ var _images_Placeholder_png__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_images_Placeholder_png__WEBPACK_IMPORTED_MODULE_12__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*\nTODO other images\n*/\n\nconst srcs = {Kick: (_images_Kick_png__WEBPACK_IMPORTED_MODULE_0___default()), NinjaSword: (_images_NinjaSword_png__WEBPACK_IMPORTED_MODULE_1___default()), Nunchucks: (_images_Nunchucks_png__WEBPACK_IMPORTED_MODULE_2___default()), Rampage: (_images_Rampage_png__WEBPACK_IMPORTED_MODULE_3___default()), Muscle: (_images_Muscle_png__WEBPACK_IMPORTED_MODULE_4___default()), Zap: (_images_Zap_png__WEBPACK_IMPORTED_MODULE_5___default()), SamuraiSword: (_images_SamuraiSword_png__WEBPACK_IMPORTED_MODULE_6___default()), Helmet: (_images_Helmet_png__WEBPACK_IMPORTED_MODULE_7___default()), Smash: (_images_Smash_png__WEBPACK_IMPORTED_MODULE_8___default()), JugglingKnives: (_images_JugglingKnives_png__WEBPACK_IMPORTED_MODULE_9___default()), AcidSpray: (_images_AcidSpray_png__WEBPACK_IMPORTED_MODULE_10___default()), Nose: (_images_Nose_png__WEBPACK_IMPORTED_MODULE_11___default()), Placeholder: (_images_Placeholder_png__WEBPACK_IMPORTED_MODULE_12___default())};\n\nconst imageLoadPromises = [];\n\nconst images = Object.keys(srcs).reduce((obj, srcKey) => {\n  const img = new Image();\n  img.src = srcs[srcKey];\n\n  imageLoadPromises.push(new Promise((resolve, reject) => {\n    img.addEventListener('load', () => {\n      resolve();\n    });\n  }));\n\n  return {\n    ...obj,\n    [srcKey]: img,\n  };\n}, {});\n\nimages.ShadowFireball = images.Placeholder;\nimages.ShadowSlip = images.Placeholder;\nimages.LightningFastKarateChop = images.Placeholder;\nimages.RunInCircles = images.Placeholder;\nimages.ZombieCorps = images.Placeholder;\nimages.Apocalypse = images.Placeholder;\nimages.Regenerate = images.Placeholder;\nimages.Gravedigger = images.Placeholder;\nimages.Lightning = images.Placeholder;\nimages.Earthquake = images.Placeholder;\nimages.Bend = images.Placeholder;\nimages.Twist = images.Placeholder;\nimages.BackwardsMoustachio = images.Placeholder;\nimages.NoseOfTheTaunted = images.Placeholder;\nimages.BigHairyDeal = images.Placeholder;\nimages.MustacheMash = images.Placeholder;\n\nimages.waitForAllToLoad = Promise.all(imageLoadPromises);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (images);\n\n\n//# sourceURL=webpack:///./web-src/images.js?");

/***/ }),

/***/ "./web-src/images/AcidSpray.png":
/*!**************************************!*\
  !*** ./web-src/images/AcidSpray.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"33726fbcb7dd80e928f64c19f6b77381.png\";\n\n//# sourceURL=webpack:///./web-src/images/AcidSpray.png?");

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

/***/ "./web-src/images/Muscle.png":
/*!***********************************!*\
  !*** ./web-src/images/Muscle.png ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"2ed09b57e356edad8d9cdef4218babe7.png\";\n\n//# sourceURL=webpack:///./web-src/images/Muscle.png?");

/***/ }),

/***/ "./web-src/images/NinjaSword.png":
/*!***************************************!*\
  !*** ./web-src/images/NinjaSword.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"8a030ae90ecc7b074af4eeba6de5fad9.png\";\n\n//# sourceURL=webpack:///./web-src/images/NinjaSword.png?");

/***/ }),

/***/ "./web-src/images/Nose.png":
/*!*********************************!*\
  !*** ./web-src/images/Nose.png ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"8e28dae4b0729f881e7039cd45f66508.png\";\n\n//# sourceURL=webpack:///./web-src/images/Nose.png?");

/***/ }),

/***/ "./web-src/images/Nunchucks.png":
/*!**************************************!*\
  !*** ./web-src/images/Nunchucks.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"c18eadb805abd3e802803c4423aec15c.png\";\n\n//# sourceURL=webpack:///./web-src/images/Nunchucks.png?");

/***/ }),

/***/ "./web-src/images/Placeholder.png":
/*!****************************************!*\
  !*** ./web-src/images/Placeholder.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"920b41382ffdb524d365ac8f2ff2b2eb.png\";\n\n//# sourceURL=webpack:///./web-src/images/Placeholder.png?");

/***/ }),

/***/ "./web-src/images/Rampage.png":
/*!************************************!*\
  !*** ./web-src/images/Rampage.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"5c41cffad63a5b67a3072fd52273218d.png\";\n\n//# sourceURL=webpack:///./web-src/images/Rampage.png?");

/***/ }),

/***/ "./web-src/images/SamuraiSword.png":
/*!*****************************************!*\
  !*** ./web-src/images/SamuraiSword.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"9e27cf6edbe1d107a385d0f7046124ca.png\";\n\n//# sourceURL=webpack:///./web-src/images/SamuraiSword.png?");

/***/ }),

/***/ "./web-src/images/Smash.png":
/*!**********************************!*\
  !*** ./web-src/images/Smash.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"c18823d9bf72ff812ca449cb30547723.png\";\n\n//# sourceURL=webpack:///./web-src/images/Smash.png?");

/***/ }),

/***/ "./web-src/images/Zap.png":
/*!********************************!*\
  !*** ./web-src/images/Zap.png ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"7329f3b81c7bab3d555f1945e0585fcd.png\";\n\n//# sourceURL=webpack:///./web-src/images/Zap.png?");

/***/ }),

/***/ "./web-src/index.js":
/*!**************************!*\
  !*** ./web-src/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _nzsc_single_player_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nzsc_single_player_web */ \"./web-src/nzsc_single_player_web.js\");\n/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! query-string */ \"./node_modules/query-string/index.js\");\n/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _createRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createRenderer */ \"./web-src/createRenderer.js\");\n/* harmony import */ var _getBoxIndexAt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBoxIndexAt */ \"./web-src/getBoxIndexAt.js\");\n/* harmony import */ var _getCircleIndexAt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getCircleIndexAt */ \"./web-src/getCircleIndexAt.js\");\n/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images */ \"./web-src/images.js\");\n\n\n\n\n\n\n\n////////////////\n////////////////\n////////////////\n// Set up constants.\n////////////////\n////////////////\n////////////////\n\nconst MAX32 = 2 ** 32 - 1;\n\nconst RIGHT_START = -225; // canvas.width / ACCELERATOR\n\n////////////////\n////////////////\n////////////////\n// Parse query-string.\n////////////////\n////////////////\n////////////////\n\nconst parsedQuery = query_string__WEBPACK_IMPORTED_MODULE_1___default.a.parse(location.search);\n\nconst parsedSeed = parseInt(parsedQuery.seed);\nconst overrideSeed = isNaN(parsedSeed) || parsedSeed > MAX32\n  ? null\n  : parsedSeed;\n\nconst isAutofocusDisabled = parsedQuery.disable_autofocus === undefined\n  ? false\n  : (\n    parsedQuery.disable_autofocus === null\n    || parsedQuery.disable_autofocus.trim() === 'true'\n  );\n\n////////////////\n////////////////\n////////////////\n// Cache\n////////////////\n////////////////\n////////////////\n\nlet cachedOutput = null;\nlet cachedLastOutput = null;\n\n////////////////\n////////////////\n////////////////\n// Helpers.\n////////////////\n////////////////\n////////////////\n\nconst generateSeed = () => (\n  overrideSeed === null\n    ? Math.random() * MAX32\n    : overrideSeed\n);\n\nconst sizeCanvas = (canvas, dimensions) => {\n  const wFactor = window.innerWidth / dimensions.width;\n  const hFactor = window.innerHeight / dimensions.height;\n  const scaleFactor = Math.min(wFactor, hFactor);\n  const cssWidth = dimensions.width * scaleFactor;\n  const cssHeight = dimensions.height * scaleFactor;\n\n  canvas.width = dimensions.width;\n  canvas.height = dimensions.height;\n\n  canvas.style.width = cssWidth + 'px';\n  canvas.style.height = cssHeight + 'px';\n\n  canvas.style.position = 'fixed';\n  canvas.style.left = (window.innerWidth - cssWidth) / 2 + 'px';\n  canvas.style.top = (window.innerHeight - cssHeight) / 2 + 'px';\n};\n\n////////////////\n////////////////\n////////////////\n// Set up DOM.\n////////////////\n////////////////\n////////////////\n\nconst canvas = document.getElementById('nzsc-canvas');\n\n// Sorry WebGL, not today...\nconst ctx = canvas.getContext('2d');\n\nconst render = Object(_createRenderer__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(ctx);\n\nconst DIMENSIONS = {\n  width: 1800,\n  height: 1000,\n};\n\nsizeCanvas(canvas, DIMENSIONS);\n\nwindow.addEventListener('resize', () => {\n  sizeCanvas(canvas, DIMENSIONS);\n\n  if (cachedOutput) {\n    render(cachedOutput);\n  }\n});\n\n////////////////\n////////////////\n////////////////\n// Main logic.\n////////////////\n////////////////\n////////////////\n\nconst newGame = () => {\n  const seed = generateSeed();\n  const game = _nzsc_single_player_web__WEBPACK_IMPORTED_MODULE_0__[\"SinglePlayerNZSCWebInterface\"].new(seed);\n\n  //let output = game.initial_output();\n  //cachedOutput = output;\n  cachedOutput = game.initial_output();\n\n  const characterSelectionListener = (e) => {\n    let x = e.clientX;\n    let y = e.clientY;\n\n    const br = canvas.getBoundingClientRect();\n\n    x -= br.left;\n    y -= br.top;\n\n    const wFactor = window.innerWidth / canvas.width;\n    const hFactor = window.innerHeight / canvas.height;\n    const scaleFactor = Math.min(wFactor, hFactor);\n\n    x /= scaleFactor;\n    y /= scaleFactor;\n\n    const boxIndex = Object(_getBoxIndexAt__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(x, y, canvas.height);\n\n    const { availableCharacters } = JSON.parse(cachedOutput.question());\n\n    if (!(boxIndex in availableCharacters)) {\n      return;\n    }\n\n    const character = availableCharacters[boxIndex];\n\n    cachedLastOutput = cachedOutput;\n    cachedOutput = game.next(character);\n\n    canvas.removeEventListener('click', characterSelectionListener);\n\n    // Check to see if computer chose same move as human.\n    if (JSON.parse(cachedOutput.question()).type === 'CHOOSE_CHARACTER') {\n      enterCharacterScreen();\n    } else {\n      beginCharacterToBoosterTransition();\n    }\n  };\n\n  const boosterSelectionListener = (e) => {\n    let x = e.clientX;\n    let y = e.clientY;\n\n    const br = canvas.getBoundingClientRect();\n\n    x -= br.left;\n    y -= br.top;\n\n    const wFactor = window.innerWidth / canvas.width;\n    const hFactor = window.innerHeight / canvas.height;\n    const scaleFactor = Math.min(wFactor, hFactor);\n\n    x /= scaleFactor;\n    y /= scaleFactor;\n\n    const boxIndex = Object(_getBoxIndexAt__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(x, y, canvas.height);\n\n    const { availableBoosters } = JSON.parse(cachedOutput.question());\n\n    if (!(boxIndex in availableBoosters)) {\n      return;\n    }\n\n    const booster = availableBoosters[boxIndex];\n\n    cachedLastOutput = cachedOutput;\n    cachedOutput = game.next(booster);\n\n    canvas.removeEventListener('click', boosterSelectionListener);\n\n    beginBoosterToMoveTransition();\n  };\n\n  const moveSelectionListener = (e) => {\n    let x = e.clientX;\n    let y = e.clientY;\n\n    const br = canvas.getBoundingClientRect();\n\n    x -= br.left;\n    y -= br.top;\n\n    const wFactor = window.innerWidth / canvas.width;\n    const hFactor = window.innerHeight / canvas.height;\n    const scaleFactor = Math.min(wFactor, hFactor);\n\n    x /= scaleFactor;\n    y /= scaleFactor;\n\n    const circleIndex = Object(_getCircleIndexAt__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(x, y, canvas.width, canvas.height);\n\n    const { availableMoves } = JSON.parse(cachedOutput.question());\n\n    if (!(circleIndex in availableMoves)) {\n      return;\n    }\n\n    const move = availableMoves[circleIndex];\n\n    cachedLastOutput = cachedOutput;\n    cachedOutput = game.next(move);\n\n    canvas.removeEventListener('click', moveSelectionListener);\n\n    alert(move);\n\n    // TODO check for game over\n\n    //showOutcome();\n  };\n\n  const enterCharacterScreen = () => {\n    let t = RIGHT_START;\n    let last = Date.now();\n\n    const tick = () => {\n      const now = Date.now();\n      const dt = now - last;\n      last = now;\n\n      t += dt;\n\n      if (t > 0) {\n        t = 0;\n      }\n\n      render(cachedOutput, t);\n\n      if (t < 0) {\n        requestAnimationFrame(tick);\n      } else {\n        canvas.addEventListener('click', characterSelectionListener);\n      }\n    };\n\n    requestAnimationFrame(tick);\n  };\n\n  const beginCharacterToBoosterTransition = () => {\n    let t = 0;\n    let last = Date.now();\n\n    const exitCharacterScreen = () => {\n      const now = Date.now();\n      const dt = now - last;\n      last = now;\n\n      t += dt;\n\n      render(cachedLastOutput, t);\n\n      if (t < 500) {\n        requestAnimationFrame(exitCharacterScreen);\n      } else {\n        t = RIGHT_START;\n        requestAnimationFrame(enterBoosterScreen);\n      }\n    };\n\n    const enterBoosterScreen = () => {\n      const now = Date.now();\n      const dt = now - last;\n      last = now;\n\n      t += dt;\n\n      if (t > 0) {\n        t = 0;\n      }\n\n      render(cachedOutput, t);\n\n      if (t < 0) {\n        requestAnimationFrame(enterBoosterScreen);\n      } else {\n        canvas.addEventListener('click', boosterSelectionListener);\n      }\n    };\n\n    requestAnimationFrame(exitCharacterScreen);\n  };\n\n  const beginBoosterToMoveTransition = () => {\n    let t = 0;\n    let last = Date.now();\n\n    const exitBoosterScreen = () => {\n      const now = Date.now();\n      const dt = now - last;\n      last = now;\n\n      t += dt;\n\n      render(cachedLastOutput, t);\n\n      if (t < 500) {\n        requestAnimationFrame(exitBoosterScreen);\n      } else {\n        t = RIGHT_START;\n        requestAnimationFrame(enterMoveScreen);\n      }\n    };\n\n    const enterMoveScreen = () => {\n      const now = Date.now();\n      const dt = now - last;\n      last = now;\n\n      t += dt;\n\n      if (t > 0) {\n        t = 0;\n      }\n\n      render(cachedOutput, t);\n\n      if (t < 0) {\n        requestAnimationFrame(enterMoveScreen);\n      } else {\n        canvas.addEventListener('click', moveSelectionListener);\n      }\n    };\n\n    requestAnimationFrame(exitBoosterScreen);\n  };\n\n  const showOutcome = () => {\n    let t = 0;\n    let last = Date.now();\n\n    const escalate = () => {\n      const now = Date.now();\n      const dt = now - last;\n      last = now;\n\n      t += dt;\n\n      //render(cachedLastOutput, t);\n\n      if (t < 500) {\n        requestAnimationFrame(escalate);\n      } else {\n        //t = RIGHT_START?;\n        requestAnimationFrame(deescalate);\n      }\n    };\n\n    const deescalate = () => {\n      const now = Date.now();\n      const dt = now - last;\n      last = now;\n\n      t += dt;\n\n      if (t > 0) {\n        t = 0;\n      }\n\n      //render(cachedOutput, t);\n\n      if (t < 0) {\n        requestAnimationFrame(deescalate);\n      } else {\n        canvas.addEventListener('click', moveSelectionListener);\n      }\n    };\n\n    requestAnimationFrame(escalate);\n  };\n\n  _images__WEBPACK_IMPORTED_MODULE_5__[\"default\"].waitForAllToLoad.then(() => {\n    enterCharacterScreen();\n  });\n};\n\n////////////////\n////////////////\n////////////////\n// Start a game.\n////////////////\n////////////////\n////////////////\nnewGame();\n\n\n//# sourceURL=webpack:///./web-src/index.js?");

/***/ }),

/***/ "./web-src/logos.js":
/*!**************************!*\
  !*** ./web-src/logos.js ***!
  \**************************/
/*! exports provided: logoOfCharacter, logoOfBooster, noSpace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"logoOfCharacter\", function() { return logoOfCharacter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"logoOfBooster\", function() { return logoOfBooster; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"noSpace\", function() { return noSpace; });\nconst logoOfCharacter = (character) => {\n  switch (character) {\n    case 'Ninja': return 'Kick';\n    case 'Zombie': return 'Rampage';\n    case 'Samurai': return 'Helmet';\n    case 'Clown': return 'Nose';\n    default: throw new Error('Illegal character: ' + character);\n  }\n};\n\nconst logoOfBooster = (booster) => {\n  booster = noSpace(booster);\n\n  switch (booster) {\n    case 'Shadow': return 'ShadowFireball';\n    case 'Speedy': return 'RunInCircles';\n    case 'Regenerative': return 'Regenerate';\n    case 'ZombieCorps': return 'ZombieCorps';\n    case 'Atlas': return 'Lightning';\n    case 'Strong': return 'Bend';\n    case 'Backwards': return 'NoseOfTheTaunted';\n    case 'Moustachio': return 'BigHairyDeal';\n    case 'NoBooster': return 'Nose'; // TODO\n    default: throw new Error('Illegal booster: ' + booster)\n  }\n};\n\nconst noSpace = str => str.split('').filter(char => char !== ' ').join('');\n\n\n\n\n//# sourceURL=webpack:///./web-src/logos.js?");

/***/ }),

/***/ "./web-src/nzsc_single_player_web.js":
/*!*******************************************!*\
  !*** ./web-src/nzsc_single_player_web.js ***!
  \*******************************************/
/*! exports provided: OutputWebInterface, SinglePlayerNZSCWebInterface, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OutputWebInterface\", function() { return OutputWebInterface; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SinglePlayerNZSCWebInterface\", function() { return SinglePlayerNZSCWebInterface; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nzsc_single_player_web_bg */ \"./web-src/nzsc_single_player_web_bg.wasm\");\n/* tslint:disable */\n\n\nconst TextDecoder = typeof self === 'object' && self.TextDecoder\n    ? self.TextDecoder\n    : __webpack_require__(/*! util */ \"./node_modules/util/util.js\").TextDecoder;\n\nlet cachedDecoder = new TextDecoder('utf-8');\n\nlet cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null ||\n        cachegetUint8Memory.buffer !== _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer)\n        cachegetUint8Memory = new Uint8Array(_nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    return cachegetUint8Memory;\n}\n\nfunction getStringFromWasm(ptr, len) {\n    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n\nlet cachedGlobalArgumentPtr = null;\nfunction globalArgumentPtr() {\n    if (cachedGlobalArgumentPtr === null)\n        cachedGlobalArgumentPtr = _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_global_argument_ptr\"]();\n    return cachedGlobalArgumentPtr;\n}\n\nlet cachegetUint32Memory = null;\nfunction getUint32Memory() {\n    if (cachegetUint32Memory === null ||\n        cachegetUint32Memory.buffer !== _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer)\n        cachegetUint32Memory = new Uint32Array(_nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    return cachegetUint32Memory;\n}\n\nconst TextEncoder = typeof self === 'object' && self.TextEncoder\n    ? self.TextEncoder\n    : __webpack_require__(/*! util */ \"./node_modules/util/util.js\").TextEncoder;\n\nlet cachedEncoder = new TextEncoder('utf-8');\n\nfunction passStringToWasm(arg) {\n\n    const buf = cachedEncoder.encode(arg);\n    const ptr = _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"](buf.length);\n    getUint8Memory().set(buf, ptr);\n    return [ptr, buf.length];\n}\n\nclass OutputWebInterface {\n\n                static __construct(ptr) {\n                    return new OutputWebInterface(ptr);\n                }\n\n                constructor(ptr) {\n                    this.ptr = ptr;\n                }\n\n            free() {\n                const ptr = this.ptr;\n                this.ptr = 0;\n                _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_outputwebinterface_free\"](ptr);\n            }\n        notifications() {\n    const retptr = globalArgumentPtr();\n    _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"outputwebinterface_notifications\"](retptr, this.ptr);\n    const mem = getUint32Memory();\n    const ptr = mem[retptr / 4];\n    const len = mem[retptr / 4 + 1];\n    const realRet = getStringFromWasm(ptr, len);\n    _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](ptr, len * 1);\n    return realRet;\n}\nquestion() {\n    const retptr = globalArgumentPtr();\n    _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"outputwebinterface_question\"](retptr, this.ptr);\n    const mem = getUint32Memory();\n    const ptr = mem[retptr / 4];\n    const len = mem[retptr / 4 + 1];\n    const realRet = getStringFromWasm(ptr, len);\n    _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](ptr, len * 1);\n    return realRet;\n}\n}\n\nclass SinglePlayerNZSCWebInterface {\n\n                static __construct(ptr) {\n                    return new SinglePlayerNZSCWebInterface(ptr);\n                }\n\n                constructor(ptr) {\n                    this.ptr = ptr;\n                }\n\n            free() {\n                const ptr = this.ptr;\n                this.ptr = 0;\n                _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_singleplayernzscwebinterface_free\"](ptr);\n            }\n        static new(arg0) {\n    return SinglePlayerNZSCWebInterface.__construct(_nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"singleplayernzscwebinterface_new\"](arg0));\n}\ninitial_output() {\n    return OutputWebInterface.__construct(_nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"singleplayernzscwebinterface_initial_output\"](this.ptr));\n}\nnext(arg0) {\n    const [ptr0, len0] = passStringToWasm(arg0);\n    try {\n        return OutputWebInterface.__construct(_nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"singleplayernzscwebinterface_next\"](this.ptr, ptr0, len0));\n    } finally {\n        _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](ptr0, len0 * 1);\n    }\n}\n}\n\nfunction __wbindgen_throw(ptr, len) {\n    throw new Error(getStringFromWasm(ptr, len));\n}\n\n\n\n//# sourceURL=webpack:///./web-src/nzsc_single_player_web.js?");

/***/ }),

/***/ "./web-src/nzsc_single_player_web_bg.wasm":
/*!************************************************!*\
  !*** ./web-src/nzsc_single_player_web_bg.wasm ***!
  \************************************************/
/*! exports provided: memory, __wbg_singleplayernzscwebinterface_free, __wbg_outputwebinterface_free, outputwebinterface_notifications, outputwebinterface_question, singleplayernzscwebinterface_new, singleplayernzscwebinterface_initial_output, singleplayernzscwebinterface_next, __wbindgen_global_argument_ptr, __wbindgen_malloc, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar instance = __webpack_require__.w[module.i];\n// export exports from WebAssembly module\nmodule.exports = instance.exports;\n// exec imports from WebAssembly module (for esm order)\n__webpack_require__(/*! ./nzsc_single_player_web */ \"./web-src/nzsc_single_player_web.js\");\n// exec wasm module\ninstance.exports.__webpack_init__()\n\n//# sourceURL=webpack:///./web-src/nzsc_single_player_web_bg.wasm?");

/***/ })

}]);