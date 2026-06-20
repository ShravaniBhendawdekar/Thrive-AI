'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipTrigger, TooltipProvider, TooltipContent } from '@/components/ui/tooltip';
import { Plus, Trash, Sparkles } from 'lucide-react';
import { AiSuggestion } from './ai-suggestion';

export default function ProjectsForm({ data, onChange, role }) {
  const [projects, setProjects] = useState(data || []);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  // Sync incoming data into local state
  useEffect(() => {
    setProjects(data || []);
  }, [data]);

  // Generic change handler
  function handleChange(index, field, value) {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
    onChange(updated);
  }

  // Add new project
  function addProject() {
    const empty = {
      title: '',
      technologies: '',
      link: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    const updated = [...projects, empty];
    setProjects(updated);
    onChange(updated);
  }

  // Remove a project
  function removeProject(index) {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
    onChange(updated);
  }

  // Trigger AI suggestion
  function handleSuggestionRequest(index) {
    setCurrentIndex(index);
    setShowSuggestion(true);
  }

  // Apply AI suggestion
  function applySuggestion(suggestion) {
    if (currentIndex === null) return;
    handleChange(currentIndex, 'description', suggestion);
    setShowSuggestion(false);
  }

  return (
    <div className="space-y-6">
      {projects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">No projects added yet</p>
        </div>
      ) : (
        projects.map((proj, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>Project {idx + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Label htmlFor={`title-${idx}`}>Title</Label>
                  <Input
                    id={`title-${idx}`}
                    name="title"
                    value={proj.title || ''}
                    onChange={e => handleChange(idx, 'title', e.target.value)}
                    placeholder="Project title"
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor={`tech-${idx}`}>Technologies</Label>
                  <Input
                    id={`tech-${idx}`}
                    name="technologies"
                    value={proj.technologies || ''}
                    onChange={e => handleChange(idx, 'technologies', e.target.value)}
                    placeholder="e.g. React, Node.js"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-4">
                  <Label htmlFor={`link-${idx}`}>Link</Label>
                  <Input
                    id={`link-${idx}`}
                    name="link"
                    value={proj.link || ''}
                    onChange={e => handleChange(idx, 'link', e.target.value)}
                    placeholder="Project URL"
                  />
                </div>
                {/* <div>
                  <Label htmlFor={`start-${idx}`}>Start Date</Label>
                  <Input
                    id={`start-${idx}`}
                    name="startDate"
                    value={proj.startDate || ''}
                    onChange={e => handleChange(idx, 'startDate', e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div>
                  <Label htmlFor={`end-${idx}`}>End Date</Label>
                  <Input
                    id={`end-${idx}`}
                    name="endDate"
                    value={proj.endDate || ''}
                    onChange={e => handleChange(idx, 'endDate', e.target.value)}
                    placeholder="MM/YYYY or Present"
                  />
                </div> */}
              </div>

              <div className="space-y-4">
                <Label htmlFor={`desc-${idx}`}>Description</Label>
                <Textarea
                  id={`desc-${idx}`}
                  name="description"
                  value={proj.description || ''}
                  onChange={e => handleChange(idx, 'description', e.target.value)}
                  placeholder="Describe the project..."
                  rows={4}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSuggestionRequest(idx)}
                      >
                        <Sparkles className="h-4 w-4 mr-1" /> Improve with AI
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Get AI suggestions to improve description
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="destructive" size="sm" onClick={() => removeProject(idx)}>
                <Trash className="h-4 w-4 mr-1" /> Remove
              </Button>
            </CardFooter>
          </Card>
        ))
      )}

      <div className="flex justify-center">
        <Button onClick={addProject} variant="outline">
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </div>

      {showSuggestion && currentIndex !== null && (
        <AiSuggestion
          originalText={projects[currentIndex].description}
          role={role}
          context={`Project: ${projects[currentIndex].title}`}
          onApply={applySuggestion}
          onCancel={() => setShowSuggestion(false)}
        />
      )}
    </div>
  );
}
