import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { 
  CheckCircle,
  Share2,
  Home,
  FileText,
  Package,
  IndianRupee,
  Calendar
} from "lucide-react";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  if (!orderData) {
    navigate("/");
    return null;
  }

  const handleShareReceipt = () => {
    // Mock WhatsApp sharing
    const message = `Order Confirmation\nOrder ID: ${orderData.orderId}\nTotal: ₹${orderData.total}\nThank you for your order!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Order Confirmation" />

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Success Animation */}
        <div className="text-center py-8">
          <div className="bg-success/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-xl font-bold text-text-high mb-2">Order Submitted!</h2>
          <p className="text-text-medium">Your order has been saved successfully</p>
        </div>

        {/* Order Details */}
        <Card className="p-4 bg-gradient-card shadow-card">
          <div className="text-center mb-4">
            <h3 className="font-semibold text-text-high">Order ID</h3>
            <p className="text-primary text-lg font-mono">{orderData.orderId}</p>
            <p className="text-text-low text-xs mt-1">
              Created: {new Date().toLocaleString('en-IN')}
            </p>
          </div>

          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="text-text-medium flex items-center gap-2">
                <Package className="w-4 h-4" />
                Items
              </span>
              <span className="text-text-high font-medium">{orderData.items.length}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-medium">Subtotal</span>
              <span className="text-text-high">₹{orderData.subtotal}</span>
            </div>

            {orderData.discount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-success">Discount</span>
                <span className="text-success">-₹{orderData.discount}</span>
              </div>
            )}

            <div className="border-t border-border pt-2">
              <div className="flex items-center justify-between">
                <span className="text-text-high font-semibold flex items-center gap-2">
                  <IndianRupee className="w-4 h-4" />
                  Total Amount
                </span>
                <span className="text-primary text-xl font-bold">₹{orderData.total}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-medium">Payment Terms</span>
              <span className="text-text-high capitalize">{orderData.paymentTerms.replace('-', ' ')}</span>
            </div>

            {orderData.notes && (
              <div className="border-t border-border pt-3">
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-text-medium mt-0.5" />
                  <div>
                    <span className="text-text-medium text-sm">Notes:</span>
                    <p className="text-text-high text-sm mt-1">{orderData.notes}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Status Card */}
        <Card className="p-4 bg-info-light border-l-4 border-l-info">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-info" />
            <div>
              <h4 className="font-medium text-text-high text-sm">Order Status</h4>
              <p className="text-text-medium text-xs">
                Order will sync when online. Customer will be notified.
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleShareReceipt}
            className="w-full h-12 bg-success hover:bg-success/90 text-success-foreground font-semibold"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share via WhatsApp
          </Button>

          <Button 
            onClick={() => navigate("/")}
            variant="outline"
            className="w-full h-12 border-primary text-primary hover:bg-primary-light font-semibold"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Celebration Message */}
        <Card className="p-4 bg-gradient-success text-white text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">🎉</span>
            <h4 className="font-semibold">Great Job!</h4>
            <span className="text-2xl">🎉</span>
          </div>
          <p className="text-white/90 text-sm">
            Another successful order! Keep up the excellent work.
          </p>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default OrderConfirmation;