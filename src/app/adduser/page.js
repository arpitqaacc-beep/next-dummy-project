'use client';
import { useState } from 'react';
import './../style.css';

export default function AddUsersPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const handleAddUser = () => {
        // Logic to add user will go here
        console.log("Add User button clicked", name, email);
        const addUser = async () => {
            const res = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });
            const data = await res.json();
            if(!data.success){
                alert(data.message);
                return;
            }
            alert('User added successfully!');
            console.log("data", data);
        }
        addUser();
    }

    return (
        <div className='add-user'>
            <h1>Add Users Page</h1>
            <input type="text" placeholder="Enter Name" className="input-filed" onChange={(e) =>setName(e.target.value)} />
            <br />
            <input type="text" placeholder="Enter Email" className="input-filed" onChange={(e)=>setEmail(e.target.value)}/>
            <br />
            <button type="button" className="button" onClick={handleAddUser}>Add User</button>
        </div>
    );
}