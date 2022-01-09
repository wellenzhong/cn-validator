const util = {
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
    },
    objMan: {
      "1": {
        name: "机构编制",
        type: {
          "1": "机关",
          "2": "事业单位",
          "3": "中央编办直接管理机构编制的群众群体",
          "9": "其它"
        }
      },
      "5": {
        name: "民政",
        type: {
          "1": "社会团体",
          "2": "民办非企业单位",
          "3": "基金会",
          "9": "其它"
        }
      },
      "9": {
        name: "工商",
        type: {
          "1": "企业",
          "2": "个体工商户",
          "3": "农民专业合作社",
        }
      },
      "Y": {
        name: "其他",
        type: {
          "1": "其他"
        }
      }
    },
    generateMixed:function (chars,n) {
      let res = "";
      let len = chars.length-1;
      for(var i = 0; i < n ; i ++) {
          var id = Math.round(Math.random()*len);
          res += chars[id];
      }
      return res;
    },
    getLicValidateCode:function(code){
      let baseChars = "0123456789ABCDEFGHJKLMNPQRTUWXY";
      let baseCarsArr = baseChars.split("");
      let factor = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]
      let total = 0;
      //遍历信用代码,查找对应的位置并把字母转为对应的值
      // 因为只取前17位作为基数来计算校验码，所以取值 17
      for (var i = 0; i < 17; i++) {
        let a = baseCarsArr.indexOf(code[i] + '') * factor[i] //获得对应位置的值(其实与脚标相同)并与加权因子相乘
        total += a; //将相乘的结果汇总
      }
      let idx = (31 - total % 31) * 1
      let validateCode = baseCarsArr[idx%baseCarsArr.length] //汇总结果对31求余,再用31减去余数,取对应位的值作为校验码
      return validateCode
    },
    districtKeys:function(){
      let areaIds = []
      for (let key in GB2260) {
        if (GB2260.hasOwnProperty(key)) {
          areaIds.push(key+'')
        }
      }
      return areaIds;
    },
    makeLicenseId:function(){
      let dep = ["1","5","9","Y"][Math.round(Math.random()*3)]; // 获得首位
      let kind = this.objMan[dep]
      let kindArr = []
      for (let key in kind.type) {
        if (kind.type.hasOwnProperty(key)) {
          kindArr.push(key+'')
        }
      }
      let areaIds = this.districtKeys()
      let kindLen = kindArr.length;
      let kindid = kindArr[Math.round(Math.random()*(kindLen-1))] //获得组织类型

      let arealen = areaIds.length;
      let areaid = areaIds[Math.round(Math.random()*(arealen-1))] //获取地区代码
      let baseChars = "0123456789ABCDEFGHJKLMNPQRTUWXY";
      let baseCharsArr = baseChars.split('')
      let orgCode =  this.generateMixed(baseCharsArr,9) // 获得组织编码
      let code17 = dep+kindid+areaid+orgCode
      let validateCode = this.getLicValidateCode(code17)
      let totalCode = code17+validateCode
      return totalCode
    },
    getPersonValidateCode:function(id){
      let coefficient = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      let idBaseCode = id.substr(0, 17);
      let weight = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
      let totalSum = 0;
      for (var i = 0; i < idBaseCode.length; i++) {
        totalSum += idBaseCode[i] * coefficient[i]
      }
      let _mod = totalSum % 11;
      let verifyCode = weight[_mod];
      return verifyCode
    },
    makePersonId:function(){
      // 获取6位地区码
      let distKeys = util.districtKeys();
      let distLen = distKeys.length;
      let randIdx = Math.round(Math.random()*(distLen-1));
      let districtCode = distKeys[randIdx]+'';

      // 组成生日
      function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        }
      let randBirthTime = randomDate(new Date(1919, 0, 1), new Date())
      let randMon = randBirthTime.getMonth()+1>=10?randBirthTime.getMonth()+1+'':'0'+(randBirthTime.getMonth()+1)
      let randDate = randBirthTime.getDate()>10?randBirthTime.getDate():'0'+randBirthTime.getDate()
      let randBirthday = randBirthTime.getFullYear()+randMon+randDate

      // 生成个人编码
      let perCodeStr = ''
      for (let i = 0; i < 3; i++) {
        perCodeStr+=Math.round(Math.random()*9)
      }
      let code17 = districtCode+randBirthday+perCodeStr
      // 计算校验位
      let validateCode = util.getPersonValidateCode(code17)
      let finalCode = code17+validateCode
      return finalCode
    },
    getStarSign:function(mon, day) {
      var s = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
      var d = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
      var i = mon * 2 - (day < d[mon - 1] ? 2 : 0);
      return s.substring(i, i + 2) + "座";
    }
  };

  export default util;