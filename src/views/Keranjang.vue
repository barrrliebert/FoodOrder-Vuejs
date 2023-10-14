<template>
  <div class="keranjang">
    <Navbar :updateKeranjang="keranjangs" /> <!-- Memasukkan komponen Navbar dan meneruskan data keranjangs -->
    <div class="container">
      <!-- breadcrumb -->
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link> <!-- Tautan ke halaman beranda -->
              </li>
              <li class="breadcrumb-item">
                <router-link to="/foods" class="text-dark">Foods</router-link> <!-- Tautan ke halaman makanan -->
              </li>
              <li class="breadcrumb-item active" aria-current="page">Keranjang</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>
            Keranjang
            <strong>Saya</strong>
          </h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Makanan</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Total Harga</th>
                  <th scope="col">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(keranjang, index) in keranjangs" :key="keranjang.id">
                  <th>{{index+1}}</th>
                  <td>
                    <img
                      :src=" '../assets/images/' + keranjang.products.gambar "
                      class="img-fluid shadow"
                      width="250"
                    />
                  </td>
                  <td>
                    <strong>{{ keranjang.products.nama }}</strong> <!-- Menampilkan nama makanan dari keranjang -->
                  </td>
                  <td>{{ keranjang.keterangan ? keranjang.keterangan : "-" }}</td> <!-- Menampilkan keterangan makanan jika ada -->
                  <td>{{ keranjang.jumlah_pemesanan }}</td> <!-- Menampilkan jumlah pemesanan makanan -->
                  <td align="right">Rp. {{ keranjang.products.harga }}</td> <!-- Menampilkan harga makanan -->
                  <td align="right">
                    <strong>Rp. {{ keranjang.products.harga*keranjang.jumlah_pemesanan }}</strong> <!-- Menghitung dan menampilkan total harga -->
                  </td>
                  <td align="center" class="text-danger">
                    <b-icon-trash @click="hapusKeranjang(keranjang.id)"></b-icon-trash> <!-- Tombol untuk menghapus makanan dari keranjang -->
                  </td>
                </tr>

                <tr>
                  <td colspan="6" align="right">
                    <strong>Total Harga :</strong>
                  </td>
                  <td align="right">
                    <strong>Rp. {{ totalHarga }}</strong> <!-- Menampilkan total harga keranjang -->
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Form Checkout -->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="nama">Nama :</label>
              <input type="text" class="form-control" v-model="pesan.nama" /> <!-- Input untuk nama pelanggan -->
            </div>
            <div class="form-group">
              <label for="noMeja">Nomor Meja :</label>
              <input type="text" class="form-control" v-model="pesan.noMeja" /> <!-- Input untuk nomor meja -->
            </div>

            <button type="submit" class="btn btn-primary float-right" @click="checkout">
              <b-icon-cart></b-icon-cart>Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "Keranjang",
  components: {
    Navbar, // Menggunakan komponen Navbar
  },
  data() {
    return {
      keranjangs: [], // Data keranjang
      pesan: {}, // Data pesanan
    };
  },
  methods: {
    setKeranjangs(data) {
      this.keranjangs = data; // Mengatur data keranjang dengan data yang diterima
    },
    hapusKeranjang(id) {
      axios
        .delete("http://localhost:3000/keranjangs/" + id) // Menghapus item dari keranjang
        .then(() => {
          this.$toast.error("Sukses Hapus Keranjang", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });

          // Update Data keranjang
          axios
            .get("http://localhost:3000/keranjangs") // Mengambil data keranjang terbaru
            .then((response) => this.setKeranjangs(response.data)) // Mengatur data keranjang setelah menerima respons
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },
    checkout() {
      if (this.pesan.nama && this.pesan.noMeja) {
        this.pesan.keranjangs = this.keranjangs; // Mengatur data pesanan
        axios
          .post("http://localhost:3000/pesanans", this.pesan) // Mengirimkan pesanan
          .then(() => {

            // Hapus Semua Keranjang 
            this.keranjangs.map(function (item) {
              return axios
                .delete("http://localhost:3000/keranjangs/" + item.id) // Menghapus semua item dari keranjang
                .catch((error) => console.log(error));
            });

            this.$router.push({ path: "/pesanan-sukses" }); // Mengarahkan ke halaman pesanan sukses
            this.$toast.success("Sukses Dipesan", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((err) => console.log(err));
      } else {
        this.$toast.error("Nama dan Nomor Meja Harus diisi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/keranjangs") // Mengambil data keranjang dari server
      .then((response) => this.setKeranjangs(response.data)) // Mengatur data keranjang setelah menerima respons
      .catch((error) => console.log(error));
  },
  computed: {
    totalHarga() {
      return this.keranjangs.reduce(function (items, data) {
        return items + data.products.harga * data.jumlah_pemesanan; // Menghitung total harga dari item-item di keranjang
      }, 0);
    },
  },
};
</script>

<style>
</style>
