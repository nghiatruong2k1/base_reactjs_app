import { NewObject } from './index';
export class Ruler extends NewObject {
  constructor() {
    super();
    const _this = this;
    Object.keys(Ruler).forEach((key) => {
      Object.defineProperty(_this, key, {
        enumerable: false,
        value: Ruler[key],
      });
    });
  }
}

Ruler.isRequired = function (message) {
  this.checkRequired = function (value) {
    if (
      (typeof value === 'string' && value.trim() !== '') ||
      (typeof value === 'number' && !Number.isNaN(Number(value))) ||
      (typeof value === 'boolean' && value)
    ) {
      return '';
    }
    return message ?? 'Vui lòng nhập trường này!';
  };
  return this;
};
Ruler.isEmail = function (message, args) {
  let type = 'example@example.com';
  if (Array.isArray(args)) {
    let types = args.map((arg) => {
      return 'example@' + arg;
    });
    type = types.join('|');
  }
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  this.checkEmail = function (value) {
    if (typeof value === 'string') {
      if (regex.test(value)) {
        if (Array.isArray(args)) {
          const argsRegex = new RegExp('@(' + args.join('|') + ')$');
          if (argsRegex.test(value)) {
            return '';
          }
        } else {
          return '';
        }
      }
    }
    return (
      (message && message.replaceAll('{1}', type)) ||
      `Định dạng Email không hợp lệ! (${type})`
    );
  };
  return this;
};
Ruler.isConfirm = function (reKey, message) {
  this.checkConfirm = function (value, values) {
    if (!Boolean(values) || typeof values !== 'object') {
      return 'Danh sách giá trị không hợp lệ';
    }
    let reValue = values[reKey];
    if (value !== reValue) {
      return message ?? 'Giá trị không hợp lệ!';
    }
    return '';
  };
  return this;
};
Ruler.isCompare = function (reValue, message) {
  this.checkCompare = function (value) {
    if (value !== reValue) {
      return message ?? 'Giá trị không hợp lệ!';
    }
    return '';
  };
  return this;
};
Ruler.isRegex = function (regex, message) {
  if (typeof regex === 'object' && typeof regex.test === 'function') {
    this.checkRegex = function (value) {
      if (regex.test(value)) {
        return message ?? `Định dạng dữ liệu không hợp lệ! (${regex})`;
      } else {
        return '';
      }
    };
  } else {
    this.checkRegex = function () {
      return 'Định dạng Regex không hợp lệ!';
    };
  }
  return this;
};
Ruler.isLength = function (length, message) {
  this.checkLength = function (value) {
    return validateLength(value, function (value) {
      if (value.length != length) {
        return (
          (message &&
            message
              .replaceAll('{1}', length)
              .replaceAll('{2}', value.length)) ||
          `Vui lòng nhập ${length} kí tự!`
        );
      }
    });
  };
  return this;
};
Ruler.minLength = function (length, message) {
  this.checkMinLength = function (value) {
    return validateLength(value, function (value) {
      if (value.length < length) {
        return (
          (message &&
            message
              .replaceAll('{1}', length)
              .replaceAll('{2}', value.length)) ||
          `Vui lòng nhập lớn hơn ${length} kí tự!`
        );
      }
    });
  };
  return this;
};
Ruler.maxLength = function (length, message) {
  this.checkMaxLength = function (value) {
    return validateLength(value, function (value) {
      if (value.length > length) {
        return (
          (message &&
            message
              .replaceAll('{1}', length)
              .replaceAll('{2}', value.length)) ||
          `Vui lòng nhập nhỏ hơn ${length} kí tự!`
        );
      }
    });
  };
  return this;
};
Ruler.rangeLength = function (minL, maxL, message) {
  this.checkRangeLength = function (value) {
    return validateLength(value, function (value) {
      if (value.length < minL || value.length > maxL) {
        return (
          (message &&
            message
              .replaceAll('{1}', minL)
              .replaceAll('{2}', maxL)
              .replaceAll('{3}', value.length)) ||
          `Vui lòng nhập từ ${minL} đên ${maxL} kí tự!`
        );
      }
    });
  };
  return this;
};
Ruler.minNumber = function (num, message) {
  this.checkMinNumber = function (value) {
    return validateNumber(value, function (value) {
      if (value < num) {
        return (
          (message && message.replaceAll('{1}', num)) ||
          `Vui lòng nhập lớn hơn ${num}!`
        );
      }
    });
  };
  return this;
};
Ruler.maxNumber = function (num, message) {
  this.checkMaxNumber = function (value) {
    return validateNumber(value, function (value) {
      if (value > num) {
        return (
          (message && message.replaceAll('{1}', num)) ||
          `Vui lòng nhập nhỏ hơn ${num}!`
        );
      }
    });
  };
  return this;
};
Ruler.rangeNumber = function (minN, maxN, message) {
  this.checkRangeNumber = function (value) {
    return validateNumber(value, function (value) {
      if (value < minN || value > maxN) {
        return (
          (message &&
            message.replaceAll('{1}', minN).replaceAll('{2}', maxN)) ||
          `Vui lòng nhập trong khoảng ${minN} đến ${maxN}!`
        );
      }
    });
  };
  return this;
};
function validateLength(value, callback) {
  switch (typeof value) {
    case 'object': {
      if (Array.isArray(value)) {
        return '';
      }
      break;
    }
    case 'number': {
      value = value + '';
    }
    case 'string': {
      value = value.trim();
      return (callback && callback(value)) || '';
    }
    default:
      break;
  }
  return 'Kiểu dữ liệu không hợp lệ (chỉ nhận chuỗi hoặc số)';
}
function validateNumber(value, callback) {
  if (value === null) {
    return '';
  }
  switch (typeof value) {
    case 'string': {
      value = value.trim();
      if (value === '') {
        return (callback && callback(value)) || '';
      }
      if (Number.isNaN(Number(value))) {
        break;
      }
    }
    case 'number': {
      return (callback && callback(value)) || '';
    }
    default:
      break;
  }
  return 'Kiểu dữ liệu không hợp lệ (chỉ nhận số)';
}
