"use client"

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@expo/components/ui/card";
import { Button } from "@expo/components/ui/button";
import { Badge } from "@expo/components/ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Mail,
  Award,
  MapPin,
  Settings,
  Languages,
  FileText,
  Calendar,
  MessageSquare,
  Bell,
  BarChart,
  Home,
  Users,
  LogOut,
  ChevronDown,
  Globe,
  Clock,
  Plus,
  Download,
  ExternalLink,
  ThumbsUp,
  Upload,
  Eye,
  GraduationCap,
} from "lucide-react";

const navigationItems = [
  {
    group: "Main",
    items: [
      { label: "Home", icon: Home, href: "/dashboard" },
      { label: "Profile", icon: User, href: "/profile", active: true },
      { label: "Messages", icon: MessageSquare, href: "/messages", badge: "5" },
    ],
  },
  {
    group: "Professional",
    items: [
      { label: "Projects", icon: FileText, href: "/projects" },
      { label: "Calendar", icon: Calendar, href: "/calendar" },
      { label: "Analytics", icon: BarChart, href: "/analytics" },
    ],
  },
  {
    group: "Account",
    items: [
      { label: "Settings", icon: Settings, href: "/settings" },
      { label: "Sign Out", icon: LogOut, href: "/logout" },
    ],
  },
];

// Types
type Certification = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  verificationStatus: 'verified' | 'pending' | 'expired';
  documentUrl: string;
};

type Document = {
  id: string;
  type: 'CV' | 'Certificate' | 'License' | 'Publication' | 'Other';
  title: string;
  uploadDate: string;
  verificationStatus: 'verified' | 'pending';
  fileUrl: string;
};

type Experience = {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  skills: string[];
};

type Skill = {
  name: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  endorsements: number;
};

type Profile = {
  id: string;
  full_name: string;
  email: string;
  bio: string;
  expertise_areas: string[];
  languages: { name: string; proficiency: string }[];
  country: string;
  region: string;
  is_verified: boolean;
  years_of_experience: number;
  projects_completed: number;
  response_rate: number;
  last_active: string;
  certifications: Certification[];
  documents: Document[];
  experience: Experience[];
  skills: Skill[];
  education: {
    degree: string;
    field: string;
    institution: string;
    year: string;
  }[];
  publications: {
    title: string;
    journal: string;
    year: string;
    url?: string;
  }[];
};


