export default function AuthLayout({ children }) {
    return (
        <section className="relative min-h-screen flex items-center justify-center font-neue text-white overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
            <div className="absolute top-0 left-1/2 w-[500px] h-[500px] -translate-x-1/2 bg-pink-500/20 rounded-full filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-lime-400/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

            <div className="relative w-full max-w-md">{children}</div>
        </section>
    );
}
