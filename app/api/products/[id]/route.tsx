import connect from "@/libs/mongodb";
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";

export async function PUT(request, {params}) {
    const {id} = params
    const {newName: name, newImage: image, newPrice: price, newCategory: category} = await request.json()
    await connect()
    await Product.findByIdAndUpdate(id, {name, image, price, category})
    return NextResponse.json({message: "Product Update"}, {status: 200})
}

export async function GET(request, {params}) {
    const {id} = params
    await connect()
    const product = await Product.findOne({_id: id})
    return NextResponse.json({product}, {status: 200})
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id")
    await connect()
    await Product.findOneAndDelete(id)
    return NextResponse.json({message: "Product deelete"}, {status: 200})

}