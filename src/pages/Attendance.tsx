import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  MapPin,
  User
} from "lucide-react";

const Attendance = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveType, setLeaveType] = useState("sick");
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    toast({
      title: "Attendance Marked",
      description: `Checked in at ${new Date().toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`,
    });
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    toast({
      title: "Day Completed",
      description: `Checked out at ${new Date().toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`,
    });
  };

  const handleLeaveSubmit = () => {
    if (!leaveDate || !leaveReason.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Leave application submitted",
      description: `${leaveType} leave for ${leaveDate} has been submitted for approval`,
    });
    
    setShowLeaveForm(false);
    setLeaveReason("");
    setLeaveDate("");
  };

  const attendanceHistory = [
    { date: "Aug 5, 2024", checkIn: "9:00 AM", checkOut: "6:30 PM", status: "Present" },
    { date: "Aug 2, 2024", checkIn: "9:15 AM", checkOut: "6:45 PM", status: "Present" },
    { date: "Aug 1, 2024", checkIn: "9:30 AM", checkOut: "6:30 PM", status: "Present" },
    { date: "Jul 31, 2024", checkIn: "-", checkOut: "-", status: "Leave" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Attendance" />

      <div className="max-w-md mx-auto p-4 space-y-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 p-0 h-auto text-primary hover:text-primary-hover"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </Button>

        {/* Today's Attendance */}
        <Card className="p-6 bg-gradient-card shadow-card text-center">
          <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-lg font-bold text-text-high mb-1">Rajesh Kumar</h2>
          <p className="text-text-medium text-sm mb-4">Sales Representative - Mumbai North</p>
          
          <div className="flex items-center justify-center gap-1 mb-4">
            <MapPin className="w-3 h-3 text-text-medium" />
            <span className="text-text-medium text-xs">Andheri West, Mumbai</span>
          </div>

          {!isCheckedIn ? (
            <Button 
              onClick={handleCheckIn}
              className="w-full h-12 bg-success hover:bg-success/90"
            >
              <Clock className="w-4 h-4 mr-2" />
              Mark Attendance
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-success mb-3">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Present since 9:00 AM</span>
              </div>
              <Button 
                onClick={handleCheckOut}
                variant="outline"
                className="w-full h-12 border-primary text-primary hover:bg-primary-light"
              >
                Mark End of Day
              </Button>
            </div>
          )}
        </Card>

        {/* Apply for Leave */}
        <Card className="p-4 bg-gradient-card shadow-card">
          <h3 className="font-semibold text-text-high mb-3 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            Leave Management
          </h3>
          
          <Button 
            onClick={() => setShowLeaveForm(!showLeaveForm)}
            variant="outline"
            className="w-full border-warning text-warning hover:bg-warning-light"
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            Apply for Leave
          </Button>

          {showLeaveForm && (
            <div className="mt-4 space-y-3 bg-background/50 p-3 rounded-lg border border-border">
              <div>
                <label className="text-text-high text-sm font-medium">Leave Type</label>
                <select 
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full mt-1 p-2 border border-border rounded-md bg-background text-text-high"
                >
                  <option value="sick">Sick Leave</option>
                  <option value="casual">Casual Leave</option>
                  <option value="emergency">Emergency Leave</option>
                </select>
              </div>
              
              <div>
                <label className="text-text-high text-sm font-medium">Date</label>
                <input 
                  type="date"
                  value={leaveDate}
                  onChange={(e) => setLeaveDate(e.target.value)}
                  className="w-full mt-1 p-2 border border-border rounded-md bg-background text-text-high"
                />
              </div>
              
              <div>
                <label className="text-text-high text-sm font-medium">Reason</label>
                <textarea 
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  placeholder="Brief reason for leave..."
                  className="w-full mt-1 p-2 border border-border rounded-md bg-background text-text-high resize-none"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleLeaveSubmit}
                  className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                >
                  Submit Application
                </Button>
                <Button 
                  onClick={() => setShowLeaveForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Calendar */}
        <Card className="p-4 bg-gradient-card shadow-card">
          <h3 className="font-semibold text-text-high mb-3 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            Attendance Calendar
          </h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
          />
        </Card>

        {/* Attendance History */}
        <Card className="p-4 bg-gradient-card shadow-card">
          <h3 className="font-semibold text-text-high mb-3">Recent Attendance</h3>
          <div className="space-y-3">
            {attendanceHistory.map((record, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                <div>
                  <p className="text-text-high font-medium text-sm">{record.date}</p>
                  <p className="text-text-medium text-xs">
                    {record.status === "Present" 
                      ? `${record.checkIn} - ${record.checkOut}`
                      : "On Leave"
                    }
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    record.status === "Present" 
                      ? "bg-success-light text-success" 
                      : "bg-warning-light text-warning"
                  }`}>
                    {record.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Attendance;