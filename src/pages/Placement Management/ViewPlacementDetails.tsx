import Image from "../../assets/AEicon.png"
import { Calendar, MapPin, Mail, Phone, Building, Users, GraduationCap, FileText, Clock, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "../../../src/components/ui/card"
import { Badge } from "../../../src/components/ui/badge"
import { Separator } from "../../../src/components/ui/separator"

interface JobDetailsShowProps {
  data?: {
    // Company Details
    companyName: string
    companyAddress: string
    contactEmail: string
    contactNumber: string
    companyLogo?: string
    
    // Job Details
    jobName: string
    jobDescription: string
    requiredSkills: string[]
    
    // Student Details
    selectedStudents: string[]
    
    // Interview Details
    interviewDate: string
    venue: string
    address: string
    
    // Eligibility Criteria
    courseName: string
    educationLevel: string
  }
}

export default function JobDetailsShow({ data }: JobDetailsShowProps) {
  const jobData = data ;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Job Posting Details</h1>
        <p className="text-gray-600">Complete information about the job opportunity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Company Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                {jobData.companyLogo && (
                  <div className="flex-shrink-0">
                    <Image
                      src={jobData.companyLogo || "/placeholder.svg"}
                      alt="Company Logo"
                      width={80}
                      height={80}
                      className="rounded-lg border object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{jobData.companyName}</h3>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-gray-500" />
                    <p className="text-sm text-gray-600">{jobData.companyAddress}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{jobData.contactEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{jobData.contactNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">{jobData.jobName}</h3>
                <p className="text-gray-600 leading-relaxed">{jobData.jobDescription}</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-3">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {jobData.requiredSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interview Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Interview Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Interview Date</p>
                    <p className="text-sm text-gray-600">
                      {new Date(jobData.interviewDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Venue</p>
                    <p className="text-sm text-gray-600">{jobData.venue}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-gray-600">{jobData.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Selected Students */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Selected Students
                <Badge variant="outline" className="ml-auto">
                  {jobData.selectedStudents.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {jobData.selectedStudents.map((student, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-gray-50">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{student}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Eligibility Criteria */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Eligibility Criteria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Course Name</p>
                <p className="text-sm text-gray-600">{jobData.courseName}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-gray-700">Education Level</p>
                <p className="text-sm text-gray-600">{jobData.educationLevel}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
