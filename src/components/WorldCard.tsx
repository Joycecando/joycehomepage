interface WorldCardProps {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

export function WorldCard({ icon, title, description, gradient }: WorldCardProps) {
  return (
    <div 
      className="w-[300px] h-[200px] rounded-2xl flex flex-col p-6 relative hover:scale-108 hover:z-10 hover:shadow-xl transition-all duration-300 ease-out glass-card"
      style={{ background: gradient }}
    >
      <div className="absolute top-4 left-4 w-10 h-10 rounded-lg flex items-center justify-center text-xl icon-badge">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mt-14">{title}</h3>
      <p className="text-white/90 mt-2 text-sm">{description}</p>
    </div>
  );
}
