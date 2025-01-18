import React, { useState } from 'react'
import axios from 'axios'

const AddProduct = () => {
    const [data, setData] = useState({
        name: "",
        price: "",
        category: "",
        company: ""

    })
    const [error, setError] = useState({})

    //get user name from localstorage
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    // console.log(userId)

    const collectData = (e) => {
        const { name, value } = e.target
        setData((preData) => ({
            ...preData,
            [name]: value

        }))

        // Clear the error for the specific field if the user starts typing
        setError((preError) => ({
            ...preError,
            [name]: ""
        }));
    }
    const validate = () => {
        const newError = {};
        if (!data.name) newError.name = "Product name is required";
        if (!data.price || isNaN(data.price)) newError.price = "Valid price is required";
        if (!data.category) newError.category = "Category is required";
        if (!data.company) newError.company = "Company is required"

        setError(newError)
        return Object.keys(newError).length === 0;
    }

    const handleData = async (e) => {
        e.preventDefault()

        if (!validate()) return;
        // Add userId to the data object
        const productData = { ...data, userId }

        try {
            const responce = await axios.post('http://localhost:3000/add-product', productData)
            console.log("responce", responce.data)
            console.log("data store")

            // Clear form data
            setData({ name: "", price: "", category: "", company: "" })
            setError({});
        } catch (error) {
            console.log("Error storing product data:", error)
        }



        //    console.log(data)

    }

    return (
        <div className='product'>
            <form onSubmit={handleData}>
                <h1> Add product</h1>
                <input type='text'
                    value={data.name}
                    name='name'
                    onChange={collectData}
                    placeholder='Enter Name'
                    className='input-box' />
                {error.name && <span className='error'>{error.name}</span>}

                <input type='text'
                    value={data.price}
                    name='price'
                    onChange={collectData}
                    placeholder='Price'
                    className='input-box' />
                {error.price && <span className='error'>{error.price}</span>}

                <input type='text'
                    value={data.category}
                    onChange={collectData}
                    name="category"
                    placeholder='Category'
                    className='input-box' />
                {error.category && <span className='error'>{error.category}</span>}

                <input type='text'
                    value={data.company}
                    onChange={collectData}
                    name="company"
                    placeholder='Company'
                    className='input-box' />
                {error.company && <span className='error'>{error.company}</span>}

                <button type='submit' className='btn'>Add product</button>

            </form>

        </div>
    )
}
export default AddProduct;