import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/Navbar"


const Layout = () => {
  return (
    <div className="h-full">
        <div className="d-flex flex-column">
            <div>
                <Navbar/>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    </div>
  )
}

export default Layout