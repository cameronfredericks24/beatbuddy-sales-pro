
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingCart,
  Calendar,
  IndianRupee,
  Package,
  Clock,
  CheckCircle,
  TrendingUp,
  Eye
} from "lucide-react";

const Orders = () => {
  const navigate = useNavigate();

  const todayOrders = [
    {
      id: "ORD001",
      outlet: "Sharma General Store",
      amount: 5000,
      items: 15,
      time: "10:30 AM",
      status: "confirmed"
    },
    {
      id: "ORD002", 
      outlet: "Mumbai Mart",
      amount: 3200,
      items: 12,
      time: "11:45 AM",
      status: "pending"
    },
    {
      id: "ORD003",
      outlet: "Chennai Super Store",
      amount: 7800,
      items: 18,
      time: "2:15 PM",
      status: "confirmed"
    }
  ];

  const recentOrders = [
    {
      id: "ORD004",
      outlet: "Delhi Retail Hub",
      amount: 4500,
      items: 14,
      date: "Aug 7, 2024",
      status: "delivered"
    },
    {
      id: "ORD005",
      outlet: "Bangalore Bazaar", 
      amount: 6200,
      items: 16,
      date: "Aug 6, 2024",
      status: "delivered"
    },
    {
      id: "ORD006",
      outlet: "Kolkata Corner Store",
      amount: 3800,
      items: 11,
      date: "Aug 5, 2024", 
      status: "delivered"
    }
  ];

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "pending":
        return <Clock className="w-4 h-4 text-warning" />;
      case "delivered":
        return <Package className="w-4 h-4 text-primary" />;
      default:
        return <Clock className="w-4 h-4 text-text-medium" />;
    }
  };

  const handleViewDetails = (orderId: string) => {
    navigate(`/order-details?id=${orderId}`);
  };

  const totalToday = todayOrders.reduce((sum, order) => sum + order.amount, 0);
  const totalItems = todayOrders.reduce((sum, order) => sum + order.items, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Orders" showSync={true} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Today's Summary */}
        <Card className="p-4 bg-gradient-primary text-white shadow-elevated">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Today's Orders
            </h3>
            <Badge className="bg-white/20 text-white border-white/30">
              {todayOrders.length} orders
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">₹{(totalToday / 1000).toFixed(0)}K</p>
              <p className="text-white/80 text-xs">Total Value</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{totalItems}</p>
              <p className="text-white/80 text-xs">Items Sold</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <p className="text-xl font-bold">+12%</p>
              </div>
              <p className="text-white/80 text-xs">vs Yesterday</p>
            </div>
          </div>
        </Card>

        {/* Orders Tabs */}
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-3 mt-4">
            {todayOrders.map((order) => (
              <Card key={order.id} className="p-4 bg-gradient-card shadow-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-lg">
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-high text-sm">{order.outlet}</h4>
                      <p className="text-text-medium text-xs">Order #{order.id}</p>
                    </div>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <IndianRupee className="w-3 h-3 text-success" />
                      <p className="font-bold text-text-high text-sm">{order.amount.toLocaleString()}</p>
                    </div>
                    <p className="text-text-low text-xs">Amount</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Package className="w-3 h-3 text-primary" />
                      <p className="font-bold text-text-high text-sm">{order.items}</p>
                    </div>
                    <p className="text-text-low text-xs">Items</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3 text-text-medium" />
                      <p className="font-bold text-text-high text-sm">{order.time}</p>
                    </div>
                    <p className="text-text-low text-xs">Time</p>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-primary text-primary hover:bg-primary-light"
                  onClick={() => handleViewDetails(order.id)}
                >
                  <Eye className="w-3 h-3 mr-2" />
                  View Details
                </Button>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="recent" className="space-y-3 mt-4">
            {recentOrders.map((order) => (
              <Card key={order.id} className="p-4 bg-gradient-card shadow-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-lg">
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-high text-sm">{order.outlet}</h4>
                      <p className="text-text-medium text-xs">Order #{order.id}</p>
                    </div>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <IndianRupee className="w-3 h-3 text-success" />
                      <p className="font-bold text-text-high text-sm">{order.amount.toLocaleString()}</p>
                    </div>
                    <p className="text-text-low text-xs">Amount</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Package className="w-3 h-3 text-primary" />
                      <p className="font-bold text-text-high text-sm">{order.items}</p>
                    </div>
                    <p className="text-text-low text-xs">Items</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Calendar className="w-3 h-3 text-text-medium" />
                      <p className="font-bold text-text-high text-xs">{order.date}</p>
                    </div>
                    <p className="text-text-low text-xs">Date</p>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-primary text-primary hover:bg-primary-light"
                  onClick={() => handleViewDetails(order.id)}
                >
                  <Eye className="w-3 h-3 mr-2" />
                  View Details
                </Button>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Orders;
