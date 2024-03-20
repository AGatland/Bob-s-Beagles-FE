import { useContext } from "react"
import { AuthContext, ProductContext } from "../App"
import NewProducts from "./NewProducts"
import './style.css'
import { paragraph } from "../assets/placeholder"
import { Loader } from "@mantine/core"
import ShippingInfo from "./ShippingInfo"

function Dashboard() {
    const productContext = useContext(ProductContext)
    const authContext = useContext(AuthContext)

    /* Display a loading circle if products not yet loaded */
    if (!productContext.products && authContext.user) return <Loader color="blue" />;

    return(
        <div className="dashboard">
            <h1>Welcome to Bob&apos;s Beagles!</h1>
            <p>{paragraph}</p>
            <NewProducts products={productContext.products}/>
            <ShippingInfo />
        </div>
    )
}

export default Dashboard