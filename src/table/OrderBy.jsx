import {useState} from "react";

const Order = ({setUpperOrder}) => {

    return <details className="dropdown">
        <summary className="m-1 btn" onClick={setUpperOrder}>Order by</summary>
    </details>
}

export default Order
