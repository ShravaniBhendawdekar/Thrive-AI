"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash } from "lucide-react"

export default function ReferencesForm({ data, updateData }) {
  const [references, setReferences] = useState(data || [])

  const addReference = () => {
    const newReference = {
      id: Date.now().toString(),
      name: "",
      title: "",
      company: "",
      email: "",
      phone: "",
      relationship: "",
    }

    const newReferences = [...references, newReference]
    setReferences(newReferences)
    updateData(newReferences)
  }

  const updateReference = (index, field, value) => {
    const updatedReferences = [...references]
    updatedReferences[index] = {
      ...updatedReferences[index],
      [field]: value,
    }

    setReferences(updatedReferences)
    updateData(updatedReferences)
  }

  const removeReference = (index) => {
    const updatedReferences = references.filter((_, i) => i !== index)
    setReferences(updatedReferences)
    updateData(updatedReferences)
  }

  return (
    <div className="space-y-6">
      {references.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No references added yet</p>
          <Button onClick={addReference}>
            <Plus className="h-4 w-4 mr-2" />
            Add Reference
          </Button>
        </div>
      ) : (
        <>
          {references.map((reference, index) => (
            <Card key={reference.id}>
              <CardHeader>
                <CardTitle className="text-lg">Reference {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${index}`}>Full Name</Label>
                    <Input
                      id={`name-${index}`}
                      value={reference.name}
                      onChange={(e) => updateReference(index, "name", e.target.value)}
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`title-${index}`}>Title</Label>
                    <Input
                      id={`title-${index}`}
                      value={reference.title}
                      onChange={(e) => updateReference(index, "title", e.target.value)}
                      placeholder="Senior Manager"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`company-${index}`}>Company</Label>
                  <Input
                    id={`company-${index}`}
                    value={reference.company}
                    onChange={(e) => updateReference(index, "company", e.target.value)}
                    placeholder="ABC Corporation"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`email-${index}`}>Email</Label>
                    <Input
                      id={`email-${index}`}
                      value={reference.email}
                      onChange={(e) => updateReference(index, "email", e.target.value)}
                      placeholder="jane.smith@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`phone-${index}`}>Phone</Label>
                    <Input
                      id={`phone-${index}`}
                      value={reference.phone}
                      onChange={(e) => updateReference(index, "phone", e.target.value)}
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`relationship-${index}`}>Relationship</Label>
                  <Input
                    id={`relationship-${index}`}
                    value={reference.relationship}
                    onChange={(e) => updateReference(index, "relationship", e.target.value)}
                    placeholder="Former Manager, Colleague, etc."
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="destructive" size="sm" onClick={() => removeReference(index)}>
                  <Trash className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}

          <div className="flex justify-center">
            <Button onClick={addReference} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Reference
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
