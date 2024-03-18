import { CORE_ACTIONS, CORE_RESOURCES } from "@app/core/permissions"

export const NAME_AUTH = {
  login_and_password_are_required: 'Login and password are required.',
  user_group_not_found: 'Không tìm thấy nhóm người dùng.',
  data_is_not_allowed_to_be_updated: 'Dữ liệu không được phép cập nhật.',
  please_enter_username_and_password: 'Vui lòng nhập vào tên đăng nhập và mật khẩu.',
  this_account_does_not_exist: 'Tài khoản này không tồn tại.',
  this_account_has_been_locked: 'Tài khoản này đã bị khoá.',
  the_account_information_associated_with_this_phone_number_could_not_be_found: 'Không tìm thấy thông tin tài khoản liên kết với số điện thoại này.',

}
export const PHARMACY_DEFAULT_ROLES = [
  {
    name: 'Quản Trị Viên',
    permissions: Object.keys(CORE_RESOURCES).map(resource => {
      return {
        resource: resource,
        action: Object.values(CORE_ACTIONS)
      }
    }),
  },
]
