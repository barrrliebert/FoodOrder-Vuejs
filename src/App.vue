<template>
  <div id="app">
    <router-view /> <!-- Ini adalah tempat di mana komponen halaman yang sesuai dengan URL saat ini akan dirender oleh Vue Router -->
    <Footer /> <!-- Memasukkan komponen Footer yang mungkin berisi informasi kontak atau footer situs -->
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue"

export default {
  components: {
    Footer // Menggunakan komponen Footer
  }
}
</script>
