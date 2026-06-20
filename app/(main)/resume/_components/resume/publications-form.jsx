"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash } from "lucide-react"

export default function PublicationsForm({ data, updateData }) {
  const [publications, setPublications] = useState(data || [])

  const addPublication = () => {
    const newPublication = {
      id: Date.now().toString(),
      title: "",
      publisher: "",
      authors: "",
      date: "",
      url: "",
      description: "",
    }

    const newPublications = [...publications, newPublication]
    setPublications(newPublications)
    updateData(newPublications)
  }

  const updatePublication = (index, field, value) => {
    const updatedPublications = [...publications]
    updatedPublications[index] = {
      ...updatedPublications[index],
      [field]: value,
    }

    setPublications(updatedPublications)
    updateData(updatedPublications)
  }

  const removePublication = (index) => {
    const updatedPublications = publications.filter((_, i) => i !== index)
    setPublications(updatedPublications)
    updateData(updatedPublications)
  }

  return (
    <div className="space-y-6">
      {publications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No publications added yet</p>
          <Button onClick={addPublication}>
            <Plus className="h-4 w-4 mr-2" />
            Add Publication
          </Button>
        </div>
      ) : (
        <>
          {publications.map((publication, index) => (
            <Card key={publication.id}>
              <CardHeader>
                <CardTitle className="text-lg">Publication {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${index}`}>Title</Label>
                  <Input
                    id={`title-${index}`}
                    value={publication.title}
                    onChange={(e) => updatePublication(index, "title", e.target.value)}
                    placeholder="Advances in Machine Learning Algorithms"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`publisher-${index}`}>Publisher/Journal</Label>
                    <Input
                      id={`publisher-${index}`}
                      value={publication.publisher}
                      onChange={(e) => updatePublication(index, "publisher", e.target.value)}
                      placeholder="Journal of Computer Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`date-${index}`}>Publication Date</Label>
                    <Input
                      id={`date-${index}`}
                      value={publication.date}
                      onChange={(e) => updatePublication(index, "date", e.target.value)}
                      placeholder="MM/YYYY"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`authors-${index}`}>Authors</Label>
                  <Input
                    id={`authors-${index}`}
                    value={publication.authors}
                    onChange={(e) => updatePublication(index, "authors", e.target.value)}
                    placeholder="John Doe, Jane Smith, et al."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`url-${index}`}>URL (Optional)</Label>
                  <Input
                    id={`url-${index}`}
                    value={publication.url}
                    onChange={(e) => updatePublication(index, "url", e.target.value)}
                    placeholder="https://doi.org/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Abstract/Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={publication.description}
                    onChange={(e) => updatePublication(index, "description", e.target.value)}
                    placeholder="Brief description or abstract of the publication..."
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="destructive" size="sm" onClick={() => removePublication(index)}>
                  <Trash className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}

          <div className="flex justify-center">
            <Button onClick={addPublication} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Publication
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
