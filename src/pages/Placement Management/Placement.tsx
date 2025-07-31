import { useState } from "react"
import { FaPlus, FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import AddPlacement from "./AddPlacement"
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "../../components/ui/table"

interface Placement {
  id: number;
  studentName: string;
  email: string;
  companyName: string;
  interviewDate: string;
  jobName: string;
}

const initialPlacements: Placement[] = [
  {
    id: 1,
    studentName: "Kamaleesh",
    email: "kamaleesh@example.com",
    companyName: "TechCorp",
    interviewDate: "2023-05-15",
    jobName: "Software Engineer"
  },
  {
    id: 2,
    studentName: "Samantha",
    email: "samantha@example.com",
    companyName: "DataSystems",
    interviewDate: "2023-06-20",
    jobName: "Data Analyst"
  },
  {
    id: 3,
    studentName: "Vijay",
    email: "vijay@example.com",
    companyName: "WebSolutions",
    interviewDate: "2023-04-10",
    jobName: "Frontend Developer"
  },
 
  {
    id: 4,
    studentName: "Ana de Armas",
    email: "ana.dearmas@example.com",
    companyName: "AI Innovations",
    interviewDate: "2023-08-12",
    jobName: "Machine Learning Engineer"
  }
];

const Placements=()=> {
  const [showForm, setShowForm] = useState(false)
  const [placements, setPlacements] = useState<Placement[]>(initialPlacements)
  const [editingPlacement, setEditingPlacement] = useState<Placement | null>(null)

  const handleAddPlacement = (newPlacement: Placement) => {
    if (editingPlacement) {
      setPlacements(placements.map(p => p.id === editingPlacement.id ? newPlacement : p))
      setEditingPlacement(null)
    } else {
      setPlacements([...placements, { ...newPlacement, id: placements.length + 1 }])
    }
    setShowForm(false)
  }

  const handleEdit = (placement: Placement) => {
    setEditingPlacement(placement)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    setPlacements(placements.filter(placement => placement.id !== id))
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Placements</h2>
        <Button
          onClick={() => {
            setEditingPlacement(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 bg-[#1BBFCA] text-white hover:bg-[#17a8b6]"
        >
          <FaPlus className="text-sm" />
          Add Placement
        </Button>
      </div>

      {showForm && (
        <AddPlacement
          placement={editingPlacement}
          onClose={() => setShowForm(false)}
          onSubmit={handleAddPlacement}
        />
      )}

      <Table className="border border-gray-200 shadow-sm rounded-lg overflow-auto">
        <TableHeader className="bg-gray-50">
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
                  className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                  title="Actions"
                  aria-label="Actions menu"
                  type="button"
                >
                  <FaEllipsisV />
                </Button>
                
                <div className="hidden group-hover:block absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-gray-200 focus:outline-none overflow-hidden">
                  {/* Edit Button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEdit(placement)
                    }}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full transition-colors duration-150 ease-in-out"
                    aria-label="Edit"
                  >
                    <FaEdit className="mr-2" />
                    <span>Edit</span>
                  </Button>

                  {/* Delete Button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(placement.id)
                    }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full transition-colors duration-150 ease-in-out border-t border-gray-100"
                    aria-label="Delete"
                  >
                    <FaTrash className="mr-2" />
                    <span>Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Placements