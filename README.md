# 中国大陆营业执照身份证校验工具
##  可以通过这个工具，校验营业执照或者身份证的有效性，以及获取基础的信息，如：发证机关所属地区，以及营业执照的类型/身份证的地址及生日/性别等信息。

### Install

```
npm install cn-validator --save
```

### Usage

```
import CNValidator from 'cn-validator';
...

// 验证营业执照有效性
CNValidator.license.isVaild(code)

// 获取营业执照信息
CNValidator.license.getInfo(code)
```
