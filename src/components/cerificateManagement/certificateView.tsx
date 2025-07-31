import { HiMiniXMark } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom"
import {  FONTS } from '../../constants/uiConstants';

interface Certificate {
  id: number
  title: string
  description: string
  branch: string
  batch: string
  student: string
  email: string
}

export default function CertificateView() {
  const navigate = useNavigate()
  const location = useLocation()
  const certificate = location.state?.certificate as Certificate | undefined

  if (!certificate) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Certificate Not Found</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
       
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="mb-4">
       
      </div>
      
      <div className=" items-center justify-center">
         <div className="bg-[#1BBFCA] px-6 py-3 rounded-xl flex justify-between items-center">
                <h2 className="text-white text-lg font-semibold flex">
                 {certificate.student}
                </h2>
                <button
          onClick={() => navigate(-1)}
          className="bg-white ml-auto px-4 py-2 rounded-lg flex items-center"
        >
        
         <HiMiniXMark className="h-6 w-6  bg-gray-500 rounded-full text-white" />
        </button>
              </div>
        <div className="w-full max-w-4xl mt-5 justify-center ml-40 bg-white border-8 border-yellow-400 p-12 relative">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-yellow-600 mb-2" style={{ ...FONTS.heading_01}}>
              Certificate of {certificate.title.split(" ")[0].toUpperCase()} 2024
            </h1>
            <p className="text-lg text-gray-700 italic">This is proudly presented to</p>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 inline-block px-8" style={{ ...FONTS.heading_02}}>
              {certificate.student}
            </h2>
          </div>

          <div className="text-center mb-12 space-y-4">
            <p className="text-lg text-gray-700">For successfully completing the</p>
            <p className="text-xl font-semibold text-gray-800">
              {certificate.batch} - {certificate.branch} Branch
            </p>
            <div className="max-w-3xl mx-auto text-sm text-gray-600 leading-relaxed">
              <p>{certificate.description}</p>
            </div>
            <p className="text-lg text-gray-700 font-medium">
              on <span className="font-bold">6 months</span> program
            </p>
          </div>

          <div className="flex justify-between items-end mt-16">
            <div className="text-center">
              <div className="border-b-2 border-gray-400 w-48 mb-2"></div>
              <p className="text-sm text-gray-600">Signature 1</p>
              <p className="text-sm text-gray-600 font-medium">Director</p>
            </div>

            <div className="text-center">
              <div className="border-b-2 border-gray-400 w-48 mb-2"></div>
              <p className="text-sm text-gray-600">Signature 2</p>
              <p className="text-sm text-gray-600 font-medium">Instructor</p>
            </div>
          </div>

          <div className="absolute bottom-8 right-8">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-yellow-500">
              <div className="text-xs text-center text-yellow-800 font-bold">
                <div>Gold</div>
                <div>Seal</div>
              </div>
            </div>
          </div>

          <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-yellow-400"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-yellow-400"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-yellow-400"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-yellow-400"></div>
        </div>
      </div>
    </div>
  )
}