'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EducationForm({ data, onChange }) {
  const defaultEntry = {
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
  };

  const [educations, setEducations] = useState(
    Array.isArray(data) && data.length > 0 ? data : [defaultEntry]
  );

  useEffect(() => {
    setEducations(
      Array.isArray(data) && data.length > 0 ? data : [defaultEntry]
    );
  }, [data]);

  const handleChange = (index, field, value) => {
    const updated = [...educations];
    updated[index] = { ...updated[index], [field]: value };
    setEducations(updated);
    onChange(updated);
  };

  const addEducation = () => {
    const updated = [...educations, defaultEntry];
    setEducations(updated);
    onChange(updated);
  };

  const removeEducation = (index) => {
    const updated = educations.filter((_, i) => i !== index);
    setEducations(updated);
    onChange(updated);
  };

  return (
    <div className="bg-[#1a1a1a] rounded-lg shadow-lg p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-white">Education</CardTitle>
        </CardHeader>
        <CardContent>
          {educations.map((edu, idx) => (
            <div key={idx} className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor={`institution-${idx}`}>Institution</Label>
                  <Input
                    id={`institution-${idx}`}
                    name="institution"
                    value={edu.institution || ''}
                    onChange={(e) => handleChange(idx, 'institution', e.target.value)}
                    placeholder="Enter school or university"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`degree-${idx}`}>Degree</Label>
                  <Input
                    id={`degree-${idx}`}
                    name="degree"
                    value={edu.degree || ''}
                    onChange={(e) => handleChange(idx, 'degree', e.target.value)}
                    placeholder="Enter degree"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`field-${idx}`}>Field of Study</Label>
                  <Input
                    id={`field-${idx}`}
                    name="field"
                    value={edu.field || ''}
                    onChange={(e) => handleChange(idx, 'field', e.target.value)}
                    placeholder="Enter field of study"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${idx}`}>Start Date</Label>
                  <Input
                    id={`startDate-${idx}`}
                    name="startDate"
                    value={edu.startDate || ''}
                    onChange={(e) => handleChange(idx, 'startDate', e.target.value)}
                    placeholder="e.g. Sep 2018"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${idx}`}>End Date</Label>
                  <Input
                    id={`endDate-${idx}`}
                    name="endDate"
                    value={edu.endDate || ''}
                    onChange={(e) => handleChange(idx, 'endDate', e.target.value)}
                    placeholder="e.g. Jun 2022 or Present"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`location-${idx}`}>Location</Label>
                  <Input
                    id={`location-${idx}`}
                    name="location"
                    value={edu.location || ''}
                    onChange={(e) => handleChange(idx, 'location', e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor={`description-${idx}`}>Description (optional)</Label>
                <Textarea
                  id={`description-${idx}`}
                  name="description"
                  value={edu.description || ''}
                  onChange={(e) => handleChange(idx, 'description', e.target.value)}
                  placeholder="Add any additional details..."
                  rows={3}
                />
              </div> */}
              <Button
                variant="destructive"
                size="sm"
                className="mt-2"
                onClick={() => removeEducation(idx)}
              >
                Remove Education
              </Button>
            </div>
          ))}
          <Button variant="outline" className="mt-4 w-full" onClick={addEducation}>
            + Add More Education
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
