const CartItem = ({ item, onEmitDecreaseCounter, onEmitIncreaseCounter }) => {

    return (
        <div className="checkout-modal_list-item">
            <div className="img-wrap">
                <img src={`/assets/${item.thumbnail}`} className="img-fluid" alt="Placeholder" />
            </div>
            <div className="information">
                <div>
                    <h4>{item.title}</h4>
                    <div className="pricing">
                        <span>{item.price}</span>
                        <small>
                            <strike>{item.discountedPrice}</strike>
                        </small>
                    </div>
                </div>
                <div className="cart-addon cart-addon__modal">
                    <button onClick={() => onEmitDecreaseCounter(item)}>-</button>
                    <span className="counter">{item.quantity}</span>
                    <button onClick={() => onEmitIncreaseCounter(item)}>+</button>
                </div>
            </div>
        </div>
    )
}
export default CartItem;