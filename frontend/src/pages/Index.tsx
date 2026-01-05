import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, BookOpen, Users, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Course Management',
    description: 'Create, edit, and manage your courses with an intuitive interface',
  },
  {
    icon: Users,
    title: 'User Authentication',
    description: 'Secure JWT-based authentication with registration and login',
  },
  {
    icon: Award,
    title: 'Full CRUD Operations',
    description: 'Complete API integration for all course management needs',
  },
];

const techStack = [
  'React 18 with TypeScript',
  'Express.js Backend',
  'MongoDB Database',
  'JWT Authentication',
  'Zod Validation',
  'Tailwind CSS',
];

export default function Index() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        
        <div className="container relative z-10 py-20">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-foreground/80 text-sm">
              <GraduationCap className="h-4 w-4" />
              <span>Course Management System</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
              Manage Your
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Courses Easily
              </span>
            </h1>
            
            <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto">
              A modern MERN stack application for managing courses with user authentication,
              complete CRUD operations, and a beautiful interface.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {isAuthenticated ? (
                <Link to="/courses">
                  <Button variant="gradient" size="xl" className="w-full sm:w-auto">
                    Go to Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button variant="gradient" size="xl" className="w-full sm:w-auto">
                      Get Started Free
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      size="xl"
                      className="w-full sm:w-auto border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                    >
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with modern technologies and best practices for a seamless experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl bg-card border border-border/50 shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-14 w-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow duration-300">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-card-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                Modern Tech Stack
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                This application is designed to work with a Node.js/Express backend and MongoDB database.
                The frontend is fully ready to connect to your backend API.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {techStack.map((tech) => (
                  <div key={tech} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="text-foreground font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-slide-in-right">
              <div className="p-6 rounded-2xl bg-card border border-border shadow-large">
                <pre className="text-sm overflow-x-auto">
                  <code className="text-muted-foreground">
{`// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Endpoints
POST /api/auth/register
POST /api/auth/login
GET  /api/courses
POST /api/courses
GET  /api/course/:id
PUT  /api/course/:id
DELETE /api/course/:id`}
                  </code>
                </pre>
              </div>
              <div className="absolute -z-10 inset-0 blur-3xl bg-primary/10 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl gradient-hero relative overflow-hidden animate-fade-in">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent" />
            <div className="relative z-10">
              <h2 className="font-display text-4xl font-bold text-primary-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-primary-foreground/70 mb-8">
                Create your account and start managing your courses today.
              </p>
              {!isAuthenticated && (
                <Link to="/register">
                  <Button
                    size="xl"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    Create Free Account
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
