import DOMPurify from "isomorphic-dompurify";

export default function JobDescription({ description }) {
    return (
        <div
            className="
                max-w-xl text-gray-200 leading-relaxed
                [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4
                [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3
                [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2
                [&_p]:mb-3
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                [&_li]:mb-2
                [&_strong]:font-semibold
                [&_a]:text-[#9AE300] [&_a]:underline hover:[&_a]:text-white
            "
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(description),
            }}
        />
    );
}
