import { IconCalendar, IconClick, IconHeadset, IconShoppingCart, IconTruckDelivery } from "@tabler/icons-react"
import './style.css'

/*
    Shows information about shipping
*/
function ShippingInfo() {
    return(
        <div className="shipping-info">
            <div className="shipping-info-part">
                <div className="white-circle"><IconClick></IconClick></div>
                <p>Pick the items you want</p>
            </div>
            <div className="shipping-info-part">
            <div className="white-circle"><IconTruckDelivery></IconTruckDelivery></div>
                <p>Choose your preferred shipping method</p>
            </div>
            <div className="shipping-info-part">
            <div className="white-circle"><IconCalendar></IconCalendar></div>
                <p>Ships within 2-4 working days</p>
            </div>
            <div className="shipping-info-part">
            <div className="white-circle"><IconHeadset></IconHeadset></div>
                <p>24/7 support</p>
            </div>
        </div>
    )
}

export default ShippingInfo