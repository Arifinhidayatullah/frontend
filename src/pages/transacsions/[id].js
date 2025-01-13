'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const EditTransaction = () => {
  const router = useRouter();
  const { id } = router.query;

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

  useEffect(() => {
    if (id) {
      console.log("ID transaksi yang diterima:", id); // Debugging ID
      const fetchTransaction = async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/motor-credit-transactions/${id}`);
          setFormData(res.data.data);
        } catch (error) {
          console.error("Error fetching transaction:", error);
        }
      };
      fetchTransaction();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: ["Jumlah_Kredit", "Tenor", "Bunga"].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || Object.values(formData).includes("") || isNaN(Number(formData.Jumlah_Kredit)) || isNaN(Number(formData.Tenor)) || isNaN(Number(formData.Bunga))) {
      alert("Semua field harus diisi dengan benar.");
      return;
    }

    const payload = {
      data: { ...formData },
    };

    console.log("Payload yang akan dikirimkan:", JSON.stringify(payload, null, 2));

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/motor-credit-transactions/${id}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Response:", response.data); // Debugging response
      router.push("/transactions"); // Redirect setelah update
    } catch (error) {
      console.error("Error updating transaction:", error.response?.data || error.message);
      alert(`Terjadi kesalahan: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Transaksi Kredit Motor</h1>
      <input
        type="text"
        name="Nama_Pemohon"
        value={formData.Nama_Pemohon}
        onChange={handleChange}
        placeholder="Nama Pemohon"
      />
      <input
        type="text"
        name="Nomor_KTP"
        value={formData.Nomor_KTP}
        onChange={handleChange}
        placeholder="Nomor KTP"
      />
      <input
        type="text"
        name="Nomor_HP"
        value={formData.Nomor_HP}
        onChange={handleChange}
        placeholder="Nomor HP"
      />
      <input
        type="text"
        name="Alamat"
        value={formData.Alamat}
        onChange={handleChange}
        placeholder="Alamat"
      />
      <input
        type="number"
        name="Jumlah_Kredit"
        value={formData.Jumlah_Kredit}
        onChange={handleChange}
        placeholder="Jumlah Kredit"
      />
      <input
        type="number"
        name="Tenor"
        value={formData.Tenor}
        onChange={handleChange}
        placeholder="Tenor"
      />
      <input
        type="number"
        name="Bunga"
        value={formData.Bunga}
        onChange={handleChange}
        placeholder="Bunga"
      />
      <select
        name="Status_Transaksi"
        value={formData.Status_Transaksi}
        onChange={handleChange}
      >
        <option value="Pending">Pending</option>
        <option value="Disetujui">Disetujui</option>
        <option value="Ditolak">Ditolak</option>
      </select>
      <button type="submit">Simpan Perubahan</button>
    </form>
  );
};

export default EditTransaction;
