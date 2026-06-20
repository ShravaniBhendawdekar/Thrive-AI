'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function JobSearchFilter() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [results, setResults] = useState([]);
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [experience, setExperience] = useState('');

  const toggleAdvanced = () => setShowAdvanced((prev) => !prev);

  const handleApplyFilters = () => {
    // This would trigger your job search results
    // Assuming you have logic here to generate job results
    // For now, let's simulate the behavior
    const fakeResults = [
      {
        portal: 'LinkedIn',
        icon: 'fab fa-linkedin',
        color: '#0077b5',
        title: `Search ${role} jobs in ${location}`,
        url: `https://www.linkedin.com/jobs/search/?keywords=${role}&location=${location}`,
      },
      {
        portal: 'Indeed',
        icon: 'fas fa-search-dollar',
        color: '#2164f3',
        title: `Search ${role} jobs in ${location}`,
        url: `https://www.indeed.com/jobs?q=${role}&l=${location}`,
      },
      {
        portal: 'Naukri',
        icon: 'fas fa-briefcase',
        color: '#4a90e2',
        title: `Search ${role} jobs in ${location}`,
        url: `https://www.naukri.com/${role}-jobs-in-${location}`,
      },
      {
        portal: 'Foundit',
        icon: 'fas fa-globe',
        color: '#ff6b6b',
        title: `Search ${role} jobs in ${location}`,
        url: `https://www.foundit.in/srp/results?query=${role}&locations=${location}`,
      },
      {
        portal: 'Instahyre',
        icon: 'fas fa-user-tie',
        color: '#00bfa5',
        title: `Search ${role} jobs in ${location}`,
        url: `https://www.instahyre.com/${role}-jobs-in-${location}`,
      },
    ];
    setResults(fakeResults); // Simulate applying filters and fetching results
  };

  return (
    <div className="w-full p-6 border rounded-lg shadow-sm bg-black space-y-6">
      <h2 className="text-xl font-semibold">Job Search Filters</h2>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-4">
          <Label htmlFor="keyword">Role</Label>
          <Input
            id="keyword"
            placeholder="e.g. Software Engineer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            className="space-y-6"
            placeholder="e.g. Remote, New York"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="jobType">Job Type</Label>
          <Select value={jobType} onValueChange={setJobType}> {/* Correctly binding the value */}
            <SelectTrigger id="jobType">
              <SelectValue className="space-y-6" placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-Time</SelectItem>
              <SelectItem value="part-time">Part-Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Toggle Advanced Filters */}
      <div className="space-y-4">
        <Button variant="ghost" className="flex items-center space-x-2" onClick={toggleAdvanced}>
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          <span className="font-medium">{showAdvanced ? 'Hide' : 'Show'} Advanced Filters</span>
        </Button>
      </div>

      {/* Advanced Filters */}
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300 overflow-hidden',
          showAdvanced ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        )}
      >
        <div className="space-y-4">
          <Label htmlFor="experience">Experience Level</Label>
          <Select value={experience} onValueChange={setExperience}> {/* Correctly binding the value */}
            <SelectTrigger id="experience">
              <SelectValue className="space-y-6" placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry</SelectItem>
              <SelectItem value="mid">Mid</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-4">
          <Label htmlFor="remoteOnly" className="flex items-center gap-2">
            <Checkbox id="remoteOnly" />
            Remote Only
          </Label>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="button" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </div>

      {/* Display job portal cards */}
      {results.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <div
              key={result.portal}
              className="bg-black p-6 rounded-lg shadow-md space-y-4 border-white"
              style={{ borderLeft: `2px solid ${result.color}` }}
            >
              <div className="flex items-center space-x-4">
                <i className={result.icon} style={{ color: result.color, fontSize: '24px' }} />
                <h3 className="text-lg font-semibold">{result.portal}</h3>
              </div>
              <p className="text-sm text-gray-600">{result.title}</p>
              <Button
                variant="outline"
                className="w-full text-white-600"
                style={{ borderColor: result.color }}
                onClick={() => window.open(result.url, '_blank')}
              >
                Go to {result.portal}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
