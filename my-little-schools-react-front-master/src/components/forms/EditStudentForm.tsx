import { datePickerOptions } from "./datePickerOptions";
import { useEffect, useState } from "react";
import DatePicker from "tailwind-datepicker-react";
import { DragDropInputPhoto } from "./DragDropInputPhoto";
import { InputText } from "./InputText";
import { api } from "../../axios";
import { useStore } from "../../states/store";
import { FormBottom } from "./FormBottom";
import { StudentData } from "../../types/types";
import { fileToBase64 } from "../functions/fileToBase64";
import { ChooseClassInput } from "./ChooseClassInput";
import { ChooseCourseInput } from "./ChooseCourseInput";
import { refreshPage } from "../functions/refreshPage";

type StudentFormProps = {
  data: StudentData;
};

export function EditStudentForm({ data }: StudentFormProps) {
  const [formData, setFormData] = useState({
    name: data.name,
    photo: data.photo,
    birthDate: data.birthDate,
    classId: data.classId,
  });

  const [courseName, setCourseName] = useState(data.courseName);

  // TODO: ao invés de fazer o fetch toda vez em varios components
  // fazer o fetch em um componente e colocar no estado global
  const [courses, setCourses] = useState<{ id: string; name: string }[]>([]);
  const [classes, setClasses] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await api.get("course");
      setCourses(response.data);
    };
    fetchCourses();

    const fetchClasses = async () => {
      const response = await api.get(`course/name/${data.courseName}/class`);
      setClasses(response.data);
    };
    fetchClasses();
  }, []);

  const handleChange = (target: { name: any; value: any }) => {
    const { name, value } = target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (target: { name: any; files: any }) => {
    fileToBase64(target.files[0], (base64Image) => {
      handleChange({ name: "photo", value: base64Image?.toString()! });
    });
  };

  const handleCourseChange = (id: string, name: string) => {
    const fetchClasses = async () => {
      const response = await api.get(`course/${id}/class`);
      setClasses(response.data);
      setCourseName(name);
      handleClassChange("");
    };
    fetchClasses();
  };

  const handleClassChange = (id: string) => {
    setFormData({ ...formData, classId: Number(id) });
  };

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const closeSlideOver = useStore((state) => state.closeSlideOver);

  const handleDateChange = (selectedDate: Date) => {
    handleChange({ name: "birthDate", value: selectedDate });
  };

  const handleCloseShowDatePicker = (state: boolean) => {
    setShowDatePicker(state);
  };

  const handleSubmit = async (event: { preventDefault(): void }) => {
    event.preventDefault();

    console.log(formData);

    if (!formData.classId || !formData.photo || !formData.name || !formData.birthDate) {
      alert("Preencha todos os campos!");
      return;
    }

    const response = await api.put(`student/${data?.id}`, {
      ...formData,
    });
    response.status === 200 && alert("Aluno atualizado com sucesso!");

    closeSlideOver();
    refreshPage();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7">Aluno</h2>

          <div className="col-span-full my-4">
            <ChooseCourseInput
              courses={courses}
              handleChange={handleCourseChange}
              actualCourse={courseName}
            />
          </div>
          <div className="col-span-full my-4">
            <ChooseClassInput
              classes={classes}
              handleChange={handleClassChange}
              actualClassId={formData.classId}
            />
          </div>

          <div className="border-t pt-4 mt-6 border-gray-900/10">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <InputText name="name" value={formData.name} handleChange={handleChange}>
                Nome
              </InputText>

              <DragDropInputPhoto handleFileChange={handleFileChange} />
              <div className="w-full col-span-full">
                <DatePicker
                  options={{ ...datePickerOptions }}
                  onChange={handleDateChange}
                  show={showDatePicker}
                  setShow={handleCloseShowDatePicker}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormBottom />
    </form>
  );
}
