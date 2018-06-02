(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./web-src/createRenderer.js":
/*!***********************************!*\
  !*** ./web-src/createRenderer.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _images_Kick_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images/Kick.png */ \"./web-src/images/Kick.png\");\n/* harmony import */ var _images_Kick_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_images_Kick_png__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _images_NinjaSword_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/NinjaSword.png */ \"./web-src/images/NinjaSword.png\");\n/* harmony import */ var _images_NinjaSword_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_images_NinjaSword_png__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _images_Nunchucks_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/Nunchucks.png */ \"./web-src/images/Nunchucks.png\");\n/* harmony import */ var _images_Nunchucks_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_images_Nunchucks_png__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _images_Rampage_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/Rampage.png */ \"./web-src/images/Rampage.png\");\n/* harmony import */ var _images_Rampage_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_images_Rampage_png__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _images_Muscle_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./images/Muscle.png */ \"./web-src/images/Muscle.png\");\n/* harmony import */ var _images_Muscle_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_images_Muscle_png__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _images_Zap_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images/Zap.png */ \"./web-src/images/Zap.png\");\n/* harmony import */ var _images_Zap_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_images_Zap_png__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _images_SamuraiSword_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/SamuraiSword.png */ \"./web-src/images/SamuraiSword.png\");\n/* harmony import */ var _images_SamuraiSword_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_images_SamuraiSword_png__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _images_Helmet_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/Helmet.png */ \"./web-src/images/Helmet.png\");\n/* harmony import */ var _images_Helmet_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_images_Helmet_png__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _images_Smash_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./images/Smash.png */ \"./web-src/images/Smash.png\");\n/* harmony import */ var _images_Smash_png__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_images_Smash_png__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _images_JugglingKnives_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./images/JugglingKnives.png */ \"./web-src/images/JugglingKnives.png\");\n/* harmony import */ var _images_JugglingKnives_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_images_JugglingKnives_png__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _images_AcidSpray_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./images/AcidSpray.png */ \"./web-src/images/AcidSpray.png\");\n/* harmony import */ var _images_AcidSpray_png__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_images_AcidSpray_png__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _images_Nose_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./images/Nose.png */ \"./web-src/images/Nose.png\");\n/* harmony import */ var _images_Nose_png__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_images_Nose_png__WEBPACK_IMPORTED_MODULE_11__);\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst BACKGROUND = '#CCC';\nconst CHARACTER_BACKGROUND = '#111';\n\nconst createRenderer = (ctx) => (output) => {\n  alert('ya')\n  const question = JSON.parse(output.question());\n  const notifications = JSON.parse(output.notifications());\n\n  ctx.fillStyle = BACKGROUND;\n  ctx.fillRect(0, 0, 1800, 1000);\n\n\n  const srcs = [_images_Kick_png__WEBPACK_IMPORTED_MODULE_0___default.a, _images_Rampage_png__WEBPACK_IMPORTED_MODULE_3___default.a, _images_Helmet_png__WEBPACK_IMPORTED_MODULE_7___default.a, _images_Nose_png__WEBPACK_IMPORTED_MODULE_11___default.a];\n  ctx.fillStyle = CHARACTER_BACKGROUND;\n  const MARGIN = 40;\n  for (let i = 0; i < 4; i++) {\n    const x = MARGIN + i * (400 + MARGIN);\n    ctx.fillRect(x, 100, 400, 800);\n\n    const img = new Image();\n    img.src = srcs[i];\n    ctx.drawImage(img, x, 300, 400, 400);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createRenderer);\n\n\n//# sourceURL=webpack:///./web-src/createRenderer.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _nzsc_single_player_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nzsc_single_player_web */ \"./web-src/nzsc_single_player_web.js\");\n/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! query-string */ \"./node_modules/query-string/index.js\");\n/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _createRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createRenderer */ \"./web-src/createRenderer.js\");\n\n\n\n\n////////////////\n////////////////\n////////////////\n// Set up constants.\n////////////////\n////////////////\n////////////////\n\nconst MAX32 = 2 ** 32 - 1;\n\n////////////////\n////////////////\n////////////////\n// Parse query-string.\n////////////////\n////////////////\n////////////////\n\nconst parsedQuery = query_string__WEBPACK_IMPORTED_MODULE_1___default.a.parse(location.search);\n\nconst parsedSeed = parseInt(parsedQuery.seed);\nconst overrideSeed = isNaN(parsedSeed) || parsedSeed > MAX32\n  ? null\n  : parsedSeed;\n\nconst isAutofocusDisabled = parsedQuery.disable_autofocus === undefined\n  ? false\n  : (\n    parsedQuery.disable_autofocus === null\n    || parsedQuery.disable_autofocus.trim() === 'true'\n  );\n\n////////////////\n////////////////\n////////////////\n// If the window gets resized, the canvas will get automatically cleared.\n// As a result, we must cache the last output, so we can re-render it when the window is resized.\n////////////////\n////////////////\n////////////////\n\nlet cachedOutput = null;\n\n////////////////\n////////////////\n////////////////\n// Helpers.\n////////////////\n////////////////\n////////////////\n\nconst generateSeed = () => (\n  overrideSeed === null\n    ? Math.random() * MAX32\n    : overrideSeed\n);\n\nconst sizeCanvas = (canvas, dimensions) => {\n  const wFactor = window.innerWidth / dimensions.width;\n  const hFactor = window.innerHeight / dimensions.height;\n  const scaleFactor = Math.min(wFactor, hFactor);\n  const cssWidth = dimensions.width * scaleFactor;\n  const cssHeight = dimensions.height * scaleFactor;\n\n  canvas.width = dimensions.width;\n  canvas.height = dimensions.height;\n\n  canvas.style.width = cssWidth + 'px';\n  canvas.style.height = cssHeight + 'px';\n\n  canvas.style.position = 'fixed';\n  canvas.style.left = (window.innerWidth - cssWidth) / 2 + 'px';\n  canvas.style.top = (window.innerHeight - cssHeight) / 2 + 'px';\n};\n\n////////////////\n////////////////\n////////////////\n// Set up DOM.\n////////////////\n////////////////\n////////////////\n\nconst canvas = document.getElementById('nzsc-canvas');\n\n// Sorry WebGL, not today...\nconst ctx = canvas.getContext('2d');\n\nconst render = Object(_createRenderer__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(ctx);\n\nconst DIMENSIONS = {\n  width: 1800,\n  height: 1000,\n};\n\nsizeCanvas(canvas, DIMENSIONS);\n\nwindow.addEventListener('resize', () => {\n  sizeCanvas(canvas, DIMENSIONS);\n\n  if (cachedOutput) {\n    render(cachedOutput);\n  }\n});\n\n////////////////\n////////////////\n////////////////\n// Main logic.\n////////////////\n////////////////\n////////////////\n\nconst newGame = () => {\n  const seed = generateSeed();\n  const game = _nzsc_single_player_web__WEBPACK_IMPORTED_MODULE_0__[\"SinglePlayerNZSCWebInterface\"].new(seed);\n\n  const initialOutput = game.initial_output();\n  cachedOutput = initialOutput;\n\n  render(initialOutput);\n\n  // TODO: click/touchend handlers\n};\n\n////////////////\n////////////////\n////////////////\n// Start a game.\n////////////////\n////////////////\n////////////////\n\nnewGame();\n\n\n//# sourceURL=webpack:///./web-src/index.js?");

