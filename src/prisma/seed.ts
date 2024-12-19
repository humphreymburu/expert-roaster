import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      fullName: "Dr. Sarah Johnson",
      email: "sarah.johnson@example.com",
      bio: "Public health expert with 15+ years of experience in epidemic prevention and response.",
      expertiseAreas: ["Public Health", "Epidemiology", "Disease Prevention"],
      country: "United States",
      region: "Northeast",
      isVerified: true,
      yearsExperience: 15,
      projectsCompleted: 127,
      responseRate: 98,
      languages: {
        create: [
          { name: "English", proficiency: "Native" },
          { name: "French", proficiency: "Advanced" },
          { name: "Spanish", proficiency: "Intermediate" },
        ],
      },
      certifications: {
        create: [
          {
            title: "Advanced Epidemiology Certificate",
            issuer: "Harvard School of Public Health",
            issueDate: new Date("2022-06-15"),
            verificationStatus: "verified",
            documentUrl: "/docs/cert1.pdf",
          },
        ],
      },
      experiences: {
        create: [
          {
            role: "Senior Epidemiologist",
            organization: "World Health Organization",
            location: "Geneva, Switzerland",
            startDate: new Date("2019-01-01"),
            current: true,
            description:
              "Leading global health initiatives and emergency response programs.",
            skills: ["Epidemic Response", "Public Health", "Leadership"],
          },
        ],
      },
      skills: {
        create: [
          {
            name: "Epidemiology",
            category: "Core Expertise",
            level: "Expert",
            endorsements: 45,
          },
          {
            name: "Public Health Policy",
            category: "Core Expertise",
            level: "Expert",
            endorsements: 38,
          },
        ],
      },
      education: {
        create: [
          {
            degree: "Ph.D.",
            field: "Epidemiology",
            institution: "Harvard University",
            year: "2008",
          },
          {
            degree: "MPH",
            field: "Public Health",
            institution: "Johns Hopkins University",
            year: "2005",
          },
        ],
      },
      publications: {
        create: [
          {
            title: "Global Patterns of Emerging Infectious Diseases",
            journal: "Nature Public Health Emergency Collection",
            year: "2023",
            url: "https://example.com/publication1",
          },
        ],
      },
    },
  });

  // Add more sample users as needed...

  console.log(`Database has been seeded. 🌱`);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
