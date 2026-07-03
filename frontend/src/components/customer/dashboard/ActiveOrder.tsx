export default function ActiveOrder() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
        height: "100%",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        Pesanan Aktif
      </h2>

      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "16px",
          padding: "20px",
        }}
      >
        <p>ID Pesanan</p>

        <h3 style={{ color: "#1565D8" }}>
          #12345
        </h3>

        <hr style={{ margin: "16px 0" }} />

        <p>Jenis Layanan : Cuci Kering</p>
        <p>Berat : 5 Kg</p>
        <p>Tanggal : 12 Mei 2024</p>

        <hr style={{ margin: "16px 0" }} />

        <p>Status : Diproses</p>

        <hr style={{ margin: "16px 0" }} />

        <p>Estimasi : Hari ini 16:30 WIB</p>

        <h3
          style={{
            color: "#1565D8",
            marginTop: "20px",
          }}
        >
          Rp 85.000
        </h3>
      </div>
    </div>
  );
}