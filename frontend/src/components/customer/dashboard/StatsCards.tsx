export default function StatsCards() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginTop: "24px",
        marginBottom: "32px",
      }}
    >
      <Card
        title="Total Pesanan"
        value="12 Pesanan"
      />

      <Card
        title="Laundry Aktif"
        value="3 Pesanan"
      />

      <Card
        title="Total Pengeluaran"
        value="Rp 500.000"
      />
    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
      }}
    >
      <p
        style={{
          color: "#666",
          marginBottom: "8px",
        }}
      >
        {title}
      </p>

      <h2>{value}</h2>
    </div>
  );
}