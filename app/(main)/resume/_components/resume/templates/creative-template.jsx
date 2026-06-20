export function CreativeTemplate({ data, sections }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages, publications } = data

  return (
    <div className="max-w-[800px] mx-auto font-sans">
      {/* Header with accent color */}
      <header className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-1">{personalInfo.name || "Your Name"}</h1>
        <h2 className="text-xl mb-3">{personalInfo.title || "Professional Title"}</h2>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedin && (
            <div>
              <a href={personalInfo.linkedin} className="hover:underline" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          )}
          {personalInfo.website && (
            <div>
              <a href={personalInfo.website} className="hover:underline" target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <p className="text-gray-700 italic">{personalInfo.summary}</p>
        </section>
      )}

      {/* Skills - displayed as colorful tags */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-purple-600 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `hsl(${(index * 20) % 360}, 70%, 90%)`,
                  color: `hsl(${(index * 20) % 360}, 70%, 30%)`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-purple-600 border-b border-purple-200 pb-1 mb-3">
            Work Experience
          </h3>

          <div className="space-y-4">
            {experience.map((job, index) => (
              <div key={index} className="pl-4 border-l-2 border-purple-200 hover:border-purple-500 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-gray-900">{job.position || "Position"}</h4>
                  <div className="text-sm text-gray-600">
                    {job.startDate && job.endDate ? `${job.startDate} - ${job.endDate}` : "Date Range"}
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-purple-600">{job.company || "Company"}</div>
                  <div className="text-sm text-gray-600">{job.location}</div>
                </div>
                <p className="text-sm text-gray-700">{job.description || "Job description"}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects - for creative roles */}
      {sections.projects && projects && projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-purple-600 border-b border-purple-200 pb-1 mb-3">Projects</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">{project.title || "Project Title"}</h4>
                <div className="text-sm text-gray-600 mb-2">
                  {project.startDate && project.endDate ? `${project.startDate} - ${project.endDate}` : ""}
                </div>
                <p className="text-sm text-gray-700 mb-2">{project.description || "Project description"}</p>
                {project.technologies && (
                  <div className="text-sm text-purple-600 font-medium">{project.technologies}</div>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    className="text-sm text-purple-600 hover:underline mt-1 inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-purple-600 border-b border-purple-200 pb-1 mb-3">Education</h3>

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
                  <div className="font-medium text-purple-600">{edu.institution || "Institution"}</div>
                  <div className="text-sm text-gray-600">{edu.location}</div>
                </div>
                {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {sections.languages && languages && languages.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-purple-600 border-b border-purple-200 pb-1 mb-3">Languages</h3>
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

      {/* Certifications */}
      {sections.certifications && certifications && certifications.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-purple-600 border-b border-purple-200 pb-1 mb-3">Certifications</h3>
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              <div key={index}>
                <div className="font-medium">{cert.name}</div>
                <div className="text-sm text-gray-600">
                  {cert.issuer} • {cert.date}
                  {cert.expiration && ` - ${cert.expiration}`}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
