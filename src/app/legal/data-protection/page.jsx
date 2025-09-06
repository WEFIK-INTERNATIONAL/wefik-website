import HeadingText from "@/components/ui/HeadingText";

export default function DataProtectionPage() {
    return (
        <section className="pt-44">
            <div className="">
                <div className="px-5">
                    <HeadingText>Data Protection</HeadingText>
                </div>
                <div className="mt-24 px-5 text-lg text-white/60 lg:flex lg:justify-between pb-10">
                    <div className="hidden lg:flex text-white">
                        <p>Data Protection</p>
                    </div>
                    <div className="lg:max-w-6xl lg:px-20">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl font-medium text-white">
                                Privacy Policy
                            </h2>
                            <p>Last updated on 1 September 2025</p>
                            <p>
                                Transparent handling of personal data is very
                                important to us. This privacy policy provides
                                information on what personal data we collect,
                                for what purpose and to whom we pass it on. We
                                regularly review and update this privacy policy
                                to ensure the highest level of transparency.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl mt-10 mb-4 text-white">
                                1. What Data We Collect
                            </h3>

                            <h4 className="text-xl font-medium mt-6 mb-2">
                                a) General Personal Data
                            </h4>
                            <p className="mb-4">
                                We may collect personal information that you
                                voluntarily provide to us, such as your email
                                address for newsletter subscriptions or
                                inquiries.
                            </p>

                            <h4 className="text-xl font-medium mt-6 mb-2">
                                b) Automatically Collected Data
                            </h4>
                            <p>
                                When you visit our website, we automatically
                                collect technical information such as:
                            </p>
                            <ul className="list-disc list-inside ml-4 mb-6">
                                <li>IP address</li>
                                <li>Browser and operating system</li>
                                <li>
                                    Pages visited and time spent on each page
                                </li>
                                <li>Referrer URL</li>
                                <li>Device type and screen resolution</li>
                            </ul>

                            <h4 className="text-xl font-medium mt-6 mb-2">
                                c) Cookies and Tracking Technologies
                            </h4>
                            <p>We use cookies and similar technologies to:</p>
                            <ul className="list-disc list-inside ml-4 mb-6">
                                <li>
                                    Remember your preferences (e.g., language,
                                    theme)
                                </li>
                                <li>
                                    Provide website functionality and optimize
                                    content delivery
                                </li>
                                <li>
                                    Collect anonymous usage statistics for
                                    analytics and marketing purposes
                                </li>
                            </ul>

                            <h3 className="text-xl mt-10 mb-4 text-white">
                                2. How We Use Your Data
                            </h3>
                            <ul className="list-disc list-inside ml-4 mb-6">
                                <li>Operating and improving our website</li>
                                <li>
                                    Providing relevant content and personalized
                                    experiences
                                </li>
                                <li>
                                    Sending newsletters and marketing
                                    communications (if you consent)
                                </li>
                                <li>Measuring website performance and usage</li>
                                <li>Ensuring website security</li>
                            </ul>

                            <h3 className="text-xl mt-10 mb-4 text-white">
                                3. Third-Party Services
                            </h3>
                            <p className="mb-4">
                                We use a limited number of third-party services
                                to support our website and marketing efforts:
                            </p>
                            <ul className="list-disc list-inside ml-4 mb-6">
                                <li>
                                    Google Analytics - Anonymous website
                                    analytics
                                </li>
                                <li>
                                    Meta Pixel (Facebook) - Marketing & audience
                                    insights
                                </li>
                                <li>
                                    TikTok Pixel - Marketing & conversion
                                    tracking
                                </li>
                                <li>MailChimp - Email newsletter management</li>
                                <li>
                                    Vimeo - Hosting videos embedded on our site
                                </li>
                                <li>Cloudflare - CDN & website security</li>
                                <li>
                                    jsDelivr / cdnjs / Unpkg - Delivering
                                    frontend libraries efficiently
                                </li>
                            </ul>

                            <h3 className="text-xl mt-10 mb-4 text-white">
                                4. Newsletter Subscriptions
                            </h3>
                            <ul className="list-disc list-inside ml-4 mb-6">
                                <li>
                                    Your email address will be stored securely
                                    and used solely to send newsletters from
                                    WEFIK.
                                </li>
                                <li>
                                    We store a cookie to remember that you are
                                    subscribed and avoid showing you redundant
                                    popups.
                                </li>
                                <li>
                                    You can unsubscribe at any time using the
                                    link provided in every email.
                                </li>
                            </ul>

                            <h3 className="text-xl mt-10 mb-4 text-white">
                                5. Data Sharing and Transfer
                            </h3>
                            <ul className="list-disc list-inside ml-4 mb-6">
                                <li>
                                    We may share data with trusted service
                                    providers for hosting, analytics, marketing,
                                    and website maintenance.
                                </li>
                                <li>
                                    We may transfer data internationally when
                                    using global services (e.g., Google, Meta,
                                    MailChimp).
                                </li>
                                <li>
                                    All transfers are subject to data protection
                                    safeguards.
                                </li>
                            </ul>

                            <h3 className="text-xl mt-10 mb-4 text-white">
                                6. Your Rights
                            </h3>
                            <ul className="list-disc list-inside ml-4 mb-6">
                                <li>
                                    Right to information - Ask what data we hold
                                    about you.
                                </li>
                                <li>
                                    Right to rectification - Correct inaccurate
                                    data.
                                </li>
                                <li>
                                    Right to deletion - Request deletion of your
                                    data.
                                </li>
                                <li>
                                    Right to restriction of processing - Limit
                                    processing under certain circumstances.
                                </li>
                                <li>
                                    Right to data portability - Receive your
                                    data in a common format.
                                </li>
                                <li>
                                    Right to object - Object to processing for
                                    marketing purposes.
                                </li>
                            </ul>
                            <p className="mb-6">
                                To exercise your rights, contact us at{" "}
                                <a
                                    href="mailto:info@wefik.com"
                                    className="text-lime-400"
                                >
                                    info@wefik.com
                                </a>
                                .
                            </p>

                            <h3 className="text-xl mt-10 mb-4 text-white">
                                7. Data Security
                            </h3>
                            <p className="mb-6">
                                We implement technical and organizational
                                measures to protect your data against
                                unauthorized access, alteration, or loss. Data
                                transmitted to our servers is encrypted via
                                SSL/TLS.
                            </p>

                            <h3 className="text-xl mt-10 mb-4 text-white">
                                8. Log Files and Tracking Pixels
                            </h3>
                            <p className="mb-6">
                                We collect data through log files and tracking
                                pixels to monitor website functionality, measure
                                engagement, and optimize marketing campaigns.
                            </p>

                            <h3 className="text-xl mt-10 mb-4 text-white">
                                9. Changes to This Policy
                            </h3>
                            <p className="mb-6">
                                We may update this privacy policy from time to
                                time. Any changes will be posted on our website.
                            </p>
                            <h3 className="text-xl mt-10 mb-4 text-white">
                                Know more about our policies
                            </h3>
                            <div className="flex flex-col">
                                <a
                                    href="/legal/terms"
                                    className="hover:underline hover:text-lime-400 transition"
                                >
                                    Terms & Conditions
                                </a>
                                <a
                                    href="/legal/privacy-policy"
                                    className="hover:underline hover:text-lime-400 transition"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    href="/legal/cookiepolicy"
                                    className="hover:underline hover:text-lime-400 transition"
                                >
                                    Cookie Policy
                                </a>
                                <a
                                    href="/legal/refund-cancellation-policy"
                                    className="hover:underline hover:text-lime-400 transition"
                                >
                                    Refund & Cancellation Policy
                                </a>
                            </div>
                            <h3 className="text-xl mt-10 mb-4 text-white">
                                Contact Us
                            </h3>
                            <p>
                                WEFIK
                                <br />
                                Kestopur, Salt Lake,
                                <br /> Kolkata, West Bengal, India
                                <br />
                                Email:{" "}
                                <a
                                    href="mailto:info@wefik.com"
                                    className="text-lime-400"
                                >
                                    info@wefik.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
