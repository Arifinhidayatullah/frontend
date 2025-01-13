import { useEffect, useState } from "react";
import axios from "axios";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/kreditmotorbekas`)
      .then((response) => {
        // Memastikan data API berupa array
        const transactionData = response.data.data ? response.data.data : [];
        setTransactions(transactionData);
      })
      .catch((error) => {
        if (error.response) {
          console.error("API responded with an error:", error.response.status, error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      });
  }, []);

  return (
    <div>
      <h1>Daftar Transaksi Kredit Motor</h1>
      <table>
        <thead>
          <tr>
            <th>Nama Peminjam</th>
            <th>Nomor KTP</th>
            <th>Nomor Telepon</th>
            <th>Merk Motor</th>
            <th>Harga</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.nama_peminjam}</td>
                <td>{transaction.no_ktp}</td>
                <td>{transaction.nomor_telepon}</td>
                <td>{transaction.merk_motor}</td>
                <td>{transaction.harga}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Tidak ada transaksi yang tersedia.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;
