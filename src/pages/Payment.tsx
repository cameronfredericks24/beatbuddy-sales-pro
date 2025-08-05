
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  CreditCard,
  IndianRupee,
  Receipt,
  CheckCircle
} from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("cash");
  const [reference, setReference] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      toast({
        title: "Error",
        description: "Please enter payment amount",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Payment Recorded",
      description: `₹${amount} payment captured successfully`,
    });
    
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Capture Payment" />

      <div className="max-w-md mx-auto p-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 p-0 h-auto text-primary hover:text-primary-hover"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Outlet
        </Button>

        {/* Outstanding Amount */}
        <Card className="p-4 mb-4 bg-warning-light border-l-4 border-l-warning">
          <div className="flex items-center gap-3">
            <Receipt className="w-5 h-5 text-warning" />
            <div>
              <h3 className="font-medium text-text-high">Outstanding Amount</h3>
              <p className="text-text-medium text-sm">₹12,500 pending collection</p>
            </div>
          </div>
        </Card>

        {/* Payment Form */}
        <Card className="p-4 bg-gradient-card shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-text-high">Record Payment</h2>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Payment Amount</Label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-medium" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Payment Mode */}
            <div className="space-y-3">
              <Label>Payment Mode</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "cash", label: "Cash" },
                  { value: "cheque", label: "Cheque" },
                  { value: "upi", label: "UPI" },
                  { value: "card", label: "Card" }
                ].map((mode) => (
                  <Button
                    key={mode.value}
                    type="button"
                    variant={paymentMode === mode.value ? "default" : "outline"}
                    onClick={() => setPaymentMode(mode.value)}
                    className="h-12"
                  >
                    {mode.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Reference Number */}
            {(paymentMode === "cheque" || paymentMode === "upi") && (
              <div className="space-y-2">
                <Label htmlFor="reference">
                  {paymentMode === "cheque" ? "Cheque Number" : "Transaction ID"}
                </Label>
                <Input
                  id="reference"
                  placeholder={`Enter ${paymentMode === "cheque" ? "cheque number" : "transaction ID"}`}
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </div>
            )}

            <Button type="submit" className="w-full h-12 bg-success hover:bg-success/90">
              <CheckCircle className="w-4 h-4 mr-2" />
              Record Payment
            </Button>
          </form>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Payment;
