import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { 
  ArrowLeft,
  Search,
  Plus,
  Minus,
  ShoppingCart,
  Package,
  Tag,
  IndianRupee
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  unit: string;
  price: number;
  quantity: number;
}

const OrderEntry = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const products = [
    { id: "1", name: "Tea Powder Premium", unit: "500g", price: 150, category: "Beverages" },
    { id: "2", name: "Instant Coffee", unit: "200g", price: 280, category: "Beverages" },
    { id: "3", name: "Biscuits Assorted", unit: "Pack of 6", price: 120, category: "Snacks" },
    { id: "4", name: "Cooking Oil", unit: "1L", price: 180, category: "Cooking" },
    { id: "5", name: "Rice Basmati", unit: "5kg", price: 450, category: "Staples" },
    { id: "6", name: "Detergent Powder", unit: "1kg", price: 220, category: "Home Care" },
    { id: "7", name: "Shampoo", unit: "400ml", price: 195, category: "Personal Care" },
    { id: "8", name: "Noodles Instant", unit: "Pack of 12", price: 240, category: "Snacks" },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header title="New Order" showSync={true} />

      <div className="max-w-md mx-auto p-4">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 p-0 h-auto text-primary hover:text-primary-hover"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Outlet
        </Button>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-medium" />
          <Input
            type="text"
            placeholder="Search products by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <Badge
            variant={searchQuery === "" ? "default" : "outline"}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => setSearchQuery("")}
          >
            All
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={searchQuery === category ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setSearchQuery(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Product List */}
        <div className="space-y-3">
          {filteredProducts.map((product) => {
            const cartItem = cart.find(item => item.id === product.id);
            const quantity = cartItem?.quantity || 0;

            return (
              <Card key={product.id} className="p-4 bg-gradient-card shadow-card">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold text-text-high text-sm">{product.name}</h3>
                    </div>
                    <p className="text-text-medium text-xs mt-1">{product.unit}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <IndianRupee className="w-3 h-3 text-success" />
                      <span className="text-success font-semibold text-sm">{product.price}</span>
                      <span className="text-text-low text-xs">each</span>
                    </div>
                    <Badge variant="outline" className="mt-2 text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {product.category}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    {quantity > 0 ? (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-primary text-primary"
                          onClick={() => updateQuantity(product.id, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold text-text-high">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-primary text-primary"
                          onClick={() => updateQuantity(product.id, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => addToCart(product)}
                        className="bg-primary hover:bg-primary-hover text-primary-foreground"
                        size="sm"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Floating Cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 p-4 z-40">
          <div className="max-w-md mx-auto">
            <Card className="bg-primary text-primary-foreground shadow-floating">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Items: {getTotalItems()}</p>
                    <p className="text-white/80 text-sm">Total: ₹{getTotalAmount()}</p>
                  </div>
                </div>
                <Button
                  onClick={() => navigate("/order-review", { state: { cart } })}
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 font-semibold"
                >
                  Review Order
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default OrderEntry;