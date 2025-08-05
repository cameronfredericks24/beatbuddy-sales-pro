import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { 
  Search,
  Package,
  Gift,
  TrendingUp,
  Star,
  IndianRupee,
  Calendar,
  Target,
  Share
} from "lucide-react";

const ProductKnowledge = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    {
      name: "Premium Tea Powder",
      category: "Beverages",
      sku: "TEA001",
      price: "₹120/500g",
      margin: "15%",
      features: ["Rich Aroma", "Premium Quality", "Long Shelf Life"],
      currentScheme: "Buy 10 Get 2 Free"
    },
    {
      name: "Instant Coffee Mix",
      category: "Beverages", 
      sku: "COF002",
      price: "₹180/200g",
      margin: "18%",
      features: ["Instant Dissolve", "Rich Taste", "No Sugar Added"],
      currentScheme: "25% Extra Volume"
    },
    {
      name: "Coconut Oil",
      category: "Cooking",
      sku: "OIL003", 
      price: "₹200/1L",
      margin: "12%",
      features: ["Pure Coconut", "Cold Pressed", "Organic"],
      currentScheme: "Festival Special - 20% Off"
    }
  ];

  const activeSchemes = [
    {
      title: "Monsoon Madness - Tea Range",
      validity: "Valid till 31 Aug 2024",
      discount: "Buy 10 Get 2 Free",
      products: ["Premium Tea Powder", "Masala Tea", "Green Tea"],
      target: "All General Stores",
      description: "Perfect for the tea season! Retailers get extra inventory to boost sales.",
      highlight: true
    },
    {
      title: "Back to School - Snacks Combo",
      validity: "Valid till 15 Sep 2024", 
      discount: "25% Extra Volume",
      products: ["Biscuits", "Namkeen", "Chocolates"],
      target: "Stores near Schools",
      description: "Target parents buying snacks for school kids."
    },
    {
      title: "Festival Special",
      validity: "Valid till 10 Sep 2024",
      discount: "Flat 20% Off",
      products: ["Coconut Oil", "Ghee", "Sweets"],
      target: "All Outlets",
      description: "Festival season boost for cooking essentials."
    }
  ];

  const competitorInfo = [
    {
      brand: "Brand X Tea",
      ourAdvantage: "Better aroma, same price point",
      strategy: "Highlight taste test results"
    },
    {
      brand: "Brand Y Coffee", 
      ourAdvantage: "More convenient packaging",
      strategy: "Demo instant dissolve feature"
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Product Knowledge" />

      <div className="max-w-md mx-auto p-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-medium w-4 h-4" />
          <Input
            placeholder="Search products or schemes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="schemes" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schemes">Active Schemes</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="competitive">Competitive</TabsTrigger>
          </TabsList>

          {/* Active Schemes Tab */}
          <TabsContent value="schemes" className="space-y-4">
            <div className="space-y-3">
              {activeSchemes.map((scheme, index) => (
                <Card key={index} className={`p-4 bg-gradient-card shadow-card ${scheme.highlight ? 'border-l-4 border-l-success' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-high text-sm flex items-center gap-2">
                        <Gift className="w-4 h-4 text-success" />
                        {scheme.title}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3 text-text-medium" />
                        <span className="text-text-medium text-xs">{scheme.validity}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary-light">
                      <Share className="w-3 h-3 mr-1" />
                      Share
                    </Button>
                  </div>
                  
                  <div className="bg-success-light p-3 rounded-lg mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                      <span className="font-medium text-success text-sm">{scheme.discount}</span>
                    </div>
                    <p className="text-text-medium text-xs">{scheme.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-text-low text-xs">Target: </span>
                      <span className="text-text-high text-xs font-medium">{scheme.target}</span>
                    </div>
                    <div>
                      <span className="text-text-low text-xs">Products: </span>
                      <span className="text-text-high text-xs">{scheme.products.join(", ")}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="space-y-3">
              {filteredProducts.map((product, index) => (
                <Card key={index} className="p-4 bg-gradient-card shadow-card">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-high">{product.name}</h3>
                      <p className="text-text-medium text-sm">{product.category} • {product.sku}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-3 h-3 text-text-medium" />
                          <span className="text-text-high font-medium text-sm">{product.price}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-success" />
                          <span className="text-success font-medium text-sm">{product.margin}</span>
                        </div>
                      </div>
                    </div>
                    <Package className="w-6 h-6 text-primary" />
                  </div>

                  {/* Features */}
                  <div className="mb-3">
                    <span className="text-text-low text-xs">Key Features:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.features.map((feature, idx) => (
                        <span key={idx} className="bg-primary-light text-primary px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Current Scheme */}
                  {product.currentScheme && (
                    <div className="bg-warning-light p-2 rounded-lg flex items-center gap-2">
                      <Gift className="w-4 h-4 text-warning" />
                      <div>
                        <span className="text-warning font-medium text-xs">Active Scheme: </span>
                        <span className="text-text-high text-xs">{product.currentScheme}</span>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Competitive Tab */}
          <TabsContent value="competitive" className="space-y-4">
            <div className="space-y-3">
              {competitorInfo.map((comp, index) => (
                <Card key={index} className="p-4 bg-gradient-card shadow-card">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-warning mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-high text-sm">{comp.brand}</h3>
                      <div className="mt-2 space-y-2">
                        <div>
                          <span className="text-text-low text-xs">Our Advantage: </span>
                          <span className="text-text-high text-xs">{comp.ourAdvantage}</span>
                        </div>
                        <div>
                          <span className="text-text-low text-xs">Sales Strategy: </span>
                          <span className="text-success text-xs font-medium">{comp.strategy}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Best Practices */}
            <Card className="p-4 bg-info-light border-l-4 border-l-info">
              <h4 className="font-medium text-text-high text-sm mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-info" />
                Competitive Selling Tips
              </h4>
              <ul className="space-y-1 text-text-medium text-xs">
                <li>• Always highlight unique product benefits</li>
                <li>• Use schemes to create urgency</li>
                <li>• Demo products when possible</li>
                <li>• Share success stories from other retailers</li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ProductKnowledge;