export const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex flex-1 flex-col justify-center items-center">
      {children}
    </div>
  );
};
