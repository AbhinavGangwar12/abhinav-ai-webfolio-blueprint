
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, Pie } from "recharts";

const Index = () => {
  const [codingStats, setCodingStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch coding stats
    const fetchStats = async () => {
      try {
        // Simulate API call to fetch Codolio stats
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data based on https://codolio.com/profile/nav_12
        const data = {
          languages: [
            { name: 'Python', percentage: 45, color: '#3572A5' },
            { name: 'JavaScript', percentage: 25, color: '#F7DF1E' },
            { name: 'C++', percentage: 15, color: '#00599C' },
            { name: 'Java', percentage: 10, color: '#B07219' },
            { name: 'Other', percentage: 5, color: '#aaaaaa' }
          ],
          activityOverview: {
            totalCommits: 527,
            totalProjects: 12,
            currentStreak: 7,
            contributions: 873
          },
          contributionTimeline: [
            { month: 'Jan', contributions: 30 },
            { month: 'Feb', contributions: 45 },
            { month: 'Mar', contributions: 62 },
            { month: 'Apr', contributions: 78 },
            { month: 'May', contributions: 56 },
            { month: 'Jun', contributions: 89 },
            { month: 'Jul', contributions: 91 },
            { month: 'Aug', contributions: 85 },
            { month: 'Sep', contributions: 110 },
            { month: 'Oct', contributions: 95 },
            { month: 'Nov', contributions: 66 },
            { month: 'Dec', contributions: 71 }
          ]
        };
        
        setCodingStats(data);
      } catch (error) {
        console.error("Error fetching coding stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hi, I'm <span className="text-blue-500">Abhinav Gangwar</span>
              </h1>
              <h2 className="text-2xl md:text-3xl mb-6 text-gray-700">Aspiring AI/ML Developer</h2>
              <p className="text-lg text-gray-600 mb-8">
                Building intelligent systems to solve real-world problems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#projects" 
                  className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-center"
                >
                  View My Work
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors text-center"
                >
                  Get In Touch
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-64 h-64 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 p-1">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <svg 
                    className="w-24 h-24 text-gray-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coding Stats Section */}
      <section id="coding-stats" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 relative inline-block">
            Coding Stats
            <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-blue-500 -mb-2"></span>
          </h2>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="mb-4 text-gray-600">Loading coding stats...</p>
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Languages Card */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-6 relative inline-block pb-2">
                  Languages
                  <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-blue-500"></span>
                </h3>
                <div className="h-64">
                  {codingStats && (
                    <ChartContainer 
                      className="h-full" 
                      config={{
                        Python: { color: "#3572A5" },
                        JavaScript: { color: "#F7DF1E" },
                        "C++": { color: "#00599C" },
                        Java: { color: "#B07219" },
                        Other: { color: "#aaaaaa" },
                      }}
                    >
                      <Pie 
                        data={codingStats.languages}
                        dataKey="percentage"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      />
                      <ChartTooltip>
                        <ChartTooltipContent />
                      </ChartTooltip>
                    </ChartContainer>
                  )}
                </div>
              </div>
              
              {/* Activity Overview Card */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-6 relative inline-block pb-2">
                  Activity Overview
                  <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-blue-500"></span>
                </h3>
                {codingStats && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-md text-center">
                      <div className="text-2xl font-bold text-blue-800 font-mono">
                        {codingStats.activityOverview.totalCommits}
                      </div>
                      <div className="text-sm text-gray-600">Total Commits</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-md text-center">
                      <div className="text-2xl font-bold text-blue-800 font-mono">
                        {codingStats.activityOverview.totalProjects}
                      </div>
                      <div className="text-sm text-gray-600">Projects</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-md text-center">
                      <div className="text-2xl font-bold text-blue-800 font-mono">
                        {codingStats.activityOverview.currentStreak}
                      </div>
                      <div className="text-sm text-gray-600">Current Streak</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-md text-center">
                      <div className="text-2xl font-bold text-blue-800 font-mono">
                        {codingStats.activityOverview.contributions}
                      </div>
                      <div className="text-sm text-gray-600">Contributions</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Contribution Timeline */}
              <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-6 relative inline-block pb-2">
                  Contribution Timeline
                  <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-blue-500"></span>
                </h3>
                <div className="h-64">
                  {codingStats && (
                    <ChartContainer 
                      className="h-full" 
                      config={{
                        contributions: { color: "#33C3F0" },
                      }}
                    >
                      <Line 
                        data={codingStats.contributionTimeline} 
                        dataKey="contributions"
                        stroke="#33C3F0"
                        strokeWidth={2}
                        dot={{ fill: "#33C3F0" }}
                      />
                      <ChartTooltip>
                        <ChartTooltipContent />
                      </ChartTooltip>
                    </ChartContainer>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Additional sections would be added here */}
      
    </div>
  );
};

export default Index;
