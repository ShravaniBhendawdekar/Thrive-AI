"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash } from "lucide-react"

export default function LanguagesForm({ data, updateData }) {
  const [languages, setLanguages] = useState(data || [])

  const proficiencyLevels = ["Native/Bilingual", "Fluent", "Professional Working", "Limited Working", "Elementary"]

  const addLanguage = () => {
    const newLanguage = {
      id: Date.now().toString(),
      language: "",
      proficiency: "",
    }

    const newLanguages = [...languages, newLanguage]
    setLanguages(newLanguages)
    updateData(newLanguages)
  }

  const updateLanguage = (index, field, value) => {
    const updatedLanguages = [...languages]
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value,
    }

    setLanguages(updatedLanguages)
    updateData(updatedLanguages)
  }

  const removeLanguage = (index) => {
    const updatedLanguages = languages.filter((_, i) => i !== index)
    setLanguages(updatedLanguages)
    updateData(updatedLanguages)
  }

  return (
    <div className="space-y-6">
      {languages.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No languages added yet</p>
          <Button onClick={addLanguage}>
            <Plus className="h-4 w-4 mr-2" />
            Add Language
          </Button>
        </div>
      ) : (
        <>
          {languages.map((language, index) => (
            <Card key={language.id}>
              <CardHeader>
                <CardTitle className="text-lg">Language {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`language-${index}`}>Language</Label>
                    <Input
                      id={`language-${index}`}
                      value={language.language}
                      onChange={(e) => updateLanguage(index, "language", e.target.value)}
                      placeholder="English, Spanish, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`proficiency-${index}`}>Proficiency Level</Label>
                    <Select
                      value={language.proficiency}
                      onValueChange={(value) => updateLanguage(index, "proficiency", value)}
                    >
                      <SelectTrigger id={`proficiency-${index}`}>
                        <SelectValue placeholder="Select proficiency level" />
                      </SelectTrigger>
                      <SelectContent>
                        {proficiencyLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="destructive" size="sm" onClick={() => removeLanguage(index)}>
                  <Trash className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}

          <div className="flex justify-center">
            <Button onClick={addLanguage} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Language
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
