import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { 
  Search,
  Play,
  BookOpen,
  HelpCircle,
  Phone,
  MessageCircle,
  Download,
  Star
} from "lucide-react";

const HelpTraining = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const trainingModules = [
    {
      title: "Sales Techniques Mastery",
      duration: "15 min",
      progress: 85,
      type: "video",
      description: "Learn advanced selling techniques for FMCG products"
    },
    {
      title: "Product Portfolio 2024",
      duration: "20 min", 
      progress: 60,
      type: "interactive",
      description: "Complete guide to our latest product lineup"
    },
    {
      title: "Scheme Management",
      duration: "10 min",
      progress: 100,
      type: "video",
      description: "How to effectively communicate schemes to retailers"
    },
    {
      title: "Digital Order Processing",
      duration: "12 min",
      progress: 0,
      type: "tutorial",
      description: "Step-by-step guide to using the mobile app"
    }
  ];

  const supportOptions = [
    {
      title: "Call Support Helpline",
      subtitle: "Available 24/7 for urgent issues",
      icon: Phone,
      action: () => {},
      color: "text-success"
    },
    {
      title: "Chat with Support",
      subtitle: "Get instant help via WhatsApp",
      icon: MessageCircle,
      action: () => {},
      color: "text-primary"
    },
    {
      title: "Submit Feedback",
      subtitle: "Help us improve the app",
      icon: Star,
      action: () => {},
      color: "text-warning"
    }
  ];

  const quickGuides = [
    "How to place an order",
    "Managing outlet visits",
    "Recording payments",
    "Stock check process",
    "Attendance marking",
    "Sync data offline"
  ];

  const filteredModules = trainingModules.filter(module =>
    module.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Help & Training" />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-medium w-4 h-4" />
          <Input
            placeholder="Search training modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Training Modules */}
        <Card className="p-4 bg-gradient-card shadow-card">
          <h3 className="font-semibold text-text-high mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Training Modules
          </h3>
          
          <div className="space-y-3">
            {filteredModules.map((module, index) => (
              <div key={index} className="bg-background/50 p-3 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-high text-sm">{module.title}</h4>
                    <p className="text-text-medium text-xs mt-1">{module.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-text-low text-xs">{module.duration}</span>
                      <span className="text-text-low text-xs">•</span>
                      <span className="text-primary text-xs font-medium">
                        {module.progress}% Complete
                      </span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary-hover text-primary-foreground">
                    <Play className="w-3 h-3 mr-1" />
                    {module.progress === 0 ? "Start" : "Continue"}
                  </Button>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-border rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Guides */}
        <Card className="p-4 bg-gradient-card shadow-card">
          <h3 className="font-semibold text-text-high mb-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            Quick Guides
          </h3>
          
          <div className="grid grid-cols-2 gap-2">
            {quickGuides.map((guide, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-3 text-left justify-start border-border hover:bg-surface"
                onClick={() => {}}
              >
                <span className="text-xs">{guide}</span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Support Options */}
        <Card className="p-4 bg-gradient-card shadow-card">
          <h3 className="font-semibold text-text-high mb-3">Get Support</h3>
          
          <div className="space-y-3">
            {supportOptions.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full h-auto p-3 justify-start border-border hover:bg-surface"
                onClick={option.action}
              >
                <option.icon className={`w-4 h-4 mr-3 ${option.color}`} />
                <div className="text-left">
                  <p className="font-medium text-sm">{option.title}</p>
                  <p className="text-text-medium text-xs">{option.subtitle}</p>
                </div>
              </Button>
            ))}
          </div>
        </Card>

        {/* Offline Resources */}
        <Card className="p-4 bg-info-light border-l-4 border-l-info">
          <div className="flex items-start gap-3">
            <Download className="w-4 h-4 text-info mt-0.5" />
            <div>
              <h4 className="font-medium text-text-high text-sm">Offline Resources</h4>
              <p className="text-text-medium text-xs mt-1">
                Download training materials to access without internet
              </p>
              <Button size="sm" variant="outline" className="mt-2 border-info text-info hover:bg-info-light">
                Download All
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default HelpTraining;