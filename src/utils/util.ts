//QQ号正则，5至11位
const reg = /^[1-9][0-9]{4,10}$/;
export const isQQ: (targetStr: string) => boolean  = targetStr => reg.test(targetStr);
