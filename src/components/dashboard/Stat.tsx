interface Props {
    title: string;
    value: number;
    darkMode: boolean;
  }
  
  const Stat = ({ title, value, darkMode }: Props) => {
    return (
      <div
        className={`rounded-xl p-4 ${
          darkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <div className="text-sm text-gray-400">{title}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    );
  };
  
  export default Stat;