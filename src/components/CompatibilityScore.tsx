
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Users, MessageCircle, Globe, Brain, Utensils } from 'lucide-react';
import { CompatibilityScore } from '@/utils/matchingAlgorithm';

interface CompatibilityScoreProps {
  score: CompatibilityScore;
  showDetails?: boolean;
}

const CompatibilityScoreComponent: React.FC<CompatibilityScoreProps> = ({ 
  score, 
  showDetails = false 
}) => {
  const getScoreColor = (value: number) => {
    if (value >= 0.8) return 'text-green-600';
    if (value >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (value: number) => {
    if (value >= 0.9) return 'Excellent';
    if (value >= 0.8) return 'Great';
    if (value >= 0.7) return 'Good';
    if (value >= 0.6) return 'Fair';
    return 'Low';
  };

  const overallPercentage = Math.round(score.overall * 100);

  return (
    <Card className="cave-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="font-semibold cave-font text-amber-900">
              {overallPercentage}% Match
            </span>
          </div>
          <Badge className={`cave-badge ${getScoreColor(score.overall)}`}>
            {getScoreLabel(score.overall)}
          </Badge>
        </div>

        <Progress value={overallPercentage} className="mb-3" />

        <div className="space-y-2 mb-3">
          {score.reasons.slice(0, 2).map((reason, index) => (
            <p key={index} className="text-sm cave-text text-amber-700">
              • {reason}
            </p>
          ))}
        </div>

        {showDetails && (
          <div className="space-y-3 mt-4 pt-3 border-t border-orange-200">
            <h4 className="font-semibold cave-font text-amber-900 text-sm">
              Compatibility Breakdown
            </h4>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>Hobbies</span>
                </div>
                <span className={getScoreColor(score.breakdown.hobbies)}>
                  {Math.round(score.breakdown.hobbies * 100)}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3" />
                  <span>Passions</span>
                </div>
                <span className={getScoreColor(score.breakdown.passions)}>
                  {Math.round(score.breakdown.passions * 100)}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Globe className="w-3 h-3" />
                  <span>Languages</span>
                </div>
                <span className={getScoreColor(score.breakdown.languages)}>
                  {Math.round(score.breakdown.languages * 100)}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Brain className="w-3 h-3" />
                  <span>Personality</span>
                </div>
                <span className={getScoreColor(score.breakdown.personality)}>
                  {Math.round(score.breakdown.personality * 100)}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>Lifestyle</span>
                </div>
                <span className={getScoreColor(score.breakdown.lifestyle)}>
                  {Math.round(score.breakdown.lifestyle * 100)}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Utensils className="w-3 h-3" />
                  <span>Diet</span>
                </div>
                <span className={getScoreColor(score.breakdown.dietary)}>
                  {Math.round(score.breakdown.dietary * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompatibilityScoreComponent;
