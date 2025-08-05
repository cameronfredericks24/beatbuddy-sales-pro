import { Home, MapPin, ShoppingCart, CheckSquare, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "visits", label: "Visits", icon: MapPin, path: "/visits" },
    { id: "orders", label: "Orders", icon: ShoppingCart, path: "/orders" },
    { id: "activities", label: "Activities", icon: CheckSquare, path: "/activities" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-floating z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center p-2 min-w-[64px] rounded-lg transition-all duration-200 ${
                active 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-text-medium hover:text-primary hover:bg-primary-light"
              }`}
            >
              <IconComponent className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;