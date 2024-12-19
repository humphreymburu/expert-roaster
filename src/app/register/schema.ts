import { z } from "zod";

export const expertSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    bio: z.string().min(100, "Bio must be at least 100 characters").max(500, "Bio cannot exceed 500 characters"),
    country: z.string().optional(),
    region: z.string().optional(),
  }),
  expertise: z.object({
    expertiseAreas: z.array(z.string()).min(1, "At least one expertise area is required"),
    yearsExperience: z.number().min(0, "Years of experience is required"),
    experiences: z.array(z.object({
      role: z.string().min(1, "Role is required"),
      organization: z.string().min(1, "Organization is required"),
      location: z.string().optional(),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().optional(),
      current: z.boolean().default(false),
      description: z.string().optional(),
      skills: z.array(z.string())
    })).min(1, "At least one experience entry is required"),
    languages: z.array(z.object({
      name: z.string().min(1, "Language is required"),
      proficiency: z.string().min(1, "Proficiency level is required")
    })).min(1, "At least one language is required"),
    skills: z.array(z.object({
      name: z.string().min(1, "Skill name is required"),
      category: z.string().min(1, "Category is required"),
      level: z.string().min(1, "Level is required"),
    })).min(1, "At least one skill is required"),
  }),
  education: z.array(z.object({
    degree: z.string().min(1, "Degree is required"),
    field: z.string().min(1, "Field of study is required"),
    institution: z.string().min(1, "Institution is required"),
    year: z.string().min(1, "Year is required"),
  })).min(1, "At least one education entry is required"),
  certifications: z.array(z.object({
    title: z.string().min(1, "Title is required"),
    issuer: z.string().min(1, "Issuer is required"),
    issueDate: z.string().min(1, "Issue date is required"),
    expiryDate: z.string().optional(),
    documentUrl: z.string().optional(),
    verificationStatus: z.string().default("Pending"),
  })),
  publications: z.array(z.object({
    title: z.string().min(1, "Title is required"),
    journal: z.string().min(1, "Journal is required"),
    year: z.string().min(1, "Year is required"),
    url: z.string().optional(),
  })),
  references: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    position: z.string().min(1, "Position is required"),
    organization: z.string().min(1, "Organization is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    relationship: z.string().min(1, "Relationship is required"),
  })).min(2, "At least two references are required"),
});

export type ExpertFormData = z.infer<typeof expertSchema>;
