import { Link } from "react-router-dom"
import SearchOrder from '../features/order/SearchOrder'

function Header() {
    return (
        <header>
            <Link to="/">Cheezy Dreams Co.</Link>
            <SearchOrder></SearchOrder>
            <p>Arvin</p>
        </header>
    )
}

export default Header
