import { Entity } from '~/config/Entity';
import { formatAlias } from '~/config/Format';
import { Validate } from '~/config/Validate';
import { DefaultEntity } from './default';
export class UserTypeEntity extends Entity {
  constructor(props) {
    super(props, UserTypeEntity);
  }
}
UserTypeEntity.Id = {
  ...DefaultEntity.Id,
  displayName: 'Mã cấp bậc',
};
UserTypeEntity.Name = {
  displayName: 'Tên cấp bậc',
};
UserTypeEntity.Alias = {
  displayName: 'Định danh',
  setter: function (value) {
    return formatAlias(value);
  },
};
UserTypeEntity.ShortDes = {
  displayName: 'Mô tả ngắn',
};
UserTypeEntity.IsPublic = DefaultEntity.IsPublic;
UserTypeEntity.IsTrash = DefaultEntity.IsTrash;

export class UserEntity extends Entity {
  constructor(props) {
    super(props, UserEntity);
  }
}
UserEntity.Id = {
  ...DefaultEntity.Id,
  displayName: 'Mã người dùng',
};
UserEntity.FirstName = {
  displayName: 'Họ',
};
UserEntity.LastName = {
  displayName: 'Tên',
};
UserEntity.Location = {
  displayName: 'Địa chỉ',
};
UserEntity.Phone = {
  displayName: 'Số điện thoại',
};
UserEntity.Email = {
  displayName: 'Email',
  validate: Validate((rulers) => {
    rulers
      .isRequired('Vui lòng nhập Email!')
      .isEmail(null, ['gmail.com', 'facebook.com', 'yahoo.com']);
  }),
};
UserEntity.Password = {
  displayName: 'Mật khẩu',
  validate: Validate((rulers) => {
    rulers.isRequired('Vui lòng nhập mật khẩu!').minLength(5);
  }),
};
// UserEntity.ImageId= imageEntity.Id;
UserEntity.TypeId = UserTypeEntity.Id;
UserEntity.IsPublic = DefaultEntity.IsPublic;
UserEntity.IsTrash = DefaultEntity.IsTrash;
UserEntity.CreateDate = DefaultEntity.CreateDate;
