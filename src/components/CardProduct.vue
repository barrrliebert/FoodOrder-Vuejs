<template>
  <div class="card shadow card-product">
    <!-- Gambar produk -->
    <img :src=" 'assets/images/' + product.gambar " class="card-img-top" alt="..." />

    <div class="card-body">
      <!-- Nama produk -->
      <h5 class="card-title">{{ product.nama }}</h5>

      <!-- Harga produk -->
      <p class="card-text">Harga : Rp. {{ product.harga }}</p>

      <!-- Tautan untuk memesan produk -->
      <router-link class="btn btn-primary" :to="'/foods/'+product.id">
        <b-icon-cart></b-icon-cart> Pesan
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["product"],
};
</script>

<style>
</style>
