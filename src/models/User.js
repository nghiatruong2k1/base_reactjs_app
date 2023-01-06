import { UserEntity, UserTypeEntity } from '~/entities/User';

export class UserModel extends Entity {
  constructor(props) {
    super(props, UserModel);
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
// UserEntity.ImageId= imageEntity.Id;
UserEntity.TypeId = UserTypeEntity.Id;
UserEntity.TypeName = UserTypeEntity.Name;
