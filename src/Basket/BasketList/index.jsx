import BasketListItem from "./BasketListItem"

function BasketList({basket}) {
    return(
        <div className="basket-list">
            {basket.map((item, index) => (
                <BasketListItem key={index} item={item}></BasketListItem>
            ))}
        </div>
    )
}

export default BasketList