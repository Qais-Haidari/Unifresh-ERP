"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = downloadAssets;
var _bluebird = _interopRequireDefault(require("bluebird"));
var _contentfulBatchLibs = require("contentful-batch-libs");
var _figures = _interopRequireDefault(require("figures"));
var _fs = require("fs");
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _path = _interopRequireDefault(require("path"));
var _stream = require("stream");
var _util = require("util");
var _embargoedAssets = require("../utils/embargoedAssets");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const streamPipeline = (0, _util.promisify)(_stream.pipeline);
async function downloadAsset({
  url,
  directory
}) {
  // handle urls without protocol
  if (url.startsWith('//')) {
    url = 'https:' + url;
  }

  // build local file path from the url for the download
  const parsedUrl = new URL(url);
  const localFile = _path.default.join(directory, parsedUrl.host, parsedUrl.pathname);

  // ensure directory exists and create file stream
  await _fs.promises.mkdir(_path.default.dirname(localFile), {
    recursive: true
  });
  const file = (0, _fs.createWriteStream)(localFile);

  // download asset
  const assetRequest = await (0, _nodeFetch.default)(url);
  if (!assetRequest.ok) {
    throw new Error(`error response status: ${assetRequest.status}`);
  }

  // Wait for stream to be consumed before returning local file
  await streamPipeline(assetRequest.body, file);
  return localFile;
}
function downloadAssets(options) {
  return (ctx, task) => {
    let successCount = 0;
    let warningCount = 0;
    let errorCount = 0;
    return _bluebird.default.map(ctx.data.assets, asset => {
      if (!asset.fields.file) {
        task.output = `${_figures.default.warning} asset ${(0, _contentfulBatchLibs.getEntityName)(asset)} has no file(s)`;
        warningCount++;
        return;
      }
      const locales = Object.keys(asset.fields.file);
      return _bluebird.default.mapSeries(locales, locale => {
        const url = asset.fields.file[locale].url;
        if (!url) {
          task.output = `${_figures.default.cross} asset '${(0, _contentfulBatchLibs.getEntityName)(asset)}' doesn't contain an url in path asset.fields.file[${locale}].url`;
          errorCount++;
          return _bluebird.default.resolve();
        }
        let startingPromise = _bluebird.default.resolve({
          url,
          directory: options.exportDir
        });
        if ((0, _embargoedAssets.isEmbargoedAsset)(url)) {
          const {
            host,
            accessToken,
            spaceId,
            environmentId
          } = options;
          const expiresAtMs = (0, _embargoedAssets.calculateExpiryTimestamp)();
          startingPromise = (0, _embargoedAssets.signUrl)(host, accessToken, spaceId, environmentId, url, expiresAtMs).then(signedUrl => ({
            url: signedUrl,
            directory: options.exportDir
          }));
        }
        return startingPromise.then(downloadAsset).then(downLoadedFile => {
          task.output = `${_figures.default.tick} downloaded ${(0, _contentfulBatchLibs.getEntityName)(downLoadedFile)} (${url})`;
          successCount++;
        }).catch(error => {
          task.output = `${_figures.default.cross} error downloading ${url}: ${error.message}`;
          errorCount++;
        });
      });
    }, {
      concurrency: 6
    }).then(() => {
      ctx.assetDownloads = {
        successCount,
        warningCount,
        errorCount
      };
    });
  };
}
module.exports = exports.default;