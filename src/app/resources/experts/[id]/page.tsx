import { notFound } from "next/navigation";
import prisma from "@expo/lib/prisma";
import Link from "next/link";
import {
  Briefcase,
  Mail,
  MapPin,
  GraduationCap,
  Book,
  Globe,
  Edit,
  ArrowLeft,
} from "lucide-react";
import { Button } from '@expo/components/ui/button';

export default async function ExpertProfile({
  params,
}: {
  params: { id: string };
}) {
  const expert = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      languages: true,
      experiences: true,
      education: true,
    },
  });

  if (!expert) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/dashboard">Dashboard</Link>
            <span>/</span>
            <Link href="/dashboard">Experts</Link>
            <span>/</span>
            <span className="text-gray-900">{expert.fullName}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to List
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/experts/${expert.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center gap-6">
                <img
                  src={expert.id || "/api/placeholder/96/96"}
                  className="w-24 h-24 rounded-full"
                  alt={expert.fullName}
                />
                <div>
                  <h1 className="text-2xl font-bold mb-2">{expert.fullName}</h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {expert.email}
                    </div>
                    {expert.country && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {expert.country}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">About</h2>
              <p className="text-gray-600 whitespace-pre-line">{expert.bio}</p>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-gray-500" />
                <h2 className="text-lg font-semibold">Experience</h2>
              </div>
              <div className="space-y-6">
                {expert.experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="border-b last:border-0 pb-6 last:pb-0"
                  >
                    <div className="font-medium text-lg">{exp.role}</div>
                    <div className="text-gray-600 mb-2">{exp.organization}</div>
                    <div className="text-sm text-gray-500 mb-2">
                      {exp.startDate.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                      {exp.current
                        ? " - Present"
                        : ` - ${exp.endDate?.toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}`}
                    </div>
                    {exp.skills && (
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-gray-500" />
                <h2 className="text-lg font-semibold">Education</h2>
              </div>
              <div className="space-y-4">
                {expert.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="border-b last:border-0 pb-4 last:pb-0"
                  >
                    <div className="font-medium">
                      {edu.degree} in {edu.field}
                    </div>
                    <div className="text-gray-600">{edu.institution}</div>
                    <div className="text-sm text-gray-500">{edu.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Expertise Areas */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="font-semibold mb-4">Expertise Areas</h2>
              <div className="flex flex-wrap gap-2">
                {expert.expertiseAreas.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-5 w-5 text-gray-500" />
                <h2 className="font-semibold">Languages</h2>
              </div>
              <div className="space-y-2">
                {expert.languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-600">{lang.name}</span>
                    <span className="text-sm text-gray-500">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="font-semibold mb-4">Overview</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Years Experience</span>
                  <span className="font-medium">{expert.yearsExperience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Projects Completed</span>
                  <span className="font-medium">
                    {expert.projectsCompleted}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Rate</span>
                  <span className="font-medium">{expert.responseRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
