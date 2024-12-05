"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@expo/components/ui/card";
import { Button } from "@expo/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@expo/components/ui/tabs";
import { Progress } from "@expo/components/ui/progress";
import { Badge } from "@expo/components/ui/badge";
import {
  User,
  Mail,
  Award,
  FileText,
  Upload,
  Settings,
  Calendar,
  Globe,
  Languages,
  GraduationCap,
  Bell,
  Download,
  Activity,
} from "lucide-react";
import { toast } from '@expo/hooks/use-toast';

// Types
type Language = {
  code: string;
  name: string;
  proficiency: "Basic" | "Intermediate" | "Advanced" | "Native";
};

type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  verified: boolean;
  documentUrl: string;
};

type Document = {
  id: string;
  type: "CV" | "Certificate" | "Reference" | "Other";
  name: string;
  url: string;
  uploadDate: string;
  verified: boolean;
};

type Profile = {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  bio: string | null;
  expertise_areas: string[];
  languages: Language[];
  certifications: Certification[];
  country: string;
  region: string;
  is_verified: boolean;
  rating: number;
  years_of_experience: number;
  documents: Document[];
  specializations: string[];
  available_for_contact: boolean;
  profile_completion: number;
  total_projects: number;
  recent_activity: {
    date: string;
    type: string;
    description: string;
  }[];
  notifications: {
    id: string;
    type: string;
    message: string;
    read: boolean;
    date: string;
  }[];
};

