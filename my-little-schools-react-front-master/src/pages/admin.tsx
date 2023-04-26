import { useState } from "react";
import { Tab } from "@headlessui/react";
import { StudentsList } from "../components/pages/dashboard/StudentsList";
import { Modal } from "../components/Modal";
import { SlideOver } from "../components/pages/dashboard/SlideOver";
import { useEffect } from "react";
import { api } from "../axios";
import { useStore } from "../states/store";
import { Data } from "../data";
import { Category } from "../types/types";
import { CoursesList } from "../components/pages/dashboard/CoursesList";
import { ClassesList } from "../components/pages/dashboard/ClassesList";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function AdminPage() {
  let categories: Category[] = ["Cursos", "Turmas", "Alunos"];
  const [selectedCategory, setSelectedCategory] = useState<Category>("Cursos");

  useEffect(() => {
    const pingBackend = async () => {
      await api.get("health");
    };
    pingBackend().catch((_) => alert("Erro ao tentar se comunicar com o Backend"));
    const fetchAllData = async () => {
      const data = (await api.get("")).data as Data;
      useStore.setState({ data });
    };
    fetchAllData();
  }, []);

  const handleSlideOverOpen = (category: Category, data: any) => {
    useStore.setState({
      slideOverOpen: {
        category,
        data,
        open: true,
        isCreating: true,
      },
    });
  };

  return (
    <div className="w-full px-2 py-4 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-indigo-900/20 p-1">
          {categories.map((category) => (
            <Tab
              key={category}
              name={category}
              onClick={() => setSelectedCategory(category)}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-indigo-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-violet-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white",
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((_, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2",
              )}
            >
              <button
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => handleSlideOverOpen(selectedCategory, null)}
              >
                Criar +
              </button>
              {selectedCategory === "Cursos" && <CoursesList />}
              {selectedCategory === "Turmas" && <ClassesList />}
              {selectedCategory === "Alunos" && <StudentsList />}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <SlideOver />
      <Modal />
    </div>
  );
}
