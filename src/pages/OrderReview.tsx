import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  Gift,
  FileText,
  CreditCard,
  CheckCircle,
  IndianRupee,
  Package
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  unit: string;
  price: number;
  quantity: number;
}

const OrderReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>(location.state?.cart || []);
  const [paymentTerms, setPaymentTerms] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateQuantity = (productId: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeItem = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getSchemeDiscount = () => {
    // Mock scheme calculation
    const subtotal = getSubtotal();
    return subtotal > 500 ? Math.floor(subtotal * 0.05) : 0;
  };

  const getTotalAmount = () => {
    return getSubtotal() - getSchemeDiscount();
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSubmitOrder = async () => {
    if (!paymentTerms) {
      toast({
        title: "Payment terms required",
        description: "Please select payment terms",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate order submission
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/order-confirmation", {
        state: {
          orderData: {
            items: cart,
            subtotal: getSubtotal(),
            discount: getSchemeDiscount(),
            total: getTotalAmount(),
            paymentTerms,
            notes: orderNotes,
            orderId: "ORD" + Date.now()
          }
        }
      });
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-text-medium mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-text-high mb-2">No items in cart</h2>
          <Button onClick={() => navigate("/order-entry")}>
            Add Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Review Order" showSync={true} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="p-0 h-auto text-primary hover:text-primary-hover"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        {/* Order Items */}
        <Card className="p-4 bg-gradient-card shadow-card">
          <h3 className="font-semibold text-text-high mb-3 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Order Items ({getTotalItems()})
          </h3>
          
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                <div className="flex-1">
                  <h4 className="font-medium text-text-high text-sm">{item.name}</h4>
                  <p className="text-text-medium text-xs">{item.unit}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <IndianRupee className="w-3 h-3 text-success" />
                    <span className="text-success font-semibold text-xs">{item.price}</span>
                    <span className="text-text-low text-xs"> × {item.quantity}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 border-primary text-primary"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-6 text-center text-sm font-semibold text-text-high">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 border-primary text-primary"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 border-error text-error hover:bg-error-light"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>

                <div className="text-right ml-2">
                  <p className="font-semibold text-text-high text-sm">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Scheme Applied */}
        {getSchemeDiscount() > 0 && (
          <Card className="p-4 bg-success-light border-l-4 border-l-success">
            <div className="flex items-center gap-3">
              <Gift className="w-5 h-5 text-success" />
              <div>
                <h4 className="font-medium text-text-high text-sm">Scheme Applied!</h4>
                <p className="text-text-medium text-xs">
                  Bulk order discount: ₹{getSchemeDiscount()} off
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Order Summary */}
        <Card className="p-4 bg-gradient-card shadow-card">
          <h3 className="font-semibold text-text-high mb-3">Order Summary</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-medium">Subtotal:</span>
              <span className="text-text-high">₹{getSubtotal()}</span>
            </div>
            
            {getSchemeDiscount() > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-success">Scheme Discount:</span>
                <span className="text-success">-₹{getSchemeDiscount()}</span>
              </div>
            )}
            
            <div className="border-t border-border pt-2">
              <div className="flex justify-between font-semibold">
                <span className="text-text-high">Total Amount:</span>
                <span className="text-primary text-lg">₹{getTotalAmount()}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Terms */}
        <Card className="p-4 bg-gradient-card shadow-card">
          <h3 className="font-semibold text-text-high mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Payment Terms
          </h3>
          
          <Select value={paymentTerms} onValueChange={setPaymentTerms}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select payment terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate Cash</SelectItem>
              <SelectItem value="credit-7">Credit - 7 days</SelectItem>
              <SelectItem value="credit-15">Credit - 15 days</SelectItem>
              <SelectItem value="credit-30">Credit - 30 days</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Order Notes */}
        <Card className="p-4 bg-gradient-card shadow-card">
          <h3 className="font-semibold text-text-high mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Order Notes (Optional)
          </h3>
          
          <Textarea
            placeholder="Add any special instructions..."
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            className="min-h-[80px]"
          />
        </Card>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmitOrder}
          disabled={isSubmitting}
          className="w-full h-12 bg-success hover:bg-success/90 text-success-foreground font-semibold"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting Order...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Order
            </>
          )}
        </Button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default OrderReview;