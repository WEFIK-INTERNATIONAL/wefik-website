"use client";
import Image from "next/image";
import smileEmoji from "@/assets/images/memoji-smile.png";
import smileEmoji2 from "@/assets/images/memoji2.png";
import React from "react";
import CardBackGround from "@/components/ui/CardBackGround";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const linkTo = [
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="currentColor"
            >
                <g
                    id="Gruppe_1784"
                    data-name="Gruppe 1784"
                    transform="translate(-579.337 -593)"
                >
                    <rect
                        id="Rechteck_1239"
                        data-name="Rechteck 1239"
                        width="26"
                        height="26"
                        transform="translate(579.337 593)"
                        fill="none"
                    ></rect>
                    <g
                        id="Gruppe_1780"
                        data-name="Gruppe 1780"
                        transform="translate(582 596.032)"
                    >
                        <path
                            id="Pfad_524"
                            data-name="Pfad 524"
                            d="M75.828,226.582a17.568,17.568,0,0,1-2.026-3.542,8.758,8.758,0,0,1-.741-3.373,5.41,5.41,0,0,1,.375-2.008,4.843,4.843,0,0,1,1.189-1.727,3.035,3.035,0,0,1,2.136-.958,2.014,2.014,0,0,1,.877.193,1.712,1.712,0,0,1,.689.6l2.393,3.349a3.7,3.7,0,0,1,.414.729,1.7,1.7,0,0,1,.133.637,1.442,1.442,0,0,1-.209.741,4.107,4.107,0,0,1-.584.741l-.783.793a.541.541,0,0,0-.175.408.706.706,0,0,0,.042.251,1.512,1.512,0,0,0,.088.205,8.129,8.129,0,0,0,.956,1.331q.69.816,1.518,1.634t1.628,1.506a8.071,8.071,0,0,0,1.337.968c.056.024.122.05.2.076a.72.72,0,0,0,.245.042.547.547,0,0,0,.42-.175l.8-.771a3.432,3.432,0,0,1,.729-.59,1.46,1.46,0,0,1,.731-.2,1.761,1.761,0,0,1,.635.127,3.3,3.3,0,0,1,.729.42l3.4,2.4a1.6,1.6,0,0,1,.584.677,2,2,0,0,1,.175.817,2.647,2.647,0,0,1-.263,1.134,4.48,4.48,0,0,1-.693,1.05,4.706,4.706,0,0,1-1.693,1.225,5.242,5.242,0,0,1-2.02.386,8.7,8.7,0,0,1-3.373-.753,18.017,18.017,0,0,1-3.572-2.05,26.881,26.881,0,0,1-3.385-2.917A27.531,27.531,0,0,1,75.828,226.582Z"
                            transform="translate(-73.061 -214.973)"
                            fill="currentColor"
                        ></path>
                    </g>
                </g>
            </svg>
        ),
        name: "Call",
        link: "tel:+919609653522",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="currentColor"
            >
                <g
                    id="Gruppe_1783"
                    data-name="Gruppe 1783"
                    transform="translate(-820.5 -593)"
                >
                    <rect
                        id="Rechteck_1238"
                        data-name="Rechteck 1238"
                        width="26"
                        height="26"
                        transform="translate(820.5 593)"
                        fill="none"
                    ></rect>
                    <g
                        id="Gruppe_1781"
                        data-name="Gruppe 1781"
                        transform="translate(821 596.395)"
                    >
                        <path
                            id="Pfad_525"
                            data-name="Pfad 525"
                            d="M89.143,230.856V218.667a3.746,3.746,0,0,1,.279-1.691l7.879,7.786-7.867,7.786A3.568,3.568,0,0,1,89.143,230.856Zm10.937-5.58L90.414,215.7a2.824,2.824,0,0,1,1.984-.548h17.79a3.35,3.35,0,0,1,2.265.584l-9.618,9.537a2.035,2.035,0,0,1-1.379.7A2,2,0,0,1,100.08,225.275Zm-9.63,8.545,8-7.937.711.7a3,3,0,0,0,4.6,0l.7-.7,8.031,7.949a2.912,2.912,0,0,1-2.006.548H92.691A3.479,3.479,0,0,1,90.45,233.82Zm15.163-9.059,7.857-7.752a3.774,3.774,0,0,1,.267,1.658v12.188a3.838,3.838,0,0,1-.267,1.679Z"
                            transform="translate(-89.143 -215.155)"
                            fill="currentColor"
                        ></path>
                    </g>
                </g>
            </svg>
        ),
        name: "Email",
        link: "mailto:info@wefik.in",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="currentColor"
            >
                <g
                    id="Gruppe_1782"
                    data-name="Gruppe 1782"
                    transform="translate(-1062 -593)"
                >
                    <rect
                        id="Rechteck_1237"
                        data-name="Rechteck 1237"
                        width="26"
                        height="26"
                        transform="translate(1062 593)"
                        fill="none"
                    ></rect>
                    <g
                        id="Gruppe_1779"
                        data-name="Gruppe 1779"
                        transform="translate(1064 595.5)"
                    >
                        <path
                            id="Pfad_526"
                            data-name="Pfad 526"
                            d="M112.649,225.791a1.416,1.416,0,0,1-.53-.59,1.437,1.437,0,0,1-.135-.753,1.591,1.591,0,0,1,.275-.753,1.542,1.542,0,0,1,.717-.554l17.651-8.182a2.33,2.33,0,0,1,1.173-.247,1.458,1.458,0,0,1,.893.375,1.373,1.373,0,0,1,.42.847,2.2,2.2,0,0,1-.233,1.185l-8.136,17.555a1.931,1.931,0,0,1-.6.783,1.589,1.589,0,0,1-.777.309,1.43,1.43,0,0,1-.769-.13,1.334,1.334,0,0,1-.584-.53,1.679,1.679,0,0,1-.223-.9l-.022-7.951a.2.2,0,0,0-.048-.157.234.234,0,0,0-.151-.04l-8.009-.036A1.657,1.657,0,0,1,112.649,225.791Z"
                            transform="translate(-111.978 -214.706)"
                            fill="currentColor"
                        ></path>
                    </g>
                </g>
            </svg>
        ),
        name: "Route",
        link: "",
    },
];

