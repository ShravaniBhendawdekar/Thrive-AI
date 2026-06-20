export function ExecutiveTemplate({ data, sections }) {
  const { personalInfo, experience, education, skills, certifications, languages, references } = data

  return (
    <div className="max-w-[800px] mx-auto font-serif">
      {/* Header - elegant and sophisticated */}
      <header className="mb-8 text-center border-b-2 border-gray-800 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wider mb-1">
          {personalInfo.name || "Your Name"}
        </h1>
        <h2 className="text-xl text-gray-700 mb-3">{personalInfo.title || "Executive Title"}</h2>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-600">
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
        </div>
      </header>

      {/* Summary - prominent for executives */}
      {personalInfo.summary && (
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase text-center mb-3">Executive Profile</h3>
          <div className="border-t border-b border-gray-300 py-4">
            <p className="text-gray-700 text-center leading-relaxed">{personalInfo.summary}</p>
          </div>
        </section>
      )}

      {/* Experience - detailed and prominent */}
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
                <div className="flex justify-between items-start mb-3">
                  <div className="italic text-gray-700 font-medium">{job.position || "Position"}</div>
                  <div className="text-sm text-gray-600">{job.location}</div>
                </div>
                <p className="text-gray-700 leading-relaxed">{job.description || "Job description"}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills - leadership focused */}
      {skills && skills.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase text-center mb-3">Core Competencies</h3>
          <div className="border-t border-b border-gray-300 py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 text-center">
              {skills.map((skill, index) => (
                <div key={index} className="text-gray-700">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase text-center mb-4">Education</h3>

          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="text-center">
                <h4 className="font-bold text-gray-900">
                  {edu.degree ? `${edu.degree}${edu.field ? `, ${edu.field}` : ""}` : "Degree"}
                </h4>
                <div className="font-medium text-gray-700 mb-1">{edu.institution || "Institution"}</div>
                <div className="text-sm text-gray-600 mb-1">
                  {edu.location}
                  {edu.startDate && edu.endDate ? ` | ${edu.startDate} - ${edu.endDate}` : ""}
                </div>
                {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {sections.certifications && certifications && certifications.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase text-center mb-3">Certifications</h3>
          <div className="space-y-2 text-center">
            {certifications.map((cert, index) => (
              <div key={index}>
                <div className="font-medium text-gray-900">{cert.name}</div>
                <div className="text-sm text-gray-600">
                  {cert.issuer} • {cert.date}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {sections.languages && languages && languages.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase text-center mb-3">Languages</h3>
          <div className="flex justify-center gap-x-8">
            {languages.map((lang, index) => (
              <div key={index} className="text-center">
                <span className="font-medium text-gray-900">{lang.language}</span>
                <span className="text-gray-600 block">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {sections.references && references && references.length > 0 && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 uppercase text-center mb-3">Professional References</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {references.map((ref, index) => (
              <div key={index} className="text-center">
                <div className="font-bold text-gray-900">{ref.name}</div>
                <div className="italic text-gray-700">{ref.title}</div>
                <div className="text-sm text-gray-600">{ref.company}</div>
                <div className="text-sm text-gray-600">{ref.email}</div>
                <div className="text-sm text-gray-600">{ref.phone}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
