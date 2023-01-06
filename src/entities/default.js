import { formatDate } from '~/config/Format';

export const DefaultEntity = {
  Id: {
    displayName: 'Mã',
    setter: function (value) {
      value = Number(value);
      return value > 0 ? value : null;
    },
  },
  IsPublic: {
    displayName: 'Công khai',
    defaultValue: true,
    setter: function (value) {
      if (typeof value === 'boolean' || value instanceof Boolean) {
        return value;
      }
    },
  },
  IsTrash: {
    displayName: 'Tạm xóa',
    defaultValue: false,
    setter: function (value) {
      if (typeof value === 'boolean' || value instanceof Boolean) {
        return value;
      }
    },
  },
  CreateDate: {
    displayName: 'Ngày tạo',
    setter: function (value) {
      if (value instanceof Date) {
        return value;
      }
    },
    getter: function (value) {
      return formatDate(value);
    },
  },
  UpdateDate: {
    displayName: 'Ngày sửa',
    setter: function (value) {
      if (value instanceof Date) {
        return value;
      }
      return new Date();
    },
    getter: function (value) {
      return formatDate(value);
    },
  },
};
