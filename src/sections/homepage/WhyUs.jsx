import Tag from "@/components/ui/Tag";
import avatar1 from "@/assets/images/whyus/avatar-ashwin-santiago.jpg";
import avatar2 from "@/assets/images/whyus/avatar-lula-meyers.jpg";
import avatar3 from "@/assets/images/whyus/avatar-florence-shaw.jpg";
import avatar4 from "@/assets/images/whyus/avatar-owen-garcia.jpg";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

const whyChooseUs = [
    "Future-Ready",
    "Reliable Delivery",
    "Ongoing Support",
    "Modern Design",
    "Data-Driven",
    "Versatile Skills",
    "Trusted Partnership",
];

function FeatureCard(props) {
    const { title, description, children, className } = props;
    return (
        <div
            className={twMerge(
                "bg-neutral-900 border border-white/10 p-6 rounded-3xl",
                className
            )}
        >
            <div className="aspect-video">{children}</div>
            <div>
                <h3 className="text-3xl font-medium mt-6">{title}</h3>
                <p className="text-white/50 mt-2">{description}</p>
            </div>
        </div>
    );
}

function Key(props) {
    const { className, children, ...otherProps } = props;
    return (
        <div
            className={twMerge(
                "size-14 bg-neutral-300 inline-flex items-center justify-center rounded-2xl text-xl text-neutral-950 font-medium",
                className
            )}
            {...otherProps}
        >
            {children}
        </div>
    );
}

function Avatar(props) {
    const { className, children, ...otherProps } = props;
    return (
        <div
            className={twMerge(
                "size-20 rounded-full overflow-hidden border-4 border-blue-500 p-1 bg-neutral-900",
                className
            )}
            {...otherProps}
        >
            {children}
        </div>
    );
}

function Chooseus() {
    return (
        <section className="py-24">
            <div className="container">
                <div className="flex justify-center">
                    <Tag>Why Choose Us</Tag>
                </div>
                <h2 className="text-6xl font-medium text-center mt-6 max-w-3xl mx-auto">
                    Creative. Strategic. Always{" "}
                    <span className="text-lime-400">Unique.</span>
                </h2>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        title="Global Talent Network"
                        description="Work with skilled developers, designers, and creatives from
                around the world"
                        className="md:col-span-2 lg:col-span-1 group"
                    >
                        <div className="aspect-video flex items-center justify-center">
                            <Avatar className="z-40">
                                <Image
                                    src={avatar1}
                                    alt="Avatar 1"
                                    className="rounded-full"
                                />
                            </Avatar>
                            <Avatar className="-ml-6 border-indigo-500 z-30">
                                <Image
                                    src={avatar2}
                                    alt="Avatar 2"
                                    className="rounded-full"
                                />
                            </Avatar>
                            <Avatar className="-ml-6 border-amber-500 z-20">
                                <Image
                                    src={avatar3}
                                    alt="Avatar 3"
                                    className="rounded-full"
                                />
                            </Avatar>
                            <Avatar className="-ml-6 border-transparent group-hover:border-green-500 transition">
                                <div className="relative size-full bg-neutral-700 rounded-full inline-flex items-center justify-center gap-1">
                                    <Image
                                        src={avatar4}
                                        alt="Avatar 4"
                                        className="transition absolute size-full rounded-full opacity-0 group-hover:opacity-100"
                                    />
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <span
                                            key={i}
                                            className="size-1.5 rounded-full bg-white inline-flex"
                                        ></span>
                                    ))}
                                </div>
                            </Avatar>
                        </div>
                    </FeatureCard>
                    <FeatureCard
                        title="Cutting-Edge Tech"
                        description="We harness the latest technologies to deliver modern,
                future-proof solutions"
                        className="md:col-span-2 lg:col-span-1 group"
                    >
                        <div className="aspect-video flex items-center justify-center">
                            <p className="text-4xl font-extrabold text-white/20 text-center group-hover:text-white/10 transition duration-500">
                                We&apos;ve achived
                                <br />
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent relative">
                                    <span>incredible</span>
                                    <video
                                        src={"/assets/gif-incredible.mp4"}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute bottom-full left-1/2 -translate-x-1/2 rounded-2xl shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition duration-500"
                                    />
                                </span>
                                <br />
                                growth this year
                            </p>
                        </div>
                    </FeatureCard>
                    <FeatureCard
                        title="Tailored Solutions"
                        description="We understand every brand is unique and craft digital
                 experiences that reflect your identity"
                        className="md:col-span-2 md:col-start-2 lg:col-span-1 lg:col-start-auto group"
                    >
                        <div className="aspect-video flex items-center justify-center gap-4">
                            <Key className="w-28 outline-transparent group-hover:outline-lime-400 outline-2 outline-offset-4 transition-all duration-500 group-hover:translate-y-1">
                                ctrl
                            </Key>
                            <Key className="outline-transparent group-hover:outline-lime-400 outline-2 outline-offset-4 transition-all duration-500 group-hover:translate-y-1 delay-150">
                                S
                            </Key>
                        </div>
                    </FeatureCard>
                </div>
                <div className="mt-8 flex flex-wrap gap-3 justify-center max-w-5xl mx-auto">
                    {whyChooseUs.map((item) => (
                        <div
                            key={item}
                            className="bg-neutral-900 border border-white/10 inline-flex px-3 py-1.5 rounded-2xl gap-3 items-center md:px-5 md:py-2 hover:scale-105 transition duration-500 group"
                        >
                            <span className="bg-lime-400 text-neutral-950 rounded-full size-5 inline-flex items-center justify-center text-xl group-hover:rotate-45 transition duration-500">
                                &#10038;
                            </span>
                            <span className="font-medium md:text-lg">
                                {item}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Chooseus;
