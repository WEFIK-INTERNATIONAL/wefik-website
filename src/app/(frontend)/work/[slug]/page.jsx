"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import API from "@/lib/axiosConfig";

export default function Page() {
    const { slug } = useParams();

    const fetchWork = async () => {
        try {
            const response = await API.get(`/works/${slug}`);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchWork();
    }, [slug]);

    return (
        <div>
            <h1>Work Page {slug}</h1>
        </div>
    );
}
