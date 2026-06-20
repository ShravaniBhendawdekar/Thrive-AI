'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sparkles } from 'lucide-react';

export default function ExperienceForm({ data, onChange }) {
  const [formData, setFormData] = useState(data || []);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    setFormData(data || []);
  }, [data]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedData = [...formData];
    updatedData[index] = { ...updatedData[index], [name]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const handleAIEnhance = async (index) => {
    if (!formData[index].description) return;
    setLoadingAI(true);

    try {
      const res = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: formData[index].description }),
      });
      const data = await res.json();
      if (data.result) {
        const updatedData = [...formData];
        updatedData[index].description = data.result;
        setFormData(updatedData);
        onChange(updatedData);
      }
    } catch (error) {
      console.error('Error enhancing description:', error);
    } finally {
      setLoadingAI(false);
    }
  };

  const addExperience = () => {
    const newExperience = {
      company: '',
      position: '', // changed from 'role' to 'position'
      startDate: '',
      endDate: '',
      location: '',
      description: '',
    };
    const updatedData = [...formData, newExperience];
    setFormData(updatedData);
    onChange(updatedData);
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-white">Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {formData.map((experience, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="space-y-2">
                  <Label htmlFor={`company-${index}`}>Company</Label>
                  <Input
                    id={`company-${index}`}
                    name="company"
                    value={experience.company || ""} // Default to empty string if undefined
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`position-${index}`}>Position</Label>
                  <Input
                    id={`position-${index}`}
                    name="position"
                    value={experience.position || ""} // Default to empty string if undefined
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter your job title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    name="startDate"
                    value={experience.startDate || ""} // Default to empty string if undefined
                    onChange={(e) => handleChange(index, e)}
                    placeholder="e.g. Jan 2022"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    name="endDate"
                    value={experience.endDate || ""} // Default to empty string if undefined
                    onChange={(e) => handleChange(index, e)}
                    placeholder="e.g. Dec 2023 or Present"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`location-${index}`}>Location</Label>
                  <Input
                    id={`location-${index}`}
                    name="location"
                    value={experience.location || ""} // Default to empty string if undefined
                    onChange={(e) => handleChange(index, e)}
                    placeholder="City, Country"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    name="description"
                    value={experience.description || ""} // Default to empty string if undefined
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Describe your role and responsibilities"
                    rows={4}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAIEnhance(index)}
                          disabled={loadingAI}
                        >
                          <Sparkles className="h-4 w-4 mr-1" />
                          {loadingAI ? 'Enhancing...' : 'Improve with AI'}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Get AI suggestions to improve your description</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={addExperience}
            >
              + Add More Experience
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
