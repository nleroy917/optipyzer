"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/optimize",{

/***/ "./src/components/ResultInfo.tsx":
/*!***************************************!*\
  !*** ./src/components/ResultInfo.tsx ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* module decorator */ module = __webpack_require__.hmd(module);\nvar _jsxFileName = \"/Users/nathanleroy/Documents/projects.nosync/optipyzer/web/src/components/ResultInfo.tsx\",\n    _this = undefined;\n\n\n\nvar ResultInfo = function ResultInfo(props) {\n  // destructure props\n  var viewInfo = props.viewInfo,\n      setViewInfo = props.setViewInfo;\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n    className: \"flex flex-row justify-center\",\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n      style: {\n        position: 'absolute',\n        display: viewInfo ? 'block' : 'none'\n      },\n      className: \"w-10/12 p-2 mt-4 text-sm bg-yellow-400 border-2 border-black rounded-lg shadow-2xl md:w-1/2 -top-0 md:text-base md:top-0\",\n      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex flex-row justify-between mx-1\",\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n          className: \"text-lg font-bold\",\n          children: \"About query results:\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 20,\n          columnNumber: 15\n        }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n          className: \"hover:cursor-pointer hover:text-gray-400\",\n          onClick: function onClick() {\n            return setViewInfo(false);\n          },\n          children: \"\\u24E7\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 21,\n          columnNumber: 15\n        }, _this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 19,\n        columnNumber: 13\n      }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"p-1 font-normal\",\n        children: \"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit eum quae ratione ducimus sed animi fugit obcaecati, culpa nulla tenetur. Quas, dolorum recusandae? Esse laborum explicabo obcaecati, enim delectus magnam.\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 28,\n        columnNumber: 13\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 15,\n      columnNumber: 9\n    }, _this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 14,\n    columnNumber: 7\n  }, _this);\n};\n\n_c = ResultInfo;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ResultInfo);\n\nvar _c;\n\n$RefreshReg$(_c, \"ResultInfo\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9SZXN1bHRJbmZvLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFPQSxJQUFNQSxVQUFxQixHQUFHLFNBQXhCQSxVQUF3QixDQUFDQyxLQUFELEVBQVc7QUFFckM7QUFDQSxNQUFRQyxRQUFSLEdBQWtDRCxLQUFsQyxDQUFRQyxRQUFSO0FBQUEsTUFBa0JDLFdBQWxCLEdBQWtDRixLQUFsQyxDQUFrQkUsV0FBbEI7QUFFQSxzQkFDRTtBQUFLLGFBQVMsRUFBQyw4QkFBZjtBQUFBLDJCQUNFO0FBQ0ksV0FBSyxFQUFFO0FBQUNDLFFBQUFBLFFBQVEsRUFBRSxVQUFYO0FBQXVCQyxRQUFBQSxPQUFPLEVBQUVILFFBQVEsR0FBRyxPQUFILEdBQWE7QUFBckQsT0FEWDtBQUVJLGVBQVMsRUFBQywwSEFGZDtBQUFBLDhCQUlJO0FBQUssaUJBQVMsRUFBQyxvQ0FBZjtBQUFBLGdDQUNFO0FBQUcsbUJBQVMsRUFBQyxtQkFBYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFERixlQUVFO0FBQ0UsbUJBQVMsRUFBQywwQ0FEWjtBQUVFLGlCQUFPLEVBQUU7QUFBQSxtQkFBTUMsV0FBVyxDQUFDLEtBQUQsQ0FBakI7QUFBQSxXQUZYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUZGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUpKLGVBYUk7QUFBSyxpQkFBUyxFQUFDLGlCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBYko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQURGO0FBcUJILENBMUJEOztLQUFNSDtBQTRCTiwrREFBZUEsVUFBZiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9SZXN1bHRJbmZvLnRzeD9hMjg1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpc3BhdGNoLCBGQywgU2V0U3RhdGVBY3Rpb24gfSBmcm9tIFwicmVhY3RcIjtcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgICB2aWV3SW5mbzogYm9vbGVhbjtcbiAgICBzZXRWaWV3SW5mbzogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+XG59XG5cbmNvbnN0IFJlc3VsdEluZm86IEZDPFByb3BzPiA9IChwcm9wcykgPT4ge1xuXG4gICAgLy8gZGVzdHJ1Y3R1cmUgcHJvcHNcbiAgICBjb25zdCB7IHZpZXdJbmZvLCBzZXRWaWV3SW5mbyB9ID0gcHJvcHNcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1yb3cganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgPGRpdiBcbiAgICAgICAgICAgIHN0eWxlPXt7cG9zaXRpb246ICdhYnNvbHV0ZScsIGRpc3BsYXk6IHZpZXdJbmZvID8gJ2Jsb2NrJyA6ICdub25lJ319IFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMC8xMiBwLTIgbXQtNCB0ZXh0LXNtIGJnLXllbGxvdy00MDAgYm9yZGVyLTIgYm9yZGVyLWJsYWNrIHJvdW5kZWQtbGcgc2hhZG93LTJ4bCBtZDp3LTEvMiAtdG9wLTAgbWQ6dGV4dC1iYXNlIG1kOnRvcC0wXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1yb3cganVzdGlmeS1iZXR3ZWVuIG14LTFcIj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGRcIj5BYm91dCBxdWVyeSByZXN1bHRzOjwvcD5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhvdmVyOmN1cnNvci1wb2ludGVyIGhvdmVyOnRleHQtZ3JheS00MDBcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFZpZXdJbmZvKGZhbHNlKX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIOKTp1xuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTEgZm9udC1ub3JtYWxcIj5cbiAgICAgICAgICAgICAgTG9yZW0gaXBzdW0sIGRvbG9yIHNpdCBhbWV0IGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEltcGVkaXQgZXVtIHF1YWUgcmF0aW9uZSBkdWNpbXVzIHNlZCBhbmltaSBmdWdpdCBvYmNhZWNhdGksIGN1bHBhIG51bGxhIHRlbmV0dXIuIFF1YXMsIGRvbG9ydW0gcmVjdXNhbmRhZT8gRXNzZSBsYWJvcnVtIGV4cGxpY2FibyBvYmNhZWNhdGksIGVuaW0gZGVsZWN0dXMgbWFnbmFtLlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVzdWx0SW5mbzsiXSwibmFtZXMiOlsiUmVzdWx0SW5mbyIsInByb3BzIiwidmlld0luZm8iLCJzZXRWaWV3SW5mbyIsInBvc2l0aW9uIiwiZGlzcGxheSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/ResultInfo.tsx\n");

