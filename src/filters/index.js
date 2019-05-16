//时间戳转换为指定格式时间
const timeFormat = (value) => {
    let time = value * 1000;
    let oDate = new Date(time);
    let y = oDate.getFullYear();
    let m = (oDate.getMonth() + 1) < 10 ? '0' + (oDate.getMonth() + 1) : (oDate.getMonth() + 1);
    let d = oDate.getDate() < 10 ? '0' + oDate.getDate() : oDate.getDate();
    let h = oDate.getHours()< 10 ? '0' + oDate.getHours() : oDate.getHours();
    let min = oDate.getMinutes() < 10 ? '0' + oDate.getMinutes() : oDate.getMinutes();
    let s = oDate.getSeconds() < 10 ? '0' + oDate.getSeconds() : oDate.getSeconds();

    //return oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + oDate.getDate() + ' ' + oDate.getHours() + ':' + oDate.getMinutes() + ':' + oDate.getSeconds();
    return m + '-' + d + ' ' + h + ':' + min;
};

//补零
const fillZero = num => {
    return num < 10 ? "0" + num : num;
};

export default {
    timeFormat,
    fillZero
};