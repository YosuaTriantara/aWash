export default function WelcomeBanner() {
  return (
    <div
      style={{
        background: "#1565D8",
        borderRadius: "24px",
        padding: "40px",
        color: "white",
        marginBottom: "32px",
      }}
    >
      <h1
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        Selamat Datang!
      </h1>

      <p
        style={{
          fontSize: "18px",
          opacity: 0.9,
        }}
      >
        Pakaian Anda sedang kami tangani.
      </p>
    </div>
  );
}