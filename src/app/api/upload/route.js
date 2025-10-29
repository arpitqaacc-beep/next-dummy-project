import { NextResponse } from "next/server";
import fs from 'fs';

export async function POST(request) {
    const data = await request.formData();
    const file = data.get('file');
    if (!file) {
        return NextResponse.json({ message: 'No file uploaded', success: false }, { status: 400 });
    }
    const filename = file.name;
    const imageData = await file.arrayBuffer();
    console.log("Uploaded file:", filename, imageData);
    const buffer = Buffer.from(imageData);
    const path = `./public/${filename}`;
    console.log("File path:", path);
    await fs.promises.writeFile(path, buffer);
    return NextResponse.json({ message: 'File uploaded successfully', filename: filename, success: true }, { status: 200 });
}

export async function GET(request) {
    // Handle file upload logic here
    return NextResponse.json({ message: 'POST method not implemented' }, { status: 501 });
}   