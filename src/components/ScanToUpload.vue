<template>
  <div>
    <!-- 上传图片的位置 -->
    <img :src="image" width="100" height="100"/>
    <button @click="OpenQrCode">扫码上传</button>
    <!-- 二维码位置 -->
    <img v-if="scanShow" :src="qrimg" width="100" height="100"/>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import io from 'socket.io-client'
import config from '../../local.env.json'
export default {
  name: 'ScanToUpload',
  data () {
    return {
      scanShow: false,
      qrimg: '',
      socket: null,
      image: ''
    }
  },
  methods: {
    /**
     * 打开二维码，二维码内容是手机访问的上传页面
     */
    async OpenQrCode () {
      this.scanShow = true
      const qrUrl = `${window.location.protocol}//${window.location.host}/upload/${this.hash}`
      console.log(qrUrl)
      const res = await QRCode.toDataURL(qrUrl)
      this.qrimg = res
    }
  },
  mounted () {
    // 创建hash，作为房间名，用于对应上传通信通道
    this.hash = Date.now() + Math.random()
    // 创建ws链接
    this.socket = io(config.host)
    // 链接成功后，以hash值作为房间名
    this.socket.on('connect', () => {
      console.log('connect')
      this.socket.emit('createRoom', this.hash)
    })

    // 有新文件上传
    this.socket.on('newFile', () => {
      console.log('新文件来了！等待上传完成')
    })

    // 上传完成后，将url赋值
    this.socket.on('onUpload', (url) =>{
      console.log('新文件上传完成', url)
      // console.log(url)
      this.image = url
      // 传出结果
      this.$emit('input', url)
    })
  }
}
</script>
<style scoped>

</style>
