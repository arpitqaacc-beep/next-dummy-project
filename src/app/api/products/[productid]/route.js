import { connectionSrt } from "@/lib/db";

import { NextResponse } from "next/server";


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(connectionSrt, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("ProductDB").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (e) {
        console.log("Pinged your deployment. Error connecting to MongoDB:", e);

    }
}

export async function GET(request, content) {
    // Define some sample user data
    try {
        let params = await content.params;
        console.log("params", params);
        let productid = await params.productid
        console.log("content", productid);

        await run().catch(console.dir);
        const db = client.db("ProductDB");
        const allPosts = await db.collection("products").find({}).toArray();
        console.log("products", allPosts);
        await client.close();
        const userData = allPosts.filter(u => { return u._id == productid }
        );
        return NextResponse.json(userData.length == 0 ? { message: 'No Data found', result: [], success: false } : { message: 'Products API is working', result: userData[0], success: true }, { status: 200 });

        // return NextResponse.json({ message: 'Products API is working', result: allPosts, success: true }, { status: 200 });
    } catch (error) {
        console.log("error", error);
        return NextResponse.json({ message: 'Products API is not working', success: false, error: error }, { status: 400 });
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

export async function PUT(request, content) {
    try {
        let params = await content.params;
        const productid = params.productid;
        const payload = await request.json();
        // In a real application, you would update this in a database
        if (!payload.name || !payload.price || !payload.company) {
            return NextResponse.json({ message: 'Name, price and company are required', success: false }, { status: 400 });
        }

        const filter = { _id: new ObjectId(productid) };

        await run().catch(console.dir);
        console.log("productid", productid);
        console.log("filter", filter);
        console.log("payload", payload);
        const db = client.db("ProductDB");

        const updatedDoc = await db.collection("products").updateOne(
            filter,
            { $set: payload },
            { returnDocument: 'after' } // Return the document after the update
        );
        await client.close();
        console.log("updatedDoc ", updatedDoc);
        // Check if a document was found and updated
        if (updatedDoc) {
            console.log("Document updated successfully:", updatedDoc);
            return NextResponse.json({ message: 'Data updated successfully', product: updatedDoc, success: true }, { status: 201 });
        } else {
            console.log("No document found matching the filter.");
            return NextResponse.json({ message: 'Product not found', success: false }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Product update failed', success: false, error: error }, { status: 400 });
    }
}

export async function DELETE(request, content) {
    let params = await content.params;
    console.log("params", params);
    const productid = await params.productid;
    if (!productid) {
        return NextResponse.json({ message: 'Product ID is required', success: false }, { status: 400 });
    }
    console.log("productid", productid);
    const filter = { _id: new ObjectId(productid) };
    await run().catch(console.dir);
    const db = client.db("ProductDB");
    const deleted = await db.collection("products").deleteOne(filter);
    await client.close();
    if (deleted.deletedCount === 0) {
        return NextResponse.json({ message: 'Product not found', success: false }, { status: 404 });
    }
    return NextResponse.json({ message: `Product with ID ${productid} deleted successfully`, success: true }, { status: 200 });

}