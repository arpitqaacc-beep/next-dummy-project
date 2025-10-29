import { connectionSrt } from "@/lib/db";
// import Product from "@/lib/model/product";
import { NextResponse } from "next/server";

const { MongoClient, ServerApiVersion } = require('mongodb');


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



export async function GET(params) {
    try {
        await run().catch(console.dir);
        const db = client.db("ProductDB");
        const allPosts = await db.collection("products").find({}).toArray();
        console.log("products", allPosts);
        await client.close();
        return NextResponse.json({ message: 'Products API is working', result: allPosts, success: true }, { status: 200 });
    } catch (error) {
        console.log("error", error);
        return NextResponse.json({ message: 'Products API is not working', success: false, error: error }, { status: 400 });
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }


}

export async function POST(request) {
    try {
        const reqBody = await request.json();
        await run().catch(console.dir);
        const db = client.db("ProductDB");
        let product = await db.collection("products").insertOne(reqBody);
        await client.close();
        return NextResponse.json({ message: 'Product created successfully', result: product, success: true }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Product creation failed', success: false, error: error }, { status: 400 });
    }
}