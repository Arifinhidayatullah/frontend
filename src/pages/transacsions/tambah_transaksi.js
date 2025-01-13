import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/CreateTransaction.module.css"; 

const CreateTransaction = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    Nama_Pemohon: "",
    Nomor_KTP: "",
    Nomor_HP: "",
    Alamat: "",
    Jumlah_Kredit: "",
    Tenor: "",
    Bunga: "",
    Status_Transaksi: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kirim data ke backend untuk membuat transaksi baru
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`/motor-credit-transactions, {
        data: formData,
      });
      // Redirect ke halaman daftar transaksi setelah berhasil
      router.push('/transactions');
    } catch (error) {
      console.error("Error saat membuat transaksi:", error.response?.data?.message || error.message);
      alert("Terjadi kesalahan saat membuat transaksi.");
    }
  };

  return (
    <div className={styles["form-container"]}>
      <h1 className={styles["form-title"]}>Buat Transaksi Kredit Motor</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles["input-field"]}
          type="text"
          name="Nama_Pemohon"
          value={formData.Nama_Pemohon}
          onChange={handleChange}
          placeholder="Nama Pemohon"
        />
        <input
          className={styles["input-field"]}
          type="text"
          name="Nomor_KTP"
          value={formData.Nomor_KTP}
          onChange={handleChange}
          placeholder="Nomor KTP"
        />
        <input
          className={styles["input-field"]}
          type="text"
          name="Nomor_HP"
          value={formData.Nomor_HP}
          onChange={handleChange}
          placeholder="Nomor HP"
        />
        <input
          className={styles["input-field"]}
          type="text"
          name="Alamat"
          value={formData.Alamat}
          onChange={handleChange}
          placeholder="Alamat"
        />
        <input
          className={styles["input-field"]}
          type="number"
          name="Jumlah_Kredit"
          value={formData.Jumlah_Kredit}
          onChange={handleChange}
          placeholder="Jumlah Kredit"
        />
        <input
          className={styles["input-field"]}
          type="number"
          name="Tenor"
          value={formData.Tenor}
          onChange={handleChange}
          placeholder="Tenor"
        />
        <input
          className={styles["input-field"]}
          type="number"
          name="Bunga"
          value={formData.Bunga}
          onChange={handleChange}
          placeholder="Bunga"
        />
        <select
          className={styles["select-field"]}
          name="Status_Transaksi"
          value={formData.Status_Transaksi}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="Disetujui">Disetujui</option>
          <option value="Ditolak">Ditolak</option>
        </select>
        <button className={styles["submit-button"]} type="submit">Buat Transaksi</button>
      </form>
    </div>
  );
};

export default CreateTransaction;