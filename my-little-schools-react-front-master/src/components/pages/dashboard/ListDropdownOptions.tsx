import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { EditActiveIcon, EditInactiveIcon } from "../../icons/EditIcons";
import { DeleteActiveIcon } from "../../icons/DeleteActiveIcon";
import { DeleteInactiveIcon } from "../../icons/DeleteInactiveIcon";
import { useStore } from "../../../states/store";
import { Category } from "../../../types/types";
import { api } from "../../../axios";
import { refreshPage } from "../../functions/refreshPage";

type ListDropdownOptionsProps = {
  category: Category;
  data: any;
};

export function ListDropdownOptions({ category, data }: ListDropdownOptionsProps) {
  const handleSlideOverOpen = () => {
    useStore.setState({
      slideOverOpen: {
        category,
        data,
        open: true,
        isCreating: false,
      },
    });
  };

  const openModal = useStore((state) => state.openModal);

  async function handleDeleteCourse(id: string) {
    const response = await api.delete(`course/${id}`);
    response.status === 200 && alert("Curso deletado com sucesso!");
    refreshPage();
  }

  async function handleDeleteClass(id: string) {
    const response = await api.delete(`class/${id}`);
    response.status === 200 && alert("Turma deletada com sucesso!");
    refreshPage();
  }

  async function handleDeleteStudent(id: string) {
    const response = await api.delete(`student/${id}`);
    response.status === 200 && alert("Aluno deletado com sucesso!");
    refreshPage();
  }

  let handleDeleteFunctions = {
    "Cursos": handleDeleteCourse,
    "Turmas": handleDeleteClass,
    "Alunos": handleDeleteStudent,
  }

  const handleModalOpen = () => {
    openModal(data.id, category, handleDeleteFunctions[category]);
  };

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Options
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-900 shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none">
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-200"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => handleSlideOverOpen()}
                  >
                    {active ? (
                      <EditActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EditInactiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    )}
                    Edit
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-200"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => handleModalOpen()}
                  >
                    {active ? (
                      <DeleteActiveIcon
                        className="mr-2 h-5 w-5 text-indigo-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <DeleteInactiveIcon
                        className="mr-2 h-5 w-5 text-indigo-400"
                        aria-hidden="true"
                      />
                    )}
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
