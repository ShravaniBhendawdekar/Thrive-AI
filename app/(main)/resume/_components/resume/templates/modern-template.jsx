export function ModernTemplate({ data }) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="max-w-[800px] mx-auto font-sans">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{personalInfo.name || "Your Name"}</h1>
        <h2 className="text-xl text-gray-600 mb-3">{personalInfo.title || "Professional Title"}</h2>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-2">
            Professional Summary
          </h3>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-3">Work Experience</h3>

          <div className="space-y-4">
            {experience.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-gray-900">{job.position || "Position"}</h4>
                  <div className="text-sm text-gray-600">
                    {job.startDate && job.endDate ? `${job.startDate} - ${job.endDate}` : "Date Range"}
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-gray-700">{job.company || "Company"}</div>
                  <div className="text-sm text-gray-600">{job.location}</div>
                </div>
                <p className="text-sm text-gray-700">{job.description || "Job description"}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-3">Education</h3>

          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-gray-900">
                    {edu.degree ? `${edu.degree}${edu.field ? `, ${edu.field}` : ""}` : "Degree"}
                  </h4>
                  <div className="text-sm text-gray-600">
                    {edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : "Date Range"}
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-gray-700">{edu.institution || "Institution"}</div>
                  <div className="text-sm text-gray-600">{edu.location}</div>
                </div>
                {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <section>
          <h3 className="text-lg text-black font-semibold border-b pb-1 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full text-black bg-gray-200 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    
    </div>
  )
}