function page() {
    return (
        <section className="bg-gradient-to-b from-gray-900 to-transparent overflow-x-hidden">
            <div className="flex lg:flex-row flex-col-reverse lg:items-stretch gap-10">
                <div className="flex flex-col max-w-lg mx-auto lg:max-w-2xl lg:mx-0 mt-10 lg:mt-20 p-2 lg:p-10">
                    <h2 className="text-[4rem] font-medium">Contact</h2>
                    <div className="flex flex-col gap-6 mt-10 flex-1">
                        <a href="mailto:info@wefik.in">
                            <CardBackGround className="h-full p-6">
                                <div className="flex items-center gap-6">
                                    <div className="bg-lime-400 p-1 w-20 h-20 rounded-full aspect-square">
                                        <Image src={smileEmoji} alt="avatar" />
                                    </div>
                                    <p className="text-white/50 md:text-xl text-wrap">
                                        Let&apos;s talk about your next project
                                        or idea. Reach us at{" "}
                                        <span className="decoration-lime-400 underline">
                                            info@wefik.in
                                        </span>
                                    </p>
                                </div>
                            </CardBackGround>
                        </a>

                        <a href="mailto:career@wefik.in">
                            <CardBackGround className="h-full p-6">
                                <div className="flex gap-6 items-center">
                                    <div className="bg-lime-400 p-1 w-20 h-20 rounded-full aspect-square">
                                        <Image src={smileEmoji2} alt="avatar" />
                                    </div>
                                    <p className="text-white/50 md:text-xl text-wrap">
                                        Want to join the Team, Reach us at{" "}
                                        <span className="decoration-lime-400 underline">
                                            career@wefik.in
                                        </span>
                                    </p>
                                </div>
                            </CardBackGround>
                        </a>

                        <div className="flex gap-3 justify-center">
                            {linkTo.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    target={
                                        item.name !== "Route"
                                            ? "_blank"
                                            : "_self"
                                    }
                                    rel="noreferrer"
                                    className="flex flex-col items-center gap-3 text-white/50 hover:text-white transition"
                                >
                                    <div className="bg-white/10 w-26 md:w-[10rem] h-16 flex items-center justify-center rounded-lg">
                                        {item.icon}
                                    </div>
                                    <p className="text-sm font-medium">
                                        {item.name}
                                    </p>
                                </a>
                            ))}
                        </div>

                        <CardBackGround className="p-6">
                            <div className="flex flex-col gap-2">
                                <p className="text-white/50 text-lg">Phone</p>
                                <p className="text-xl font-medium">
                                    +91 9609653522
                                </p>
                            </div>
                        </CardBackGround>

                        <CardBackGround className="p-6">
                            <div>
                                <p className="text-white/50 text-lg">Email</p>
                                <p className="text-xl font-medium">
                                    info@wefik.in
                                </p>
                            </div>
                        </CardBackGround>

                        <CardBackGround className="p-6">
                            <div>
                                <p className="text-white/50 text-lg">Address</p>
                                <p className="font-medium text-xl">Wefik</p>
                                <p className="text-xl font-medium">
                                    Kestopur Salt Lake
                                    <br />
                                    Kolkata West Bengal
                                    <br />
                                    India
                                </p>
                            </div>
                        </CardBackGround>
                    </div>
                </div>

                {/* Right Side - Animation */}
                <div className="relative lg:flex-1 h-[50vh] flex items-center justify-center overflow-hidden bg-amber-700 lg:h-auto ">
                    <div className="w-2/3 h-2/3 object-cover">
                        <DotLottieReact
                            src="/assets/Messages.lottie"
                            loop
                            autoplay
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default page;
