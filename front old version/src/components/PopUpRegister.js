import React from 'react'
import customers from '../api/api'
import {POST, GET} from '../api/fetch'

export default function PopUpRegister() {

    const RegisterCustomer = async () => {
        let c = {

        }
        let res = await POST(customers.post_register, {id: 1, name: "Moshe"} );
        //* res is the response from the server
        //* states need to be created for the api to work
    }

    return (
        <div class="popup-reg">
            
        </div>
    )
}