const mockProfile: Profile = {
  id: "1",
  full_name: "Dr. Sarah Johnson",
  email: "sarah.johnson@example.com",
  bio: "Public health expert with 15+ years of experience in epidemic prevention and response. Specialized in developing comprehensive healthcare solutions and policy recommendations for global health challenges.",
  expertise_areas: [
    "Public Health",
    "Epidemiology",
    "Disease Prevention",
    "Healthcare Policy",
  ],
  languages: [
    { name: "English", proficiency: "Native" },
    { name: "French", proficiency: "Advanced" },
    { name: "Spanish", proficiency: "Intermediate" },
  ],
  country: "United States",
  region: "Northeast",
  is_verified: true,
  years_of_experience: 15,
  projects_completed: 127,
  response_rate: 98,
  last_active: "2 hours ago",
  certifications: [
    {
      id: "cert1",
      title: "Advanced Epidemiology Certificate",
      issuer: "Harvard School of Public Health",
      issueDate: "2022-06-15",
      verificationStatus: "verified",
      documentUrl: "/docs/cert1.pdf",
    },
    {
      id: "cert2",
      title: "Global Health Leadership",
      issuer: "WHO Academy",
      issueDate: "2023-03-20",
      verificationStatus: "verified",
      documentUrl: "/docs/cert2.pdf",
    },
  ],
  documents: [
    {
      id: "doc1",
      type: "CV",
      title: "Professional CV",
      uploadDate: "2024-01-15",
      verificationStatus: "verified",
      fileUrl: "/docs/cv.pdf",
    },
    {
      id: "doc2",
      type: "Publication",
      title: "Global Health Trends 2023",
      uploadDate: "2023-12-10",
      verificationStatus: "verified",
      fileUrl: "/docs/publication.pdf",
    },
  ],
  experience: [
    {
      id: "exp1",
      role: "Senior Epidemiologist",
      organization: "World Health Organization",
      location: "Geneva, Switzerland",
      startDate: "2019-01",
      current: true,
      description:
        "Leading global health initiatives and emergency response programs.",
      skills: ["Epidemic Response", "Public Health", "Leadership"],
    },
    {
      id: "exp2",
      role: "Public Health Consultant",
      organization: "CDC",
      location: "Atlanta, USA",
      startDate: "2015-03",
      endDate: "2018-12",
      current: false,
      description:
        "Provided expert consultation on disease prevention strategies.",
      skills: ["Consulting", "Disease Prevention", "Policy Development"],
    },
  ],
  skills: [
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
    {
      name: "Data Analysis",
      category: "Technical",
      level: "Advanced",
      endorsements: 29,
    },
  ],
  education: [
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
  publications: [
    {
      title: "Global Patterns of Emerging Infectious Diseases",
      journal: "Nature Public Health Emergency Collection",
      year: "2023",
      url: "https://example.com/publication1",
    },
    {
      title: "Public Health Response to COVID-19",
      journal: "The Lancet",
      year: "2022",
      url: "https://example.com/publication2",
    },
  ],
};



export default function ExpertProfile() {
  const pathname = usePathname();
const [profile] = useState<Profile>(mockProfile);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Navigation */}
      <div className="w-64 bg-white border-r fixed h-screen">
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">ER</span>
            </div>
            <span className="font-semibold text-lg">Expert Roster</span>
          </Link>
        </div>

        <div className="px-4 py-6 space-y-6">
          {navigationItems.map((group, index) => (
            <div key={index}>
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {group.group}
              </h3>
              <nav className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center justify-between px-3 py-2 rounded-lg text-sm
                      ${
                        item.active
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <item.icon
                        className={`h-5 w-5 mr-3 ${
                          item.active ? "text-blue-700" : "text-gray-400"
                        }`}
                      />
                      {item.label}
                    </div>
                    {item.badge && (
                      <Badge className="bg-blue-100 text-blue-700">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white border-b">
          <div className="px-8 h-16 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Expert Profile</h1>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Expert
              </Button>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: "Years Experience", value: profile.years_of_experience + "+", icon: Clock },
              { label: "Projects", value: profile.projects_completed.toString(), icon: FileText },
              { label: "Response Rate", value: profile.response_rate + "%", icon: MessageSquare },
              { label: "Last Active", value: profile.last_active, icon: Users },
            ].map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Profile Content */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="col-span-2 space-y-6">
              {/* Profile Overview */}
              <Card>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-8 w-8 text-blue-600" />
                        </div>
                        {profile.is_verified && (
                          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                            <Award className="h-5 w-5 text-green-600" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h2 className="text-2xl font-bold">{profile.full_name}</h2>
                          {profile.is_verified && (
                            <Badge className="bg-green-100 text-green-700">
                              Verified Expert
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-4 w-4" />
                            <span>{profile.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>
                              {profile.region}, {profile.country}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Bio */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">About</h3>
                      <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
                    </div>

                    {/* Experience */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Experience</h3>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {profile.experience.map((exp) => (
                          <Card key={exp.id} className="border border-gray-200">
                            <CardContent className="p-4">
                              <div className="flex justify-between">
                                <div>
                                  <h4 className="font-semibold">{exp.role}</h4>
                                  <p className="text-gray-600">{exp.organization}</p>
                                  <p className="text-sm text-gray-500">
                                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                  </p>
                                  <p className="text-sm text-gray-500 flex items-center mt-1">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {exp.location}
                                  </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {exp.skills.map((skill) => (
                                    <Badge key={skill} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <p className="mt-2 text-gray-600">{exp.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Publications */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Publications</h3>
                      <div className="space-y-4">
                        {profile.publications.map((pub, index) => (
                          <Card key={index} className="border border-gray-200">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex items-start space-x-3">
                                  <FileText className="h-5 w-5 text-gray-400 mt-1" />
                                  <div>
                                    <h4 className="font-medium">{pub.title}</h4>
                                    <p className="text-sm text-gray-600">
                                      {pub.journal} • {pub.year}
                                    </p>
                                    {pub.url && (
                                      <Link
                                        href={pub.url}
                                        className="text-sm text-blue-600 hover:underline flex items-center mt-1"
                                      >
                                        View Publication
                                        <ExternalLink className="h-3 w-3 ml-1" />
                                      </Link>
                                    )}
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Skills Section */}
              <Card>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Skills & Expertise</h3>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skill
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {profile.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{skill.name}</h4>
                            <span className="text-sm text-gray-500">
                              {skill.category}
                            </span>
                          </div>
                          <Badge
                            className={`
                              ${skill.level === 'Expert' ? 'bg-blue-100 text-blue-700' : ''}
                              ${skill.level === 'Advanced' ? 'bg-green-100 text-green-700' : ''}
                            `}
                          >
                            {skill.level}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {skill.endorsements} endorsements
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Certifications</h3>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {profile.certifications.map((cert) => (
                      <div
                        key={cert.id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{cert.title}</h4>
                            <p className="text-sm text-gray-600">{cert.issuer}</p>
                            <p className="text-xs text-gray-500">
                              Issued: {cert.issueDate}
                              {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                            </p>
                          </div>
                          <Badge
                            className={`
                              ${cert.verificationStatus === 'verified' ? 'bg-green-100 text-green-700' : ''}
                              ${cert.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                              ${cert.verificationStatus === 'expired' ? 'bg-red-100 text-red-700' : ''}
                            `}
                          >
                            {cert.verificationStatus}
                          </Badge>
                        </div>
                        <div className="flex space-x-2 mt-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader className="border-b">
                  <h3 className="text-lg font-semibold">Education</h3>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {profile.education.map((edu, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <GraduationCap className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {edu.degree} in {edu.field}
                          </h4>
                          <p className="text-sm text-gray-600">{edu.institution}</p>
                          <p className="text-sm text-gray-500">{edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}