import Tag from "@/components/ui/Tag";
import figmaLogo from "@/assets/images/intrigrations/figma-logo.svg";
import notionLogo from "@/assets/images/intrigrations/notion-logo.svg";
import photoshopLogo from "@/assets/images/intrigrations/photoshop.svg";
import wordpressLogo from "@/assets/images/intrigrations/wordpress.svg";
import shopifyLogo from "@/assets/images/intrigrations/shopify.svg";
import githubLogo from "@/assets/images/intrigrations/github-logo.svg";
import IntegrationColumn from "@/components/ui/homePage/IntegrationColumn";

const integrations = [
    {
        name: "Figma",
        icon: figmaLogo,
        description: "Figma is a collaborative interface design tool.",
    },
    {
        name: "Notion",
        icon: notionLogo,
        description: "Notion is an all-in-one workspace for notes and docs.",
    },
    {
        name: "Photoshop",
        icon: photoshopLogo,
        description:
            "Photoshop is a leading software for graphic design, and digital art.",
    },
    {
        name: "Wordpress",
        icon: wordpressLogo,
        description:
            "WordPress is a content management system for building websites and blogs.",
    },
    {
        name: "Shopify",
        icon: shopifyLogo,
        description:
            "Shopify is an eCommerce platform for creating and managing online stores.",
    },
    {
        name: "GitHub",
        icon: githubLogo,
        description: "GitHub is the leading platform for code collaboration.",
    },
];

export default function Integrations() {
    return (
        <section className="py-24 overflow-hidden">
            <div className="container">
                <div className="grid lg:grid-cols-2 lg:gap-16 items-center">
                    <div>
                        <div>
                            <Tag>Tools We Use</Tag>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-medium mt-6">
                            Plays well with{" "}
                            <span className="text-lime-400">others</span>
                        </h2>
                        <p className="text-white/50 mt-4 text-lg">
                            We integrate with a variety of tools to enhance your
                            workflow and productivity. Here are some of the key
                            integrations we support
                        </p>
                    </div>
                    <div>
                        <div className="h-[400px] lg:h-[800px] mt-16 lg:mt-0 overflow-hidden grid md:grid-cols-2 gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                            <IntegrationColumn integrations={integrations} />
                            <IntegrationColumn
                                integrations={integrations.slice().reverse()}
                                className="hidden md:flex"
                                reverse
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
