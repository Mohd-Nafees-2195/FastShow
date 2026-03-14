const MenuItem = ({ label, icon, onClick, danger }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 flex items-center gap-2 text-sm
        ${danger ? "text-red-600 hover:bg-red-50"
                 : "text-gray-700 hover:bg-gray-100"}
        transition`}
    >
      {icon}
      {label}
    </button>
  );
};

export default MenuItem
