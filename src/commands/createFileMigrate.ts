var fs = require('fs');
var path = require('path');
var moment =require('moment');

// var currentDirectory = __dirname;
var filePrefix = process.argv[2] || 'migration';
var targetDirectory = path.join( 'migrations');

if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory, { recursive: true });
    console.log(`Created directory: ${targetDirectory}`);
  }

var filePath = path.join(
  targetDirectory,`${moment().format('YYYYMMDDHHmmss')}-${filePrefix}.ts`
);

  let fileContent = `import { Db } from 'mongodb';
  module.exports = {
    async up(db:Db) {
  
     //var result =   await db.collection('user').insertOne({});
  
    //   console.log( 'Process create init user',result);
    },
  
    async down(db:Db) {
      // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    }
  };`

  fs.writeFileSync(filePath, fileContent);