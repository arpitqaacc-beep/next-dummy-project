import { NextResponse } from 'next/server';

// Example data
const students = [
    { id: 1, name: 'Alice', age: 20 },
    { id: 2, name: 'Bob', age: 22 },
];

// GET /api/[...student]
export async function GET(request,  content ) {
    const  param  = await content.params;
    const student = param.student;
    console.log('student param', student);
    if (!student || student.length === 0) {
        // /api/student - list all students
        return NextResponse.json(students);
    }

    // /api/student/[id] - get student by id
    const id = parseInt(student[1]);
    console.log('student id', id)
    const found = students.find(s => s.id === id);
    if (found) {
        return NextResponse.json(found);
    }
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
}

// POST /api/student
export async function POST(request) {
    const body = await request.json();
    const newStudent = { id: students.length + 1, ...body };
    students.push(newStudent);
    return NextResponse.json(newStudent, { status: 201 });
}

// PUT /api/student/[id]
export async function PUT(request, { params }) {
    const { student } = params;
    const id = parseInt(student[0]);
    const body = await request.json();
    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
    students[index] = { ...students[index], ...body };
    return NextResponse.json(students[index]);
}

// DELETE /api/student/[id]
export async function DELETE(request, { params }) {
    const { student } = params;
    const id = parseInt(student[0]);
    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
    const deleted = students.splice(index, 1);
    return NextResponse.json(deleted[0]);
}