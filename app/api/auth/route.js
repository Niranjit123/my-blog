import { NextResponse } from "next/server";

export async function  POST(request){
    try {

        const {password} = await request.json()


        if (password === process.env.ADMIN_PASSWORD){
            return NextResponse.json({authenticated: true}, {status: 200})
        } else {
            return NextResponse.json({authenticated:false}, {status:401})
        }
        
    } catch (error) {
        return NextResponse.json({error: 'Authentification failed'}, {status: 500})
    }
}