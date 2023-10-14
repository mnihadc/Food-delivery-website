import React from 'react'

import { useCart, useDispatchCart } from '../Components/ContextReducer';

function Cart() {
    let Cartdata = useCart();
    let dispatch = useDispatchCart();
    if (Cartdata.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }

    const handleCheckout = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:5000/api/orderData", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: Cartdata,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        })
        console.log("order response",response);
        if(response.status===200){
            dispatch({type:"DROP"})
        }
    }
    let totalPrice = Cartdata.reduce((total, item) => total + item.price, 0)

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Cartdata.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.qty}</td>
                                <td>{item.size}</td>
                                <td>${item.price}</td>
                                <td><button type='button' className='btn p-0'><img src='' alt='delete' onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price:{totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckout}>Check Out</button>
                </div>
            </div>
        </div>
    )
}

export default Cart
