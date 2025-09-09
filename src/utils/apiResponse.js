import { NextResponse } from "next/server";

export function successResponse(
    message = "Success",
    status = 200,
    data = null
) {
    return NextResponse.json(
        { success: true, message, data },
        { status, headers: { "Content-Type": "application/json" } }
    );
}

export function errorResponse(message = "Error", status = 500, details = null) {
    return NextResponse.json(
        { success: false, message, details },
        { status, headers: { "Content-Type": "application/json" } }
    );
}
