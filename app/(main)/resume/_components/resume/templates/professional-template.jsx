export function ProfessionalTemplate({ data }) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="max-w-[800px] mx-auto font-serif">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wide mb-1">
          {personalInfo.name || "Your Name"}
        </h1>
        <h2 className="text-xl text-gray-700 mb-3">{personalInfo.title || "Professional Title"}</h2>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-600">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase text-center mb-3">Professional Summary</h3>
          <div className="border-t border-b border-gray-300 py-3">
            <p className="text-gray-700 text-center">{personalInfo.summary}</p>
          </div>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase text-center mb-4">Professional Experience</h3>

          <div className="space-y-6">
            {experience.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-gray-900">{job.company || "Company"}</h4>
                  <div className="text-sm text-gray-600">
                    {job.startDate && job.endDate ? `${job.startDate} - ${job.endDate}` : "Date Range"}
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div className="italic text-gray-700">{job.position || "Position"}</div>
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
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase text-center mb-4">Education</h3>

          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-gray-900">{edu.institution || "Institution"}</h4>
                  <div className="text-sm text-gray-600">
                    {edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : "Date Range"}
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div className="italic text-gray-700">
                    {edu.degree ? `${edu.degree}${edu.field ? `, ${edu.field}` : ""}` : "Degree"}
                  </div>
                  <div className="text-sm text-gray-600">{edu.location}</div>
                </div>
                {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 uppercase text-center mb-3">Skills</h3>
          <div className="border-t border-b border-gray-300 py-3">
            <p className="text-center text-gray-700">{skills.join(" • ")}</p>
          </div>
        </section>
      )}
    </div>
  )
}
