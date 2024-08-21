import connect from "@/libs/mongodb";
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";

export async function GET() {
    await connect()
    const products = await Product.find()
    return NextResponse.json({ products })
}

export async function POST(request) {
    const {name, image, category, price} = await request.json()
    await connect()
    await Product.create({name, image, category, price})
    return NextResponse.json({message: "Product Created"}, {status: 200})
}
