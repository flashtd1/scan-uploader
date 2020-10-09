<template>
  <div>
    <scan-to-upload v-model="image1"/>
    <scan-to-upload v-model="image2"/>
  </div>
</template>

<script>
import ScanToUpload from '@/components/ScanToUpload.vue'
export default {
  name: 'Home',
  components: {
    ScanToUpload
  },
  data () {
    return {
      image1: '',
      image2: ''
    }
  },
  watch: {
    image1 (nv) {
      console.log('image1 changed', nv)
    },
    image2 (nv) {
      console.log('image2 changed', nv)
    }
  }
}
</script>

