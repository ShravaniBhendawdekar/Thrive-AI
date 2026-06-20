export function AcademicTemplate({ data, sections }) {
  const { personalInfo, experience, education, skills, publications, certifications, languages } = data

  return (
    <div className="max-w-[800px] mx-auto font-serif">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{personalInfo.name || "Your Name"}</h1>
        <h2 className="text-xl text-gray-600 mb-3">{personalInfo.title || "Academic Title"}</h2>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.website && (
            <div>
              <a href={personalInfo.website} className="hover:underline" target="_blank" rel="noopener noreferrer">
                Academic Profile
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Education - prominent for academic CV */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">Education</h3>

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

      {/* Publications - key for academic CV */}
      {sections.publications && publications && publications.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">Publications</h3>

          <div className="space-y-4">
            {publications.map((pub, index) => (
              <div key={index}>
                <h4 className="font-medium text-gray-900 mb-1">{pub.title || "Publication Title"}</h4>
                <div className="text-sm text-gray-700 mb-1">
                  <span className="italic">{pub.publisher || "Journal/Publisher"}</span>
                  {pub.date && `, ${pub.date}`}
                </div>
                <div className="text-sm text-gray-600 mb-1">{pub.authors || "Authors"}</div>
                {pub.description && <p className="text-sm text-gray-700 mb-1">{pub.description}</p>}
                {pub.url && (
                  <a
                    href={pub.url}
                    className="text-sm text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Publication
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Research/Teaching Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            Professional Experience
          </h3>

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
                  <div className="font-medium text-gray-700">{job.company || "Institution"}</div>
                  <div className="text-sm text-gray-600">{job.location}</div>
                </div>
                <p className="text-sm text-gray-700">{job.description || "Job description"}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Research Interests/Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            Research Interests & Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {sections.certifications && certifications && certifications.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            Certifications & Awards
          </h3>
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              <div key={index}>
                <div className="font-medium">{cert.name}</div>
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
        <section>
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">Languages</h3>
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

      {/* Summary - at the end for academic CV */}
      {personalInfo.summary && (
        <section className="mt-6 pt-4 border-t border-gray-300">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Research Statement</h3>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}
    </div>
  )
}
