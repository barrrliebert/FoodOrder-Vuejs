<template>
  <div>
    <Navbar /> <!-- Memasukkan komponen Navbar -->
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <h2>
            Daftar
            <strong>Makanan</strong>
          </h2>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <div class="input-group mb-3">
            // Mengikat input ke properti `search`
            <input 
              v-model="search"   
              type="text"
              class="form-control"
              placeholder="Cari Makanan Kesukaan Anda .."
              aria-label="Cari"
              aria-describedby="basic-addon1"
              @keyup="searchFood" 
            />
            // Menggunakan metode `searchFood` saat pengguna mengetik
            
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                <b-icon-search></b-icon-search>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-4 mt-4" v-for="product in products" :key="product.id">
          <CardProduct :product="product" /> <!-- Memasukkan komponen CardProduct dan mengirimkan data produk -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";

export default {
  name: "Foods",
  components: {
    Navbar, // Menggunakan komponen Navbar
    CardProduct, // Menggunakan komponen CardProduct
  },
  data() {
    return {
      products: [], // Data produk
      search: '', // Data pencarian
    };
  },
  methods: {
    setProducts(data) {
      this.products = data; // Mengatur data produk dengan data yang diterima
    },
    searchFood() {
      axios
      .get("http://localhost:3000/products?q="+this.search) // Mengirimkan permintaan pencarian berdasarkan 'q' query parameter
      .then((response) => this.setProducts(response.data)) // Mengatur data produk setelah menerima respons
      .catch((error) => console.log(error)); // Menangani kesalahan jika ada
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/products") // Mengambil data produk dari server
      .then((response) => this.setProducts(response.data)) // Mengatur data produk setelah menerima respons
      .catch((error) => console.log(error)); // Menangani kesalahan jika ada
  },
};
</script>
<style>
</style>
