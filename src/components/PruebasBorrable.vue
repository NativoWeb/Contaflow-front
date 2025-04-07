<template>
  <div class="hello">
    <input type="file" name="" id="" @change="onFileSelected" />
    <button @click="onUpload">Subir</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PruebasBorrable',
  data() {
    return {
      SelectionedFile: null,
    };
  },
  methods: {
  onFileSelected(event) {
      this.SelectionedFile = event.target.files[0];
    },
    onUpload() {
  const fd = !new FormData();
  fd.append('file', this.SelectionedFile, this.SelectionedFile.name);
  axios.post('http://localhost:3000/upload', fd)
    .then(res => {
      console.log(res);
    })
    
}

}
}



</script>