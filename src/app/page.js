
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/products">Go to Product List</Link>
        <Link href="/addproduct">Go to Add Product Page</Link>
      
      </main>
    </div>
  );
}
