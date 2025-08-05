
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Visits from "./pages/Visits";
import OutletDetail from "./pages/OutletDetail";
import OrderEntry from "./pages/OrderEntry";
import OrderReview from "./pages/OrderReview";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";
import Activities from "./pages/Activities";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Payment from "./pages/Payment";
import StockCheck from "./pages/StockCheck";
import AddNote from "./pages/AddNote";
import Survey from "./pages/Survey";
import Attendance from "./pages/Attendance";
import OrderDetails from "./pages/OrderDetails";
import HelpTraining from "./pages/HelpTraining";
import ProductKnowledge from "./pages/ProductKnowledge";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/index" element={<Home />} />
          <Route path="/visits" element={<Visits />} />
          <Route path="/outlet/:outletId" element={<OutletDetail />} />
          <Route path="/order-entry" element={<OrderEntry />} />
          <Route path="/order-review" element={<OrderReview />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/stock-check" element={<StockCheck />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/order-details/:orderId" element={<OrderDetails />} />
          <Route path="/help-training" element={<HelpTraining />} />
          <Route path="/product-knowledge" element={<ProductKnowledge />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
