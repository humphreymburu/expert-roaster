"use server"

import { ChartDataPoint, ExpertStats } from '@expo/app/dashboard/components/experts-chart';
import { ExpertFormData, expertSchema } from '@expo/app/register/schema';
import prisma from "@expo/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from 'zod';

export async function getExperts(search?: string, page = 1, limit = 20) {
  const skip = (page - 1) * limit;

  try {
    const experts = await prisma.user.findMany({
      where: search
        ? {
            OR: [
              { fullName: { contains: search } },
              { email: { contains: search } },
            ],
          }
        : undefined,
      skip,
      take: limit,
    });

    const total = await prisma.user.count({
      where: search
        ? {
            OR: [
              { fullName: { contains: search } },
              { email: { contains: search } },
            ],
          }
        : undefined,
    });

    console.log(experts, "ll");
    return { experts, total, pages: Math.ceil(total / limit) };
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

export async function getDashboardExperts() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        expertiseAreas: true,
        createdAt: true,
        lastActive: true,
        projectsCompleted: true,
        responseRate: true,
        skills: {
          select: {
            name: true,
            category: true,
            level: true
          }
        },
        certifications: {
          select: {
            title: true,
            issuer: true,
            issueDate: true
          }
        }
      }
    });

    if (!users || users.length === 0) {
      return {
        experts: [],
        stats: {
          total: 0,
          active: 0,
          projectsCompleted: 0,
          averageResponseRate: 0,
          growthData: [],
          expertiseData: [],
          trends: {
            expertGrowth: 0,
            activeGrowth: 0,
            projectsGrowth: 0,
            responseRateGrowth: 0,
          },
        },
      };
    }

    // Calculate growth data (monthly registrations)
    const growthData: ChartDataPoint[] = users.reduce((acc: ChartDataPoint[], user) => {
      const month = new Date(user.createdAt).toLocaleString('default', { month: 'short' });
      const existingMonth = acc.find(item => item.name === month);
      
      if (existingMonth) {
        existingMonth.value += 1;
      } else {
        acc.push({ name: month, value: 1 });
      }
      
      return acc;
    }, []).sort((a, b) => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return months.indexOf(a.name) - months.indexOf(b.name);
    });

    // Calculate expertise distribution
    const expertiseData: ChartDataPoint[] = users.reduce((acc: ChartDataPoint[], user) => {
      user.expertiseAreas.forEach(area => {
        const existingArea = acc.find(item => item.name === area);
        if (existingArea) {
          existingArea.value += 1;
        } else {
          acc.push({ name: area, value: 1 });
        }
      });
      return acc;
    }, [])
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    const activeExperts = users.filter(user => 
      new Date(user.lastActive) >= thirtyDaysAgo
    ).length;

    // Calculate expert growth rate
    const currentMonth = growthData[growthData.length - 1]?.value || 0;
    const previousMonth = growthData[growthData.length - 2]?.value || 0;
    const expertGrowthRate = previousMonth 
      ? ((currentMonth - previousMonth) / previousMonth) * 100 
      : 0;

    const stats: ExpertStats = {
      total: users.length,
      active: activeExperts,
      projectsCompleted: users.reduce((sum, user) => sum + (user.projectsCompleted || 0), 0),
      averageResponseRate: Math.round(
        users.reduce((sum, user) => sum + (user.responseRate || 0), 0) / users.length * 100
      ),
      growthData,
      expertiseData,
      trends: {
        expertGrowth: expertGrowthRate,
        activeGrowth: users.length > 0 ? (activeExperts / users.length) * 100 - 100 : 0,
        projectsGrowth: 15.3,
        responseRateGrowth: 2.1,
      },
    };

    return {
      experts: users.slice(0, 5),
      stats,
    };

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      experts: [],
      stats: {
        total: 0,
        active: 0,
        projectsCompleted: 0,
        averageResponseRate: 0,
        growthData: [],
        expertiseData: [],
        trends: {
          expertGrowth: 0,
          activeGrowth: 0,
          projectsGrowth: 0,
          responseRateGrowth: 0,
        },
      },
    };
  }
}


export async function registerExpert(data: ExpertFormData) {
  try {
    // Validate the data
    const validatedData = expertSchema.parse(data);

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.personalInfo.email },
    });

    if (existingUser) {
      return { 
        success: false, 
        error: "An account with this email already exists" 
      };
    }

    // Create the user and related records in a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // First create the user with basic info
      const expert = await prisma.user.create({
        data: {
          fullName: validatedData.personalInfo.fullName,
          email: validatedData.personalInfo.email,
          bio: validatedData.personalInfo.bio,
          country: validatedData.personalInfo.country,
          region: validatedData.personalInfo.region,
          expertiseAreas: validatedData.expertise.expertiseAreas,
          yearsExperience: validatedData.expertise.yearsExperience,
        },
      });

      // Create all related records
      await Promise.all([
        // Create skills
        prisma.skill.createMany({
          data: validatedData.expertise.skills.map(skill => ({
            userId: expert.id,
            name: skill.name,
            category: skill.category,
            level: skill.level,
            endorsements: 0,
          })),
        }),

        // Create languages
        prisma.language.createMany({
          data: validatedData.expertise.languages.map(lang => ({
            userId: expert.id,
            name: lang.name,
            proficiency: lang.proficiency,
          })),
        }),

        // Create experiences
        prisma.experience.createMany({
          data: validatedData.expertise.experiences.map(exp => ({
            userId: expert.id,
            role: exp.role,
            organization: exp.organization,
            location: exp.location,
            startDate: new Date(exp.startDate),
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            current: exp.current,
            description: exp.description,
            skills: exp.skills,
          })),
        }),

        // Create education records
        prisma.education.createMany({
          data: validatedData.education.map(edu => ({
            userId: expert.id,
            degree: edu.degree,
            field: edu.field,
            institution: edu.institution,
            year: edu.year,
          })),
        }),

        // Create certifications
        prisma.certification.createMany({
          data: validatedData.certifications.map(cert => ({
            userId: expert.id,
            title: cert.title,
            issuer: cert.issuer,
            issueDate: new Date(cert.issueDate),
            expiryDate: cert.expiryDate ? new Date(cert.expiryDate) : null,
            documentUrl: cert.documentUrl,
            verificationStatus: cert.verificationStatus || "Pending",
          })),
        }),

        // Create publications
        prisma.publication.createMany({
          data: validatedData.publications.map(pub => ({
            userId: expert.id,
            title: pub.title,
            journal: pub.journal,
            year: pub.year,
            url: pub.url,
          })),
        }),

        // Create references
        prisma.reference.createMany({
          data: validatedData.references.map(ref => ({
            userId: expert.id,
            name: ref.name,
            position: ref.position,
            organization: ref.organization,
            email: ref.email,
            phone: ref.phone,
            relationship: ref.relationship,
          })),
        }),
      ]);

      return expert;
    });

    revalidatePath("/resources/experts");
    return { success: true, data: result };

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: "Validation error: " + Object.values(error.flatten().fieldErrors).join(", ") 
      };
    }

    if (error instanceof Error) {
      // Check for Prisma-specific errors
      if (error.message.includes('Unique constraint')) {
        return { 
          success: false, 
          error: "An account with this email already exists" 
        };
      }
      return { 
        success: false, 
        error: "Database error: " + error.message 
      };
    }

    return { 
      success: false, 
      error: "An unexpected error occurred. Please try again." 
    };
  }
}