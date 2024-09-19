import NavbarDashboard from "./components/navbarDashboard";

export default function LayaoutDashboard({ children }: { children: React.ReactNode; }) {
    return (
        <div className="flex min-h-screen">
            <NavbarDashboard />
            <main className="flex-1 p-6 border-l">
                {children}
            </main>
        </div>
    );
}