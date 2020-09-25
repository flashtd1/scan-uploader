<template>
  <div>
    <img :src="image" width="100" height="100"/>
    <button @click="OpenQrCode">扫码上传</button>
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
    async OpenQrCode () {
      this.scanShow = true
      const res = await QRCode.toDataURL(`${window.location.protocol}//${window.location.host}/upload/${this.hash}`)
      this.qrimg = res
    }
  },
  mounted () {
    this.hash = Date.now() + Math.random()
    this.socket = io(config.host)
    this.socket.on('connect', () => {
      console.log('connect')
      this.socket.emit('createRoom', this.hash)
    })
    this.socket.on('onUpload', (url) =>{
      console.log(url)
      this.image = url
    })
  }
}
</script>
<style scoped>

</style>
