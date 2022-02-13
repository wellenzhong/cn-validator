## 中国大陆身份证/营业执照/组织机构代码证的校验工具
  通过这个工具，校验身份证/营业执照/组织机构代码证号码的有效性，以及获取基础的信息，如：发证机关所属地区，以及营业执照的类型/身份证的地址及生日/性别等信息。

## Install

```
npm install cn-validator --save
```

## Usage

```
import Validator from 'cn-validator';
```
一定要记得实例化
```
const CNValidator = new Validator()
```
// 验证营业执照有效性
```
CNValidator.license.isValid(code)
```

// 获取营业执照信息
```
CNValidator.license.getInfo(code)
```

// 生成统一社会信用号，传入0或不传，会只返回一个

```
CNValidator.license.makeId() //单个
```

```
CNValidator.license.makeId(5) // 多个
```

// 验证身份证有效性

```
CNValidator.personID.isValid(id)
```

//获取身份证信息
```
CNValidator.personID.getInfo(id)
```
// 生成伪身份证号

```
CNValidator.personID.makeId() //单个

CNValidator.personID.makeId(5) // 多个
```
// 验证组织机构代码证是否正确
```
CNValidator.orgLicenseCode.isValid(code)
```

## update
1. 改用了Rollup打包的方式；
2. 增加了营业执照15位的校验方法； 
3. 增加了组织机构代码证号码的校验方法； 

### others
如果有什么问题，麻烦发一个Issues，谢谢！

### 开发

`npm install`
`npm run build`
