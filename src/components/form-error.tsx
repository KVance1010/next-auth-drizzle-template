interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="bg-red-600 p-3 rounded-md flex items-center gap-x-2 mt-4 text-destructive">
      <p>{message}</p>
    </div>
  );
};
