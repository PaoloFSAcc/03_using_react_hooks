import '../public/static/bootstrap.css'
import '../public/static/site.css'

//This is just a fancy way to include the css classes
export default function MyApp({Component, pageProps}) {
    return <Component {...pageProps}/>;
}