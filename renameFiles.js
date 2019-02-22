/**
 * transform camel case names of folder to kebab case
 * and set the name of all the files' under the folder as index.*
 */

const fs = require('fs');
const path = require('path');
const containerPath = 'files';

const getPath = dir => path.join(__dirname, dir);
const isCamelCase = (str) => /^[a-z]+[A-Z]+/.test(str);
const isTargetFolder = item => isCamelCase(item);

/**
 * abcXiiYmm --> abc-xii-ymm
 * abc123Xii5Ymm --> abc123-xii5-ymm
 * @param {string} str 
 */
const getKebabCaseFromCamelCase = str => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const getTargetFolderContentList = dir => fs.readdirSync(dir);

const targetFolders = getTargetFolderContentList(getPath(containerPath)).filter(isTargetFolder);

const getNewFilename= (oldFilename, newFileName) => oldFilename.replace(/(.*)\/.*(\.(js|json|wxml|wxss)$)/, `$1/${newFileName}$2`);


for (const folder of targetFolders) {
  const folderPath = getPath(`${containerPath}/${folder}`);
  const newFolderPath = getPath(`${containerPath}/${getKebabCaseFromCamelCase(folder)}`);
  fs.renameSync(folderPath, newFolderPath);
  const fileList = getTargetFolderContentList(newFolderPath);
  for (const file of fileList) {
    const newFileName = 'index';
    const filePath = `${newFolderPath}/${file}`;
    fs.renameSync(filePath, getNewFilename(filePath, newFileName));
  }
}

