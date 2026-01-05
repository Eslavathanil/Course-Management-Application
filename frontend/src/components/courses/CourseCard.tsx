import { Course } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Edit, Trash2, BookOpen } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

const levelColors = {
  beginner: 'bg-success/10 text-success border-success/20',
  intermediate: 'bg-primary/10 text-primary border-primary/20',
  advanced: 'bg-accent/10 text-accent border-accent/20',
};

export function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
  return (
    <Card className="group overflow-hidden border-0 shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-1 animate-fade-in">
      <div className="h-40 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
        <div className="absolute bottom-4 left-4">
          <Badge variant="outline" className={`${levelColors[course.level]} border capitalize`}>
            {course.level}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8"
            onClick={() => onEdit(course)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            className="h-8 w-8"
            onClick={() => onDelete(course._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <BookOpen className="absolute bottom-4 right-4 h-24 w-24 text-primary-foreground/10" />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-card-foreground line-clamp-2">
            {course.name}
          </h3>
        </div>
        <Badge variant="outline" className="w-fit text-xs">
          {course.category}
        </Badge>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            {course.instructor}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
        </div>
        <span className="font-display text-lg font-bold text-gradient">
          ${course.price}
        </span>
      </CardFooter>
    </Card>
  );
}
