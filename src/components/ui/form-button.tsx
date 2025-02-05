export const FormButton = ({
  children,
  disabled
}: {
  children: string;
  disabled: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="bg-white my-4 w-full hover:bg-blue-400 text-black p-2 
 text-center rounded-lg"
    >
      {children}
    </button>
  );
};
