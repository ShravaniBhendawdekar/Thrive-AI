"use client";

import { ModernTemplate } from "./templates/modern-template";
import { ProfessionalTemplate } from "./templates/professional-template";
import { MinimalTemplate } from "./templates/minimal-template";
import { CreativeTemplate } from "./templates/creative-template";
import { TechnicalTemplate } from "./templates/technical-template";
import { ExecutiveTemplate } from "./templates/executive-template";
import { AcademicTemplate } from "./templates/academic-template";

export default function ResumePreview({ data, templateId = "modern", sections }) {
  const renderTemplate = () => {
    switch (templateId) {
      case "modern":
        return <ModernTemplate data={data} sections={sections} />;
      case "professional":
        return <ProfessionalTemplate data={data} sections={sections} />;
      case "minimal":
        return <MinimalTemplate data={data} sections={sections} />;
      case "creative":
        return <CreativeTemplate data={data} sections={sections} />;
      case "technical":
        return <TechnicalTemplate data={data} sections={sections} />;
      case "executive":
        return <ExecutiveTemplate data={data} sections={sections} />;
      case "academic":
        return <AcademicTemplate data={data} sections={sections} />;
      default:
        return <ModernTemplate data={data} sections={sections} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h2 className="text-lg font-medium text-black">Resume Preview</h2>
        <p className="text-sm text-gray-500">
          Template: {templateId ? templateId.charAt(0).toUpperCase() + templateId.slice(1) : "Modern"}
        </p>
      </div>
      <div className="p-6 max-h-[800px] overflow-y-auto">{renderTemplate()}</div>
    </div>
  );
}
