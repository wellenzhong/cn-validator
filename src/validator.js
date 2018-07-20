;
(function (factor) {
    var isWindow = (typeof window !== 'undefined' ? true : false);
    var global = (isWindow ? window : this);

    var instance = function () {
        return factory(isWindow, global);
    };

    // AMD / RequireJS
    if (typeof define !== 'undefined' && define.amd) {
        define('IDValidator', [], instance);
    }
    // CMD / Seajs 
    else if (typeof define === "function" && define.cmd) {
        define(function (require, exports, module) {
            module.exports = factory(isWindow, global);
        });
    }
    // CommonJS
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(isWindow, global);
    } else {
        global.IDValidator = factory(isWindow, global);
    }
})(function (window, global) {
    var param = {
        error: {
            longNumber: '长数字存在精度问题，请使用字符串传值！ Long number is not allowed, because the precision of the Number In JavaScript.'
        }
    };
    var util = {
        checkArg: function (id, forceType) {
            var argType = (typeof id);
            switch (argType) {
                case 'number':
                    //long number not allowed
                    id = id.toString();
                    if (id.length > 15) {
                        this.error(param.error.longNumber);
                        return false;
                    }
                    break;
                case 'string':
                    break;
                default:
                    return false;
            }

            id = id.toUpperCase();

            if (forceType && !isNaN(forceType)) {
                forceType = parseInt(forceType);
                if (id.length !== forceType) {
                    return false;
                }
            }

            var code = null;
            if (id.length === 18) {
                //18位
                code = {
                    body: id.slice(0, 17),
                    checkBit: id.slice(-1),
                    type: 18
                };
            } else {
                return false;
            }

            return code;
        }
    };
    var _Validator = function () {
        this.cache = {};
    };
    _Validator.prototype = {
        license: {
            isVaild: function (code) {
                let regx = /^([15][123]|Y1|9[123])([1-9]\d{5})([A-Z0-9]{10})$/;
                let regxCheck = regx.test(code)
                if (!regxCheck) {
                    return false
                }
                let baseChars = "0123456789ABCDEFGHJKLMNPQRTUWXY";
                let baseCarsArr = baseChars.split("");
                let factor = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]
                let total = 0;
                //遍历信用代码,查找对应的位置并把字母转为对应的值
                for (var i = 0; i < code.length - 1; i++) {
                    let a = baseCarsArr.indexOf(code[i] + '') * factor[i] //获得对应位置的值(其实与脚标相同)并与加权因子相乘
                    total += a; //将相乘的结果汇总
                }
                let idx = (31 - total % 31) * 1
                let validateCode = baseCarsArr[idx] //汇总结果对31求余,再用31减去余数
                let lastChar = code.substr(code.length - 1, 1)
                // console.log("末位应该为:" + validateCode)
                // return regx.test("91620102MA73L1X695")
                return validateCode == lastChar
            },
            getInfo: function (code) {
                console.log(code);
            }
        },

    }
})