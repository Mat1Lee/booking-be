const fs = require('fs');
const path = require('path');

const currentDirectory = __dirname;
const filePrefix = process.argv[2] || 'file';
const targetDirectory = path.join('src', 'modules', filePrefix);

if (!fs.existsSync(targetDirectory)) {
  fs.mkdirSync(targetDirectory, { recursive: true });
}

const fileTypes = ['collection', 'controller', 'modal', 'service'];
const filesToCreate = fileTypes.map((type) => `${filePrefix}.${type}.ts`);
filesToCreate.push('index.ts', 'constants.ts');

filesToCreate.forEach((filename) => {
  const filePath = path.join(targetDirectory, filename);

  let fileContent = '';
  if (filename.endsWith('.ts')) {
    const firstName = filePrefix.charAt(0).toUpperCase() + filePrefix.slice(1);
    fileContent =`\n\nexport default {\n\n}`
    if (filename.includes('.collection.')) {
        fileContent=`import { Schema ,model } from "mongoose";\n\nconst ${firstName}Schema = new Schema({\n\n},{\n\n});\n\nconst ${firstName}Collection = model('${filePrefix}', ${firstName}Schema ,'${filePrefix}');\n\nexport default ${firstName}Collection;`
    } else if (filename.includes('.controller.')) {
    //   fileContent = `// Content for ${filename} - Controller`;
    } else if (filename.includes('.modal.')) {
      fileContent = `import { Document } from "mongoose";\nexport interface ${firstName}ModalBase {\n\n}\nexport interface ${firstName}Document extends ${firstName}ModalBase, Document {\n\n}`;
    } else if (filename.includes('.service.')) {
    //   fileContent = `// Content for ${filename} - Service`;
    } else if (filename === 'index.ts') {
        fileContent=`import { Application } from "express";\nconst ${filePrefix}Router =(app:Application)=>{\n\n};\nexport default ${filePrefix}Router;`
    } else if (filename === 'constants.ts') {
      fileContent = ``;
    }
  }

  fs.writeFileSync(filePath, fileContent);

});