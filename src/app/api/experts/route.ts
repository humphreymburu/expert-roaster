import { NextResponse } from "next/server";
import prisma from "@expo/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const expert = await prisma.user.create({
      data: {
        fullName: data.personalInfo.fullName,
        email: data.personalInfo.email,
        bio: data.personalInfo.bio,
        country: data.personalInfo.country,
        region: data.personalInfo.region,
        expertiseAreas: data.expertise.expertiseAreas,
        yearsExperience: data.expertise.yearsExperience,

        skills: {
          create: data.expertise.skills.map((skill: { name: string; category: string; level: string }) => ({
            name: skill.name,
            category: skill.category,
            level: skill.level,
            endorsements: 0,
          })),
        },

        languages: {
          create: data.expertise.languages.map((lang: { name: string; proficiency: string }) => ({
            name: lang.name,
            proficiency: lang.proficiency,
          })),
        },

        experiences: {
          create: data.expertise.experiences.map((exp: any) => ({
            role: exp.role,
            organization: exp.organization,
            location: exp.location,
            startDate: new Date(exp.startDate),
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            current: exp.current,
            description: exp.description,
            skills: exp.skills,
          })),
        },

        education: {
          create: data.education.map((edu: any) => ({
            degree: edu.degree,
            field: edu.field,
            institution: edu.institution,
            year: edu.year,
          })),
        },

        certifications: {
          create: data.certifications.map((cert: any) => ({
            title: cert.title,
            issuer: cert.issuer,
            issueDate: new Date(cert.issueDate),
            expiryDate: cert.expiryDate ? new Date(cert.expiryDate) : null,
            documentUrl: cert.documentUrl,
            verificationStatus: cert.verificationStatus,
          })),
        },

        publications: {
          create: data.publications.map((pub: any) => ({
            title: pub.title,
            journal: pub.journal,
            year: pub.year,
            url: pub.url,
          })),
        },
      },
      include: {
        skills: true,
        languages: true,
        experiences: true,
        education: true,
        certifications: true,
        publications: true,
      },
    });

    return NextResponse.json({ expert });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to create expert" },
      { status: 500 }
    );
  }
}
