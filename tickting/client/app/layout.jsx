import "bootstrap/dist/css/bootstrap.css";

export const metadata = {
  title: "Ticketing",
  description: "Buy A Ticket",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true} data-qb-installed="true">
      <body>{children}</body>
    </html>
  );
}
