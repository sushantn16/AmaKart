import AddtoCartIcon from '../../../assets/icons/add_cart.svg';
import { useState } from 'react';
import Modal from '../../UI/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { addItemHandler, removeItemHandler } from '../../../actions';

const ListItem = ({ data }) => {


    const [showModal, setShowModal] = useState(false);
    const item = useSelector(state => state.cart.items.find(item => item.id === data.id))
    const dispatch = useDispatch()

    const handleModal = () => {
        setShowModal(previousState => !previousState)
    }

    const descreaseCounterByOne = (event) => {
        event.stopPropagation();
        dispatch(removeItemHandler(data.id))

    }
    const increaseCounterByOne = (event) => {
        event.stopPropagation();
        dispatch(addItemHandler(data))
    }


    return (
        <>
            <div className={"item-card"} onClick={handleModal}>
                <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt="placeholder" />
                <div className={"item-card__information"}>
                    <div className={"pricing"}>
                        <span>{data.discountedPrice}</span>
                        <small><strike>{data.price}</strike></small>
                    </div>
                    <div className={"title"}><h3>{data.title}</h3></div>
                </div>
                {!item || item?.quantity < 1
                    ?
                    <button className={"cart-add"} onClick={increaseCounterByOne}>
                        <span>Add to cart</span>
                        <img src={AddtoCartIcon} alt="Cart Icon" />
                    </button>
                    :
                    <div className={"cart-addon"}>
                        <button onClick={descreaseCounterByOne}><span>-</span></button>
                        <span className={"counter"}>{item.quantity}</span>
                        <button onClick={increaseCounterByOne}><span>+</span></button>
                    </div>
                }
            </div>
            {showModal && <Modal onClose={handleModal} >
                <div className='item-card__modal'>
                    <div className='img-wrap'>
                        <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt="placeholder" />
                    </div>
                    <div className='meta'>
                        <h3>{data.title}</h3>
                        <div className={"pricing"}>
                            <span>{data.discountedPrice}</span>
                            <small><strike>{data.price}</strike></small>
                            <p>{data.description}</p>
                        </div>
                        {!item || item?.quantity < 1
                            ?
                            <button className={"cart-add card-add__modal"} onClick={increaseCounterByOne}>
                                <span>Add to cart</span>
                                <img src={AddtoCartIcon} alt="Cart Icon" />
                            </button>
                            :
                            <div className={"cart-addon cart-addon__modal"}>
                                <button onClick={descreaseCounterByOne}><span>-</span></button>
                                <span className={"counter"}>{item.quantity}</span>
                                <button onClick={increaseCounterByOne}><span>+</span></button>
                            </div>
                            
                        }
                        {
                            console.log(data)
                        }
                    </div>
                </div>
            </Modal>}
        </>
    )
}
export default ListItem;