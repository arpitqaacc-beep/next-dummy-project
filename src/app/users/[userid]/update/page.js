'use client';
import './../../../style.css';
import { useEffect, useState } from 'react';


export default function UpdateUserDetails({ params }) {
      console.log("UpdateUserDetails", params);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    async function getUserDetail() {
        const parameter = await params;
        const userid = await parameter.userid;
        console.log("params userid", userid);
        let data = await fetch(`http://localhost:3000/api/users/${userid}`);
        data = await data.json();
        console.log("data", data);
        setName(data.result.name);
        setEmail(data.result.email);
    }

    const updateUserDetail = async () => {
        const parameter = await params;
        const userid = await parameter.userid;
        console.log("params userid", userid);
        let data = await fetch(`http://localhost:3000/api/users/${userid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });
        data = await data.json();
        if (!data.success) {
            alert(data.message);
            return;
        }
        alert('User updated successfully!');
        console.log("data", data);
    }

    useEffect(() => {
        console.log("useEffect");
        getUserDetail()
    }, []);

    console.log("render", name, email);

    return (
        <div className='add-user'>
            <h1>Update Users Details</h1>
            <input type="text" placeholder="Enter Name" value={name} className="input-filed" onChange={(e) => setName(e.target.value)} />
            <br />
            <input type="text" placeholder="Enter Email" value={email} className="input-filed" onChange={(e) => setEmail(e.target.value)} />
            <br />
            <button type="button" className="button" onClick={updateUserDetail}>Update User</button>
        </div>
    );
}