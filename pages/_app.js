import '../styles/index.css'

export default function MyApp({ Component, pageProps }){
  return <div className="container mx-auto my-5 max-w-7xl">
    <Component {...pageProps} />
    </div>
}
