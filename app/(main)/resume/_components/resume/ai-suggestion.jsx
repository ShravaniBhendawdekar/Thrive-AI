"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Sparkles, Check, X } from "lucide-react"

export function AiSuggestion({ originalText, role, context = "", onApply, onCancel }) {
  const [suggestion, setSuggestion] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate AI suggestion generation
    // In a real implementation, this would call an AI endpoint
    const timer = setTimeout(() => {
      let improvedText = ""

      if (originalText && originalText.trim().length > 0) {
        // Enhance existing text
        improvedText = enhanceText(originalText, role, context)
      } else {
        // Generate new text based on role
        improvedText = generateTextForRole(role, context)
      }

      setSuggestion(improvedText)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [originalText, role, context])

  // Helper function to enhance existing text
  const enhanceText = (text, role, context) => {
    // This is a simplified example - in a real app, this would use an AI model
    if (text.length > 150) {
      // If text is already substantial, just return it with minor improvements
      return text.replace(/\.$/, "") + " with a proven track record of delivering high-quality results."
    }

    // Add role-specific enhancements
    const roleTitle = role
      ? role
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "professional"

    // Use context if available
    if (context) {
      return `${text} Demonstrated expertise in ${context}. Consistently delivered exceptional results through strategic thinking and attention to detail as a ${roleTitle}.`
    }

    return `${text} Experienced ${roleTitle} with a proven track record of delivering high-quality results. Skilled in collaboration, problem-solving, and adapting to changing priorities in fast-paced environments.`
  }

  // Helper function to generate text based on role
  const generateTextForRole = (role, context) => {
    if (!role) {
      return "Dedicated professional with a strong work ethic and commitment to excellence. Skilled in problem-solving, communication, and collaboration with cross-functional teams."
    }

    // Use context if available
    const contextPrefix = context ? `Specialized in ${context}. ` : ""

    const roleSpecificTexts = {
      "software-engineer": `${contextPrefix}Innovative Software Engineer with expertise in developing scalable applications and solving complex technical challenges. Proficient in modern programming languages and frameworks with a focus on writing clean, maintainable code. Experienced in collaborating with cross-functional teams to deliver high-quality software solutions that meet business requirements.`,

      "product-manager": `${contextPrefix}Strategic Product Manager with a track record of delivering user-centered products that drive business growth. Skilled in market analysis, roadmap development, and cross-functional team leadership. Adept at translating customer needs into product features and prioritizing development efforts to maximize value delivery.`,

      designer: `${contextPrefix}Creative Designer with a passion for crafting visually compelling and user-friendly experiences. Proficient in design tools and methodologies with a keen eye for detail and aesthetics. Experienced in collaborating with stakeholders to understand requirements and deliver designs that exceed expectations.`,

      marketing: `${contextPrefix}Results-driven Marketing Professional with expertise in developing and executing comprehensive marketing strategies that increase brand awareness and drive customer acquisition. Skilled in digital marketing, content creation, and campaign management with a data-driven approach to measuring success.`,

      "data-scientist": `${contextPrefix}Analytical Data Scientist with expertise in extracting actionable insights from complex datasets. Proficient in statistical analysis, machine learning, and data visualization techniques. Experienced in communicating technical findings to non-technical stakeholders and implementing data-driven solutions to business problems.`,

      executive: `${contextPrefix}Visionary Executive Leader with a proven track record of driving organizational growth and operational excellence. Skilled in strategic planning, team leadership, and change management. Experienced in identifying market opportunities and implementing innovative solutions to complex business challenges.`,

      researcher: `${contextPrefix}Dedicated Researcher with expertise in conducting rigorous research and publishing impactful findings. Proficient in research methodologies, data analysis, and academic writing. Committed to advancing knowledge in the field through methodical investigation and collaborative projects.`,
    }

    // Try to match the role with our predefined texts, or generate a generic one
    for (const [key, value] of Object.entries(roleSpecificTexts)) {
      if (role.toLowerCase().includes(key.toLowerCase())) {
        return value
      }
    }

    // Format the role title properly
    const roleTitle = role
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    return `${contextPrefix}Experienced ${roleTitle} with a proven track record of success in delivering exceptional results. Combines technical expertise with strong communication skills to drive projects forward and meet organizational objectives. Adept at problem-solving and collaborating with cross-functional teams to achieve common goals.`
  }

  return (
    <Card className="mt-4 border-dashed border-gray-300 bg-gray-50">
      <CardContent className="pt-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
            <p className="text-sm text-gray-600">Generating AI suggestion...</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center mb-2">
              <Sparkles className="h-4 w-4 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-600">AI Suggestion</span>
            </div>
            <p className="text-gray-800 bg-white p-3 rounded border border-gray-200">{suggestion}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
        <Button size="sm" onClick={() => onApply(suggestion)} disabled={loading}>
          <Check className="h-4 w-4 mr-1" />
          Apply Suggestion
        </Button>
      </CardFooter>
    </Card>
  )
}
