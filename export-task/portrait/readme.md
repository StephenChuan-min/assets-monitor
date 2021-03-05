## 画像详情页 pdf

+ src: 放生成的html的模板
+ script: 数据和打包流程
+ dist: 最后生成的文件

#### 启动步骤
> + npm run por:dev // 在本地运行
> + 会看到在dist文件夹里会生成一个demo.html文件，是数据填充之后的html，打开demo.html,右键运行demo.html 
#### 打包步骤和调试
>npm run por:build // 打包生成js，想看生成的js文件是否符合预期可以用postman发送请求调试。

> 接口地址:http://172.18.255.251:8080/yc/search/portrait/company/export/download

参数：
> + token //身份验证
> + companyId // 画像id
> + file // 生成的js文件（打开postman软件 => body => 单选form-data => 参数手动填入file, 有下拉框选择文件类型，在右边选择生成的outputHtml.min.js）

返回参数
> + data //文件的id

> 上面接口如果有返回值返回data,说明这个js文件生效了，后端给的数据放进模板里了。需要再访问另外一个下载文件的接口来下载pdf，这个时候前端就可以看到打包之后的js遇到数据会生成怎样的pdf了。

> 接口地址：http://172.18.255.251:8588/yc/export/file/excel/{id}?token=

参数
> + id: // 文件id
> + token // 身份验证

返回参数
> 直接返回一个pdf

拼成的这个接口放在浏览器里请求会更好，会通过浏览器直接下载文件。

