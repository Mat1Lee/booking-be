import express from 'express';
import XLSX from 'xlsx';
import {ErrorBase} from '@core/types/ErrorTypes';
/**
 * 
 * @param res  express.Response
 * @param callback data for collection
 * @param type name action
 * @param nameFile  name file
 */

async function handleExport (res: express.Response,callback : any,type:string ='',nameFile :string=''){
  const workbook = XLSX.utils.book_new();
   if(!callback) throw new ErrorBase(`don't exist Data`);
  const {dataExcel, fileName} = await callback;
  const worksheet = XLSX.utils.json_to_sheet(dataExcel);
  // add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, type);
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename='+fileName+'.xlsx');
  res.send(excelBuffer);
}

export default handleExport