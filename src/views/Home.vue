<template>
  <div>
    <scan-to-upload @change="onChange"/>
    <scan-to-upload @change="onChange"/>
  </div>
</template>

<script>
import ScanToUpload from '@/components/ScanToUpload.vue'
export default {
  components: {
    ScanToUpload
  },
  data () {
    return {
      image: ''
    }
  },
  methods: {
    onChange (url) {
      this.image = url
    }
  }
}
</script>

