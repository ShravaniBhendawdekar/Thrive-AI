'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipTrigger, TooltipProvider, TooltipContent } from '@/components/ui/tooltip';
import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SkillsForm({ data, onChange }) {
  const defaultSkills = [''];
  const [skills, setSkills] = useState(
    Array.isArray(data) && data.length > 0 ? data : defaultSkills
  );
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    setSkills(Array.isArray(data) && data.length > 0 ? data : defaultSkills);
  }, [data]);

  const handleChange = (index, value) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
    onChange(updated);
  };

  const addSkill = () => {
    const updated = [...skills, ''];
    setSkills(updated);
    onChange(updated);
  };

  const removeSkill = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
    onChange(updated.length ? updated : []);
  };

  const handleAIEnhance = async () => {
    setLoadingAI(true);
    try {
      // Join all current skills as input for Gemini
      const combinedInput = skills.filter(Boolean).join(', ');

      const res = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: combinedInput || 'List relevant skills for my profile' }),
      });

      const result = await res.json();
      if (result?.result) {
        // Assuming API returns comma-separated skill list
        const suggested = result.result.split(',').map(s => s.trim()).filter(Boolean);
        setSkills(suggested);
        onChange(suggested);
      }
    } catch (err) {
      console.error('Error suggesting skills:', err);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] rounded-lg shadow-lg p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-xl text-white">Skills</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAIEnhance}
                    disabled={loadingAI}
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    {loadingAI ? 'Generating...' : 'Suggest with AI'}
                  </Button> */}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Get AI suggestions for your skills</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          {skills.map((skill, idx) => (
            <div key={idx} className="flex items-center space-x-2 mb-3">
              <Input
                value={skill || ''}
                onChange={e => handleChange(idx, e.target.value)}
                placeholder="Enter a skill"
                className="flex-1 bg-[#2a2a2a] text-white border border-gray-700"
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeSkill(idx)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            className="mt-2 w-full"
            onClick={addSkill}
          >
            + Add More Skill
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
