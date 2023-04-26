import { create } from "zustand";
import { Data } from "../data";
import { ModalOpenState } from "../components/Modal";
import { Category, ClassData, CourseData, SlideOverOpenState, StudentData } from "../types/types";

type State = {
  data: Data;
  selectedCategory: "Cursos" | "Turmas" | "Alunos";

  slideOverOpen: SlideOverOpenState;
  modalOpen: ModalOpenState;
};

type Action = {
  updateSlideOverOpen: (open: SlideOverOpenState) => void;
  closeSlideOver: () => void;
  studentsListData: (data: Data) => StudentData[];
  coursesListData: (data: Data) => CourseData[];
  classesListData: (data: Data) => ClassListData[];
  openModal: (id: string, category: Category, handleDeleteFunction: (id: string) => void) => void;
};

type ClassListData = ClassData & { studentsPhotos: string[] };

// Create your store, which includes both state and (optionally) actions
export const useStore = create<State & Action>((set) => ({
  data: [],
  selectedCategory: "Cursos",
  slideOverOpen: {
    open: false,
    isCreating: true,
  },
  modalOpen: {
    open: false,
    id: "",
  },
  updateSlideOverOpen: (state: SlideOverOpenState) => set(() => ({ slideOverOpen: state })),
  closeSlideOverOpen: () => set(() => ({ slideOverOpen: { open: false, isCreating: false } })),
  openModal: (id, category, fn) => set(() => ({ modalOpen: { open: true, id, category, handleDeleteFunction: fn } })),
  closeSlideOver: () =>
    set(() => ({
      slideOverOpen: {
        open: false,
        isCreating: false,
      },
    })),
  setData: (data: Data) => set(() => ({ data })),
  studentsListData: (data: Data) => {
    let students: StudentData[] = [];
    data.forEach((course) => {
      course.classes.forEach((courseClass) => {
        courseClass.students.forEach((student) => {
          students.push({
            id: String(student.id),
            name: student.name,
            photo: student.photo,
            birthDate: new Date(student.birthDate),
            className: courseClass.name,
            qrCode: student.qrCode,
            courseName: course.name,
            classId: courseClass.id,
          });
        });
      });
    });
    return students;
  },
  coursesListData: (data: Data) => {
    let courses: CourseData[] = [];
    data.forEach((course) => {
      courses.push({
        id: String(course.id),
        name: course.name,
        educationLevel: course.educationLevel.name,
      });
    });
    return courses;
  },
  classesListData: (data: Data) => {
    let classes: ClassListData[] = [];
    data.forEach((course) => {
      course.classes.forEach((class_) => {
        classes.push({
          id: String(class_.id),
          name: class_.name,
          course: course.name,
          studentsPhotos: class_.students.map((s) => s.photo),
        });
      });
    });
    return classes;
  }
}));
