"use client";

import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as Select from "@radix-ui/react-select";
import * as Dialog from "@radix-ui/react-dialog";
import {
  PersonIcon,
  MagnifyingGlassIcon,
  Cross2Icon,
  CaretDownIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  UpdateIcon,
  ClockIcon,
  DotsHorizontalIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { styled } from "@stitches/react";
import { BarChart, Bell, Calendar, FileText, Home, LogOut, MessageSquare, Settings, User } from 'lucide-react';
import { Badge } from '@expo/components/ui/badge';
import { Button } from '@expo/components/ui/button';

// Types
type ApplicationStatus = "pending" | "in_review" | "approved" | "rejected" | "more_info_needed";

type Application = {
  id: string;
  name: string;
  email: string;
  date: string;
  status: ApplicationStatus;
  expertise: string[];
  location: string;
  yearsOfExperience: number;
  documents: {
    name: string;
    type: string;
    url: string;
  }[];
  languages: {
    name: string;
    proficiency: string;
  }[];
};

// Styled Components
const StyledTable = styled('table', {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
});

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

export default function ReviewsPage() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'exp1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.j@example.com',
      date: '2024-03-01',
      status: 'pending',
      expertise: ['Public Health', 'Epidemiology'],
      location: 'Boston, USA',
      yearsOfExperience: 15,
      documents: [
        { name: 'CV.pdf', type: 'CV', url: '/docs/cv.pdf' },
        { name: 'Certification.pdf', type: 'Certificate', url: '/docs/cert.pdf' }
      ],
      languages: [
        { name: 'English', proficiency: 'Native' },
        { name: 'French', proficiency: 'Advanced' }
      ]
    },
    {
      id: 'exp2',
      name: 'Prof. Michael Chen',
      email: 'michael.c@example.com',
      date: '2024-03-02',
      status: 'in_review',
      expertise: ['Climate Change', 'Environmental Policy'],
      location: 'Singapore',
      yearsOfExperience: 12,
      documents: [
        { name: 'CV.pdf', type: 'CV', url: '/docs/cv.pdf' }
      ],
      languages: [
        { name: 'English', proficiency: 'Advanced' },
        { name: 'Chinese', proficiency: 'Native' }
      ]
    },
    {
      id: 'exp3',
      name: 'Dr. Emily Brown',
      email: 'emily.b@example.com',
      date: '2024-03-03',
      status: 'approved',
      expertise: ['Education Technology', 'Curriculum Development'],
      location: 'London, UK',
      yearsOfExperience: 8,
      documents: [
        { name: 'CV.pdf', type: 'CV', url: '/docs/cv.pdf' },
        { name: 'Portfolio.pdf', type: 'Other', url: '/docs/portfolio.pdf' }
      ],
      languages: [
        { name: 'English', proficiency: 'Native' },
        { name: 'Spanish', proficiency: 'Intermediate' }
      ]
    }
  ]);

  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewComment, setReviewComment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_review: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    more_info_needed: 'bg-purple-100 text-purple-800'
  };

  const updateApplicationStatus = (id: string, newStatus: ApplicationStatus) => {
    setApplications(apps => 
      apps.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
    setIsReviewOpen(false);
  };

  const filteredApplications = applications.filter(app => 
    (statusFilter === "all" || app.status === statusFilter) &&
    (app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="flex-1">
        <div className="sticky top-0 z-10 bg-white border-b">
          <div className="px-8 h-20 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Expert Review Applications
            </h1>
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
        `{" "}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <Select.Root
                  value={statusFilter}
                  onValueChange={(value: ApplicationStatus | "all") =>
                    setStatusFilter(value)
                  }
                >
                  <Select.Trigger className="inline-flex items-center justify-between rounded-lg border bg-white px-4 py-2 text-sm">
                    <span>Filter by Status</span>
                    <ChevronDownIcon />
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Content className="bg-white rounded-lg shadow-lg border p-1">
                      <Select.Item
                        value="all"
                        className="px-3 py-2 text-sm rounded hover:bg-gray-100 cursor-pointer"
                      >
                        All Applications
                      </Select.Item>
                      <Select.Item
                        value="pending"
                        className="px-3 py-2 text-sm rounded hover:bg-gray-100 cursor-pointer"
                      >
                        Pending
                      </Select.Item>
                      <Select.Item
                        value="in_review"
                        className="px-3 py-2 text-sm rounded hover:bg-gray-100 cursor-pointer"
                      >
                        In Review
                      </Select.Item>
                      <Select.Item
                        value="approved"
                        className="px-3 py-2 text-sm rounded hover:bg-gray-100 cursor-pointer"
                      >
                        Approved
                      </Select.Item>
                      <Select.Item
                        value="rejected"
                        className="px-3 py-2 text-sm rounded hover:bg-gray-100 cursor-pointer"
                      >
                        Rejected
                      </Select.Item>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="overflow-x-auto">
              <StyledTable>
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Expert
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Applied
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <PersonIcon className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium">{app.name}</div>
                            <div className="text-sm text-gray-500">
                              {app.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            statusColors[app.status]
                          }`}
                        >
                          {app.status.replace(/_/g, " ").toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(app.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedApplication(app);
                            setIsReviewOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          Review Application
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
            </div>
          </div>
        </div>
        <Dialog.Root open={isReviewOpen} onOpenChange={setIsReviewOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[800px] p-6">
              <div className="flex justify-between items-start mb-6">
                <Dialog.Title className="text-lg font-semibold">
                  Review Application
                </Dialog.Title>
                <Dialog.Close className="text-gray-400 hover:text-gray-500">
                  <Cross2Icon />
                </Dialog.Close>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Expert Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Expert Details
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <PersonIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {selectedApplication?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {selectedApplication?.email}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-gray-500">Location:</span>{" "}
                          {selectedApplication?.location}
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Experience:</span>{" "}
                          {selectedApplication?.yearsOfExperience} years
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Expertise Areas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplication?.expertise.map((exp) => (
                        <span
                          key={exp}
                          className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Languages
                    </h3>
                    <div className="space-y-2">
                      {selectedApplication?.languages.map((lang, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between px-3 py-2 bg-gray-50 rounded-lg"
                        >
                          <span>{lang.name}</span>
                          <span className="text-sm text-gray-500">
                            {lang.proficiency}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Form */}
                <div className="space-y-4 border-l pl-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Update Status
                    </label>
                    <Select.Root
                      onValueChange={(value: ApplicationStatus) => {
                        if (selectedApplication) {
                          setSelectedApplication({
                            ...selectedApplication,
                            status: value,
                          });
                        }
                      }}
                    >
                      <Select.Trigger className="w-full inline-flex items-center justify-between rounded border bg-white px-3 py-2">
                        <Select.Value placeholder="Select new status" />
                        <ChevronDownIcon />
                      </Select.Trigger>

                      <Select.Portal>
                        <Select.Content>
                          <Select.Item value="approved">Approve</Select.Item>
                          <Select.Item value="rejected">Reject</Select.Item>
                          <Select.Item value="more_info_needed">
                            Request More Info
                          </Select.Item>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Review Comments
                    </label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Add your review comments..."
                      className="w-full h-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Dialog.Close asChild>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        Cancel
                      </button>
                    </Dialog.Close>
                    <button
                      onClick={() => {
                        if (selectedApplication) {
                          updateApplicationStatus(
                            selectedApplication.id,
                            selectedApplication.status
                          );
                        }
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        `
      </div>
    </div>
  );
}