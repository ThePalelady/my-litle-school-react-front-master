type InputText = {
  name: string;
  children?: React.ReactNode;
  handleChange: (target: { name: any; value: any }) => void;
  value: string;
};

export function InputText({ name, value, handleChange, children }: InputText) {
  return (
    <div className="col-span-full w-full">
      <label htmlFor={name} className="block text-sm font-medium leading-6">
        {children}
      </label>
      <div className="mt-2">
        <input
          type="text"
          name={name}
          id={name}
          autoComplete="given-name"
          className="block w-full px-2 rounded-md border-0 py-1.5 bg-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(e) => handleChange(e.target)}
          value={value}
        />
      </div>
    </div>
  );
}
