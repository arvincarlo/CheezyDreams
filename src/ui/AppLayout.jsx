import Header from "./Header"
import CartOverview from "../features/cart/CartOverview"
import { Outlet } from "react-router-dom"

function AppLayout() {
    return (
        <div>
            <Header></Header>

            <main>
                <h1>Content</h1>
                <Outlet/>
            </main>

            <CartOverview></CartOverview>
        </div>
    )
}

export default AppLayout
