import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './layout.module.scss'

export const metadata: Metadata = {
  title: "Валидатор Kevel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={styles.html} lang="ru">
      <body className={styles.body}>{children}</body>
    </html>
  );
}
