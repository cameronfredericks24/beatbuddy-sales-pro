
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
  Package,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const StockCheck = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stockData, setStockData] = useState<{[key: string]: string}>({});

  const products = [
    { id: "1", name: "Tea Powder 250g", currentStock: "15" },
    { id: "2", name: "Biscuits Pack", currentStock: "8" },
    { id: "3", name: "Cooking Oil 1L", currentStock: "12" },
    { id: "4", name: "Rice 5kg", currentStock: "6" },
    { id: "5", name: "Sugar 1kg", currentStock: "20" }
  ];

  const handleStockChange = (productId: string, value: string) => {
    setStockData(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Stock Check Completed",
      description: "Stock levels updated successfully",
    });
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Stock Check" />

      <div className="max-w-md mx-auto p-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 p-0 h-auto text-primary hover:text-primary-hover"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Outlet
        </Button>

        <Card className="p-4 mb-4 bg-info-light border-l-4 border-l-info">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-info" />
            <div>
              <h3 className="font-medium text-text-high">Stock Verification</h3>
              <p className="text-text-medium text-sm">Update current stock levels at outlet</p>
            </div>
          </div>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4">
          {products.map((product) => (
            <Card key={product.id} className="p-4 bg-gradient-card shadow-card">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-high">{product.name}</h4>
                    <p className="text-text-medium text-sm">Last recorded: {product.currentStock} units</p>
                  </div>
                  {parseInt(product.currentStock) < 10 && (
                    <AlertTriangle className="w-4 h-4 text-warning" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`stock-${product.id}`}>Current Stock</Label>
                  <Input
                    id={`stock-${product.id}`}
                    type="number"
                    placeholder="Enter current stock"
                    value={stockData[product.id] || ""}
                    onChange={(e) => handleStockChange(product.id, e.target.value)}
                  />
                </div>
              </div>
            </Card>
          ))}

          <Button type="submit" className="w-full h-12 bg-success hover:bg-success/90">
            <CheckCircle className="w-4 h-4 mr-2" />
            Update Stock Levels
          </Button>
        </form>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default StockCheck;
