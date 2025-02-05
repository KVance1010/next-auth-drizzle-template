export const InputError = ({ message }: { message: string }) => {
  return (
    <p className="text-red-500 text-sm mt-1">
      {message}
    </p>
  );
};
