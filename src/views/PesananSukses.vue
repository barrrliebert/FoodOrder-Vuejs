<template>
  <div class="pesanan-sukses">
    <Navbar /> <!-- Memasukkan komponen Navbar -->
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col text-center">
          <img src="../assets/images/menunggu.png" width="300" /> <!-- Menampilkan gambar menunggu -->
          <h2><strong>Sukses!!</strong></h2>
          <h4>Pesanan Anda segera diproses <br> Selamat Menunggu</h4> <!-- Menampilkan pesan sukses dan pesan penantian -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "PesananSukses",
  components: {
    Navbar, // Menggunakan komponen Navbar
  },
};
</script>

<style>
</style>
