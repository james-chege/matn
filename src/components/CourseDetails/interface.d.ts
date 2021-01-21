interface CourseDetailsProps {
  submit: (data) => void;
  course: { id: string; name: string; description: string; instructor: string };
  isLoading: boolean;
}
