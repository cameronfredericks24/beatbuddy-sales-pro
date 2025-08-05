
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { 
  ArrowLeft,
  Package,
  IndianRupee,
  Calendar,
  MapPin,
  Phone,
  Receipt,
  Truck,
  CheckCircle
} from "lucide-react";

const OrderDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id') || 'ORD001';

  // Mock order data
  const order = {
    id: orderId,
    outlet: "Sharma General Store",
    location: "Karol Bagh, Delhi",
    contact: "Rajesh Sharma",
    phone: "+91 98765 43210",
    date: "Aug 5, 2024",
    time: "10:30 AM",
    status: "confirmed",
    paymentMode: "Credit - 7 days",
    items: [
      { name: "Tea Powder 250g", quantity: 5, price: 120, total: 600 },
      { name: "Biscuits Pack", quantity: 10, price: 45, total: 450 },
      { name: "Cooking Oil 1L", quantity: 3, price: 180, total: 540 },
      { name: "Rice 5kg", quantity: 2, price: 350, total: 700 }
    ],
    subtotal: 2290,
    discount: 290,
    total: 2000,
    notes: "Deliver before 2 PM. Store prefers afternoon delivery."
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-success text-success-foreground">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case "delivered":
        return <Badge className="bg-primary text-primary-foreground">Delivered</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Order Details" />

      <div className="max-w-md mx-auto p-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 p-0 h-auto text-primary hover:text-primary-hover"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Button>

        {/* Order Header */}
        <Card className="p-4 mb-4 bg-gradient-card shadow-card">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-lg font-bold text-text-high">Order #{order.id}</h2>
              <p className="text-text-medium text-sm">{order.outlet}</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-text-medium" />
                <p className="text-text-medium text-xs">{order.location}</p>
              </div>
            </div>
            {getStatusBadge(order.status)}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-text-medium" />
              <div>
                <p className="text-text-high font-medium text-sm">{order.date}</p>
                <p className="text-text-low text-xs">{order.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-text-medium" />
              <div>
                <p className="text-text-high font-medium text-sm">{order.contact}</p>
                <p className="text-text-low text-xs">{order.phone}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Order Items */}
        <Card className="p-4 mb-4 bg-gradient-card shadow-card">
          <h3 className="font-semibold text-text-high mb-3 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Order Items ({order.items.length})
          </h3>
          
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                <div className="flex-1">
                  <p className="text-text-high font-medium text-sm">{item.name}</p>
                  <p className="text-text-medium text-xs">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-text-high font-semibold flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    {item.total}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="p-4 mb-4 bg-gradient-card shadow-card">
          <h3 className="font-semibold text-text-high mb-3 flex items-center gap-2">
            <Receipt className="w-4 h-4" />
            Order Summary
          </h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-medium">Subtotal</span>
              <span className="text-text-high">₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between text-success">
              <span>Discount Applied</span>
              <span>-₹{order.discount}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 font-semibold">
              <span className="text-text-high">Total Amount</span>
              <span className="text-text-high text-lg">₹{order.total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-medium">Payment Mode</span>
              <span className="text-text-medium">{order.paymentMode}</span>
            </div>
          </div>
        </Card>

        {/* Order Notes */}
        {order.notes && (
          <Card className="p-4 mb-4 bg-info-light border-l-4 border-l-info">
            <h4 className="font-medium text-text-high text-sm mb-2">Order Notes</h4>
            <p className="text-text-medium text-sm">{order.notes}</p>
          </Card>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            className="w-full h-12 bg-primary hover:bg-primary-hover"
            onClick={() => {
              // In a real app, this would share the order details
              navigator.share?.({
                title: `Order ${order.id}`,
                text: `Order details for ${order.outlet}`,
              });
            }}
          >
            <Truck className="w-4 h-4 mr-2" />
            Track Order
          </Button>
          
          {order.status === "confirmed" && (
            <Button 
              variant="outline"
              className="w-full h-12 border-success text-success hover:bg-success-light"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Delivered
            </Button>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default OrderDetails;
