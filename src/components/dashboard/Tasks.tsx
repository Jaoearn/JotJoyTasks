interface Props {
    title: string;
    reward: string;
    darkMode: boolean;
  }
  
  const Tasks = ({ title, reward, darkMode }: Props) => {
    return (
      <div
        className={`rounded-xl p-4 flex justify-between ${
          darkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-gray-400">Complete this task</div>
        </div>
  
        <div className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-lg">
          {reward}
        </div>
      </div>
    );
  };
  
  export default Tasks;