import HeadingText from "@/components/ui/HeadingText";

export default function ImprintPage() {
    return (
        <section className="pt-44">
            <div className="">
                <div className="px-5">
                    <HeadingText>Imprint</HeadingText>
                </div>
                <div className="mt-24 px-5 text-lg text-white/60 lg:flex lg:justify-between pb-10">
                    <div className="hidden lg:flex text-white">
                        <p>Imprint</p>
                    </div>

                    <div className="lg:max-w-6xl lg:px-20">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl font-medium text-white">
                                Legal Notice
                            </h2>
                            <p>Last updated on 1 September 2025</p>
                        </div>
                        <div>
                            <h3 className="text-xl mt-10 mb-4 text-white">
                                Contact Address
                            </h3>
                            <p className="mb-6">
                                WEFIK <br />
                                Kestopur, Salt Lake, <br />
                                Kolkata, West Bengal, India <br />
                                <a
                                    href="mailto:info@wefik.com"
                                    className="text-lime-400"
                                >
                                    info@wefik.com
                                </a>
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl mt-10 mb-4 text-white">
                                Authorized Representatives
                            </h3>
                            <ul className="list-disc list-inside ml-4 mb-6">
                                <li>
                                    Sk. Sahinur Islam, from West Bengal, India,
                                    partner and Chief Executive Officer
                                    <br />
                                    Sandip Samanta, from West Bengal, India,
                                    partner and managing director
                                    <br />
                                    Supratik Sahis, from West Bengal, India,
                                    partner and managing director
                                </li>
                                {/* Add more representatives if needed */}
                            </ul>
                        </div>

                        {/* Commercial Register */}
                        <div>
                            <h3 className="text-xl mt-10 mb-4 text-white">
                                Commercial Register Entry
                            </h3>
                            <p className="mb-6">
                                Registered company name: WEFIK Pvt. Ltd. <br />
                                Number: (to be added if applicable) <br />
                            </p>
                        </div>

                        {/* Disclaimer */}
                        <div>
                            <h3 className="text-xl mt-10 mb-4 text-white">
                                Disclaimer
                            </h3>
                            <p className="mb-4">
                                The author assumes no responsibility for the
                                correctness, accuracy, timeliness, reliability
                                and completeness of the information.
                            </p>
                            <p className="mb-4">
                                Liability claims against the author for material
                                or immaterial damage resulting from access to,
                                use or non-use of the published information,
                                misuse of the connection or technical faults are
                                excluded.
                            </p>
                            <p className="mb-6">
                                All offers are non-binding. The author expressly
                                reserves the right to change, supplement or
                                delete parts of the pages or the entire offer
                                without prior notice or to cease publication
                                temporarily or permanently.
                            </p>
                        </div>

                        {/* Liability for Links */}
                        <div>
                            <h3 className="text-xl mt-10 mb-4 text-white">
                                Liability for Links
                            </h3>
                            <p className="mb-6">
                                References and links to third-party websites are
                                outside our area of responsibility. Any
                                responsibility for such websites is rejected.
                                Access and use of such websites is at the user's
                                own risk.
                            </p>
                        </div>

                        {/* Copyrights */}
                        <div>
                            <h3 className="text-xl mt-10 mb-4 text-white">
                                Copyrights
                            </h3>
                            <p>
                                The copyright and all other rights to content,
                                images, photos or other files on the website
                                belong exclusively to WEFIK Pvt. Ltd. or the
                                specifically named rights holders. The written
                                consent of the copyright holder must be obtained
                                in advance for the reproduction of any elements.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
