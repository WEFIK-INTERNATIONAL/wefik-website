import React from "react";
import HeadingText from "@/components/ui/HeadingText";

function page() {
    return (
        <section className="pt-44">
            <div className="">
                <div className="px-5">
                    <HeadingText>Refund & Cancellation Policy</HeadingText>
                </div>
                <div className="mt-24 px-5 text-lg text-white/60 lg:flex lg:justify-between pb-10">
                    <div className="hidden lg:flex text-white">
                        <p>Refund & Cancellation Policy</p>
                    </div>
                    <div className="lg:max-w-6xl lg:px-20">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl font-medium text-white">
                                Refund & Cancellation Policy
                            </h2>
                            <p>Last updated on 1 September 2025</p>
                            <p className="mb-8">
                                Thank you for choosing our Web Development /
                                SAAS / Software Development services. We strive
                                to provide the best user experience and customer
                                satisfaction. However, we understand that there
                                may be situations where you need to cancel a
                                purchase or request a refund. This Refund and
                                Cancellation Policy outlines the guidelines and
                                procedures for such cases.
                            </p>
                        </div>

                        {/* Cancellation Policy */}
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                1. Cancellation Policy
                            </h2>

                            <h3 className="text-lg font-medium text-white mb-2">
                                1.1. Subscription-Based Products/Services
                            </h3>
                            <p className="mb-4">
                                For subscription-based products or services, you
                                can cancel your subscription at any time. Upon
                                cancellation, you will continue to have access
                                to the product or service until the end of the
                                current billing cycle. No further charges will
                                be incurred. To cancel your subscription, please
                                follow the instructions provided in your account
                                settings or contact our customer support team.
                            </p>

                            <h3 className="text-lg font-medium text-white mb-2">
                                1.2. Perpetual License Products
                            </h3>
                            <p>
                                Perpetual license products are one-time
                                purchases without an expiration date.
                                Cancellation does not apply to perpetual license
                                products as they are not tied to a subscription
                                model. However, you may be eligible for a refund
                                as described in Section 2.
                            </p>
                        </div>

                        {/* Refund Policy */}
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                2. Refund Policy
                            </h2>

                            <h3 className="text-lg font-medium text-white mb-2">
                                2.1. Eligibility for Refund
                            </h3>
                            <p className="mb-4">
                                You may be eligible for a refund in the
                                following cases:
                            </p>
                            <ul className="list-disc list-inside space-y-2 mb-4">
                                <li>
                                    <span className="font-medium">
                                        Technical Issues:
                                    </span>{" "}
                                    If you encounter significant technical
                                    issues or compatibility problems with our
                                    software/web development service that
                                    prevent its proper functioning and our
                                    support team is unable to resolve the
                                    problem within a reasonable time frame.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Dissatisfaction:
                                    </span>{" "}
                                    If you are dissatisfied with our
                                    software/web development service’s features
                                    or performance and have communicated your
                                    concerns to our support team, providing
                                    constructive feedback.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Unauthorized Charges:
                                    </span>{" "}
                                    If you notice unauthorized charges on your
                                    credit/debit card resulting from a purchase
                                    made on our website.
                                </li>
                            </ul>

                            <h3 className="text-lg font-medium text-white mb-2">
                                2.2. Refund Process
                            </h3>
                            <ol className="list-decimal list-inside space-y-3 mb-4">
                                <li>
                                    <span className="font-medium">
                                        Contact Customer Support:
                                    </span>{" "}
                                    Submit a refund request to our support team
                                    with your order details, date of purchase,
                                    and reason for refund.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Evaluation:
                                    </span>{" "}
                                    Our team will evaluate your request based on
                                    the eligibility criteria.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Refund Decision:
                                    </span>{" "}
                                    If approved, we will initiate the refund
                                    within 7 business days to your original
                                    payment method. Processing time may vary
                                    depending on your financial institution.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Software Deactivation:
                                    </span>{" "}
                                    If it's a SAAS product, you must uninstall
                                    and deactivate the software after refund
                                    approval. Further use may result in legal
                                    consequences.
                                </li>
                            </ol>

                            <h3 className="text-lg font-medium text-white mb-2">
                                2.3. Non-Refundable Situations
                            </h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    <span className="font-medium">
                                        Change of Mind:
                                    </span>{" "}
                                    Refunds are not available if the software or
                                    services are functioning as intended.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Third-Party Products/Services:
                                    </span>{" "}
                                    Refunds are not available for third-party
                                    products/services even if purchased through
                                    our platform.
                                </li>
                            </ul>
                        </div>

                        {/* Policy Updates */}
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                3. Policy Updates
                            </h2>
                            <p>
                                This Refund and Cancellation Policy may be
                                updated occasionally without prior notice. The
                                most recent version will always be posted on our
                                website and will become effective upon posting.
                                This policy applies only to purchases made
                                directly from{" "}
                                <span className="font-medium">
                                    WEFIK INTERNATIONAL LTD
                                </span>
                                . If you purchased our software through a
                                third-party retailer or distributor, please
                                refer to their respective refund and
                                cancellation policies.
                            </p>
                        </div>

                        {/* Contact Section */}
                        <div>
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                4. Contact Us
                            </h2>
                            <p className="mb-2">
                                For any questions or concerns regarding this
                                policy, please contact our support team:
                            </p>
                            <p className="mb-1">
                                <span className="font-medium">Phone:</span> +91
                                9609653522
                            </p>
                            <p className="mb-1">
                                <span className="font-medium">Email:</span>{" "}
                                <a
                                    href="mailto:info@wefik.in"
                                    className="text-white underline font-medium"
                                >
                                    info@wefik.in
                                </a>
                            </p>
                            <p className="mb-1">
                                <span className="font-medium">Address:</span>{" "}
                                WEFIK INTERNATIONAL LTD, Kestopur Salt Lake,
                                Kolkata, West Bengal, India
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default page;
