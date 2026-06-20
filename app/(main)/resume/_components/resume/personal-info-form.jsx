'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sparkles } from 'lucide-react';

export default function PersonalInfoForm({ data, onChange }) {
  const [formData, setFormData] = useState(data || {});
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onChange(updatedData); // Send to parent
  };

  const handleAIEnhance = async () => {
    if (!formData.summary) return;
    setLoadingAI(true);

    try {
      const res = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: formData.summary }),
      });
      const data = await res.json();
      if (data.result) {
        setFormData({ ...formData, summary: data.result });
        onChange({ ...formData, summary: data.result }); // Send updated summary to parent
      }
    } catch (error) {
      console.error('Error enhancing summary:', error);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="bg-gray-900  rounded-lg shadow-xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-white">Personal Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="space-y-2">
              <Label htmlFor="name" >Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="spacy-"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                placeholder="Enter your professional title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
                placeholder="Enter your location"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-3">
                <Label htmlFor="summary">Professional Summary</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleAIEnhance}
                        disabled={loadingAI}
                      >
                        <Sparkles className="h-4 w-4 mr-1" />
                        {loadingAI ? 'Enhancing...' : ' Improve with AI'}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Get AI suggestions to improve your professional summary</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                id="summary"
                name="summary"
                value={formData.summary || ''}
                onChange={handleChange}
                placeholder="Write a brief summary about yourself..."
                rows={5}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
