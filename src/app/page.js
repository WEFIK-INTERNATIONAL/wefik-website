import CareerCTA from "@/sections/homepage/CareerCTA";
import ExpertiseSection from "@/sections/homepage/ExpertiseSection";
import HeroSection from "@/sections/homepage/HeroSection";
import Integrations from "@/sections/homepage/Intrigrations";
import Introduction from "@/sections/homepage/Introduction";
import Testimonials from "@/sections/homepage/Testimonials";
import WhyUs from "@/sections/homepage/WhyUs";
import Works from "@/sections/homepage/Works";

import React from "react";

function page() {
    return (
        <>
            <HeroSection />
            <Introduction />
            <Works />
            <WhyUs />
            <ExpertiseSection />
            <Integrations />
            <Testimonials />
            <CareerCTA />
        </>
    );
}

export default page;
