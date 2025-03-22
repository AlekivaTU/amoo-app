'use strict';

module.exports = {
  process() {
    return {
      code: `
        module.exports = {};
        module.exports.default = module.exports;
      `
    };
  },
  getCacheKey() {
    return 'cssTransform';
  },
}; 