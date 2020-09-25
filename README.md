# 扫码上传demo

## 实现思路
1. 上传组件在服务端建立单独的链接，动态生成上传链接的二维码
2. 手机扫码进入上传页面，进入上传组件的socket通道
3. 手机选择本地图片，通过socket传送图片的dataurl，触发上传组件的上传事件
4. 通过事件传输的dataurl，将图片渲染出来

## 初始化
本项目使用的是vue2.6.11，拉取代码后使用
```bash
npm install
```
安装依赖

## 使用
1. 启动node.js端服务
```bash
node server.js
```

2. 启动前端
```bash
npm run serve
```

3. 在local.env.json中，将host改成终端里显示vue开发环境的Network地址
```bash
App runnnig at:
- Local:    http://localhost:8080
- Network:  http://192.168.1.xx:8080
```

```json
{
    "host": "http://192.168.1.xx:3000"
}
```

4. 使用Network的地址访问,手机保持和PC接入同一个网络，扫码进入上传页面

## 后续
本库只是一个demo，需要修改之后才能使用在生产环境