/***/ }),

/***/ "./web-src/nzsc_single_player_web.js":
/*!*******************************************!*\
  !*** ./web-src/nzsc_single_player_web.js ***!
  \*******************************************/
/*! exports provided: NotificationWebInterface, SinglePlayerNZSCWebInterface, OutputWebInterface, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NotificationWebInterface\", function() { return NotificationWebInterface; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SinglePlayerNZSCWebInterface\", function() { return SinglePlayerNZSCWebInterface; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OutputWebInterface\", function() { return OutputWebInterface; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nzsc_single_player_web_bg */ \"./web-src/nzsc_single_player_web_bg.wasm\");\n/* tslint:disable */\n\n\nconst NotificationWebInterface = Object.freeze({ Ek:0, });\n\nconst TextDecoder = typeof self === 'object' && self.TextDecoder\n    ? self.TextDecoder\n    : __webpack_require__(/*! util */ \"./node_modules/util/util.js\").TextDecoder;\n\nlet cachedDecoder = new TextDecoder('utf-8');\n\nlet cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null ||\n        cachegetUint8Memory.buffer !== _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer)\n        cachegetUint8Memory = new Uint8Array(_nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    return cachegetUint8Memory;\n}\n\nfunction getStringFromWasm(ptr, len) {\n    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n\nlet cachedGlobalArgumentPtr = null;\nfunction globalArgumentPtr() {\n    if (cachedGlobalArgumentPtr === null)\n        cachedGlobalArgumentPtr = _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_global_argument_ptr\"]();\n    return cachedGlobalArgumentPtr;\n}\n\nlet cachegetUint32Memory = null;\nfunction getUint32Memory() {\n    if (cachegetUint32Memory === null ||\n        cachegetUint32Memory.buffer !== _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer)\n        cachegetUint32Memory = new Uint32Array(_nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    return cachegetUint32Memory;\n}\n\nconst TextEncoder = typeof self === 'object' && self.TextEncoder\n    ? self.TextEncoder\n    : __webpack_require__(/*! util */ \"./node_modules/util/util.js\").TextEncoder;\n\nlet cachedEncoder = new TextEncoder('utf-8');\n\nfunction passStringToWasm(arg) {\n\n    const buf = cachedEncoder.encode(arg);\n    const ptr = _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"](buf.length);\n    getUint8Memory().set(buf, ptr);\n    return [ptr, buf.length];\n}\n\nclass SinglePlayerNZSCWebInterface {\n\n                static __construct(ptr) {\n                    return new SinglePlayerNZSCWebInterface(ptr);\n                }\n\n                constructor(ptr) {\n                    this.ptr = ptr;\n                }\n\n            free() {\n                const ptr = this.ptr;\n                this.ptr = 0;\n                _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_singleplayernzscwebinterface_free\"](ptr);\n            }\n        static new(arg0) {\n    return SinglePlayerNZSCWebInterface.__construct(_nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"singleplayernzscwebinterface_new\"](arg0));\n}\ninitial_output() {\n    return OutputWebInterface.__construct(_nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"singleplayernzscwebinterface_initial_output\"](this.ptr));\n}\nnext(arg0) {\n    const [ptr0, len0] = passStringToWasm(arg0);\n    try {\n        return OutputWebInterface.__construct(_nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"singleplayernzscwebinterface_next\"](this.ptr, ptr0, len0));\n    } finally {\n        _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](ptr0, len0 * 1);\n    }\n}\n}\n\nclass OutputWebInterface {\n\n                static __construct(ptr) {\n                    return new OutputWebInterface(ptr);\n                }\n\n                constructor(ptr) {\n                    this.ptr = ptr;\n                }\n\n            free() {\n                const ptr = this.ptr;\n                this.ptr = 0;\n                _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_outputwebinterface_free\"](ptr);\n            }\n        notifications() {\n    const retptr = globalArgumentPtr();\n    _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"outputwebinterface_notifications\"](retptr, this.ptr);\n    const mem = getUint32Memory();\n    const ptr = mem[retptr / 4];\n    const len = mem[retptr / 4 + 1];\n    const realRet = getStringFromWasm(ptr, len);\n    _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](ptr, len * 1);\n    return realRet;\n}\nquestion() {\n    const retptr = globalArgumentPtr();\n    _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"outputwebinterface_question\"](retptr, this.ptr);\n    const mem = getUint32Memory();\n    const ptr = mem[retptr / 4];\n    const len = mem[retptr / 4 + 1];\n    const realRet = getStringFromWasm(ptr, len);\n    _nzsc_single_player_web_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](ptr, len * 1);\n    return realRet;\n}\n}\n\nfunction __wbindgen_throw(ptr, len) {\n    throw new Error(getStringFromWasm(ptr, len));\n}\n\n\n\n//# sourceURL=webpack:///./web-src/nzsc_single_player_web.js?");

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