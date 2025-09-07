import React from "react";
import HeadingText from "@/components/ui/HeadingText";

function page() {
    return (
        <section className="pt-44">
            <div className="">
                <div className="px-5">
                    <HeadingText>Privacy Policy</HeadingText>
                </div>
                <div className="mt-24 px-5 text-lg text-white/60 lg:flex lg:justify-between pb-10">
                    <div className="hidden lg:flex text-white">
                        <p>Privacy Policy</p>
                    </div>
                    <div className="lg:max-w-6xl lg:px-20">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl font-medium text-white">
                                Privacy Policy
                            </h2>
                            <p>Last updated on 1 September 2025</p>
                            <p className="mb-8">
                                At{" "}
                                <span className="font-medium">
                                    WEFIK INTERNATIONAL LTD
                                </span>
                                , one of our main priorities is the privacy of
                                our visitors. This Privacy Policy document
                                outlines what information we collect, how we use
                                it, and your rights regarding that information.
                                This policy applies only to our online
                                activities and is valid for visitors to our
                                website with regards to the information they
                                shared and/or collected on our website. This
                                policy does not apply to information collected
                                offline or via channels other than this website.
                            </p>
                        </div>

                        {/* Consent */}
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                1. Consent
                            </h2>
                            <p>
                                By using our website, you consent to our Privacy
                                Policy and agree to its terms. For our Terms and
                                Conditions, please visit our{" "}
                                <a
                                    href="/legal/terms"
                                    className="text-white underline font-medium"
                                >
                                    Terms & Conditions
                                </a>{" "}
                                page.
                            </p>
                        </div>

                        {/* Information we collect */}
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                2. Information We Collect
                            </h2>
                            <p className="mb-4">
                                The personal information that you are asked to
                                provide, and the reasons why you are asked to
                                provide it, will be made clear at the point we
                                request it.
                            </p>
                            <ul className="list-disc list-inside space-y-2 mb-4">
                                <li>
                                    If you contact us directly, we may receive
                                    additional information about you such as
                                    your name, email address, phone number, the
                                    contents of your message, and attachments.
                                </li>
                                <li>
                                    If you register for an account, we may ask
                                    for contact details such as name, company
                                    name, address, email address, and telephone
                                    number.
                                </li>
                            </ul>
                        </div>

                        {/* How we use your information */}
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                3. How We Use Your Information
                            </h2>
                            <p className="mb-4">
                                We use the information we collect in various
                                ways, including to:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    Provide, operate, and maintain our website
                                </li>
                                <li>
                                    Improve, personalize, and expand our website
                                </li>
                                <li>
                                    Understand and analyze how you use our
                                    website
                                </li>
                                <li>
                                    Develop new products, services, and features
                                </li>
                                <li>
                                    Communicate with you, either directly or
                                    through our partners, for customer service,
                                    updates, and marketing
                                </li>
                                <li>Send you emails and newsletters</li>
                                <li>Detect and prevent fraud</li>
                            </ul>
                        </div>

                        {/* Log Files */}
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                4. Log Files
                            </h2>
                            <p>
                                Like most websites, WEFIK INTERNATIONAL LTD uses
                                log files. These files log visitors when they
                                visit the site. Information collected includes
                                IP addresses, browser type, ISP, date and time
                                stamps, referring/exit pages, and number of
                                clicks. This data is not linked to any
                                personally identifiable information and is used
                                for analyzing trends, administering the site,
                                and tracking user behavior.
                            </p>
                        </div>

                        {/* Cookies */}
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                5. Cookies and Web Beacons
                            </h2>
                            <p>
                                We use cookies to store information such as
                                visitor preferences and the pages visited. This
                                helps us optimize user experience by customizing
                                content based on browser type and other
                                information. For more details, please see our{" "}
                                <a
                                    href="/legal/cookiepolicy"
                                    className="text-white underline font-medium"
                                >
                                    Cookie Policy
                                </a>
                                .
                            </p>
                        </div>

                        {/* Advertising Partners */}
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                6. Advertising Partners
                            </h2>
                            <p className="mb-4">
                                Third-party ad servers or networks use
                                technologies like cookies, JavaScript, or web
                                beacons in their ads and links that appear on
                                our website. They automatically receive your IP
                                address when this occurs. These are used to
                                measure campaign effectiveness and personalize
                                the ads you see. WEFIK INTERNATIONAL LTD has no
                                access to or control over these cookies.
                            </p>
                        </div>

                        {/* Third Party Privacy Policies */}
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                7. Third Party Privacy Policies
                            </h2>
                            <p>
                                Our Privacy Policy does not apply to other
                                advertisers or websites. We recommend reviewing
                                the Privacy Policies of these third-party ad
                                servers for more details, including how to
                                opt-out. You can disable cookies in your browser
                                settings.
                            </p>
                        </div>

                        {/* CCPA Rights */}
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                8. CCPA Privacy Rights (Do Not Sell My Data)
                            </h2>
                            <p className="mb-4">
                                Under the CCPA, California consumers have the
                                right to:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    Request disclosure of categories and
                                    specific pieces of personal data collected
                                </li>
                                <li>
                                    Request deletion of personal data collected
                                </li>
                                <li>
                                    Request that we do not sell personal data
                                </li>
                            </ul>
                            <p className="mt-4">
                                If you make a request, we will respond within 1
                                month. To exercise these rights, please contact
                                us.
                            </p>
                        </div>

                        {/* GDPR Rights */}
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                9. GDPR Data Protection Rights
                            </h2>
                            <p className="mb-4">
                                Every user in the EU is entitled to:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>The right to access personal data</li>
                                <li>The right to rectification</li>
                                <li>The right to erasure</li>
                                <li>The right to restrict processing</li>
                                <li>The right to object to processing</li>
                                <li>The right to data portability</li>
                            </ul>
                            <p className="mt-4">
                                If you make a request, we will respond within 1
                                month. To exercise these rights, please contact
                                us.
                            </p>
                        </div>

                        {/* Children's Information */}
                        <div>
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                10. Children's Information
                            </h2>
                            <p>
                                Protecting children online is a priority. WEFIK
                                INTERNATIONAL LTD does not knowingly collect
                                personal information from children under 13. If
                                you believe your child provided such
                                information, please contact us immediately and
                                we will remove it promptly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default page;