// Mock Data
const mockProfile: Profile = {
  id: "1",
  created_at: "2024-01-01",
  updated_at: "2024-03-15",
  full_name: "Dr. Sarah Johnson",
  email: "sarah.johnson@example.com",
  avatar_url: null,
  bio: "Public health expert with 15+ years of experience in epidemic prevention and response.",
  expertise_areas: [
    "Public Health",
    "Epidemiology",
    "Disease Prevention",
    "Healthcare Management",
  ],
  languages: [
    { code: "en", name: "English", proficiency: "Native" },
    { code: "fr", name: "French", proficiency: "Advanced" },
    { code: "es", name: "Spanish", proficiency: "Intermediate" },
  ],
  certifications: [
    {
      id: "cert1",
      name: "WHO Health Emergency Management",
      issuer: "World Health Organization",
      date: "2023-06-15",
      verified: true,
      documentUrl: "/docs/cert1.pdf",
    },
    {
      id: "cert2",
      name: "Epidemiology Advanced Certificate",
      issuer: "Johns Hopkins University",
      date: "2022-03-20",
      verified: true,
      documentUrl: "/docs/cert2.pdf",
    },
  ],
  country: "United States",
  region: "Northeast",
  is_verified: true,
  rating: 4.9,
  years_of_experience: 15,
  documents: [
    {
      id: "doc1",
      type: "CV",
      name: "Professional CV",
      url: "/docs/cv.pdf",
      uploadDate: "2024-01-15",
      verified: true,
    },
    {
      id: "doc2",
      type: "Certificate",
      name: "PhD Certificate",
      url: "/docs/phd.pdf",
      uploadDate: "2024-01-15",
      verified: true,
    },
    {
      id: "doc3",
      type: "Reference",
      name: "WHO Reference Letter",
      url: "/docs/reference.pdf",
      uploadDate: "2024-02-01",
      verified: true,
    },
  ],
  specializations: [
    "Infectious Diseases",
    "Pandemic Response",
    "Community Health",
    "Health Policy",
  ],
  available_for_contact: true,
  profile_completion: 95,
  total_projects: 47,
  recent_activity: [
    {
      date: "2024-03-14",
      type: "project",
      description: "Completed Health Assessment Project in Southeast Asia",
    },
    {
      date: "2024-03-10",
      type: "certification",
      description: "Added new WHO certification",
    },
    {
      date: "2024-03-05",
      type: "update",
      description: "Updated expertise areas and skills",
    },
  ],
  notifications: [
    {
      id: "notif1",
      type: "verification",
      message: "Your latest certification has been verified",
      read: false,
      date: "2024-03-14",
    },
    {
      id: "notif2",
      type: "project",
      message: "New project opportunity matching your expertise",
      read: false,
      date: "2024-03-13",
    },
  ],
};

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Simulate loading profile
  useEffect(() => {
    const loadProfile = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProfile(mockProfile);
      setLoading(false);
    };
    loadProfile();
  }, []);

  // Calculate unread notifications
  useEffect(() => {
    if (profile?.notifications) {
      setUnreadNotifications(
        profile.notifications.filter((n) => !n.read).length
      );
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }
  const renderStatusBadge = (status: boolean) => {
    return status ? (
      <Badge className="bg-green-50 text-green-700 border-green-200">
        Verified
      </Badge>
    ) : (
      <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">
        Pending
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }


  const handleProfileUpdate = async (updatedData: any) => {
    try {
      setLoading(true);
      // In a real app, you would make an API call here
      // For now, we'll just update the local state
      setProfile({
        ...profile,
        ...updatedData,
      });
      // Show success message
      toast({
        title: "Profile updated successfully",
        //variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "Please try again later",
        //variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-6 w-6 text-blue-600" />
                )}
              </div>
              <div>
                <h2 className="font-semibold">{profile?.full_name}</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Globe className="h-4 w-4" />
                  <span>
                    {profile?.country}, {profile?.region}
                  </span>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-blue-50">
                  <Award className="h-4 w-4 mr-1" />
                  Expert
                </Badge>
                {renderStatusBadge(profile?.is_verified || false)}
              </div>

              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>

              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Completion */}
        <Card className="mb-8">
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="space-y-1">
                <span className="text-sm font-medium">Profile Completion</span>
                <p className="text-sm text-gray-500">
                  Complete your profile to increase visibility
                </p>
              </div>
              <span className="text-sm font-medium">
                {profile?.profile_completion}%
              </span>
            </div>
            <Progress
              value={profile?.profile_completion || 0}
              className="h-2"
            />
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue={activeTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-none">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Projects
                      </p>
                      <p className="text-2xl font-bold">
                        {profile?.total_projects}
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-none">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Rating
                      </p>
                      <p className="text-2xl font-bold">
                        {profile?.rating}/5.0
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Award className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-none">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Experience
                      </p>
                      <p className="text-2xl font-bold">
                        {profile?.years_of_experience}+ yrs
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Expertise Card */}
              <Card>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Expertise & Skills
                    </h3>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                    
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-2">
                        Expertise Areas
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {profile?.expertise_areas.map((area) => (
                          <Badge key={area} variant="secondary">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-2">
                        Languages
                      </label>
                      <div className="space-y-2">
                        {profile?.languages.map((lang) => (
                          <div
                            key={lang.code}
                            className="flex items-center justify-between"
                          >
                            <span>{lang.name}</span>
                            <Badge variant="outline">{lang.proficiency}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-2">
                        Specializations
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {profile?.specializations.map((spec) => (
                          <Badge key={spec} variant="secondary">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity Card */}
              <Card>
                <CardHeader className="border-b">
                  <h3 className="text-lg font-semibold">Recent Activity</h3>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {profile?.recent_activity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <Activity className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm">{activity.description}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Documents & Credentials
                  </h3>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {profile?.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            Uploaded on{" "}
                            {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {doc.verified && renderStatusBadge(true)}
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications">
            <Card>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Professional Certifications
                  </h3>
                  <Button>
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Add Certification
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {profile?.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-sm text-gray-500">
                            {cert.issuer} · Issued{" "}
                            {new Date(cert.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {cert.verified && renderStatusBadge(true)}
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader className="border-b">
                <h3 className="text-lg font-semibold">Activity Timeline</h3>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {profile?.recent_activity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
