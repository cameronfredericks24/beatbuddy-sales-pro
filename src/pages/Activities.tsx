import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { 
  CheckSquare,
  Calendar,
  Camera,
  ClipboardList,
  CreditCard,
  Package,
  StickyNote,
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
  TrendingUp
} from "lucide-react";

const Activities = () => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const todayTasks = [
    {
      id: "1",
      type: "stock_check",
      title: "Stock Check - Sharma Store",
      description: "Verify inventory levels for tea and coffee products",
      priority: "high",
      dueTime: "11:00 AM",
      icon: Package,
      outlet: "Sharma General Store"
    },
    {
      id: "2", 
      type: "payment",
      title: "Collect Payment - Mumbai Mart",
      description: "Collect pending payment of ₹15,000",
      priority: "urgent",
      dueTime: "2:00 PM", 
      icon: CreditCard,
      outlet: "Mumbai Mart"
    },
    {
      id: "3",
      type: "survey",
      title: "Customer Survey - Chennai Store",
      description: "Conduct satisfaction survey and competitor analysis",
      priority: "medium",
      dueTime: "4:00 PM",
      icon: ClipboardList,
      outlet: "Chennai Super Store"
    },
    {
      id: "4",
      type: "photo",
      title: "Display Photo - Bangalore Bazaar",
      description: "Take photos of product display and competitor shelf",
      priority: "low",
      dueTime: "5:30 PM",
      icon: Camera,
      outlet: "Bangalore Bazaar"
    }
  ];

  const completedToday = [
    {
      id: "c1",
      type: "visit",
      title: "Visit Completed - Delhi Hub",
      description: "Outlet visit and order placement completed",
      completedTime: "9:30 AM",
      icon: CheckCircle
    },
    {
      id: "c2",
      type: "note",
      title: "Visit Note Added - Kolkata Store",
      description: "Added detailed visit notes and recommendations",
      completedTime: "10:15 AM", 
      icon: StickyNote
    }
  ];

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks([...completedTasks, taskId]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-error text-error-foreground";
      case "high":
        return "bg-warning text-warning-foreground";
      case "medium":
        return "bg-info text-info-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertCircle className="w-3 h-3" />;
      case "high":
        return <Clock className="w-3 h-3" />;
      default:
        return <CheckSquare className="w-3 h-3" />;
    }
  };

  const pendingTasks = todayTasks.filter(task => !completedTasks.includes(task.id));
  const completionRate = Math.round(((todayTasks.length - pendingTasks.length) / todayTasks.length) * 100);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Activities" showSync={true} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Progress Overview */}
        <Card className="p-4 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-text-high flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Today's Progress
            </h3>
            <Badge className="bg-primary text-primary-foreground">
              {todayTasks.length - pendingTasks.length}/{todayTasks.length}
            </Badge>
          </div>
          
          <div className="space-y-3">
            <Progress value={completionRate} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-success">{todayTasks.length - pendingTasks.length}</p>
                <p className="text-text-medium text-xs">Completed</p>
              </div>
              <div>
                <p className="text-xl font-bold text-warning">{pendingTasks.length}</p>
                <p className="text-text-medium text-xs">Pending</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <p className="text-xl font-bold text-primary">{completionRate}%</p>
                </div>
                <p className="text-text-medium text-xs">Progress</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Pending Tasks */}
        <div>
          <h3 className="font-semibold text-text-high mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Pending Tasks ({pendingTasks.length})
          </h3>
          
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <Card key={task.id} className="p-4 bg-gradient-card shadow-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="bg-primary/20 p-2 rounded-lg">
                      <task.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-text-high text-sm mb-1">{task.title}</h4>
                      <p className="text-text-medium text-xs mb-2">{task.description}</p>
                      <p className="text-text-low text-xs">{task.outlet}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {getPriorityIcon(task.priority)}
                      <span className="ml-1 capitalize">{task.priority}</span>
                    </Badge>
                    <div className="flex items-center gap-1 text-text-medium">
                      <Calendar className="w-3 h-3" />
                      <span className="text-xs">{task.dueTime}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => handleTaskComplete(task.id)}
                  className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
                  size="sm"
                >
                  <CheckCircle className="w-3 h-3 mr-2" />
                  Mark Complete
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed Today */}
        {(completedToday.length > 0 || completedTasks.length > 0) && (
          <div>
            <h3 className="font-semibold text-text-high mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              Completed Today ({completedToday.length + completedTasks.length})
            </h3>
            
            <div className="space-y-3">
              {/* Newly completed tasks */}
              {completedTasks.map((taskId) => {
                const task = todayTasks.find(t => t.id === taskId);
                if (!task) return null;
                
                return (
                  <Card key={taskId} className="p-4 bg-success-light border-l-4 border-l-success">
                    <div className="flex items-center gap-3">
                      <div className="bg-success/20 p-2 rounded-lg">
                        <task.icon className="w-4 h-4 text-success" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-high text-sm">{task.title}</h4>
                        <p className="text-text-medium text-xs">{task.outlet}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-success text-success-foreground text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                        <p className="text-text-low text-xs mt-1">Just now</p>
                      </div>
                    </div>
                  </Card>
                );
              })}

              {/* Pre-completed tasks */}
              {completedToday.map((task) => (
                <Card key={task.id} className="p-4 bg-success-light border-l-4 border-l-success">
                  <div className="flex items-center gap-3">
                    <div className="bg-success/20 p-2 rounded-lg">
                      <task.icon className="w-4 h-4 text-success" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-text-high text-sm">{task.title}</h4>
                      <p className="text-text-medium text-xs">{task.description}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-success text-success-foreground text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                      <p className="text-text-low text-xs mt-1">{task.completedTime}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Motivation Card */}
        {completionRate >= 80 && (
          <Card className="p-4 bg-gradient-success text-white text-center shadow-elevated">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🏆</span>
              <h4 className="font-semibold">Excellent Work!</h4>
            </div>
            <p className="text-white/90 text-sm">
              You're doing great today! Keep up the momentum.
            </p>
          </Card>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Activities;