// app/api/users/route.ts
import { users } from '@/util/db';
import { NextResponse } from 'next/server';


export async function GET(request) {
    // Define some sample user data
    const usersData = users


    return NextResponse.json(usersData, { status: 200 });
}

export async function POST(request) {
    const newUser = await request.json();
    // In a real application, you would save this to a database
    if (!newUser.name || !newUser.email) {
        return NextResponse.json({ message: 'Name and email are required', success: false }, { status: 400 });
    }
    newUser.id = users.length + 1; // Simple ID assignment; in real apps, use a proper ID generator.
    users.push(newUser);
    console.log('New user created:', newUser);// This is just for demonstration; in real apps, avoid mutating in-memory data like this.
    return NextResponse.json({ message: 'User created successfully', user: users, success: true }, { status: 201 });
    // return NextResponse.json({ message: 'POST method not implemented' }, { status: 501 });
}