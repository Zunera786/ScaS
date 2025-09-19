import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, FolderOpen, Calendar, MapPin, TrendingUp, Download, Eye } from "lucide-react";

const Projects = () => {
  const [projects] = useState([
    {
      id: 1,
      name: "Wheat Crop 2024 - Field A",
      crop: "Wheat",
      area: "5 acres",
      location: "Maharashtra",
      startDate: "2024-01-15",
      expectedHarvest: "2024-05-20",
      progress: 75,
      status: "Growing",
      soilReports: 2,
      diseaseReports: 1,
      fertilizerPlans: 3,
      weatherLogs: 45,
      estimatedYield: "25 quintals/acre",
      investmentSoFar: "Rs 45,000"
    },
    {
      id: 2,
      name: "Tomato Greenhouse Project",
      crop: "Tomato",
      area: "2 acres",
      location: "Karnataka",
      startDate: "2024-03-01",
      expectedHarvest: "2024-07-15",
      progress: 45,
      status: "Flowering",
      soilReports: 1,
      diseaseReports: 3,
      fertilizerPlans: 4,
      weatherLogs: 20,
      estimatedYield: "80 quintals/acre",
      investmentSoFar: "Rs 78,000"
    },
    {
      id: 3,
      name: "Cotton Field - Monsoon Crop",
      crop: "Cotton",
      area: "8 acres",
      location: "Gujarat",
      startDate: "2024-06-10",
      expectedHarvest: "2024-11-30",
      progress: 25,
      status: "Vegetative",
      soilReports: 1,
      diseaseReports: 0,
      fertilizerPlans: 2,
      weatherLogs: 15,
      estimatedYield: "18 quintals/acre",
      investmentSoFar: "Rs 32,000"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "growing": return "default";
      case "flowering": return "secondary";
      case "vegetative": return "outline";
      case "harvesting": return "destructive";
      default: return "outline";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    if (progress >= 25) return "bg-blue-500";
    return "bg-gray-400";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Crop Projects</h1>
            <p className="text-xl text-muted-foreground">
              Track your farming projects from seed to harvest with comprehensive management
            </p>
          </div>
          <Button variant="hero" size="lg">
            <Plus className="h-5 w-5" />
            New Project
          </Button>
        </div>

        {/* Project Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardContent className="p-6 text-center">
              <FolderOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{projects.length}</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm text-muted-foreground">Total Acres</div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-earth mx-auto mb-2" />
              <div className="text-2xl font-bold">Rs 1.55L</div>
              <div className="text-sm text-muted-foreground">Total Investment</div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">123</div>
              <div className="text-sm text-muted-foreground">Expected Quintals</div>
            </CardContent>
          </Card>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <Card key={project.id} className="animate-slide-up hover:shadow-medium transition-shadow" 
                  style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
                    <CardDescription className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {project.location} • {project.area}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Started: {new Date(project.startDate).toLocaleDateString()}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Progress Section */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Project Progress</span>
                        <span className="text-sm text-muted-foreground">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-3" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Expected Harvest</p>
                        <p className="font-medium">{new Date(project.expectedHarvest).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Investment</p>
                        <p className="font-medium text-earth">{project.investmentSoFar}</p>
                      </div>
                    </div>
                  </div>

                  {/* Reports Summary */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Project Reports</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Soil Reports</span>
                        <Badge variant="outline">{project.soilReports}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Disease Reports</span>
                        <Badge variant="outline">{project.diseaseReports}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Fertilizer Plans</span>
                        <Badge variant="outline">{project.fertilizerPlans}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Weather Logs</span>
                        <Badge variant="outline">{project.weatherLogs}</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Expected Outcomes */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Expected Outcomes</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                        <p className="text-sm font-medium text-success">Estimated Yield</p>
                        <p className="text-lg font-bold text-success">{project.estimatedYield}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-4 w-4" />
                          Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create New Project */}
        <Card className="mt-8 border-dashed border-2 border-primary/30 hover:border-primary/50 transition-colors">
          <CardContent className="p-12 text-center">
            <FolderOpen className="h-16 w-16 text-primary/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Start New Crop Project</h3>
            <p className="text-muted-foreground mb-6">
              Create a comprehensive project to track your crop from planting to harvest
            </p>
            <Button variant="hero" size="lg">
              <Plus className="h-5 w-5" />
              Create New Project
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Projects;