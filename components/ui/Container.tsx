interface ContainerProps {
  title: string;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ title, children }) => {
  return (
    <div className="border rounded-lg p-4 my-4 bg-zinc-50">
      <h2 className="text-2xl font-bold my-2">{title}</h2>
      {children}
    </div>
  );
}

export default Container;
