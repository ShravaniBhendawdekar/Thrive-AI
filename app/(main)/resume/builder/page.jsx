"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Download, Save } from "lucide-react"
import { toPng } from "html-to-image"
import { jsPDF } from "jspdf"

import PersonalInfoForm from "@/app/(main)/resume/_components/resume/personal-info-form"
import ExperienceForm from "@/app/(main)/resume/_components/resume/experience-form"
import EducationForm from "@/app/(main)/resume/_components/resume/education-form"
import SkillsForm from "@/app/(main)/resume/_components/resume/skills-form"
import ProjectsForm from "@/app/(main)/resume/_components/resume/projects-form"
import CertificationsForm from "@/app/(main)/resume/_components/resume/certifications-form"
import ResumePreview from "@/app/(main)/resume/_components/resume/resume-preview"
import { getRoleSpecificSections } from "@/lib/role-utils"

export default function BuilderPage() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template") || "modern"
  const role = searchParams.get("role") || ""

  const [resumeData, setResumeData] = useState({
    personalInfo: { name: "", title: "", email: "", phone: "", location: "", linkedin: "", website: "", summary: "" },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    publications: [],
    languages: [],
    references: [],
  })

  const [activeSection, setActiveSection] = useState("Personal Info")
  const sections = getRoleSpecificSections(role)

  const updateResumeData = (section, data) => {
    setResumeData((prev) => ({ ...prev, [section]: data }))
  }

  const downloadResume = async () => {
    const node = document.getElementById("resume-preview")
    if (!node) {
      console.error("Could not find #resume-preview")
      return
    }

    try {
      // 1) render to PNG
      const dataUrl = await toPng(node, { cacheBust: true })

      // 2) create jsPDF and compute dimensions
      const pdf = new jsPDF("p", "mm", "a4")
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const { width: imgW, height: imgH } = pdf.getImageProperties(dataUrl)
      const pdfHeight = (imgH * pdfWidth) / imgW

      // 3) add to PDF & save
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save("resume.pdf")
    } catch (err) {
      console.error("PDF generation failed:", err)
    }
  }

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Resume Builder</h1>
            {role && (
              <p className="text-sm text-gray-400">
                Optimized for:{" "}
                {role
                  .split("-")
                  .map((w) => w[0].toUpperCase() + w.slice(1))
                  .join(" ")}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-[#222] text-gray-300 hover:bg-[#333]">
              <Save className="h-4 w-4 mr-2" /> Save
            </Button>
            <Button size="sm" className="bg-white text-black" onClick={downloadResume}>
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {["Personal Info","Experience","Education","Skills","Projects","Certifications"].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  className={`px-4 py-2 rounded-lg text-sm transition ${
                    activeSection === sec ? "bg-white text-black" : "bg-[#2a2a2a] text-gray-300 hover:bg-[#333]"
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>

            {activeSection === "Personal Info" && <PersonalInfoForm onChange={(d) => updateResumeData("personalInfo", d)} />}
            {activeSection === "Experience" && <ExperienceForm onChange={(d) => updateResumeData("experience", d)} />}
            {activeSection === "Education" && <EducationForm onChange={(d) => updateResumeData("education", d)} />}
            {activeSection === "Skills" && <SkillsForm onChange={(d) => updateResumeData("skills", d)} />}
            {activeSection === "Projects" && <ProjectsForm onChange={(d) => updateResumeData("projects", d)} />}
            {activeSection === "Certifications" && <CertificationsForm onChange={(d) => updateResumeData("certifications", d)} />}
          </div>

          <div className="flex-1 space-y-6">
            <div id="resume-preview">
              <ResumePreview data={resumeData} templateId={templateId} sections={sections} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
