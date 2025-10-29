'use client';

import { useState } from "react";

export default function UploadImage() {

    const [file, setFile] = useState(null)
        ;
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.set('file', file);
        const res = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            body: data,
        });
        const result = await res.json();
        console.log("Upload result:", result);
        if (result.success) {
            alert('File uploaded successfully!');
        } else {
            alert('File upload failed.');
        }
    }
    return (
        <main>
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <h1>Upload Image</h1>

                <input type="file" name="imageUpload" onChange={(e) => setFile(e.target.files?.[0])} />
                <button type="submit">Upload</button>
            </form>
        </main>
    );
}