import { datePickerOptions } from "./datePickerOptions";
import { useEffect, useState } from "react";
import DatePicker from "tailwind-datepicker-react";
import { DragDropInputPhoto } from "./DragDropInputPhoto";
import { InputText } from "./InputText";
import { api } from "../../axios";
import { useStore } from "../../states/store";
import { FormBottom } from "./FormBottom";
import { fileToBase64 } from "../functions/fileToBase64";
import { refreshPage } from "../functions/refreshPage";

export function CreateStudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    birthDate: new Date("2006-01-01"),
    classId: "",
  });

  const [courseName, setCourseName] = useState("");

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
  }, []);

  const handleChange = (target: { name: any; value: any }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (target: { name: any; files: any }) => {
    fileToBase64(target.files[0], (base64Image) => {
      handleChange({ name: "photo", value: base64Image?.toString()! });
    });
  };

  const handleCourseChange = async (id: string, name: string) => {
    const response = await api.get(`course/${id}/class`);
    setClasses(response.data);
    setCourseName(name);
    handleClassChange("");
  };

  const handleClassChange = (id: string) => {
    setFormData({ ...formData, classId: id });
  };

  const closeSlideOver = useStore((state) => state.closeSlideOver);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleDateChange = (selectedDate: Date) => {
    handleChange({ name: "birthDate", value: selectedDate });
  };

  const handleCloseDatePicker = (state: boolean) => {
    setShowDatePicker(state);
  };

  const handleSubmit = async (event: { preventDefault(): void }) => {
    event.preventDefault();

    if (!formData.classId || !formData.photo || !formData.name || !formData.birthDate) {
      alert("Preencha todos os campos!");
      return;
    }
    const response = await api.post("student", formData);
    response.status === 201 && alert("Aluno criado com sucesso!");
    closeSlideOver();
    refreshPage();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7">Criar Aluno</h2>

          <div className="col-span-full my-4">
            <fieldset>
              <legend className="text-sm font-semibold leading-6">Cursos</legend>
              <p className="mt-1 text-sm leading-6 text-gray-300">
                Selecione um dos Cursos disponiveis.
              </p>
              <div className="mt-2 space-y-2">
                {courses.map(({ name, id }) => (
                  <div key={name} className="flex items-center gap-x-3">
                    <input
                      id="info"
                      name="course"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      onChange={() => handleCourseChange(id, name)}
                      checked={courseName === name}
                    />
                    <label
                      htmlFor="info"
                      className="block text-sm font-medium leading-6"
                    >
                      {name}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="col-span-full my-4">
            <fieldset>
              <legend className="text-sm font-semibold leading-6">Turmas</legend>
              <p className="mt-1 text-sm leading-6 text-gray-300">
                Selecione uma das Turmas disponiveis.
              </p>
              <div className="mt-2 space-y-2">
                {classes.map(({ name, id }) => (
                  <div key={name} className="flex items-center gap-x-3">
                    <input
                      id="info"
                      name="classId"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      onChange={() => handleClassChange(id)}
                      checked={formData.classId === id}
                    />
                    <label
                      htmlFor="info"
                      className="block text-sm font-medium leading-6"
                    >
                      {name}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
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
                  setShow={handleCloseDatePicker}
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
