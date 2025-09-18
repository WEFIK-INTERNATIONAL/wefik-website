"use client";
import React, { use } from "react";

export default function Page({ params }) {
    const { id } = use(params);
    return <div>{id}</div>;
}
