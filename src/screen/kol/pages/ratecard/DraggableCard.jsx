export default function DraggableCard({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-purple-50 border border-purple-300 p-4 rounded cursor-pointer hover:bg-purple-100"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="cursor-move">☰</span>
          <span className="font-medium">{title}</span>
        </div>
        <span>➔</span>
      </div>
    </div>
  );
}
