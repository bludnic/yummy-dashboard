<template>
  <div>

    <div v-if="!imageURL">
      <input type="file" @change="onFileSelected">
      <v-btn @click="onUpload">Upload</v-btn>
    </div>
    
    <div v-if="imageURL">
      <img :src="imageURL" class="image">
      <v-btn @click="imageURL = ''">Remove</v-btn>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedFile: null
    }
  },
  methods: {
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
    },
    onUpload () {
      const fd = new FormData()
      fd.append('image', this.selectedFile, this.selectedFile.name)

      this.$axios.$post('/storage/upload', fd)
      .then(res => {
        this.imageURL = res.location
        this.imageKey = res.key
      })
      .catch(err => console.log('Err', err))
    }
  },
  computed: {
    imageURL: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    imageKey: {
      get () {
        return this.imgKey
      },
      set (value) {
        this.$emit('update:imgKey', value)
      }
    }
  },
  props: ['value', 'imgKey']
}
</script>

<style lang="css" scoped>
.image {
  width: 100%;
}
</style>
