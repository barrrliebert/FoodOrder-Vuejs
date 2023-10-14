<template>
  <div class="home">
    <Navbar /> <!-- Memasukkan komponen Navbar -->
    <div class="container">
      <Hero /> <!-- Memasukkan komponen Hero -->
      
      <div class="row mt-4">
        <div class="col">
          <h2>
            Best
            <strong>Foods</strong>
          </h2>
        </div>
        <div class="col">
          <router-link to="/foods" class="btn btn-primary float-right">
            <b-icon-eye></b-icon-eye>Lihat Semua
          </router-link> <!-- Tautan ke halaman "foods" dengan tombol "Lihat Semua" -->
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-4 mt-4" v-for="product in products" :key="product.id">
          <CardProduct :product="product"/> <!-- Memasukkan komponen CardProduct dan mengirimkan data produk -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Hero from "@/components/Hero.vue";
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Navbar, // Menggunakan komponen Navbar
    Hero, // Menggunakan komponen Hero
    CardProduct, // Menggunakan komponen CardProduct
  },
  data() {
    return {
      products: [], // Data produk
    };
  },
  methods: {
    setProducts(data) {
      this.products = data; // Mengatur data produk dengan data yang diterima
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/best-products") // Mengambil data produk terbaik dari server
      .then((response) => this.setProducts(response.data)) // Mengatur data produk setelah menerima respons
      .catch((error) => console.log(error)); // Menangani kesalahan jika ada
  },
};
</script>
