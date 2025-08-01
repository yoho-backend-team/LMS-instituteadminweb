import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "../../components/ui/table";
import PlacementForm from "./PlacementForm";

interface Placement {
  id: number;
  studentName: string;
  email: string;
  companyName: string;
  companyAddress: string;
  contactEmail: string;
  contactNumber: string;
  interviewDate: string;
  jobName: string;
  jobDescription: string;
  skills: string[];
  venue: string;
  address: string;
  courseName: string;
  education: string;
}

const initialPlacements: Placement[] = [
  {
    id: 1,
    studentName: "John Carter",
    email: "john@example.com",
    companyName: "TechCorp",
    companyAddress: "Bangalore, India",
    contactEmail: "hr@techcorp.com",
    contactNumber: "+91 9876543210",
    interviewDate: "2023-05-15",
    jobName: "Software Engineer",
    jobDescription: "Develop and maintain web applications",
    skills: ["JavaScript", "React", "Node.js"],
    venue: "TechHub Innovation Center",
    address: "123 Tech Street, San Francisco, CA 94107",
    courseName: "Computer Science",
    education: "Bachelor's"
  },
  {
    id: 2,
    studentName: "Emily Davis",
    email: "emily@example.com",
    companyName: "DataSystems",
    companyAddress: "Chennai, India",
    contactEmail: "careers@datasystems.com",
    contactNumber: "+91 8765432109",
    interviewDate: "2023-06-20",
    jobName: "Data Analyst",
    jobDescription: "Analyze and interpret complex data",
    skills: ["Python", "SQL", "Tableau"],
    venue: "Downtown Business Plaza",
    address: "500 Business Ave, New York, NY 10001",
    courseName: "Data Science",
    education: "Master's"
  },
  {
    id: 3,
    studentName: "Michael Brown",
    email: "michael@example.com",
    companyName: "HealthPlus",
    companyAddress: "Mumbai, India",
    contactEmail: "recruitment@healthplus.com",
    contactNumber: "+91 7654321098",
    interviewDate: "2023-07-10",
    jobName: "UX Designer",
    jobDescription: "Design user interfaces for healthcare applications",
    skills: ["Figma", "UI/UX", "Adobe XD"],
    venue: "Digital Design Studio",
    address: "789 Creative Lane, Austin, TX 73301",
    courseName: "Design",
    education: "Bachelor's"
  },
  {
    id: 4,
    studentName: "Sarah Wilson",
    email: "sarah@example.com",
    companyName: "CloudNine",
    companyAddress: "Hyderabad, India",
    contactEmail: "hiring@cloudnine.com",
    contactNumber: "+91 6543210987",
    interviewDate: "2023-08-05",
    jobName: "DevOps Engineer",
    jobDescription: "Implement and maintain CI/CD pipelines",
    skills: ["AWS", "Docker", "Kubernetes"],
    venue: "Cloud Computing Center",
    address: "456 Cloud Boulevard, Seattle, WA 98101",
    courseName: "Information Technology",
    education: "Master's"
  },
  {
    id: 5,
    studentName: "David Taylor",
    email: "david@example.com",
    companyName: "FinEdge",
    companyAddress: "Delhi, India",
    contactEmail: "jobs@finedge.com",
    contactNumber: "+91 9432109876",
    interviewDate: "2023-09-12",
    jobName: "Financial Analyst",
    jobDescription: "Analyze financial data and prepare reports",
    skills: ["Excel", "Financial Modeling", "Statistics"],
    venue: "Financial District Tower",
    address: "321 Finance Street, Chicago, IL 60601",
    courseName: "Business Administration",
    education: "MBA"
  }
];
const Placements = () => {
  const [showForm, setShowForm] = useState(false);
  const [placements, setPlacements] = useState<Placement[]>(initialPlacements);
  const [editingPlacement, setEditingPlacement] = useState<Placement | null>(null);

  const handleAddPlacement = (formData: any) => {
    const newPlacement = {
      id: editingPlacement ? editingPlacement.id : placements.length + 1,
      studentName: formData.selectedStudents?.[0]?.label.split(' (')[0] ||
        (editingPlacement ? editingPlacement.studentName : 'New Student'),
      email: formData.selectedStudents?.[0]?.label.match(/\(([^)]+)\)/)?.[1] ||
        (editingPlacement ? editingPlacement.email : 'student@example.com'),
      companyName: formData.companyName,
      companyAddress: formData.companyAddress,
      contactEmail: formData.contactEmail,
      contactNumber: formData.contactNumber,
      interviewDate: formData.interviewDate,
      jobName: formData.jobName,
      jobDescription: formData.jobDescription,
      skills: formData.skills || [],
      venue: formData.venue,
      address: formData.address,
      courseName: formData.courseName,
      education: formData.education
    };

    setPlacements(prevPlacements =>
      editingPlacement
        ? prevPlacements.map(p => p.id === editingPlacement.id ? newPlacement : p)
        : [...prevPlacements, newPlacement]
    );

    setEditingPlacement(null);
    setShowForm(false);
  };

  const handleEdit = (placement: Placement) => {
    setEditingPlacement(placement);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setPlacements(prevPlacements => prevPlacements.filter(placement => placement.id !== id));
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Placements</h2>
        <Button
          onClick={() => {
            setEditingPlacement(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-[#1BBFCA] text-white hover:bg-[#17a8b6]"
        >
          <FaPlus className="text-sm" />
          Add Placement
        </Button>
      </div>

      {showForm && (
        <PlacementForm
          mode={editingPlacement ? "edit" : "add"}
          onClose={() => {
            setEditingPlacement(null);
            setShowForm(false);
          }}
          onSubmit={handleAddPlacement}
          initialData={editingPlacement ? {
            companyName: editingPlacement.companyName,
            companyAddress: editingPlacement.companyAddress,
            contactEmail: editingPlacement.contactEmail,
            contactNumber: editingPlacement.contactNumber,
            interviewDate: editingPlacement.interviewDate,
            jobName: editingPlacement.jobName,
            jobDescription: editingPlacement.jobDescription,
            skills: editingPlacement.skills,
            venue: editingPlacement.venue,
            address: editingPlacement.address,
            courseName: editingPlacement.courseName,
            education: editingPlacement.education,
            selectedStudents: [{
              value: editingPlacement.id,
              label: `${editingPlacement.studentName} (${editingPlacement.email})`
            }]
          } : undefined}
        />
      )}

      <div className="border border-gray-400 shadow-2xl rounded-2xl p-2">
        <Table className=" overflow-auto">
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="px-6 py-3 font-medium">Student</TableHead>
              <TableHead className="px-6 py-3 font-medium">Email</TableHead>
              <TableHead className="px-6 py-3 font-medium">Company</TableHead>
              <TableHead className="px-6 py-3 font-medium">Interview Date</TableHead>
              <TableHead className="px-6 py-3 font-medium">Job</TableHead>
              <TableHead className="px-6 py-3 font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {placements.map((placement) => (
              <TableRow key={placement.id} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4">{placement.studentName}</TableCell>
                <TableCell className="px-6 py-4">{placement.email}</TableCell>
                <TableCell className="px-6 py-4">{placement.companyName}</TableCell>
                <TableCell className="px-6 py-4">
                  {new Date(placement.interviewDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-6 py-4">{placement.jobName}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative group">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                    title="Actions"
                    aria-label="Actions menu"
                  >
                    <FaEllipsisV className="h-4 w-4" />
                  </Button>

                  <div className="hidden group-hover:block absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-gray-200 border border-gray-400 focus:outline-none overflow-hidden">
                    <Button
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(placement);
                      }}
                      className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full transition-colors duration-150 ease-in-out"
                      aria-label="Edit"
                    >
                      <FaEdit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(placement.id);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full transition-colors duration-150 ease-in-out border-t border-gray-100"
                      aria-label="Delete"
                    >
                      <FaTrash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table></div>
    </div>
  );
};

export default Placements;