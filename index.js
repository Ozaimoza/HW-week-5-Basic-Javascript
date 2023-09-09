let array = { nama: [], umur: [], uangSangu: [] };
let modal = document.getElementById("editModal");

var registerButton = document.getElementById("registerButton");
var namaInput = document.getElementById("nama");
var umurInput = document.getElementById("umur");
var uangSanguInput = document.getElementById("uangSangu");

namaInput.addEventListener("input", toggleRegisterButton);
umurInput.addEventListener("input", toggleRegisterButton);
uangSanguInput.addEventListener("input", toggleRegisterButton);

// button enable disable untuk menghindari jika ada form yang belum terisi
// dan mengurangi validasi pada form register
function toggleRegisterButton() {
  var nama = namaInput.value;
  var umur = umurInput.value;
  var uangSangu = uangSanguInput.value;

  if (nama !== "" && umur !== "" && uangSangu !== "") {
    registerButton.disabled = false;
  } else {
    registerButton.disabled = true;
  }
}

// alert error dan success
class AlertManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  showAlert(message, className) {
    const newContent = message;
    const newClass = `alert ${className}`;

    this.container.innerHTML = "";
    this.container.innerHTML += `<p class="${newClass}">${newContent}</p>`;

    return new Promise((resolve) => {
      setTimeout(() => {
        this.container.innerHTML = "";
        this.container.classList.remove("alert");
        resolve();
      }, 4000);
    });
  }
}

// Function menghitung rata rata
function hitungRataRata(arr) {
  if (arr.length === 0) {
    return 0;
  }
  var total = arr.reduce((acc, val) => acc + val, 0); // acc untuk acculator yang diisi dengan angka 0 dan val adalah value dari array
  return total / arr.length;
}

// Fungsi untuk menghapus data pendaftar berdasarkan indeks
function hapusPendaftar(index) {
  // Konfirmasi pengguna sebelum menghapus data
  var confirmation = confirm(
    "Apakah Anda yakin ingin menghapus data pendaftar ini?"
  );

  if (confirmation) {
    array.nama.splice(index, 1); // Hapus data dari array,
    array.umur.splice(index, 1);
    array.uangSangu.splice(index, 1);
    listPendaftar(); // Render ulang tabel setelah menghapus data
  }
}

// function untuk mengolah data pendaftar pada modal
function editPendaftar(index) {
  // Mendapatkan data pendaftar berdasarkan indeks
  var nama = array.nama[index];
  var umur = array.umur[index];
  var uangSangu = array.uangSangu[index];

  // Menampilkan modal pengeditan data
  var namaInput = document.getElementById("editNama");
  var umurInput = document.getElementById("editUmur");
  var uangSanguInput = document.getElementById("editUangSangu");

  namaInput.value = nama;
  umurInput.value = umur;
  uangSanguInput.value = uangSangu;

  // Set nilai data-index pada modal
  var editModal = document.getElementById("editModal");
  editModal.setAttribute("data-index", index);
}

// Function untuk menyimpan perubahan
function simpanPerubahan() {
  // Dapatkan nilai yang diubah dalam modal
  var editNama = document.getElementById("editNama").value;
  var editUmur = document.getElementById("editUmur").value;
  var editUangSangu = document.getElementById("editUangSangu").value;
  const alertContainerId = "alertModal";
  const alertManager = new AlertManager(alertContainerId);

  // Dapatkan nilai data-index dari modal
  var dataIndex = document
    .getElementById("editModal")
    .getAttribute("data-index");

  // Pastikan dataIndex memiliki nilai
  if (dataIndex !== null) {
    // cek panjang karakter pada nama
    if (editNama.length < 10) {
      // alertModal("Nama Minimal Harus 10 Karakter", "alert-danger");
      alertManager.showAlert("Nama Minimal Harus 10 Karakter", "alert-danger");
      return;
    }
    // Konversi dataIndex ke tipe data yang sesuai (misalnya, integer)
    dataIndex = parseInt(dataIndex);

    // Perbarui data dalam array berdasarkan indeks
    array.nama[dataIndex] = editNama;
    array.umur[dataIndex] = editUmur;
    array.uangSangu[dataIndex] = editUangSangu;
    alertManager.showAlert("Update Success", "alert-success");

    // Render ulang tabel
    listPendaftar();
  }
}
// mengambil data input
async function getDataPendaftar() {
  let nama = document.getElementById("nama").value;
  let umur = document.getElementById("umur").value;
  let uangSangu = document.getElementById("uangSangu").value;
  const alertContainerId = "alert";
  const alertManager = new AlertManager(alertContainerId);

  // jika Form masih kosong
  // if (nama === "" || umur === "" || uangSangu === "") {
  //   await alertMessage("Form Harus Diisi !!!", "alert-danger");
  //   return;
  // }

  // cek nama
  if (nama.length < 10) {
    await alertManager.showAlert(
      "Nama Minimal Harus 10 Karakter.",
      "alert-danger"
    );
    return;
  }

  // nama is unik (tidak boleh ada duplikat nama)
  // if (array.nama.includes(nama)) {
  //   await alertManager.showAlert("Nama Sudah Terdaftar", "alert-danger");
  //   return;
  // }

  // cek umur
  if (isNaN(umur) || umur < 25) {
    await alertManager.showAlert(
      "Umur Harus Berupa Angka Dan Minimal 25 Tahun",
      "alert-danger"
    );
    return;
  }

  // cek uang sangu
  if (isNaN(uangSangu) || uangSangu < 100000 || uangSangu > 1000000) {
    await alertManager.showAlert(
      "Uang Sangu Harus Berupa Angka Minimal Rp.100.000 dan Maksimal Rp.1.000.000",
      "alert-danger"
    );
    return;
  }

  // ketika kondisi terpenuhi
  await alertManager.showAlert("Register Success", "alert-success");
  array.nama.push(nama);
  array.umur.push(umur);
  array.uangSangu.push(uangSangu);

  // toggleRegisterButton();
}

// menampilkan daftar/list Pendaftar
function listPendaftar() {
  var container = document.getElementById("table_body");
  container.innerHTML = "";

  //looping value pendaftar berdasarkan input pada array
  if (array.nama.length > 0) {
    for (let i = 0; i < array.nama.length; i++) {
      container.innerHTML += `
        <tr id="${i}">
          <th scope="row">${i + 1}</th>
          <td>${array.nama[i]}</td>
          <td>${array.umur[i]}</td>
          <td>${array.uangSangu[i]}</td>
          <td>
          <button class="btn btn-danger" onclick="hapusPendaftar(${i})"><i class="bi bi-trash3"></i></button>
          <button class="btn btn-warning" onclick="editPendaftar(${i})" data-index="${i}" data-bs-toggle="modal" data-bs-target="#editModal">
          <i class="bi bi-pencil-square"></i></button>
          </td> 
          </tr>
      `;
    }
  }

  var keterangan = document.getElementById("keterangan");
  var rataRataUmur = Math.floor(hitungRataRata(array.umur.map(Number))); // angka dibulatkan kebawah dengan math.floor
  var rataRataUangSangu = Math.floor(
    hitungRataRata(array.uangSangu.map(Number))
  ); // angka dibulatkan kebawah dengan math.floor

  // menampilkan resume rata rata umur dan uang sangu pada bagian bawah tabel
  keterangan.innerHTML = "";
  if (array.nama.length > 0) {
    keterangan.innerHTML = `
      <p>Rata rata pendaftar memiliki uang sangu sebesar Rp.${rataRataUangSangu} dengan rata rata umur ${rataRataUmur} Tahun</p>
    `;
  }
}
