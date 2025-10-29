
import { users } from '@/util/db';
import { NextResponse } from 'next/server';


export async function GET(request, content) {
    // Define some sample user data


    let params = await content.params;
    let userid = params.userid
    console.log("content", userid);

    const userData = users.filter(u => { return u.id == userid }
    );
    console.log("userData", userData);
    return NextResponse.json(userData.length == 0 ? { result: 'No Data found', success: false } : { result: userData[0], success: true }, { status: 200 });
}

export async function PUT(request, content) {
    const payload = await request.json();
    console.log("payload", payload);
    // In a real application, you would update this in a database
    if (!payload.name || !payload.email) {
        return NextResponse.json({ message: 'Name and email are required', success: false }, { status: 400 });
    }
    let params = await content.params;
    let userid = params.userid
    console.log("content", userid);
    payload.id = userid;
    return NextResponse.json({ message: 'Data added successfully', user: payload, success: true }, { status: 201 });
}

export async function DELETE(request, content) {
      let params = await content.params;
    let userid = params.userid
    if (!userid) {
        return NextResponse.json({ message: 'User ID is required', success: false }, { status: 400 });
    }
    console.log("content", userid);
    // In a real application, you would delete this from a database
    // Here, we just simulate the deletion
    return NextResponse.json({ message: `User with ID ${userid} deleted successfully`, success: true }, { status: 200 });
   
}