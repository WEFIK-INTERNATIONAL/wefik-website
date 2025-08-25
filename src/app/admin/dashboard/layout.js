export default function AdminLayout({ children }) {
	return (
		<div className="flex min-h-screen bg-gray-100">
			<aside className="w-64 bg-white shadow-lg transition-all duration-300">
				<nav className="space-y-2 mt-6"></nav>
			</aside>

			<main className="flex-1 p-6">
				<header className="flex justify-between items-center mb-6 bg-white p-4 rounded shadow"></header>
				{children}
			</main>
		</div>
	);
}