/***/ }),

/***/ "./src/components/Results.tsx":
/*!************************************!*\
  !*** ./src/components/Results.tsx ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_ResultInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/ResultInfo */ \"./src/components/ResultInfo.tsx\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);\n/* module decorator */ module = __webpack_require__.hmd(module);\nvar _jsxFileName = \"/Users/nathanleroy/Documents/projects.nosync/optipyzer/web/src/components/Results.tsx\",\n    _this = undefined,\n    _s = $RefreshSig$();\n\n\n\n\n\nvar Results = function Results(props) {\n  _s();\n\n  // destructure props\n  var result = props.result,\n      setResult = props.setResult; // state\n\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n      viewInfo = _useState[0],\n      setViewInfo = _useState[1];\n\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"div\", {\n    className: \"flex flex-col items-center justify-center min-h-screen my-4\",\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"div\", {\n      className: \"flex flex-col w-11/12 p-4 mx-6 font-bold text-left bg-blue-200 border-2 border-blue-500 rounded-lg shadow-lg md:w-3/4\",\n      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_components_ResultInfo__WEBPACK_IMPORTED_MODULE_1__.default, {\n        view: true\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 23,\n        columnNumber: 9\n      }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"div\", {\n        className: \"flex flex-row items-start justify-between\",\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"p\", {\n          className: \"mb-2 text-4xl font-bold text-left md:text-5xl\",\n          children: \"Query Result:\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 28,\n          columnNumber: 11\n        }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"p\", {\n          className: \"text-2xl font-bold cursor-pointer hover:text-blue-600\",\n          onClick: function onClick() {\n            return setViewInfo(true);\n          },\n          children: \"\\u24D8\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 29,\n          columnNumber: 11\n        }, _this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 27,\n        columnNumber: 9\n      }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"p\", {\n        className: \"text-lg font-bold\",\n        children: \"Optimized Sequence AD:\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 36,\n        columnNumber: 9\n      }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"div\", {\n        className: \"p-2 mb-2 font-normal break-all bg-white border-2 border-blue-600 rounded-lg\",\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"p\", {\n          className: \"text-sm\",\n          children: result.optimmized_ad\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 38,\n          columnNumber: 11\n        }, _this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 37,\n        columnNumber: 9\n      }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"p\", {\n        className: \"text-lg font-bold\",\n        children: \"Optimized Sequence SD:\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 40,\n        columnNumber: 9\n      }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"div\", {\n        className: \"p-2 mb-2 font-normal break-all bg-white border-2 border-blue-600 rounded-lg\",\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"p\", {\n          className: \"text-sm\",\n          children: result.optimmized_sd\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 42,\n          columnNumber: 11\n        }, _this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 41,\n        columnNumber: 9\n      }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"p\", {\n        className: \"text-lg font-bold\",\n        children: \"Peptide Sequence:\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 44,\n        columnNumber: 9\n      }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"div\", {\n        className: \"p-2 mb-2 font-normal break-all bg-white border-2 border-blue-600 rounded-lg\",\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"p\", {\n          className: \"text-sm\",\n          children: result.peptide_seq\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 46,\n          columnNumber: 11\n        }, _this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 45,\n        columnNumber: 9\n      }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"div\", {\n        className: \"flex flex-row\",\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"button\", {\n          onClick: function onClick() {\n            return setResult(null);\n          },\n          className: \"px-6 py-2 font-bold text-white transition-all bg-black border-2 border-black rounded-lg hover:bg-transparent hover:text-black\",\n          children: \"Back\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 49,\n          columnNumber: 11\n        }, _this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 48,\n        columnNumber: 9\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 21,\n      columnNumber: 7\n    }, _this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 20,\n    columnNumber: 5\n  }, _this);\n};\n\n_s(Results, \"rO0pyxaAwg7oJX6n0SbGDiADeII=\");\n\n_c = Results;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Results);\n\nvar _c;\n\n$RefreshReg$(_c, \"Results\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9SZXN1bHRzLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBSUE7OztBQU9BLElBQU1FLE9BQWtCLEdBQUcsU0FBckJBLE9BQXFCLENBQUNDLEtBQUQsRUFBVztBQUFBOztBQUNwQztBQUNBLE1BQVFDLE1BQVIsR0FBOEJELEtBQTlCLENBQVFDLE1BQVI7QUFBQSxNQUFnQkMsU0FBaEIsR0FBOEJGLEtBQTlCLENBQWdCRSxTQUFoQixDQUZvQyxDQUlwQzs7QUFDQSxrQkFBZ0NMLCtDQUFRLENBQVUsS0FBVixDQUF4QztBQUFBLE1BQU9NLFFBQVA7QUFBQSxNQUFpQkMsV0FBakI7O0FBRUEsc0JBQ0U7QUFBSyxhQUFTLEVBQUMsNkRBQWY7QUFBQSwyQkFDRTtBQUFLLGVBQVMsRUFBQyx1SEFBZjtBQUFBLDhCQUVFLDhEQUFDLDJEQUFEO0FBQ0UsWUFBSTtBQUROO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFGRixlQU1FO0FBQUssaUJBQVMsRUFBQywyQ0FBZjtBQUFBLGdDQUNFO0FBQUcsbUJBQVMsRUFBQywrQ0FBYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFERixlQUVFO0FBQ0UsbUJBQVMsRUFBQyx1REFEWjtBQUVFLGlCQUFPLEVBQUU7QUFBQSxtQkFBTUEsV0FBVyxDQUFDLElBQUQsQ0FBakI7QUFBQSxXQUZYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUZGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQU5GLGVBZUU7QUFBRyxpQkFBUyxFQUFDLG1CQUFiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBZkYsZUFnQkU7QUFBSyxpQkFBUyxFQUFDLDZFQUFmO0FBQUEsK0JBQ0U7QUFBRyxtQkFBUyxFQUFDLFNBQWI7QUFBQSxvQkFBd0JILE1BQU0sQ0FBQ0k7QUFBL0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFoQkYsZUFtQkU7QUFBRyxpQkFBUyxFQUFDLG1CQUFiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBbkJGLGVBb0JFO0FBQUssaUJBQVMsRUFBQyw2RUFBZjtBQUFBLCtCQUNFO0FBQUcsbUJBQVMsRUFBQyxTQUFiO0FBQUEsb0JBQXdCSixNQUFNLENBQUNLO0FBQS9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBcEJGLGVBdUJFO0FBQUcsaUJBQVMsRUFBQyxtQkFBYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQXZCRixlQXdCRTtBQUFLLGlCQUFTLEVBQUMsNkVBQWY7QUFBQSwrQkFDRTtBQUFHLG1CQUFTLEVBQUMsU0FBYjtBQUFBLG9CQUF3QkwsTUFBTSxDQUFDTTtBQUEvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQXhCRixlQTJCRTtBQUFLLGlCQUFTLEVBQUMsZUFBZjtBQUFBLCtCQUNFO0FBQVEsaUJBQU8sRUFBRTtBQUFBLG1CQUFNTCxTQUFTLENBQUMsSUFBRCxDQUFmO0FBQUEsV0FBakI7QUFBd0MsbUJBQVMsRUFBQywrSEFBbEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBM0JGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FERjtBQXFDRCxDQTVDRDs7R0FBTUg7O0tBQUFBO0FBOENOLCtEQUFlQSxPQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL1Jlc3VsdHMudHN4PzI5ZTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlzcGF0Y2gsIEZDLCBTZXRTdGF0ZUFjdGlvbiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IHsgUXVlcnlSZXN1bHQgfSBmcm9tIFwiQC8uLlwiO1xuXG5pbXBvcnQgUmVzdWx0SW5mbyBmcm9tICcuLi9jb21wb25lbnRzL1Jlc3VsdEluZm8nXG5cbmludGVyZmFjZSBQcm9wcyB7XG4gIHJlc3VsdDogUXVlcnlSZXN1bHQ7XG4gIHNldFJlc3VsdDogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248UXVlcnlSZXN1bHQgfCBudWxsPj47XG59XG5cbmNvbnN0IFJlc3VsdHM6IEZDPFByb3BzPiA9IChwcm9wcykgPT4ge1xuICAvLyBkZXN0cnVjdHVyZSBwcm9wc1xuICBjb25zdCB7IHJlc3VsdCwgc2V0UmVzdWx0IH0gPSBwcm9wc1xuXG4gIC8vIHN0YXRlXG4gIGNvbnN0IFt2aWV3SW5mbywgc2V0Vmlld0luZm9dID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpXG5cbiAgcmV0dXJuICAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtaW4taC1zY3JlZW4gbXktNFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHctMTEvMTIgcC00IG14LTYgZm9udC1ib2xkIHRleHQtbGVmdCBiZy1ibHVlLTIwMCBib3JkZXItMiBib3JkZXItYmx1ZS01MDAgcm91bmRlZC1sZyBzaGFkb3ctbGcgbWQ6dy0zLzRcIj5cbiAgICAgICAgXG4gICAgICAgIDxSZXN1bHRJbmZvIFxuICAgICAgICAgIHZpZXdcbiAgICAgICAgLz5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1yb3cgaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwibWItMiB0ZXh0LTR4bCBmb250LWJvbGQgdGV4dC1sZWZ0IG1kOnRleHQtNXhsXCI+UXVlcnkgUmVzdWx0OjwvcD5cbiAgICAgICAgICA8cCBcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCBjdXJzb3ItcG9pbnRlciBob3Zlcjp0ZXh0LWJsdWUtNjAwXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFZpZXdJbmZvKHRydWUpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIOKTmFxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkXCI+T3B0aW1pemVkIFNlcXVlbmNlIEFEOjwvcD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgbWItMiBmb250LW5vcm1hbCBicmVhay1hbGwgYmctd2hpdGUgYm9yZGVyLTIgYm9yZGVyLWJsdWUtNjAwIHJvdW5kZWQtbGdcIj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtXCI+e3Jlc3VsdC5vcHRpbW1pemVkX2FkfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkXCI+T3B0aW1pemVkIFNlcXVlbmNlIFNEOjwvcD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgbWItMiBmb250LW5vcm1hbCBicmVhay1hbGwgYmctd2hpdGUgYm9yZGVyLTIgYm9yZGVyLWJsdWUtNjAwIHJvdW5kZWQtbGdcIj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtXCI+e3Jlc3VsdC5vcHRpbW1pemVkX3NkfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkXCI+UGVwdGlkZSBTZXF1ZW5jZTo8L3A+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIG1iLTIgZm9udC1ub3JtYWwgYnJlYWstYWxsIGJnLXdoaXRlIGJvcmRlci0yIGJvcmRlci1ibHVlLTYwMCByb3VuZGVkLWxnXCI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbVwiPntyZXN1bHQucGVwdGlkZV9zZXF9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93XCI+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRSZXN1bHQobnVsbCl9IGNsYXNzTmFtZT1cInB4LTYgcHktMiBmb250LWJvbGQgdGV4dC13aGl0ZSB0cmFuc2l0aW9uLWFsbCBiZy1ibGFjayBib3JkZXItMiBib3JkZXItYmxhY2sgcm91bmRlZC1sZyBob3ZlcjpiZy10cmFuc3BhcmVudCBob3Zlcjp0ZXh0LWJsYWNrXCI+XG4gICAgICAgICAgICAgIEJhY2tcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXN1bHRzIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwiUmVzdWx0SW5mbyIsIlJlc3VsdHMiLCJwcm9wcyIsInJlc3VsdCIsInNldFJlc3VsdCIsInZpZXdJbmZvIiwic2V0Vmlld0luZm8iLCJvcHRpbW1pemVkX2FkIiwib3B0aW1taXplZF9zZCIsInBlcHRpZGVfc2VxIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/Results.tsx\n");

/***/ })

});