import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
  register: UseFormRegisterReturn;
}

export const FormInput = ({
  label,
  name,
  type = "text",
  placeholder = "",
  autoComplete,
  required = false,
  error,
  register
}:  FormInputProps) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-white">
          {label}
        </label>
      )}
      <input
        {...register}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="mt-1 p-2 w-full border text-black border-gray-300 rounded-md"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
