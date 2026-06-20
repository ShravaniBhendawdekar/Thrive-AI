'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function CertificationsForm({ data, onChange }) {
  const [certifications, setCertifications] = useState(data || [])

  useEffect(() => {
    setCertifications(data || [])
  }, [data])

  const handleChange = (index, field, value) => {
    const updated = [...certifications]
    updated[index][field] = value
    setCertifications(updated)
    onChange(updated)
  }

  const addCertification = () => {
    const newCertification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      expiration: "",
      credentialId: "",
      url: "",
    }
    const updated = [...certifications, newCertification]
    setCertifications(updated)
    onChange(updated)
  }

  const removeCertification = (index) => {
    const updated = certifications.filter((_, i) => i !== index)
    setCertifications(updated)
    onChange(updated)
  }

  const isFormValid = (certification) => {
    // Example validation for required fields
    return certification.name && certification.issuer && certification.date;
  }

  return (
    <div className="space-y-6">
      {certifications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No certifications added yet.</p>
          <Button onClick={addCertification}>
            <Plus className="h-4 w-4 mr-2" />
            Add Certification
          </Button>
        </div>
      ) : (
        <>
          {certifications.map((certification, index) => (
            <Card key={certification.id}>
              <CardHeader>
                <CardTitle className="text-lg">Certification {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Certification Name</Label>
                    <Input
                      value={certification.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                      placeholder="AWS Certified Solutions Architect"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Issuing Organization</Label>
                    <Input
                      value={certification.issuer}
                      onChange={(e) => handleChange(index, "issuer", e.target.value)}
                      placeholder="Amazon Web Services"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Issue Date</Label>
                    <Input
                      value={certification.date}
                      onChange={(e) => handleChange(index, "date", e.target.value)}
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiration Date (Optional)</Label>
                    <Input
                      value={certification.expiration}
                      onChange={(e) => handleChange(index, "expiration", e.target.value)}
                      placeholder="MM/YYYY or No Expiration"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Credential ID (Optional)</Label>
                    <Input
                      value={certification.credentialId}
                      onChange={(e) => handleChange(index, "credentialId", e.target.value)}
                      placeholder="ABC123XYZ"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Credential URL (Optional)</Label>
                    <Input
                      value={certification.url}
                      onChange={(e) => handleChange(index, "url", e.target.value)}
                      placeholder="https://www.credential.net/..."
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeCertification(index)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remove this certification</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={!isFormValid(certification)}
                        onClick={() => handleChange(index, "isSubmitted", true)}
                      >
                        Submit
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ensure all required fields are filled before submitting</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardFooter>
            </Card>
          ))}

          <div className="flex justify-center">
            <Button onClick={addCertification} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
