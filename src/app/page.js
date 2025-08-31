import Faqs from "@/sections/homepage/Faqs";
import HeroSection from "@/sections/homepage/HeroSection";
import Introduction from "@/sections/homepage/Introduction";
import Testimonials from "@/sections/homepage/Testimonials";

import React from "react";

function page() {
    return (
        <>
            <HeroSection />
            <Introduction />
            <Testimonials />
            <Faqs />
        </>
    );
}

export default page;
