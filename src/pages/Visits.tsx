import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { 
  MapPin, 
  Navigation, 
  CheckCircle,
  Clock,
  Phone,
  List,
  Map as MapIcon,
  Route
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Visits = () => {
  const navigate = useNavigate();
  const [checkedInOutlets, setCheckedInOutlets] = useState<string[]>([]);

  const outlets = [
    {
      id: "1",
      name: "Sharma General Store",
      location: "Karol Bagh, Delhi",
      lastOrder: "₹5,000 on 5 Aug",
      status: "pending",
      phone: "+91 98765 43210",
      order: 1
    },
    {
      id: "2", 
      name: "Mumbai Mart",
      location: "Andheri West, Mumbai",
      lastOrder: "₹3,200 on 3 Aug",
      status: "pending",
      phone: "+91 98765 43211",
      order: 2
    },
    {
      id: "3",
      name: "Chennai Super Store", 
      location: "T. Nagar, Chennai",
      lastOrder: "₹7,800 on 6 Aug",
      status: "pending",
      phone: "+91 98765 43212",
      order: 3
    },
    {
      id: "4",
      name: "Bangalore Bazaar",
      location: "Koramangala, Bangalore", 
      lastOrder: "₹4,500 on 4 Aug",
      status: "pending",
      phone: "+91 98765 43213",
      order: 4
    },
  ];

  const handleCheckIn = (outletId: string) => {
    setCheckedInOutlets([...checkedInOutlets, outletId]);
    // Navigate to outlet detail
    navigate(`/outlet/${outletId}`);
  };

  const getStatusColor = (outletId: string) => {
    if (checkedInOutlets.includes(outletId)) {
      return "text-success bg-success-light border-success";
    }
    return "text-warning bg-warning-light border-warning";
  };

  const getStatusIcon = (outletId: string) => {
    if (checkedInOutlets.includes(outletId)) {
      return <CheckCircle className="w-4 h-4" />;
    }
    return <Clock className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Today's Beat" showSync={true} />
      
      <div className="max-w-md mx-auto">
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2 m-4">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              List View
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapIcon className="w-4 h-4" />
              Map View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="p-4 space-y-3">
            {/* Route Optimization */}
            <Card className="p-4 bg-primary-light border border-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Route className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-text-high text-sm">Optimized Route</p>
                    <p className="text-text-medium text-xs">12 outlets • Est. 6 hours</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-primary text-primary">
                  Re-optimize
                </Button>
              </div>
            </Card>

            {/* Outlets List */}
            <div className="space-y-3">
              {outlets.map((outlet) => (
                <Card key={outlet.id} className="p-4 shadow-card bg-gradient-card">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                            {outlet.order}
                          </span>
                          <h3 className="font-semibold text-text-high">{outlet.name}</h3>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-text-medium" />
                          <p className="text-text-medium text-xs">{outlet.location}</p>
                        </div>
                        <p className="text-text-low text-xs mt-1">{outlet.lastOrder}</p>
                      </div>
                      
                      {/* Status Badge */}
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(outlet.id)}`}>
                        {getStatusIcon(outlet.id)}
                        {checkedInOutlets.includes(outlet.id) ? "Visited" : "Pending"}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleCheckIn(outlet.id)}
                        disabled={checkedInOutlets.includes(outlet.id)}
                        className={`flex-1 ${
                          checkedInOutlets.includes(outlet.id) 
                            ? "bg-success hover:bg-success/90" 
                            : "bg-primary hover:bg-primary-hover"
                        }`}
                      >
                        {checkedInOutlets.includes(outlet.id) ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Completed
                          </>
                        ) : (
                          "Check In"
                        )}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-primary text-primary hover:bg-primary-light"
                      >
                        <Navigation className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-primary text-primary hover:bg-primary-light"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map" className="p-4">
            {/* Map View Placeholder */}
            <Card className="h-96 bg-gradient-card shadow-card p-8">
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="bg-primary/20 p-6 rounded-full mb-4">
                  <MapIcon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-high mb-2">Interactive Map</h3>
                <p className="text-text-medium text-sm mb-4">
                  View all 12 outlets on the map with optimized routing
                </p>
                <Button className="bg-primary hover:bg-primary-hover">
                  Load Map View
                </Button>
              </div>
            </Card>

            {/* Map Controls */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                Re-center
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Route className="w-4 h-4" />
                Optimize Route
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Visits;