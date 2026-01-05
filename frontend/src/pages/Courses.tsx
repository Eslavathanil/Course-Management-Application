import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Course, CoursePayload } from '@/types';
import { coursesApi } from '@/services/api';
import { CourseCard } from '@/components/courses/CourseCard';
import { CourseForm } from '@/components/courses/CourseForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Search, BookOpen, Loader2 } from 'lucide-react';

// Demo courses for when backend is not connected
const demoCourses: Course[] = [
  {
    _id: '1',
    name: 'Complete React Masterclass',
    description: 'Learn React from scratch including hooks, context, and advanced patterns',
    instructor: 'Sarah Johnson',
    duration: '24 hours',
    level: 'intermediate',
    category: 'Web Development',
    price: 79.99,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    name: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js, Express, and MongoDB',
    instructor: 'Mike Chen',
    duration: '18 hours',
    level: 'intermediate',
    category: 'Web Development',
    price: 69.99,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '3',
    name: 'Python for Data Science',
    description: 'Master Python for data analysis, visualization, and machine learning',
    instructor: 'Emily Zhang',
    duration: '32 hours',
    level: 'beginner',
    category: 'Data Science',
    price: 89.99,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '4',
    name: 'Advanced TypeScript Patterns',
    description: 'Deep dive into TypeScript generics, decorators, and design patterns',
    instructor: 'Alex Rivera',
    duration: '12 hours',
    level: 'advanced',
    category: 'Web Development',
    price: 59.99,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function Courses() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [courses, setCourses] = useState<Course[]>(demoCourses);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deletingCourseId, setDeletingCourseId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    const response = await coursesApi.getAll();
    if (response.success) {
      setCourses(response.data.courses);
      setBackendConnected(true);
    } else {
      // Use demo data if backend is not connected
      setBackendConnected(false);
      toast({
        title: 'Demo Mode',
        description: 'Backend not connected. Showing demo data.',
        variant: 'default',
      });
    }
    setIsLoading(false);
  };

  const handleCreateOrUpdate = async (data: CoursePayload) => {
    setIsSubmitting(true);
    
    if (!backendConnected) {
      // Demo mode: simulate CRUD
      if (editingCourse) {
        setCourses(prev =>
          prev.map(c =>
            c._id === editingCourse._id
              ? { ...c, ...data, updatedAt: new Date().toISOString() }
              : c
          )
        );
        toast({ title: 'Course updated (Demo)', description: data.name });
      } else {
        const newCourse: Course = {
          _id: String(Date.now()),
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setCourses(prev => [newCourse, ...prev]);
        toast({ title: 'Course created (Demo)', description: data.name });
      }
      setIsFormOpen(false);
      setEditingCourse(null);
      setIsSubmitting(false);
      return;
    }

    const response = editingCourse
      ? await coursesApi.update(editingCourse._id, data)
      : await coursesApi.create(data);

    if (response.success) {
      toast({
        title: editingCourse ? 'Course updated' : 'Course created',
        description: response.data.course.name,
      });
      fetchCourses();
      setIsFormOpen(false);
      setEditingCourse(null);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: response.message,
      });
    }
    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (!deletingCourseId) return;

    if (!backendConnected) {
      // Demo mode
      setCourses(prev => prev.filter(c => c._id !== deletingCourseId));
      toast({ title: 'Course deleted (Demo)' });
      setDeletingCourseId(null);
      return;
    }

    const response = await coursesApi.delete(deletingCourseId);
    if (response.success) {
      toast({ title: 'Course deleted' });
      fetchCourses();
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: response.message,
      });
    }
    setDeletingCourseId(null);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-muted-foreground mt-1">
            Manage your courses {!backendConnected && '(Demo Mode)'}
          </p>
        </div>
        <Button
          variant="gradient"
          onClick={() => {
            setEditingCourse(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Courses Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onEdit={(c) => {
                setEditingCourse(c);
                setIsFormOpen(true);
              }}
              onDelete={setDeletingCourseId}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            No courses found
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery
              ? 'Try adjusting your search query'
              : 'Get started by creating your first course'}
          </p>
          {!searchQuery && (
            <Button variant="gradient" onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4" />
              Add Your First Course
            </Button>
          )}
        </div>
      )}

      {/* Course Form Dialog */}
      <CourseForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCourse(null);
        }}
        onSubmit={handleCreateOrUpdate}
        course={editingCourse}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deletingCourseId}
        onOpenChange={() => setDeletingCourseId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Course?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the course.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
