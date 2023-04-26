import { EditClassForm } from "../../forms/EditClassForm";
import { useStore } from "../../../states/store";
import { EditStudentForm } from "../../forms/EditStudentForm";
import { EditCourseForm } from "../../forms/EditCourseForm";
import { ClassData, CourseData, StudentData } from "../../../types/types";
import { SideDialog } from "../../SideDialog";
import { CreateCourseForm } from "../../forms/CreateCourseForm";
import { CreateStudentForm } from "../../forms/CreateStudentForm";
import { CreateClassForm } from "../../forms/CreateClassForm";

export function SlideOver() {
  const [{ isCreating, open, category, data }, closeSlideOver] = useStore((state) => [
    state.slideOverOpen,
    state.closeSlideOver,
  ]);

  const handleClose = () => {
    closeSlideOver();
  };

  return (
    <SideDialog open={open} handleClose={handleClose} title={category!}>
      <div className="">
      {category === "Alunos" && (
          isCreating ? (
            <CreateStudentForm />
            ) : (
            <EditStudentForm data={data as StudentData} />
          )
        )}
        {category === "Cursos" && (
          isCreating ? (
            <CreateCourseForm />
            ) : (
            <EditCourseForm data={data as CourseData} />
          )
        )}
        {category === "Turmas" && (
          isCreating ? (
            <CreateClassForm />
            ) : (
            <EditClassForm data={data as ClassData} />
          )
        )}
      </div>
    </SideDialog>
  );
}
