export const CORE_RESOURCES = {
  branch: 'branch',
  employee: 'employee',
  user: 'user',
  userGroup: 'userGroup',
  supplier: 'supplier',
  manufacturer: 'manufacturer',
  unit: 'unit',
  productGroup: 'productGroup',
  ranking: 'ranking',
  medicine: 'medicine',
  pharmaProfile: 'pharmaProfile',
  product: 'product',
  voucher: 'voucher',
  statusVoucher: 'statusVoucher',
  historyVoucher: 'historyVoucher',
  quotation:'quotation',
  bill:'bill',
  restoreBill: 'restoreBill',
  notificationBotManager: 'notificationBotManager',
}

export const SYSTEM_RESOURCES = {
  todoConfigStatus:'todoConfigStatus',
  todoList:'todoList'
}
export const ROOT_RESOURCES = {
  ...CORE_RESOURCES,
  ...SYSTEM_RESOURCES
} as const;




export const CORE_ACTIONS = {
  read: 'read',
  write: 'write',
  delete: 'delete',
  update: 'update',
  download: 'download',
}

export const ROOT_ACTIONS = {
  ...CORE_ACTIONS,
  admin: 'admin',
}

export const ACTIONS = [
  {
    key: CORE_ACTIONS.read,
    name: 'Đọc',
  },
  {
    key: CORE_ACTIONS.write,
    name: 'Thêm mới',
  },
  {
    key: CORE_ACTIONS.delete,
    name: 'Xóa',
  },
  {
    key: CORE_ACTIONS.update,
    name: 'Chỉnh sửa',
  },
  {
    key: CORE_ACTIONS.download,
    name: 'Tải về',
  },
  {
    key: ROOT_ACTIONS.admin,
    name: 'Quản trị',
  },
];

const GROUP_RESOURCES = {
  HT:'HT',
  "":""
}
export type GroupResourceType = keyof typeof GROUP_RESOURCES;
export type ResourceType = keyof typeof ROOT_RESOURCES;

function createResource(firstkey : GroupResourceType , key: ResourceType, name: string) {
 return {
  key : key,
  name: firstkey? `[${firstkey}] `+ name: name
 }

}

export const RESOURCES = [
  
  createResource('','branch','Chi nhánh'),
  createResource('','employee','Nhân viên'),
  createResource('','user','Người dùng'),
  createResource('','userGroup','Nhóm người dùng'),
  createResource('','supplier','Nhà cung cấp'),
  createResource('','manufacturer','Hãng sản xuất'),
  createResource('','unit','Đơn vị tính'),
  createResource('','productGroup','Nhóm sản phẩm'),
  createResource('','ranking','Xếp hạng'),
  createResource('','medicine','Thuốc'),
  createResource('','pharmaProfile','Nhà thuốc'),
  createResource('','product','Sản phẩm'),
  createResource('','voucher','Phiếu'),
  createResource('','statusVoucher','Trạng thái của phiếu'),
  createResource('','historyVoucher','Xem lịch sử phiếu'),
  createResource('','bill','Đơn hàng'),
  createResource('','quotation','Đơn hàng tạm'),
  createResource('','restoreBill','Lưu trữ Đơn hàng Tạm'),
  createResource('','notificationBotManager','Quản lý thông báo tự động'),
  createResource('HT','todoConfigStatus','Quản lý cấu hình trạng thái công việc'),
  createResource('HT','todoList','Quản lý công việc'),
]

