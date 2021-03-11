import moment from 'moment';
import jsObfuscate from 'javascript-obfuscator';
const fs: any = require('fs-extra');
const confuscate: any = {
  compact: true,
  controlFlowFlattening: false,
  controlFlowFlatteningThreshold: 0,
  deadCodeInjection: false,
  debugProtection: true,
  debugProtectionInterval: true,
  disableConsoleOutput: true,
  log: false,
  renameGlobals: true,
  renameProperties: false,
  rotateStringArray: true,
  seed: 0,
  selfDefending: true,
  shuffleStringArray: true,
  simplify: true,
  sourceMap: false,
  splitStrings: true,
  splitStringsChunkLength: 10,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayIndexShift: true,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 2,
  stringArrayWrappersType: 'variable',
  stringArrayThreshold: 0.75,
  target: 'node',
  transformObjectKeys: true,
};

export default (file: boolean, path?: string, code?: string) =>
  new Promise((resolve, reject) => {
    try {
      if (file) {
        const codes = fs.readFileSync(path, {encoding: 'utf8'});
        const result = jsObfuscate.obfuscate(codes, confuscate);
        const finalResult = result.getObfuscatedCode();
        if (finalResult.length >= 10000) {
          const paths = '../temp/' + moment().unix() + '.js';
          fs.writeFileSync(paths, finalResult, {encoding: 'utf8'});
          return resolve({
            type: 'file',
            path: paths,
          });
        } else {
          return resolve({
            type: 'code',
            code: finalResult,
          });
        }
      } else {
        const result = jsObfuscate.obfuscate(code!, confuscate);
        const finalResult = result.getObfuscatedCode();
        if (finalResult.length >= 10000) {
          const paths = '../temp/' + moment().unix() + '.js';
          fs.writeFileSync(paths, finalResult, {encoding: 'utf8'});
          return resolve({
            type: 'file',
            path: paths,
          });
        } else {
          return resolve({
            type: 'code',
            code: finalResult,
          });
        }
      }
    } catch (error) {
      return reject(error);
    }
  });
