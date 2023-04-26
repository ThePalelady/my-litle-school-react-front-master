
export type CourseData = {
  id: string;
  name: string;
  educationLevel: string;
};

export type ClassData = {
  id: string;
  name: string;
  course: string;
};

export type StudentData = {
  id: string;
  name: string;
  photo: string;
  birthDate: Date;
  className: string;
  courseName: string;
  classId: number;
  qrCode: string;
};

export type SlideOverOpenState = {
  open: boolean;
  category?: Category;
  isCreating: boolean;
  data?: CourseData | ClassData | StudentData;
};

export type Category = "Cursos" | "Turmas" | "Alunos";
