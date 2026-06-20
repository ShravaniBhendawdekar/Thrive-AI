export function MinimalTemplate({ data }) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="max-w-[800px] mx-auto font-sans">
      {/* Header */}
      <header className="mb-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{personalInfo.name || "Your Name"}</h1>
            <h2 className="text-lg text-gray-600">{personalInfo.title || "Professional Title"}</h2>
          </div>
          <div className="text-right text-sm text-gray-600">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      <div className="border-t border-gray-200 my-4"></div>

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-md font-semibold text-gray-900 mb-3 uppercase tracking-wider">Experience</h3>

          <div className="space-y-5">
            {experience.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-medium text-gray-900">{job.position || "Position"}</h4>
                  <div className="text-sm text-gray-600">
                    {job.startDate && job.endDate ? `${job.startDate} - ${job.endDate}` : "Date Range"}
                  </div>
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  {job.company || "Company"}
                  {job.location ? `, ${job.location}` : ""}
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
          <h3 className="text-md font-semibold text-gray-900 mb-3 uppercase tracking-wider">Education</h3>

          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-medium text-gray-900">{edu.institution || "Institution"}</h4>
                  <div className="text-sm text-gray-600">
                    {edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : "Date Range"}
                  </div>
                </div>
                <div className="text-sm text-gray-700 mb-1">
                  {edu.degree ? `${edu.degree}${edu.field ? `, ${edu.field}` : ""}` : "Degree"}
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
          <h3 className="text-md font-semibold text-gray-900 mb-3 uppercase tracking-wider">Skills</h3>
          <p className="text-sm text-gray-700">{skills.join(" • ")}</p>
        </section>
      )}
    </div>
  )
}
