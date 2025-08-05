import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { 
  ArrowLeft,
  Phone,
  ShoppingCart,
  CreditCard,
  Package,
  StickyNote,
  Camera,
  ClipboardList,
  LogOut,
  User,
  MapPin,
  Calendar,
  IndianRupee
} from "lucide-react";

const OutletDetail = () => {
  const { outletId } = useParams();
  const navigate = useNavigate();
  const [checkedOut, setCheckedOut] = useState(false);

  // Mock outlet data
  const outlet = {
    id: outletId,
    name: "Sharma General Store",
    code: "SGS001",
    location: "Karol Bagh, Delhi",
    distributor: "Delhi FMCG Distributors",
    type: "General Store",
    contact: "Rajesh Sharma",
    phone: "+91 98765 43210"
  };

  const actionButtons = [
    { 
      label: "New Order", 
      icon: ShoppingCart, 
      color: "bg-primary hover:bg-primary-hover", 
      action: () => navigate("/order-entry")
    },
    { 
      label: "Capture Payment", 
      icon: CreditCard, 
      color: "bg-success hover:bg-success/90", 
      action: () => navigate("/payment")
    },
    { 
      label: "Stock Check", 
      icon: Package, 
      color: "bg-info hover:bg-info/90", 
      action: () => navigate("/stock-check")
    },
    { 
      label: "Add Note", 
      icon: StickyNote, 
      color: "bg-warning hover:bg-warning/90", 
      action: () => navigate("/add-note")
    },
    { 
      label: "Take Photo", 
      icon: Camera, 
      color: "bg-accent hover:bg-accent/90 text-accent-foreground", 
      action: () => {}
    },
    { 
      label: "Survey", 
      icon: ClipboardList, 
      color: "bg-purple-500 hover:bg-purple-600", 
      action: () => navigate("/survey")
    },
  ];

  const recentOrders = [
    { date: "5 Aug 2024", amount: "₹5,000", items: "15 items" },
    { date: "1 Aug 2024", amount: "₹3,200", items: "12 items" },
    { date: "28 Jul 2024", amount: "₹4,800", items: "18 items" },
  ];

  const handleCheckOut = () => {
    setCheckedOut(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        title="Outlet Details" 
        showSync={true}
      />

      {/* Back Button */}
      <div className="max-w-md mx-auto p-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 p-0 h-auto text-primary hover:text-primary-hover"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Beat Plan
        </Button>

        {/* Outlet Info Card */}
        <Card className="p-4 mb-4 bg-gradient-card shadow-card">
          <div className="flex items-start gap-3">
            <div className="bg-primary/20 p-3 rounded-full">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-text-high">{outlet.name}</h2>
              <p className="text-text-medium text-sm">Code: {outlet.code}</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-text-medium" />
                <p className="text-text-medium text-xs">{outlet.location}</p>
              </div>
              <p className="text-text-low text-xs mt-1">
                Distributor: {outlet.distributor}
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div>
              <p className="text-text-high font-medium text-sm">{outlet.contact}</p>
              <p className="text-text-medium text-xs">{outlet.phone}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="border-primary text-primary hover:bg-primary-light"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
          </div>
        </Card>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {actionButtons.map((action, index) => (
            <Button
              key={index}
              onClick={action.action}
              className={`h-20 flex flex-col items-center justify-center gap-2 text-white ${action.color}`}
            >
              <action.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="p-4 mb-4 bg-gradient-card shadow-card">
          <h3 className="font-semibold text-text-high mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Recent Orders
          </h3>
          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                <div>
                  <p className="text-text-high font-medium text-sm">{order.date}</p>
                  <p className="text-text-medium text-xs">{order.items}</p>
                </div>
                <div className="text-right">
                  <p className="text-text-high font-semibold flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    {order.amount.replace('₹', '')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Last Visit Note */}
        <Card className="p-4 mb-4 bg-info-light border-l-4 border-l-info">
          <h4 className="font-medium text-text-high text-sm mb-2">Last Visit Note</h4>
          <p className="text-text-medium text-xs">
            "Store is well-stocked. Owner requested more variety in snacks section. 
            Competitor XYZ has new display - need to discuss counter strategy."
          </p>
          <p className="text-text-low text-xs mt-2">- 5 Aug 2024, 2:30 PM</p>
        </Card>

        {/* Check-out Button */}
        {!checkedOut ? (
          <Button 
            onClick={handleCheckOut}
            className="w-full h-12 bg-success hover:bg-success/90 text-success-foreground font-semibold"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Complete Visit & Check Out
          </Button>
        ) : (
          <Card className="p-4 bg-success-light border-l-4 border-l-success text-center">
            <div className="flex items-center justify-center gap-2 text-success">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Visit Completed!</span>
            </div>
            <p className="text-text-medium text-sm mt-1">
              Checked out at {new Date().toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </Card>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default OutletDetail;