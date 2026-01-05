import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-6 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026 CourseHub. Built with React + Express + MongoDB</p>
        </div>
      </footer>
    </div>
  );
}
