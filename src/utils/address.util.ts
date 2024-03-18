import { get } from 'lodash';
import subVN from 'sub-vn';
const formatAddress = (address: any) => {
  const { street, ward, district, city} = address || {};
  return {
    street,
    ward: get(subVN.getWardsByCode(ward), 'name'),
    district: get(subVN.getDistrictByCode(district), 'name'),
    city: get(subVN.getCityByCode(city), 'name'),
  }
};
const joinAddress = (address: any) => {
  const {street, ward, district, city} = address || {};
  return `${street}, ${ward}, ${district}, ${city}`;

}
const formatAddressV2 = (address: any) => {
  const { street, wardId, districtId, cityId, ...rest } = address || {};
  return {
    street,
    wardId,
    districtId,
    cityId,
    ward: get(subVN.getWardsByCode(wardId), 'name'),
    district: get(subVN.getDistrictByCode(districtId), 'name'),
    city: get(subVN.getCityByCode(cityId), 'name'),
    ...rest,
  }
};
const getAreaName = (cityId: string) => {
  const area = subVN.getCityByCode(cityId.padStart(2,'0'))
  return{code : area?.area_code,name : area?.area_name,}
};



export default {
  formatAddress,
  formatAddressV2,
  joinAddress,
  getAreaName
}