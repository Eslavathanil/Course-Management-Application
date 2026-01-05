import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Course, CoursePayload } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Save, X } from 'lucide-react';

const courseSchema = z.object({
  name: z.string().trim().min(3, 'Course name must be at least 3 characters').max(100, 'Course name is too long'),
  description: z.string().trim().min(10, 'Description must be at least 10 characters').max(1000, 'Description is too long'),
  instructor: z.string().trim().min(2, 'Instructor name is required').max(100, 'Instructor name is too long'),
  duration: z.string().trim().min(1, 'Duration is required').max(50, 'Duration is too long'),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  category: z.string().trim().min(2, 'Category is required').max(50, 'Category is too long'),
  price: z.coerce.number().min(0, 'Price must be positive').max(10000, 'Price is too high'),
});

type CourseFormData = z.infer<typeof courseSchema>;

interface CourseFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CoursePayload) => Promise<void>;
  course?: Course | null;
  isSubmitting: boolean;
}

const categories = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'DevOps',
  'Design',
  'Business',
  'Marketing',
];

export function CourseForm({ open, onClose, onSubmit, course, isSubmitting }: CourseFormProps) {
  const isEditing = !!course;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: course
      ? {
          name: course.name,
          description: course.description,
          instructor: course.instructor,
          duration: course.duration,
          level: course.level,
          category: course.category,
          price: course.price,
        }
      : {
          name: '',
          description: '',
          instructor: '',
          duration: '',
          level: 'beginner',
          category: '',
          price: 0,
        },
  });

  const handleFormSubmit = async (data: CourseFormData) => {
    await onSubmit({
      name: data.name,
      description: data.description,
      instructor: data.instructor,
      duration: data.duration,
      level: data.level,
      category: data.category,
      price: data.price,
    });
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {isEditing ? 'Edit Course' : 'Create New Course'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Course Name</Label>
            <Input
              id="name"
              placeholder="e.g., Complete React Masterclass"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What will students learn in this course?"
              rows={3}
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Input
                id="instructor"
                placeholder="John Smith"
                {...register('instructor')}
              />
              {errors.instructor && (
                <p className="text-sm text-destructive">{errors.instructor.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 12 hours"
                {...register('duration')}
              />
              {errors.duration && (
                <p className="text-sm text-destructive">{errors.duration.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Level</Label>
              <Select
                value={watch('level')}
                onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') =>
                  setValue('level', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              {errors.level && (
                <p className="text-sm text-destructive">{errors.level.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={watch('category') || ''}
                onValueChange={(value) => setValue('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive">{errors.category.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="49.99"
              {...register('price')}
            />
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isEditing ? 'Update Course' : 'Create Course'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
