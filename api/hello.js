"use strict";
// YOUR_BASE_DIRECTORY/netlify/functions/api.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var express_1 = require("express");
var serverless_http_1 = require("serverless-http");
var api = (0, express_1.default)();
var router = (0, express_1.Router)();
router.get('/hello', function (req, res) { return res.send('Hello World!'); });
api.use('/api/', router);
exports.handler = (0, serverless_http_1.default)(api);
