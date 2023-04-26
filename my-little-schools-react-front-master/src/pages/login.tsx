import * as Tabs from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../axios";
import { getCookie } from "../components/functions/getCookie";

export const LoginPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = getCookie("token");
    if (adminToken) {
      navigate("/admin", { replace: true });
    }
  }, [])

  const [tab, setTab] = useState("tab1");

  const [adminFormData, setAdminFormData] = useState({
    email: "admin@admin.com",
    password: "password",
  });

  const [studentFormData, setStudentFormData] = useState({
    name: "",
  });

  async function handleSubmit(event: { preventDefault: () => void; target: any }) {
    event.preventDefault();
    if (tab === "tab1") {
      if (adminFormData.email.length < 8 || adminFormData.password.length < 8) {
        alert("Email e Password devem ter mais que 7 caracteres");
        return;
      }
      document.cookie = `token=${adminFormData.email}`;
      navigate("/admin", { replace: true });
      return;
    }

    if (!studentFormData.name) {
      alert("Credenciais inválidas");
      return;
    }

    document.cookie = `student-token=${studentFormData.name}`;

    console.log(studentFormData.name);

    const response = await api.get(`/student/name/${studentFormData.name}`);
    if (response.status === 200) {
      navigate(`/student-card/${studentFormData.name}`, { replace: true });
      return
    }

    alert("Aluno não encontrado");
  }

  return (
    <div className="flex h-[90vh] min-w-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
      <Tabs.Root
        className="flex flex-col w-[300px] shadow-[0_2px_10px] shadow-blackA4"
        defaultValue="tab1"
        onValueChange={(value) => setTab(value)}
      >
        <Tabs.List
          className="shrink-0 flex border-b border-mauve6"
          aria-label="Manage your account"
        >
          <Tabs.Trigger
            className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
            value="tab1"
          >
            Admin
          </Tabs.Trigger>
          <Tabs.Trigger
            className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
            value="tab2"
          >
            Aluno
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          value="tab1"
        >
          <form onSubmit={handleSubmit}>
            <p className="mb-5 text-mauve11 text-[15px] leading-normal">
              Logar como Administrador.
            </p>
            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
              <label className="text-[13px] leading-none mb-2.5 text-violet12 block" htmlFor="name">
                Email
              </label>
              <input
                className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="name"
                defaultValue="admin@admin.com"
                onChange={(e) => setAdminFormData({ ...adminFormData, email: e.target.value })}
              />
            </fieldset>
            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
              <label
                className="text-[13px] leading-none mb-2.5 text-violet12 block"
                htmlFor="username"
              >
                Password
              </label>
              <input
                className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="username"
                type="password"
                defaultValue="password"
                onChange={(e) => setAdminFormData({ ...adminFormData, password: e.target.value })}
              />
            </fieldset>
            <div className="flex justify-end mt-5">
              <button className="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default">
                Entrar
              </button>
            </div>
          </form>
        </Tabs.Content>
        <Tabs.Content
          className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          value="tab2"
        >
          <form onSubmit={handleSubmit}>
            <p className="mb-5 text-mauve11 text-[15px] leading-normal">Logar como Aluno.</p>
            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
              <label
                className="text-[13px] leading-none mb-2.5 text-violet12 block"
                htmlFor="name"
              >
                Nome
              </label>
              <input
                className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="name"
                type="text"
                onChange={(e) => setStudentFormData({ ...studentFormData, name: e.target.value })}
              />
            </fieldset>
            <div className="flex justify-end mt-5">
              <button className="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default">
                Entrar
              </button>
            </div>
          </form>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
