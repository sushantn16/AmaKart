import Modal from "../UI/Modal";
import { useState } from "react";
import CartItem from "./CartItem";
import OrderSucess from "../UI/OrderSucess";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addItemHandler, removeItemHandler, placeOrderHandler } from "../../actions"


const Cart = () => {

    const [showCartModal, setShowCartModal] = useState(false);
    const [orderModal, setOrderModal] = useState(false);
    const [orderId, setOrderId] = useState("");
    const items = useSelector(state => state.cart.items);
    const totalAmount = useSelector(state => state.cart.totalAmount)
    const count = items.length;
    const dispatch = useDispatch()

    const handleCartModal = () => {
        setShowCartModal(showCartModal => !showCartModal);
    }

    const handleOrderModal = () => {
        setShowCartModal(false);
        setOrderModal(orderModal => !orderModal);
    }
    const orderHandler = () => {

        dispatch(placeOrderHandler((response) => {
            console.log(response)
            if (response.error) {
                alert(response.data.error||"Some error occoured, Please try again")
            } else {
                setOrderId(response.data.name)
                setShowCartModal(false);
                setOrderModal(previous => !previous);
            }
        }))

    }

    const dispatchEvents = (type, item) => {
        if (type === 1) {
            dispatch(addItemHandler(item))
        } else if (type === -1) {
            dispatch(removeItemHandler(item.id))
        }
    }
    return (
        <>
            <button onClick={handleCartModal}>
                <span data-items={count}>Cart</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart-plus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="6" cy="19" r="2" />
                    <circle cx="17" cy="19" r="2" />
                    <path d="M17 17h-11v-14h-2" />
                    <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
                    <path d="M15 6h6m-3 -3v6" />
                </svg>
            </button>
            {showCartModal && <Modal onClose={handleCartModal}>
                <div className="checkout-modal">
                    <h2>Checkout Modal</h2>
                    <div className="checkout-modal_list">
                        {
                            count > 0 ?

                                items.map((item) => {
                                    return <CartItem item={item} key={item.id} onEmitDecreaseCounter={item => dispatchEvents(-1, item)} onEmitIncreaseCounter={item => dispatchEvents(1, item)} />
                                })

                                :
                                <div className="empty-cart">Please add something in your cart!</div>
                        }
                    </div>
                    {
                        count > 0 &&

                        <div className="checkout-modal_footer">
                            <div className="totalAmount">
                                <h4>Total Amount: </h4>
                                <h4>{totalAmount}
                                    <span style={{ marginLeft: "4px" }}>INR</span>
                                </h4>
                            </div>
                            <button onClick={orderHandler}>Order Now</button>
                        </div>

                    }
                </div>
            </Modal>}
            {
                orderModal && <OrderSucess orderId={orderId} onClose={handleOrderModal} />
            }
        </>
    )

}
export default Cart;