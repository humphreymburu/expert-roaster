export type Certification = {
    id: string;
    title: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    verificationStatus: 'verified' | 'pending' | 'expired';
    documentUrl: string;
  };
  
 export type Document = {
    id: string;
    type: 'CV' | 'Certificate' | 'License' | 'Publication' | 'Other';
    title: string;
    uploadDate: string;
    verificationStatus: 'verified' | 'pending';
    fileUrl: string;
  };
  
  export type Experience = {
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
  
  export type Skill = {
    name: string;
    category: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    endorsements: number;
  };

export type Profile = {
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
  