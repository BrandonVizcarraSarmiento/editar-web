import NavbarDashboard from "./components/navbarDashboard";

export default function LayaoutDashboard({ children }: { children: React.ReactNode; }) {
    return (
        <div className="flex flex-col min-h-screen lg:flex-row">
            <NavbarDashboard />
            <main className="flex-1 p-6 border-t lg:border-t-0 lg:border-l">
                {children}
            </main>
        </div>
    );
}