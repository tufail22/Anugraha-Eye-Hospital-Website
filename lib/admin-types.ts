/**
 * Anugraha Eye Hospital — Reusable Admin Component Interfaces
 * Location: /lib/admin-types.ts
 */

export interface EditableFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "number" | "email" | "tel" | "url";
  helpText?: string;
}

export interface EditableTextareaProps {
  id: string;
  label: string;
  value: string;
  rows?: number;
  placeholder?: string;
  enableRichText?: boolean;
  helpText?: string;
}

export interface ImageUploaderProps {
  id: string;
  label: string;
  currentImage?: string;
  currentAlt?: string;
  maxSizeMB?: number; // Default: 5MB
  allowedTypes?: string[]; // Default: ['image/jpeg', 'image/jpg', 'image/png']
  rejectedTypes?: string[]; // ['.webp', '.svg', '.gif', '.pdf', '.docx', '.exe']
  onUploadHandlerName?: string;
  onRemoveHandlerName?: string;
  helpText?: string;
}

export interface SEOEditorProps {
  sectionKey: string;
  currentTitle?: string;
  currentMetaDescription?: string;
}

export interface DoctorProfile {
  id: string;
  name: string;
  title: string;
  degrees: string;
  bio: string;
  photo?: string;
  photoAlt?: string;
  awards?: Array<{ title: string; year: string; organization: string }>;
}

export interface LocationProfile {
  id: string;
  type: "base" | "vision-center";
  name: string;
  town?: string;
  address: string;
  phone: string;
  whatsappPhone?: string;
  hours: string;
  doctorVisits?: string;
  details?: string;
  image?: string;
  imageAlt?: string;
}

export interface AdminCMSDataSchema {
  brand: {
    name: string;
    tagline: string;
    vision: string;
    mission: string;
    fallbackPhone: string;
    whatsappPhone: string;
    contactEmail: string;
    logo: string;
    logoAlt: string;
  };
  stats: {
    lifetimeSurgeries: string;
    outreachCamps: string;
    freeCataracts: string;
    studentsScreened: string;
    annualFreePatients: string;
    totalPeopleReached: string;
  };
  leadership: DoctorProfile[];
  administration: Array<{
    id: string;
    name: string;
    role: string;
    qualifications: string;
    tenure: string;
    desc: string;
    photo?: string;
    photoAlt?: string;
  }>;
  facilities: LocationProfile[];
}
