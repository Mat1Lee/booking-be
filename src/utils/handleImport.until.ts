// import express from 'express';
// import XLSX from 'xlsx';
// import {ErrorBase} from '@core/types/ErrorTypes';
// /**
//  * 
//  * @param res  express.Response
//  * @param callback data for collection
//  * @param type name action
//  * @param nameFile  name file
//  */
// // async function handleImport (res: express.Response,callback : any,type:string ='',nameFile :string='：  '){
// //   if(!callback) throw new ErrorBase(`don't exist Data`);
// //   const {dataExcel, fileName} = await callback;
// //   const workbook = XLSX.utils.book_new();
// //   const worksheet = XLSX.utils.json_to_sheet(dataExcel);
// //   // add the worksheet to the workbook
// //   XLSX.utils.book_append_sheet(workbook, worksheet, type);
// //   const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
// //   res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
// //   res.setHeader('Content-Disposition', 'attachment; filename='+fileName+'.xlsx');
// //   res.send(excelBuffer);
// // }

// // export default handleImport
// // const XLSX = require('xlsx');
// const { MongoClient } = require('mongodb');

// async function importExcelToMongoDB(excelBuffer) {
//     try {
//         // Kết nối tới MongoDB
//         const uri = 'mongodb://localhost:27017/';
//         const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//         await client.connect();
//         console.log("Kết nối tới MongoDB thành công");

//         const database = client.db('ten_database');
//         const collection = database.collection('ten_collection');

//         // Phân tích cấu trúc dữ liệu từ buffer
//         const workbook = XLSX.read(excelBuffer, { type: 'buffer' });
//         const sheet_name = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheet_name];
//         const data = XLSX.utils.sheet_to_json(worksheet);

//         // Lưu dữ liệu vào cơ sở dữ liệu MongoDB
//         const result = await collection.insertMany(data);
//         console.log(`${result.insertedCount} bản ghi đã được nhập vào cơ sở dữ liệu MongoDB.`);

//         // Đóng kết nối MongoDB
//         await client.close();
//     } catch (error) {
//         console.error("Lỗi:", error);
//     }
// }

// // Sử dụng hàm importExcelToMongoDB để import dữ liệu từ buffer vào MongoDB
// if (!callback) {
//     throw new ErrorBase(`Không có dữ liệu tồn tại.`);
// }

// const { excelBuffer, fileName } = await callback;
// await importExcelToMongoDB(excelBuffer);
