## 中国大陆营业执照身份证校验工具
  通过这个工具，校验营业执照或者身份证的有效性，以及获取基础的信息，如：发证机关所属地区，以及营业执照的类型/身份证的地址及生日/性别等信息。

### Install

```
npm install cn-validator --save
```

### Usage

```
import CNValidator from 'cn-validator';
...

// 验证营业执照有效性
CNValidator.license.isValid(code)

// 获取营业执照信息
CNValidator.license.getInfo(code)

// 生成统一社会信用号，传入0或不传，会只返回一个

CNValidator.license.makeId() //单个

CNValidator.license.makeId(5) // 多个

// 验证身份证有效性
CNValidator.personID.isValid(id)

//获取身份证信息
CNValidator.personID.getInfo(id)
// 生成伪身份证号

CNValidator.personID.makeId() //单个

CNValidator.personID.makeId(5) // 多个

```
### update
1.添加生成伪代码API，使用方法如上;

2.更新正则，修复bug;

3.增加身份证信息的年龄属性;
### references
身份证验证部分参考自（copy from）：https://www.npmjs.com/package/id-validator

### others
如果有什么问题，麻烦发一个Issues，谢谢！
