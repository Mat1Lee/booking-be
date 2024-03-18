import { get, mapValues, isPlainObject, flatMapDeep } from 'lodash';
import _ from 'lodash';
import moment from 'moment';
import { Types } from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { readdirSync, statSync } from 'fs';

export function removeAccents(str:any) {
  return str
  .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a")
  .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e")
  .replace(/ì|í|ị|ỉ|ĩ/g,"i")
  .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o")
  .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u")
  .replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y")
  .replace(/đ/g,"d")
  .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
  .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
  .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
  .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
  .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
  .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
  .replace(/Đ/g, "D")
}

const deeply = (map: any) => {
  return (obj: any, fn:any):any => {
    return map(mapValues(obj, function (v) {
      return isPlainObject(v) ? deeply(map)(v, fn) : v;
    }), fn);
  }
}

const getPaging = (req: any) => {
  let page = Number(get(req, 'query.page', 1));
  page = page <= 0 ? 1 : page;
  let limit = Number(get(req, 'query.limit', 10));
  limit = limit <= 0 || limit > 200 ? 10 : limit;
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

const mapLanguage = (obj:any, preferLang = 'vi') => {
  return deeply(_.mapValues)(obj, (val: any) => {
    return _.get(val, preferLang, _.get(val, 'vi', val));
  });
}

const enumerateDaysBetweenDates = (startTime: number, endTime: number, format = 'YYYYMMDD') => {
  const startDate: any = moment.utc(startTime).utcOffset('+07:00');
  const endDate = moment.utc(endTime).utcOffset('+07:00');
  const dates: any = [endDate.format(format)];

  while (startDate.isBefore(endDate)) {
    dates.push(startDate.format(format));
    startDate.add(1, 'days');
  }
  return dates;
};

const mask = (str: string, mask = '*') => {
  const n = (str || '').length / 1.2;
  return ('' + str).slice(0, -n)
    .replace(/./g, mask)
    + ('' + str).slice(-n);
}


export const TypeObjectId= (base:any)=>(new Types.ObjectId(base))

export class ValidDate {
  valS;
  valE;
  utc;
  constructor(value: any, valueE: any = undefined) {
    this.valS = value;
    this.valE = valueE;

    const timezoneOffset = new Date().getTimezoneOffset();
    const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60));
    this.utc = timezoneOffset >= 0 ? -timezoneOffsetHours : timezoneOffsetHours;
  };
  startDate(value: any = undefined) {
    const _value = value ?? this.valS;
    const p_date :any= this.checkDate(_value)
    return new Date(p_date).setHours(0 + this.utc, 0, 0)
  };
  endDate(value: any = undefined) {
    const _value = value ?? this.valE ?? this.valS;
    const p_date:any = this.checkDate(_value);
    return new Date(p_date).setHours(23 + this.utc, 58, 58)
  }

  checkDate(_value: any = undefined) {
    const value = _value ?? this.valS
    const fRoot = 'YYYY-MM-DD'
    const finddForemat = () => ['YYYY-MM-DD', 'DD-MM-YYYY', 'YYYY/MM/DD', 'DD/MM/YYYY']?.find(e => moment(value, e).format(e) === value)
    if (!finddForemat()) return null;
    return moment(value, finddForemat()).format(fRoot) as string;
  }
}

/**
 * @param {string} dir - A path to folder
 * @returns {string[]}  A array path of files inside passing folder
 */

export function readDirRecursiveSync(dir: string): string[] {
  const BASE_PATH = dir;

  const filesPath = readdirSync(dir).map((el) => path.join(BASE_PATH, el));

  const result: any = filesPath.map((filePath) => {
    try {
      let statFile = statSync(filePath);
      return statFile.isDirectory() ? readDirRecursiveSync(filePath) : filePath;
    } catch (err) {
      return undefined;
    }
  });

  return result
    .filter((el: any) => el !== undefined)
    .reduce((acc: any, el: any) => acc.concat(el), []);
}



const replaceSimple = (keyword: any) => {
  keyword = keyword.trim()
  .replace('*','\\*')
  .replace('(','\\(')
  .replace(')','\\)')
  .replace('+','\\+')
  .replace('[','\\[')
  .replace(']','\\]')
  .replace('{','\\}')
  .replace('}','\\}')
  .replace('|','\\|')
  .replace('?','\\?')
  .replace('^','\\^')
  .replace('&','\\&')
  .replace('$','\\$')
  .replace('\\','\\')
  return keyword;
};

export default {
  getPaging,
  mapLanguage,
  enumerateDaysBetweenDates,
  mask,
  readDirRecursiveSync,
  replaceSimple,
  removeAccents,
}