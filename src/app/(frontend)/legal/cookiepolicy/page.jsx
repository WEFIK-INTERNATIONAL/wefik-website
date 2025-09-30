import React from "react";
import HeadingText from "@/components/ui/HeadingText";

function page() {
    return (
        <section className="pt-44">
            <div>
                <div className="px-5">
                    <HeadingText>Cookie Policy</HeadingText>
                </div>
                <div className="mt-24 px-5 text-lg text-white/60 lg:flex lg:justify-between pb-10">
                    <div className="hidden lg:flex text-white">
                        <p>Cookie Policy</p>
                    </div>
                    <div className="lg:max-w-6xl lg:px-20">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl font-medium text-white">
                                Cookie Policy
                            </h2>
                            <p>Last updated on 1 September 2025</p>
                            <p className="mb-8">
                                As is common practice with almost all
                                professional websites, this site uses cookies,
                                which are tiny files downloaded to your
                                computer, to improve your experience. This page
                                describes what information they gather, how we
                                use it, and why we sometimes need to store these
                                cookies. We will also share how you can prevent
                                these cookies from being stored, however this
                                may downgrade or “break” certain elements of the
                                site's functionality.
                            </p>
                        </div>
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                1. How We Use Cookies
                            </h2>
                            <p>
                                We use cookies for a variety of reasons detailed
                                below. Unfortunately, in most cases there are no
                                industry standard options for disabling cookies
                                without completely disabling the functionality
                                and features they add to this site. It is
                                recommended that you leave on all cookies if you
                                are not sure whether you need them or not, in
                                case they are used to provide a service that you
                                use.
                            </p>
                        </div>
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                2. Disabling Cookies
                            </h2>
                            <p>
                                You can prevent the setting of cookies by
                                adjusting the settings on your browser (see your
                                browser Help for how to do this). Be aware that
                                disabling cookies will affect the functionality
                                of this and many other websites that you visit.
                                Disabling cookies will usually also disable
                                certain functionality and features of this site.
                                Therefore, it is recommended that you do not
                                disable cookies.
                            </p>
                        </div>
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                3. The Cookies We Set
                            </h2>
                            <ul className="list-disc list-inside space-y-4">
                                <li>
                                    <span className="font-medium">
                                        Email newsletters related cookies:
                                    </span>{" "}
                                    This site offers newsletter or email
                                    subscription services, and cookies may be
                                    used to remember if you are already
                                    registered and whether to show certain
                                    notifications which might only be valid to
                                    subscribed/unsubscribed users.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Forms related cookies:
                                    </span>{" "}
                                    When you submit data through a form (such as
                                    contact or comment forms), cookies may be
                                    set to remember your user details for future
                                    correspondence.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Site preferences cookies:
                                    </span>{" "}
                                    To provide you with a great experience, this
                                    site allows you to set your preferences for
                                    how it runs. Cookies are required to
                                    remember your preferences each time you
                                    interact with the site.
                                </li>
                            </ul>
                        </div>
                        <div className="mb-12">
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                4. Third-Party Cookies
                            </h2>
                            <p className="mb-4">
                                In some cases, we also use cookies provided by
                                trusted third parties. The following section
                                details which third-party cookies you might
                                encounter through this site:
                            </p>
                            <ul className="list-disc list-inside space-y-4">
                                <li>
                                    <span className="font-medium">
                                        Google Analytics:
                                    </span>{" "}
                                    Used to help us understand how you use the
                                    site and ways that we can improve your
                                    experience. These cookies may track things
                                    such as how long you spend on the site and
                                    the pages you visit.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Third-party analytics:
                                    </span>{" "}
                                    Used to measure usage of this site so we can
                                    continue producing engaging content.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Testing new features:
                                    </span>{" "}
                                    When testing new features, cookies may be
                                    used to ensure you receive a consistent
                                    experience.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Advertising cookies:
                                    </span>{" "}
                                    We use cookies to measure advertising
                                    effectiveness and ensure relevant ads are
                                    shown to users.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Google AdSense:
                                    </span>{" "}
                                    Uses a DoubleClick cookie to serve more
                                    relevant ads across the web and limit repeat
                                    views of the same ad.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Affiliate tracking cookies:
                                    </span>{" "}
                                    Allow us to see if customers arrive through
                                    one of our partners so we can credit them
                                    appropriately.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Social media cookies:
                                    </span>{" "}
                                    Plugins from social networks may set cookies
                                    to enhance your profile or contribute to
                                    data collection, according to their
                                    respective privacy policies.
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
                                5. More Information
                            </h2>
                            <p>
                                Hopefully that has clarified things for you. As
                                was previously mentioned, if there is something
                                that you are not sure whether you need or not,
                                it's usually safer to leave cookies enabled, in
                                case it interacts with one of the features you
                                use on our site.
                            </p>
                            <p className="mt-4">
                                For more general information on cookies, please
                                read the official Cookies Policy article.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default page;
