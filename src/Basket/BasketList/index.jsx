import BasketListItem from "./BasketListItem"

function BasketList({basket}) {
    return(
        <ul className="basket-list">
            {basket.map((item, index) => (
                <BasketListItem key={index} item={item}></BasketListItem>
            ))}
        </ul>
    )
}

export default BasketList