export const formatAlias = (str) => {
  let newStr = str
    .toLowerCase()
    .replace(/\s{1,}/g, '-')
    .replace(/[àáảãạâấầẩẫậăắằẳẵặ]/g, 'a')
    .replace(/[èéẻẽẹêếềểễệ]/g, 'e')
    .replace(/[íìỉĩị]/g, 'i')
    .replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, 'o')
    .replace(/[úùủũụưứừửữự]/g, 'u')
    .replace(/[ýỳỷỹỵ]/g, 'y')
    .replace(/[đ]/g, 'd');
  return newStr;
};
export const formatBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (error) => reject(error);
  });
};
export const formatByte = (x) => {
  if (typeof x != 'number') {
    x = 0;
  }
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0,
    n = parseInt(x, 10) || 0;
  while (n >= 1024 && ++l) {
    n = n / 1024;
  }
  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
};
export const formatDate = (date) => {
  const ndate = new Date(date);
  if (ndate == 'Invalid Date') {
    return '';
  }
  return ndate.toLocaleString();
};
