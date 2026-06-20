"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TemplatesPage() {
  const [selectedRole, setSelectedRole] = useState("")

  const templates = [
    {
      id: "modern",
      name: "Modern",
      // image: "/placeholder.svg?height=300&width=220",
      bestFor: ["software-engineer", "designer", "marketing", "product-manager"],
    },
    {
      id: "professional",
      name: "Professional",
      // image: "/placeholder.svg?height=300&width=220",
      bestFor: ["finance", "legal", "executive", "business-analyst"],
    },
    {
      id: "creative",
      name: "Creative",
      // image: "/placeholder.svg?height=300&width=220",
      bestFor: ["designer", "artist", "marketing", "content-creator"],
    },
    {
      id: "minimal",
      name: "Minimal",
      // image: "/placeholder.svg?height=300&width=220",
      bestFor: ["software-engineer", "product-manager", "finance", "business-analyst"],
    },
    {
      id: "technical",
      name: "Technical",
      // image: "/placeholder.svg?height=300&width=220",
      bestFor: ["software-engineer", "data-scientist", "researcher", "it-professional"],
    },
    {
      id: "executive",
      name: "Executive",
      // image: "/placeholder.svg?height=300&width=220",
      bestFor: ["executive", "manager", "director", "consultant"],
    },
    {
      id: "academic",
      name: "Academic",
      // image: "/placeholder.svg?height=300&width=220",
      bestFor: ["researcher", "professor", "phd-candidate", "scientist"],
    },
  ]

  // Filter templates based on selected role, or show all if no role selected
  const filteredTemplates = selectedRole
    ? templates.filter((template) => template.bestFor.includes(selectedRole))
    : templates

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Choose Your Template</h1>
        <p className="text-gray-600 mb-8">Select a template that best represents your professional style.</p>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <h2 className="text-lg font-medium">I am a:</h2>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full sm:w-[250px]">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="software-engineer">Software Engineer</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="marketing">Marketing Professional</SelectItem>
                <SelectItem value="product-manager">Product Manager</SelectItem>
                <SelectItem value="data-scientist">Data Scientist</SelectItem>
                <SelectItem value="finance">Finance Professional</SelectItem>
                <SelectItem value="executive">Executive/Manager</SelectItem>
                <SelectItem value="researcher">Researcher/Academic</SelectItem>
                <SelectItem value="content-creator">Content Creator</SelectItem>
                <SelectItem value="legal">Legal Professional</SelectItem>
                <SelectItem value="healthcare">Healthcare Professional</SelectItem>
                <SelectItem value="it-professional">IT Professional</SelectItem>
                <SelectItem value="student">Student/Recent Graduate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {selectedRole && (
            <div className="mt-4 bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">
                Showing templates recommended for your role.
                <Button className="text-gray-900 underline ml-1" onClick={() => setSelectedRole("")}>
                  View all templates
                </Button>
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  {/* <img
                    src={template.image || "/placeholder.svg"}
                    alt={`${template.name} template`}
                    className="w-full h-auto"
                  /> */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                    <Link href={`/resume/builder?template=${template.id}&role=${selectedRole}`}>
                      <Button variant="secondary">Use This Template</Button>
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-gray-500">
                    {template.id === "technical"
                      ? "Perfect for technical roles"
                      : template.id === "creative"
                        ? "Ideal for creative professionals"
                        : template.id === "executive"
                          ? "Designed for leadership positions"
                          : template.id === "academic"
                            ? "Suited for academic careers"
                            : `Perfect for ${template.name.toLowerCase()} careers`}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
