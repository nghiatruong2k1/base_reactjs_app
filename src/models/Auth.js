import { Entity } from '~/config/Entity';
import { Validate } from '~/config/Validate';
import { UserEntity } from '~/entities/user';
export class LoginAuthModel extends Entity {
  constructor(props) {
    super(props, LoginAuthModel);
  }
}
LoginAuthModel.Email = UserEntity.Email;
LoginAuthModel.Password = userEntity.Password;

export class RegisterAuthModel extends Entity {
  constructor(props) {
    super(props, RegisterAuthModel);
  }
}
RegisterAuthModel.Email = UserEntity.Email;
RegisterAuthModel.Password = UserEntity.Password;
RegisterAuthModel.RePassword = {
  displayName: 'Xác thực mật khẩu',
  validate: Validate((rulers) => {
    rulers
      .isRequired('Vui lòng nhập xác thực mật khẩu!')
      .isConfirm('Password', 'Xác thực mật khẩu không hợp lệ!');
  }),
};
RegisterAuthModel.IsAgree = {
  displayName: '',
  validate: Validate((rulers) => {
    rulers.isRequired('Vui lòng đọc và đồng ý điều khoản sử dụng!');
  }),
};

export class ForgetAuthModel extends Entity {
  constructor(props) {
    super(props, ForgetAuthModel);
  }
}
ForgetAuthModel.Email = UserEntity.Email;
RegisterAuthModel.Code = {
    displayName: 'Mã xác thực',
    validate: Validate((rulers) => {
      rulers
        .isRequired('Vui lòng nhập mã xác thực!')
        .isConfirm('Password', 'Xác thực mật khẩu không hợp lệ!');
    }),
  };