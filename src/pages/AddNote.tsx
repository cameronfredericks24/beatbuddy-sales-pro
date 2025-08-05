
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  StickyNote,
  Save,
  MessageSquare
} from "lucide-react";

const AddNote = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("general");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) {
      toast({
        title: "Error",
        description: "Please enter a note",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Note Saved",
      description: "Visit note has been recorded successfully",
    });
    
    navigate(-1);
  };

  const categories = [
    { value: "general", label: "General" },
    { value: "competitor", label: "Competitor Activity" },
    { value: "stock", label: "Stock Issue" },
    { value: "payment", label: "Payment Related" }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Add Note" />

      <div className="max-w-md mx-auto p-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 p-0 h-auto text-primary hover:text-primary-hover"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Outlet
        </Button>

        <Card className="p-4 mb-4 bg-warning-light border-l-4 border-l-warning">
          <div className="flex items-center gap-3">
            <StickyNote className="w-5 h-5 text-warning" />
            <div>
              <h3 className="font-medium text-text-high">Visit Note</h3>
              <p className="text-text-medium text-sm">Record important observations or updates</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-card shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-text-high">Add Visit Note</h2>
            </div>

            {/* Category Selection */}
            <div className="space-y-3">
              <Label>Note Category</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.value}
                    type="button"
                    variant={category === cat.value ? "default" : "outline"}
                    onClick={() => setCategory(cat.value)}
                    className="h-10 text-xs"
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Note Input */}
            <div className="space-y-2">
              <Label htmlFor="note">Note Details</Label>
              <Textarea
                id="note"
                placeholder="Enter your observations, feedback, or important information about this visit..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <p className="text-text-low text-xs">{note.length}/500 characters</p>
            </div>

            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary-hover">
              <Save className="w-4 h-4 mr-2" />
              Save Note
            </Button>
          </form>
        </Card>

        {/* Recent Notes */}
        <Card className="p-4 mt-4 bg-gradient-card shadow-card">
          <h3 className="font-medium text-text-high mb-3">Recent Notes</h3>
          <div className="space-y-3">
            <div className="p-3 bg-background/50 rounded-lg border">
              <p className="text-text-medium text-sm">"Store owner requested more variety in snacks section. Competitor has new display."</p>
              <p className="text-text-low text-xs mt-1">Aug 3, 2024 - General</p>
            </div>
            <div className="p-3 bg-background/50 rounded-lg border">
              <p className="text-text-medium text-sm">"Low stock on cooking oil. Owner will place order next week."</p>
              <p className="text-text-low text-xs mt-1">Aug 1, 2024 - Stock Issue</p>
            </div>
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AddNote;
