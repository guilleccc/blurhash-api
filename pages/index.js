import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>BlurHash API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to BlurHash API" />
        <p className="description">
          Checkout the following endpoints:
          
        </p>
        <a href="#">
          <code>/api/blurhash</code>

        </a>
      </main>

      <Footer />
    </div>
  )
}
