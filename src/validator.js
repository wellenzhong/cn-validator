export default function validateLicense(code) {
    let regx = /^([15][123]|Y1|9[123])([1-9]\d{5})([A-Z0-9]{10})$/;
    let regxCheck = regx.test(code)
    if (!regxCheck) {
        return false
    }
    let baseChars = "0123456789ABCDEFGHJKLMNPQRTUWXY";
    let factor = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]
    let total = 0;
    //遍历信用代码,查找对应的位置并把字母转为对应的值
    for (var i = 0; i < code.length - 1; i++) {
        let a = baseChars.indexOf(code[i] + '') * factor[i] //获得对应位置的值(其实与脚标相同)并与加权因子相乘
        total += a; //将相乘的结果汇总
    }
    let idx = (31 - total % 31) * 1
    let validateCode = baseChars[idx] //汇总结果对31求余,再用31减去余数
    let lastChar = code.substr(code.length - 1, 1)
    // console.log("末位应该为:" + validateCode)
    // return regx.test("91620102MA73L1X695")
    return validateCode == lastChar
}