import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Selamat Datang di Aplikasi Kredit Motor</h1>
      <Link href="/transacsions">Lihat Daftar Transaksi</Link>

      <br />
      <Link href="/transacsions/create-transaction">Ajukan Transaksi Baru</Link>

    </div>
  );
};

export default Home;