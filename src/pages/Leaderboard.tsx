import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { 
  Trophy,
  Medal,
  Award,
  TrendingUp,
  User,
  Crown
} from "lucide-react";

const Leaderboard = () => {
  const leaderboardData = [
    { 
      rank: 1, 
      name: "Amit Sharma", 
      score: 95420, 
      avatar: "AS", 
      zone: "North",
      trend: "+12%"
    },
    { 
      rank: 2, 
      name: "Priya Patel", 
      score: 89750, 
      avatar: "PP", 
      zone: "West",
      trend: "+8%"
    },
    { 
      rank: 3, 
      name: "Suresh Kumar", 
      score: 87300, 
      avatar: "SK", 
      zone: "South",
      trend: "+15%"
    },
    { 
      rank: 4, 
      name: "Anjali Singh", 
      score: 82100, 
      avatar: "AS", 
      zone: "East",
      trend: "+5%"
    },
    { 
      rank: 5, 
      name: "Rajesh Kumar", 
      score: 78950, 
      avatar: "RK", 
      zone: "West",
      trend: "+3%",
      isCurrentUser: true
    },
    { 
      rank: 6, 
      name: "Deepak Verma", 
      score: 76200, 
      avatar: "DV", 
      zone: "North",
      trend: "+7%"
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-warning" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-orange-500" />;
      default:
        return <span className="text-text-medium font-bold text-sm">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 3:
        return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
      default:
        return "bg-muted text-text-medium";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Leaderboard" showSync={true} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Competition Header */}
        <Card className="p-4 bg-gradient-primary text-white text-center shadow-elevated">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-6 h-6" />
            <h2 className="text-lg font-bold">Q3 Sales Contest</h2>
          </div>
          <p className="text-white/80 text-sm">July - September 2024</p>
          <p className="text-white/90 text-xs mt-1">Top performers across all zones</p>
        </Card>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {leaderboardData.slice(0, 3).map((player, index) => {
            const positions = [1, 0, 2]; // Second place in middle for podium effect
            const actualPlayer = leaderboardData[positions[index]];
            const heights = ["h-24", "h-32", "h-20"];
            
            return (
              <div key={actualPlayer.rank} className="text-center">
                <div className={`${heights[index]} bg-gradient-card rounded-t-lg shadow-card flex flex-col justify-end p-2 border-2 ${
                  actualPlayer.rank === 1 ? "border-warning" : 
                  actualPlayer.rank === 2 ? "border-gray-400" : "border-orange-500"
                }`}>
                  <div className="bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-primary font-bold text-sm">{actualPlayer.avatar}</span>
                  </div>
                  <div className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-bold ${getRankBadgeColor(actualPlayer.rank)}`}>
                    {getRankIcon(actualPlayer.rank)}
                  </div>
                </div>
                <div className="mt-2">
                  <p className="font-semibold text-text-high text-xs">{actualPlayer.name.split(' ')[0]}</p>
                  <p className="text-primary font-bold text-sm">₹{(actualPlayer.score / 1000).toFixed(0)}K</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Leaderboard */}
        <div className="space-y-2">
          {leaderboardData.map((player) => (
            <Card 
              key={player.rank} 
              className={`p-4 shadow-card transition-all duration-200 ${
                player.isCurrentUser 
                  ? "bg-primary-light border-2 border-primary ring-2 ring-primary/20" 
                  : "bg-gradient-card hover:shadow-elevated"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Rank */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRankBadgeColor(player.rank)}`}>
                    {player.rank <= 3 ? getRankIcon(player.rank) : `#${player.rank}`}
                  </div>

                  {/* Player Info */}
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">{player.avatar}</span>
                    </div>
                    <div>
                      <h3 className={`font-semibold ${player.isCurrentUser ? "text-primary" : "text-text-high"}`}>
                        {player.name}
                        {player.isCurrentUser && <span className="text-primary text-xs ml-2">(You)</span>}
                      </h3>
                      <p className="text-text-medium text-xs">{player.zone} Zone</p>
                    </div>
                  </div>
                </div>

                {/* Score and Trend */}
                <div className="text-right">
                  <p className={`font-bold text-lg ${player.isCurrentUser ? "text-primary" : "text-text-high"}`}>
                    ₹{(player.score / 1000).toFixed(0)}K
                  </p>
                  <div className="flex items-center gap-1 justify-end">
                    <TrendingUp className="w-3 h-3 text-success" />
                    <span className="text-success text-xs font-medium">{player.trend}</span>
                  </div>
                </div>
              </div>

              {player.isCurrentUser && (
                <div className="mt-3 pt-3 border-t border-primary/20">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-primary font-bold text-sm">8</p>
                      <p className="text-text-medium text-xs">Orders Today</p>
                    </div>
                    <div>
                      <p className="text-primary font-bold text-sm">78%</p>
                      <p className="text-text-medium text-xs">Target Achieved</p>
                    </div>
                    <div>
                      <p className="text-primary font-bold text-sm">12</p>
                      <p className="text-text-medium text-xs">Outlets Visited</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Motivation Card */}
        <Card className="p-4 bg-gradient-success text-white text-center shadow-elevated">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">🚀</span>
            <h4 className="font-semibold">Keep Going!</h4>
          </div>
          <p className="text-white/90 text-sm">
            Just ₹3,150 more to reach 4th position!
          </p>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Leaderboard;