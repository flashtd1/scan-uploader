<template>
  <div>
    <img :src="url" width="100" height="100"/>
    <input type="file" accept="image/*" ref="file" @change="onChange"/>
  </div>
</template>

<script>
import io from 'socket.io-client'
import config from '../../local.env.json'
export default {
  data () {
    return {
      url: '',
      socket: null
    }
  },
  methods: {
    async onChange () {
      console.log(this.$refs.file.files)
      const reader =  new FileReader()
      reader.readAsDataURL(this.$refs.file.files[0])
      reader.onloadend = () => {
        this.url = reader.result
        this.socket.emit('uploaded', this.url)
      }
    }
  },
  mounted () {
    this.socket = io(config.host)
    this.socket.on('connect', () => {
      console.log(this.socket.connected) // true
      this.socket.emit('joinRoom', this.$route.params.token)
    })

    this.socket.on('disconnect', () => {
      console.log(this.socket.connected) // false
    })
  }
}
</script>

