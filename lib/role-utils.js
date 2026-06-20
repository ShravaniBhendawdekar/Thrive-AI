// Role-specific utilities for the resume builder

// Define which sections to show
export function getRoleSpecificSections(role) {
    // Default sections for all roles
    const sections = {
      projects: false,
      certifications: false,
      publications: false,
      languages: false,
      references: false
    }
  
    // Add role-specific sections
    switch (role) {
      case "software-engineer":
      case "data-scientist":
      case "it-professional":
        sections.projects = true
        sections.certifications = true
        sections.languages = true
        break
  
      case "designer":
      case "content-creator":
        sections.projects = true
        sections.languages = true
        break
  
      case "researcher":
      case "professor":
      case "phd-candidate":
      case "scientist":
        sections.publications = true
        sections.projects = true
        sections.languages = true
        break
  
      case "executive":
      case "manager":
      case "director":
        sections.certifications = true
        sections.languages = true
        sections.references = true
        break
  
      case "marketing":
      case "product-manager":
        sections.projects = true
        sections.certifications = true
        break
  
      case "finance":
      case "legal":
      case "business-analyst":
        sections.certifications = true
        sections.languages = true
        break
  
      case "healthcare":
        sections.certifications = true
        sections.languages = true
        break
  
      case "student":
        sections.projects = true
        sections.languages = true
        break
    }
  
    return sections
  }
  
  // Get role-specific placeholders
  export function getRoleSpecificPlaceholders(role) {
    const placeholders = {
      title: "Professional Title",
      summary:
        "Experienced professional with a passion for creating efficient, scalable solutions..."
    }
  
    switch (role) {
      case "software-engineer":
        placeholders.title = "Software Engineer"
        placeholders.summary =
          "Innovative Software Engineer with expertise in developing scalable applications and solving complex technical challenges. Proficient in modern programming languages and frameworks with a focus on writing clean, maintainable code."
        break
  
      case "data-scientist":
        placeholders.title = "Data Scientist"
        placeholders.summary =
          "Results-driven Data Scientist with expertise in statistical analysis, machine learning, and data visualization. Skilled at extracting actionable insights from complex datasets to drive business decisions."
        break
  
      case "designer":
        placeholders.title = "UX/UI Designer"
        placeholders.summary =
          "Creative Designer with a passion for crafting visually compelling and user-friendly experiences. Proficient in design tools and methodologies with a keen eye for detail and aesthetics."
        break
  
      case "marketing":
        placeholders.title = "Marketing Professional"
        placeholders.summary =
          "Results-driven Marketing Professional with expertise in developing and executing comprehensive marketing strategies that increase brand awareness and drive customer acquisition."
        break
  
      case "executive":
      case "manager":
      case "director":
        placeholders.title = "Executive Leader"
        placeholders.summary =
          "Strategic Executive Leader with a proven track record of driving organizational growth and operational excellence. Skilled in team leadership, business development, and implementing innovative solutions to complex challenges."
        break
  
      case "researcher":
      case "professor":
        placeholders.title = "Research Scientist"
        placeholders.summary =
          "Dedicated Research Scientist with expertise in conducting rigorous research and publishing impactful findings. Committed to advancing knowledge in the field through methodical investigation and collaborative projects."
        break
    }
  
    return placeholders
  }
  
  // Get role-specific skills
  export function getRoleSpecificSkills(role) {
    // Default skills
    const skills = {
      technical: [],
      soft: [
        "Communication",
        "Problem Solving",
        "Teamwork",
        "Time Management",
        "Adaptability"
      ],
      tools: [],
      all: []
    }
  
    // Add role-specific skills
    switch (role) {
      case "software-engineer":
        skills.technical = [
          "JavaScript",
          "TypeScript",
          "React",
          "Node.js",
          "Python",
          "SQL",
          "REST APIs",
          "Git",
          "CI/CD",
          "Cloud Services"
        ]
        skills.tools = ["VS Code", "GitHub", "Docker", "AWS", "Jira", "Figma"]
        break
  
      case "data-scientist":
        skills.technical = [
          "Python",
          "R",
          "SQL",
          "Machine Learning",
          "Statistical Analysis",
          "Data Visualization",
          "Natural Language Processing",
          "Predictive Modeling"
        ]
        skills.tools = [
          "Jupyter",
          "Pandas",
          "NumPy",
          "TensorFlow",
          "PyTorch",
          "Tableau",
          "Power BI"
        ]
        break
  
      case "designer":
        skills.technical = [
          "UI Design",
          "UX Research",
          "Wireframing",
          "Prototyping",
          "Visual Design",
          "Typography",
          "Color Theory",
          "Responsive Design"
        ]
        skills.tools = [
          "Figma",
          "Adobe XD",
          "Sketch",
          "Illustrator",
          "Photoshop",
          "InVision",
          "Zeplin"
        ]
        break
  
      case "marketing":
        skills.technical = [
          "Digital Marketing",
          "Content Strategy",
          "SEO",
          "SEM",
          "Social Media Marketing",
          "Email Marketing",
          "Analytics",
          "Brand Development"
        ]
        skills.tools = [
          "Google Analytics",
          "HubSpot",
          "Mailchimp",
          "Hootsuite",
          "SEMrush",
          "Adobe Creative Suite"
        ]
        break
  
      case "executive":
      case "manager":
      case "director":
        skills.technical = [
          "Strategic Planning",
          "Business Development",
          "P&L Management",
          "Team Leadership",
          "Project Management",
          "Budget Management",
          "Performance Analysis"
        ]
        skills.soft = [
          "Leadership",
          "Decision Making",
          "Negotiation",
          "Public Speaking",
          "Conflict Resolution",
          "Emotional Intelligence"
        ]
        break
  
      case "product-manager":
        skills.technical = [
          "Product Strategy",
          "Market Research",
          "User Stories",
          "Roadmapping",
          "Agile Methodologies",
          "A/B Testing",
          "Product Analytics"
        ]
        skills.tools = [
          "Jira",
          "Confluence",
          "Asana",
          "Trello",
          "Amplitude",
          "Mixpanel",
          "Figma"
        ]
        break
  
      case "researcher":
      case "professor":
        skills.technical = [
          "Research Methodology",
          "Data Analysis",
          "Academic Writing",
          "Literature Review",
          "Grant Writing",
          "Experimental Design",
          "Statistical Analysis"
        ]
        skills.tools = [
          "SPSS",
          "R",
          "LaTeX",
          "EndNote",
          "Research Gate",
          "Academic Databases"
        ]
        break
  
      case "finance":
        skills.technical = [
          "Financial Analysis",
          "Budgeting",
          "Forecasting",
          "Risk Assessment",
          "Financial Reporting",
          "Investment Analysis",
          "Accounting Principles"
        ]
        skills.tools = [
          "Excel",
          "QuickBooks",
          "SAP",
          "Bloomberg Terminal",
          "Tableau",
          "PowerPoint"
        ]
        break
    }
  
    // Combine all skills
    skills.all = [...skills.technical, ...skills.soft, ...skills.tools]
  
    return skills
  }
  