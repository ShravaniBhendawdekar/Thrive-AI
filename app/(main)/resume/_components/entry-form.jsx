// 'use client';
// import { useState } from 'react';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { ollamaCompletion } from '@/utils/OllamaAIModal';

// export default function EntryForm() {
//   const [resume, setResume] = useState({
//     name: '',
//     role: '',
//     summary: '',
//     experience: '',
//     skills: '',
//   });

//   const handleChange = (field, value) => {
//     setResume(prev => ({ ...prev, [field]: value }));
//   };

//   const generateWithAI = async (field) => {
//     const prompt = `Generate a professional ${field} section for a resume. Current data: ${JSON.stringify(resume)}`;
//     try {
//       const response = await ollamaCompletion(prompt);
//       setResume(prev => ({ ...prev, [field]: response.trim() }));
//     } catch (error) {
//       console.error('Error generating with AI:', error);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <Input placeholder="Name" value={resume.name} onChange={(e) => handleChange('name', e.target.value)} />
//       <Input placeholder="Role" value={resume.role} onChange={(e) => handleChange('role', e.target.value)} />

//       <div className="space-y-2">
//         <Textarea placeholder="Summary" value={resume.summary} onChange={(e) => handleChange('summary', e.target.value)} />
//         <Button onClick={() => generateWithAI('summary')} variant="secondary">AI Suggest Summary</Button>
//       </div>

//       <div className="space-y-2">
//         <Textarea placeholder="Experience" value={resume.experience} onChange={(e) => handleChange('experience', e.target.value)} />
//         <Button onClick={() => generateWithAI('experience')} variant="secondary">AI Suggest Experience</Button>
//       </div>

//       <div className="space-y-2">
//         <Textarea placeholder="Skills" value={resume.skills} onChange={(e) => handleChange('skills', e.target.value)} />
//         <Button onClick={() => generateWithAI('skills')} variant="secondary">AI Suggest Skills</Button>
//       </div>

//       <Button className="mt-4">Save</Button>
//     </div>
//   );
// }
