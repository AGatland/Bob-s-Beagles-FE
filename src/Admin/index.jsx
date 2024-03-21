import { useContext, useEffect, useState } from "react"
import './style.css'
import { NativeSelect } from "@mantine/core"
import { environment } from "../environments/environment"
import { AuthContext } from "../App"
import { useNavigate } from "react-router-dom"

function Admin() {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const [orderId, setOrderId] = useState("")
    const [orderStatus, setOrderStatus] = useState("ORDER_RECEIVED")
    const [orderResponse, setOrderResponse] = useState({})
    const handleChange = (event) => {
        if((event.target.name === "orderId"))
            setOrderId(event.target.value)
        else
            setOrderStatus(event.target.value)
    }

    const handleClick = (event) => {
        fetch(`${environment.apiUrl}users/0/orders/${orderId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                status: orderStatus
            })
        })
            .then(response => response.json())
            .then(setOrderResponse)
            console.log(orderResponse)
    }

    useEffect(() => {
        if(authContext.user && authContext.roles && authContext.roles.filter(role => role.name === "ROLE_ADMIN").length === 0) 
            navigate("/")
    })

    return(
        <div className="admin-page">
            <h1>Administer orders</h1>
            {orderResponse && orderResponse.status === "error" &&
                <p>Failure, order ID may not exist</p>
            }
            <label htmlFor="orderId">Order ID: </label>
            <input name="orderId" id="orderId" value={orderId} onChange={handleChange}></input>
            <NativeSelect name="orderStatus" label="Set order status" description="Order status" data={
                [
                    {label: 'Order received', value: 'ORDER_RECEIVED'}, 
                    {label: 'Package being processed', value: 'PACKAGE_BEING_PROCESSED'}, 
                    {label: 'Sent', value: 'SENT'}]
                } 
                onChange={handleChange}/>
            <button onClick={handleClick}>Save changes</button>
        </div>
    )
}

export default Admin