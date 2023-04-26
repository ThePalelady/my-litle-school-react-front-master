import { useEffect, useState } from "react";
import { useStore } from "../../states/store";
import { api } from "../../axios";
import { FormBottom } from "./FormBottom";
import { InputText } from "./InputText";
import { refreshPage } from "../functions/refreshPage";

export function CreateCourseForm() {

  const [formData, setFormData] = useState({
    educationLevel: '',
    name: '',
  })

  const [educationLevels, setEducationLevels] = useState<{ id: string; name: string; }[]>([]);

  const closeSlideOver = useStore((state) => state.closeSlideOver);

  useEffect(() => {
    const fetchEducationLevels = async () => {
      const response = await api.get("education-levels");
      setEducationLevels(response.data);
      setFormData({ ...formData, educationLevel: response.data[0].name })
    };
    fetchEducationLevels();
  }, []);

  const handleSubmit = async (event: { preventDefault(): void; }) => {
    event.preventDefault();

    if (formData.educationLevel.length < 6 || formData.name.length < 6) {
      alert("Todos os campos devem possuir mais de 5 Caracteres");
      return;
    }

    const { status } = await api.post("course", formData);
    status === 201 ? alert("Curso criado com sucesso") : alert("Erro ao criar curso");

    closeSlideOver()
    refreshPage();
  }

  const handleChange = (target: { name: any; value: any; }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <form onSubmit={handleSubmit}>
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7">Criar um novo Curso</h2>

      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <InputText name="name" value={formData.name} handleChange={handleChange}>
          Nome
        </InputText>
        <div className="sm:col-span-3">
          <label htmlFor="country" className="block text-sm font-medium leading-6">
            Nivel de Ensino
          </label>
          <div className="mt-2">
            <select
              id="education"
              name="educationLevel"
              autoComplete="education-name"
              className="block w-full rounded-md px-2 border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 bg-gray-900"
              onChange={(e) => handleChange(e.target)}
            >
              {educationLevels.map((el) => (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
    <FormBottom />
  </form>
  )
}
