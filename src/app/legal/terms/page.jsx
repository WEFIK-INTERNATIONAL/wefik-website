import React from "react";
import HeadingText from "@/components/ui/HeadingText";

function page() {
    return (
        <section className="pt-44">
            <div className="">
                <div className="px-5">
                    <HeadingText>Terms & Conditions</HeadingText>
                </div>
                <div className="mt-24 px-5 text-lg text-white/60 lg:flex lg:justify-between pb-10">
                    <div className="hidden lg:flex text-white">
                        <p>Terms & Conditions</p>
                    </div>
                    <div className="lg:max-w-6xl lg:px-20">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl font-medium text-white">
                                Terms & Conditions
                            </h2>
                            <p>Last updated on 1 September 2025</p>
                            <p className="mb-8">
                                By accessing this website, operated by{" "}
                                <span className="font-medium">
                                    WEFIK INTERNATIONAL LTD
                                </span>
                                , you are agreeing to be bound by these Website
                                Terms and Conditions of Use and agree that you
                                are responsible for compliance with any
                                applicable local laws. If you disagree with any
                                of these terms, you are prohibited from
                                accessing this site. The materials contained in
                                this Website are protected by copyright and
                                trademark law.
                            </p>
                        </div>
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                1. Use License
                            </h2>
                            <p className="mb-4">
                                Permission is granted to temporarily download
                                one copy of the materials on WEFIK INTERNATIONAL
                                LTD's Website for personal, non-commercial
                                transitory viewing only. This is the grant of a
                                license, not a transfer of title, and under this
                                license you may not:
                            </p>
                            <ul className="list-disc list-inside space-y-2 mb-4">
                                <li>Modify or copy the materials.</li>
                                <li>
                                    Use the materials for any commercial purpose
                                    or for any public display.
                                </li>
                                <li>
                                    Attempt to reverse engineer any software
                                    contained on WEFIK INTERNATIONAL LTD's
                                    Website.
                                </li>
                                <li>
                                    Remove any copyright or other proprietary
                                    notations from the materials.
                                </li>
                                <li>
                                    Transfer the materials to another person or
                                    "mirror" the materials on any other server.
                                </li>
                            </ul>
                            <p>
                                This license shall automatically terminate if
                                you violate any of these restrictions and may be
                                terminated by WEFIK INTERNATIONAL LTD at any
                                time. Upon termination, your viewing right will
                                also be terminated and you must destroy any
                                downloaded materials in your possession whether
                                in electronic or printed format.
                            </p>
                        </div>
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                2. Disclaimer
                            </h2>
                            <p>
                                All the materials on WEFIK INTERNATIONAL LTD's
                                Website are provided "as is". WEFIK
                                INTERNATIONAL LTD makes no warranties, may it be
                                expressed or implied, and hereby negates all
                                other warranties. Furthermore, WEFIK
                                INTERNATIONAL LTD does not make any
                                representations concerning the accuracy or
                                reliability of the use of the materials on its
                                Website or otherwise relating to such materials
                                or any sites linked to this Website.
                            </p>
                        </div>
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                3. Limitations
                            </h2>
                            <p>
                                WEFIK INTERNATIONAL LTD or its suppliers will
                                not be held accountable for any damages that
                                will arise with the use or inability to use the
                                materials on WEFIK INTERNATIONAL LTD's Website,
                                even if WEFIK INTERNATIONAL LTD or an authorized
                                representative has been notified of the
                                possibility of such damage. Some jurisdictions
                                do not allow limitations on implied warranties
                                or limitations of liability for incidental
                                damages, so these limitations may not apply to
                                you.
                            </p>
                        </div>
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                4. Revisions and Errata
                            </h2>
                            <p>
                                The materials appearing on WEFIK INTERNATIONAL
                                LTD's Website may include technical,
                                typographical, or photographic errors. WEFIK
                                INTERNATIONAL LTD does not warrant that any of
                                the materials on its Website are accurate,
                                complete, or current. WEFIK INTERNATIONAL LTD
                                may make changes to the materials contained on
                                its Website at any time without notice but does
                                not make any commitment to update them.
                            </p>
                        </div>
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                5. Links
                            </h2>
                            <p>
                                WEFIK INTERNATIONAL LTD has not reviewed all of
                                the sites linked to its Website and is not
                                responsible for the contents of any such linked
                                site. The inclusion of any link does not imply
                                endorsement by WEFIK INTERNATIONAL LTD of the
                                site. Use of any linked website is at the user's
                                own risk.
                            </p>
                        </div>
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                6. Site Terms of Use Modifications
                            </h2>
                            <p>
                                WEFIK INTERNATIONAL LTD may revise these Terms
                                of Use for its Website at any time without prior
                                notice. By using this Website, you are agreeing
                                to be bound by the then-current version of these
                                Terms and Conditions of Use.
                            </p>
                        </div>
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                7. Your Privacy
                            </h2>
                            <p>
                                Please read our{" "}
                                <a
                                    href="/legal/privacy-policy"
                                    className="text-white underline font-medium"
                                >
                                    Privacy Policy
                                </a>
                                .
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                8. Governing Law
                            </h2>
                            <p>
                                Any claim related to WEFIK INTERNATIONAL LTD's
                                Website shall be governed by the laws of India,
                                without regard to its conflict of law
                                provisions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default page;
