import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

import {HomePage} from '../pages/Home.jsx'
import {SearchPage} from '../pages/Search.jsx'
import {NotFoundPage} from '../pages/404.jsx'
import {useRouter} from '../hooks/useRouter.jsx'
import {Route} from '../components/Route.jsx'
import {ContactPage} from '../pages/Contact.jsx'

export default function App() {
    const { currentPath } = useRouter()

    return (
        <> 
            <Header />
            <Route path="/" component={HomePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="*" component={NotFoundPage} />
            <Route path="/404" component={NotFoundPage} />
            <Footer />
        </>
    )
}
