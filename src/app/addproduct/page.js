'use client';
import { useState } from 'react';
import '../style.css';

export default function AddProductPage() {
    const [data, setData] = useState({
        name: '',
        price: '',
        company: '',
        color: '',
        category: ''
    });

    const handleAddProduct = () => {
        // Logic to add user will go here
        console.log("Add Producr button clicked", data.name, data.price, data.company, data.color, data.category);
        let { name, price, company, color, category } = data;
        const addUser = async () => {
            const res = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, price, company, color, category }),
            });
            const data = await res.json();
            if (!data.success) {
                alert(data.message);
                return;
            }
            alert('Product added successfully!');
            console.log("data", data);
        }
        addUser();
    }



    return (
        <div>
            <h1>Add Product Page</h1>
            <input type="text" value={data.name} onChange={(e) => setData(prevData => ({
                ...prevData,
                name: e.target.value
            }))} placeholder="Enter product name" className='input-filed' />

            <input type="number" value={data.price} onChange={(e) => setData(prevData => ({
                ...prevData,
                price: e.target.value
            }))} placeholder="Enter product price" className='input-filed' />

            <input type="text" value={data.company} onChange={(e) => setData(prevData => ({
                ...prevData,
                company: e.target.value
            }))} placeholder="Enter company name" className='input-filed' />

            <input type="text" value={data.color} onChange={(e) => setData(prevData => ({
                ...prevData,
                color: e.target.value
            }))} placeholder="Enter color" className='input-filed' />

            <input type="text" value={data.category} onChange={(e) => setData(prevData => ({
                ...prevData,
                category: e.target.value
            }))} placeholder="Enter category" className='input-filed' />

            <button type="submit" className='button' onClick={handleAddProduct}>Add Product</button>
        </div>
    );
}