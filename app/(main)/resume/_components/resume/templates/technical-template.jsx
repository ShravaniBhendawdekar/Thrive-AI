export function TechnicalTemplate({ data, sections }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = data

  return (
    <div className="max-w-[800px] mx-auto font-mono">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{personalInfo.name || "Your Name"}</h1>
        <h2 className="text-xl text-gray-600 mb-3">{personalInfo.title || "Professional Title"}</h2>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedin && (
            <div>
              <a
                href={personalInfo.linkedin}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          )}
          {personalInfo.website && (
            <div>
              <a
                href={personalInfo.website}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub/Portfolio
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Technical Skills - displayed in categories */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">Technical Skills</h3>
          <div className="font-mono text-sm text-black bg-gray-50 p-3 rounded border border-gray-200">{skills.join(" | ")}</div>
        </section>
      )}

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-2">Summary</h3>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Projects - highlighted for technical roles */}
      {sections.projects && projects && projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">Projects</h3>

          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-900">{project.title || "Project Title"}</h4>
                  <div className="text-sm text-gray-600">
                    {project.startDate && project.endDate ? `${project.startDate} - ${project.endDate}` : ""}
                  </div>
                </div>
                {project.technologies && (
                  <div className="text-sm font-medium text-blue-600 mb-2">{project.technologies}</div>
                )}
                <p className="text-sm text-gray-700 mb-1">{project.description || "Project description"}</p>
                {project.link && (
                  <a
                    href={project.link}
                    className="text-sm text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">
            Professional Experience
          </h3>

          <div className="space-y-4">
            {experience.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-900">{job.position || "Position"}</h4>
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
          <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">Education</h3>

          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-900">
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

      {/* Certifications - important for technical roles */}
      {sections.certifications && certifications && certifications.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">Certifications</h3>
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              <div key={index}>
                <div className="font-medium text-black" >{cert.name}</div>
                <div className="text-sm text-gray-600">
                  {cert.issuer} • {cert.date}
                  {cert.expiration && ` - ${cert.expiration}`}
                </div>
                {cert.credentialId && <div className="text-xs text-gray-500">Credential ID: {cert.credentialId}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {sections.languages && languages && languages.length > 0 && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">Languages</h3>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang, index) => (
              <div key={index} className="flex justify-between">
                <span className="font-medium">{lang.language}</span>
                <span className="text-gray-600">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
