const scholarships = [
  // Indian Scholarships
  {
    title: "AICTE-SAKSHAT Scholarship for Technical Education",
    description: "Merit-cum-need based scholarship for engineering and technical students from economically weaker sections. Sponsored by All India Council for Technical Education to promote technical education among underprivileged students.",
    provider: "All India Council for Technical Education (AICTE)",
    amount: 500000,
    category: "Academic",
    deadline: new Date("2026-03-31"),
    requirements: ["Income certificate (annual family income below ₹8 lakhs)", "Academic transcripts", "Caste certificate (if applicable)", "Admission letter from AICTE approved institution"],
    eligibility: {
      minGPA: 3.0,
      majors: ["Engineering", "Computer Science", "Electronics", "Mechanical Engineering", "Civil Engineering"],
      universities: ["IITs", "NITs", "AICTE Approved Colleges"],
      other: "Annual family income should not exceed ₹8 lakhs"
    },
    isActive: true
  },
  {
    title: "Kishore Vaigyanik Protsahan Yojana (KVPY) Fellowship",
    description: "National program to encourage students to pursue research career in science. Fellowship provided by Department of Science and Technology, Government of India for Basic Sciences research.",
    provider: "Department of Science & Technology, Govt of India",
    amount: 700000,
    category: "Research",
    deadline: new Date("2026-02-28"),
    requirements: ["KVPY aptitude test clearance", "Interview performance", "Academic transcripts", "Research interest statement"],
    eligibility: {
      minGPA: 3.5,
      majors: ["Physics", "Chemistry", "Mathematics", "Biology", "Basic Sciences"],
      universities: ["IISc", "IITs", "Central Universities"],
      other: "Must clear KVPY examination and interview"
    },
    isActive: true
  },
  {
    title: "National Merit Scholarship for Higher Education",
    description: "Merit-based scholarship for outstanding students pursuing undergraduate and postgraduate courses. Awarded by University Grants Commission to promote excellence in higher education.",
    provider: "University Grants Commission (UGC)",
    amount: 250000,
    category: "Merit-based",
    deadline: new Date("2026-04-15"),
    requirements: ["Previous year marksheet", "Income certificate", "Bank account details", "UGC application form"],
    eligibility: {
      minGPA: 3.7,
      graduationYear: 2025,
      other: "Top 5% of university/college in previous examination"
    },
    isActive: true
  },
  {
    title: "Begum Hazrat Mahal National Scholarship for Minority Girls",
    description: "Scholarship scheme for meritorious girl students from minority communities to pursue technical and professional courses at undergraduate and postgraduate level.",
    provider: "Ministry of Minority Affairs, Govt of India",
    amount: 300000,
    category: "Need-based",
    deadline: new Date("2026-05-31"),
    requirements: ["Minority community certificate", "Income certificate", "Previous year marksheet", "College admission letter"],
    eligibility: {
      minGPA: 3.2,
      majors: ["Engineering", "Medicine", "Management", "Architecture", "Pharmacy"],
      other: "Female students from minority communities with family income below ₹2.5 lakhs"
    },
    isActive: true
  },
  {
    title: "Dr. A.P.J. Abdul Kalam IGNITE Awards for Innovation",
    description: "Awards for original technological ideas and innovations by students. Encourages creativity and innovation in science and technology among young minds.",
    provider: "National Innovation Foundation India",
    amount: 150000,
    category: "Other",
    deadline: new Date("2026-06-30"),
    requirements: ["Innovation project report", "Working prototype", "Mentor recommendation", "Patent documentation (if any)"],
    eligibility: {
      minGPA: 3.0,
      majors: ["Engineering", "Technology", "Science", "Innovation Studies"],
      universities: ["Any recognized institution"],
      other: "Original innovative idea or working prototype required"
    },
    isActive: true
  },
  {
    title: "Rajiv Gandhi Khel Ratna Sports Excellence Scholarship",
    description: "Financial assistance for outstanding sports persons to pursue higher education while continuing their sports career. Promotes sports excellence in India.",
    provider: "Ministry of Youth Affairs and Sports",
    amount: 400000,
    category: "Sports",
    deadline: new Date("2026-04-30"),
    requirements: ["Sports achievement certificates", "Coach recommendation", "Medical fitness certificate", "Academic transcripts"],
    eligibility: {
      minGPA: 2.8,
      other: "National or State level sports achievement, Currently pursuing or willing to pursue higher education"
    },
    isActive: true
  },
  {
    title: "Lalit Kala Akademi Scholarship for Visual Arts",
    description: "Scholarship for talented young artists to develop their skills in visual arts including painting, sculpture, printmaking, and digital arts. Promotes Indian art and culture.",
    provider: "Lalit Kala Akademi, Ministry of Culture",
    amount: 200000,
    category: "Arts",
    deadline: new Date("2026-03-15"),
    requirements: ["Art portfolio submission", "Letter of intent", "Guru/mentor recommendation", "Academic records"],
    eligibility: {
      minGPA: 2.5,
      majors: ["Fine Arts", "Visual Arts", "Painting", "Sculpture", "Applied Arts"],
      universities: ["Government Art Colleges", "Universities with Art Departments"],
      other: "Demonstrated artistic talent and commitment to Indian art traditions"
    },
    isActive: true
  },
  {
    title: "Digital India Technology Innovation Scholarship",
    description: "Scholarship for students developing innovative digital solutions for rural India. Focus on technology that can solve real-world problems in agriculture, healthcare, and education.",
    provider: "Ministry of Electronics and IT, Govt of India",
    amount: 600000,
    category: "Academic",
    deadline: new Date("2026-05-15"),
    requirements: ["Project proposal for digital solution", "Prototype demonstration", "Impact assessment", "Technical documentation"],
    eligibility: {
      minGPA: 3.4,
      majors: ["Computer Science", "IT", "Electronics", "Data Science", "AI/ML"],
      universities: ["IITs", "NITs", "IIIT", "Technical Universities"],
      other: "Project should address rural development or social issues"
    },
    isActive: true
  },
  {
    title: "Swami Vivekananda Single Child Scholarship for Research",
    description: "Special scholarship for single child students from West Bengal pursuing research in higher education. Encourages single children to pursue academic excellence.",
    provider: "Government of West Bengal",
    amount: 180000,
    category: "Need-based",
    deadline: new Date("2026-07-31"),
    requirements: ["Single child certificate", "Domicile certificate of West Bengal", "Academic transcripts", "Research proposal"],
    eligibility: {
      minGPA: 3.3,
      majors: ["All subjects for postgraduate research"],
      universities: ["Universities in West Bengal", "Central Universities"],
      other: "Must be single child with West Bengal domicile, pursuing PhD or M.Phil"
    },
    isActive: true
  },

  // International/Diverse Scholarships (converted to INR)
  {
    title: "Academic Excellence Scholarship",
    description: "Merit-based scholarship for outstanding academic performance. Awarded to students who demonstrate exceptional commitment to their studies and maintain high GPA.",
    provider: "National Education Foundation",
    amount: 800000,
    category: "Academic",
    deadline: new Date("2026-03-15"),
    requirements: ["Official transcript", "Two letters of recommendation", "Personal essay"],
    eligibility: {
      minGPA: 3.7,
      majors: ["Computer Science", "Engineering", "Mathematics"],
      graduationYear: 2025
    },
    isActive: true
  },
  {
    title: "STEM Innovation Scholarship",
    description: "Supporting the next generation of innovators in Science, Technology, Engineering, and Mathematics. Open to students pursuing STEM fields with innovative project ideas.",
    provider: "Tech Future Foundation",
    amount: 1200000,
    category: "Research",
    deadline: new Date("2026-04-30"),
    requirements: ["Research proposal", "Academic transcript", "Faculty recommendation"],
    eligibility: {
      minGPA: 3.5,
      majors: ["Computer Science", "Engineering", "Physics", "Chemistry", "Biology"]
    },
    isActive: true
  },
  {
    title: "Community Leadership Award",
    description: "Recognizing students who have made significant contributions to their communities through volunteer work, leadership roles, and social impact initiatives.",
    provider: "Community Heroes Organization",
    amount: 400000,
    category: "Community Service",
    deadline: new Date("2026-02-28"),
    requirements: ["Community service portfolio", "Leadership essay", "Community leader reference"],
    eligibility: {
      minGPA: 3.0,
      other: "Minimum 100 hours of community service"
    },
    isActive: true
  },
  {
    title: "Athletic Excellence Scholarship",
    description: "Supporting student-athletes who excel both in sports and academics. This scholarship recognizes dedication, teamwork, and athletic achievement.",
    provider: "Sports Champions Foundation",
    amount: 640000,
    category: "Sports",
    deadline: new Date("2026-03-01"),
    requirements: ["Athletic achievement portfolio", "Coach recommendation", "Academic transcript"],
    eligibility: {
      minGPA: 3.2,
      other: "Must be actively participating in varsity sports"
    },
    isActive: true
  },
  {
    title: "Creative Arts Scholarship",
    description: "Celebrating artistic talent and creativity. Open to students pursuing fine arts, music, theater, digital arts, and other creative fields.",
    provider: "Arts & Culture Institute",
    amount: 480000,
    category: "Arts",
    deadline: new Date("2026-05-15"),
    requirements: ["Portfolio of creative work", "Artist statement", "Faculty recommendation"],
    eligibility: {
      minGPA: 3.0,
      majors: ["Fine Arts", "Music", "Theater", "Digital Arts", "Graphic Design"]
    },
    isActive: true
  },
  {
    title: "Future Entrepreneurs Grant",
    description: "For ambitious students with innovative business ideas and entrepreneurial spirit. Supporting the next generation of business leaders and startup founders.",
    provider: "Business Innovation Society",
    amount: 960000,
    category: "Merit-based",
    deadline: new Date("2026-06-30"),
    requirements: ["Business plan presentation", "Entrepreneurship essay", "Faculty mentor endorsement"],
    eligibility: {
      minGPA: 3.4,
      majors: ["Business", "Economics", "Marketing", "Finance", "Management"]
    },
    isActive: true
  },
  {
    title: "Women in Technology Scholarship",
    description: "Empowering women to pursue careers in technology and computer science. Breaking barriers and promoting diversity in the tech industry.",
    provider: "Women Tech Leaders Alliance",
    amount: 720000,
    category: "Academic",
    deadline: new Date("2026-03-31"),
    requirements: ["Technical project portfolio", "Diversity essay", "Industry mentor reference"],
    eligibility: {
      minGPA: 3.3,
      majors: ["Computer Science", "Software Engineering", "Data Science", "Cybersecurity"],
      other: "Open to women and non-binary students"
    },
    isActive: true
  },
  {
    title: "First Generation College Student Award",
    description: "Supporting first-generation college students who are breaking barriers and pursuing higher education. Financial assistance for those whose parents did not attend college.",
    provider: "Equal Opportunity Education Fund",
    amount: 600000,
    category: "Need-based",
    deadline: new Date("2026-04-01"),
    requirements: ["Financial need documentation", "Personal story essay", "Academic transcript"],
    eligibility: {
      minGPA: 2.8,
      other: "Must be first-generation college student with demonstrated financial need"
    },
    isActive: true
  },
  {
    title: "Healthcare Heroes Scholarship",
    description: "For future healthcare professionals dedicated to serving others. Supporting students pursuing medicine, nursing, pharmacy, and allied health fields.",
    provider: "Medical Professionals Foundation",
    amount: 880000,
    category: "Academic",
    deadline: new Date("2026-02-15"),
    requirements: ["Healthcare experience essay", "Clinical volunteer hours", "Healthcare professional recommendation"],
    eligibility: {
      minGPA: 3.6,
      majors: ["Pre-Med", "Nursing", "Pharmacy", "Physical Therapy", "Medical Technology"],
      other: "Minimum 50 hours healthcare-related volunteer work"
    },
    isActive: true
  },
  {
    title: "Environmental Sustainability Award",
    description: "For students passionate about environmental conservation, sustainability, and green technology. Supporting future environmental leaders and activists.",
    provider: "Green Future Foundation",
    amount: 360000,
    category: "Other",
    deadline: new Date("2026-04-22"),
    requirements: ["Environmental project proposal", "Sustainability essay", "Faculty recommendation"],
    eligibility: {
      minGPA: 3.1,
      majors: ["Environmental Science", "Renewable Energy", "Biology", "Chemistry", "Engineering"],
      other: "Demonstrated commitment to environmental causes"
    },
    isActive: true
  },
  {
    title: "Presidential Excellence Scholarship",
    description: "The most prestigious scholarship for exceptional students demonstrating outstanding academic achievement, leadership, and community service. Full tuition coverage for exemplary scholars.",
    provider: "University Presidential Fund",
    amount: 2000000,
    category: "Merit-based",
    deadline: new Date("2026-01-31"),
    requirements: ["Complete academic portfolio", "Leadership documentation", "Three faculty recommendations", "Interview"],
    eligibility: {
      minGPA: 3.9,
      other: "Top 1% of academic performers with exceptional leadership record"
    },
    isActive: true
  },
  {
    title: "Quick Start Mini Grant",
    description: "Small but helpful grant for students who need immediate financial assistance. Perfect for textbooks, supplies, or emergency educational expenses.",
    provider: "Student Emergency Fund",
    amount: 120000,
    category: "Need-based",
    deadline: new Date("2026-02-01"),
    requirements: ["Financial need statement", "Enrollment verification"],
    eligibility: {
      minGPA: 2.5,
      other: "Demonstrated immediate financial need for educational expenses"
    },
    isActive: true
  },
  {
    title: "Rural Students Success Fund",
    description: "Supporting students from rural communities who face unique challenges in accessing higher education. Bridging the gap between rural and urban educational opportunities.",
    provider: "Rural Education Alliance",
    amount: 520000,
    category: "Need-based",
    deadline: new Date("2026-03-20"),
    requirements: ["Rural background verification", "Financial need documentation", "Community impact essay"],
    eligibility: {
      minGPA: 2.7,
      other: "Must be from rural community with population under 10,000"
    },
    isActive: true
  }
];

module.exports = scholarships; 