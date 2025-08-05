
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  ClipboardList,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const Survey = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const surveyQuestions = [
    {
      id: "1",
      type: "radio",
      question: "Is competitor X's product visible on shelf?",
      options: ["Yes, prominently displayed", "Yes, but limited visibility", "No, not visible"]
    },
    {
      id: "2", 
      type: "radio",
      question: "How would you rate the outlet's cleanliness?",
      options: ["Excellent", "Good", "Average", "Poor"]
    },
    {
      id: "3",
      type: "radio", 
      question: "Is the outlet interested in new product launches?",
      options: ["Very interested", "Somewhat interested", "Not interested"]
    },
    {
      id: "4",
      type: "text",
      question: "Any additional feedback or observations?",
      placeholder: "Enter your observations..."
    }
  ];

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const unanswered = surveyQuestions.slice(0, -1).find(q => !answers[q.id]);
    if (unanswered) {
      toast({
        title: "Incomplete Survey",
        description: "Please answer all required questions",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Survey Completed",
      description: "Thank you for your feedback!",
    });
    
    navigate(-1);
  };

  const currentQ = surveyQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / surveyQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Survey" />

      <div className="max-w-md mx-auto p-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 p-0 h-auto text-primary hover:text-primary-hover"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Outlet
        </Button>

        {/* Progress */}
        <Card className="p-4 mb-4 bg-primary-light border-l-4 border-l-primary">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-medium text-text-high">Outlet Survey</h3>
              <p className="text-text-medium text-sm">Question {currentQuestion + 1} of {surveyQuestions.length}</p>
            </div>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </Card>

        {/* Question Card */}
        <Card className="p-6 bg-gradient-card shadow-card mb-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                {currentQuestion + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text-high text-lg leading-relaxed">
                  {currentQ.question}
                </h3>
              </div>
            </div>

            {currentQ.type === "radio" && (
              <RadioGroup
                value={answers[currentQ.id] || ""}
                onValueChange={(value) => handleAnswerChange(currentQ.id, value)}
                className="space-y-3 mt-4"
              >
                {currentQ.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-background/50">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQ.type === "text" && (
              <div className="mt-4">
                <Textarea
                  placeholder={currentQ.placeholder}
                  value={answers[currentQ.id] || ""}
                  onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>
            )}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentQuestion > 0 && (
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              className="flex-1"
            >
              Previous
            </Button>
          )}
          
          {currentQuestion < surveyQuestions.length - 1 ? (
            <Button 
              onClick={handleNext}
              disabled={!answers[currentQ.id] && currentQ.type === "radio"}
              className="flex-1"
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-success hover:bg-success/90"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Survey
            </Button>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Survey;
