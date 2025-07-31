import TrichyImg from "../../assets/trichy.png"
import { ArrowRight } from "lucide-react"

interface LocationCardProps {
  imageSrc: string
  cityName: string
  address: string
  status: string
}

export function LocationCard({ imageSrc, cityName, address, status }: LocationCardProps) {
      const finalImageSrc = imageSrc || TrichyImg

  return (
    <div className="flex flex-col items-end p-4 gap-2 w-full max-w-sm bg-white shadow-lg rounded-xl md:w-[410px]">
      <div className="relative w-full h-[200px] rounded-xl overflow-hidden">
       <img
          src={finalImageSrc}
          alt={cityName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex justify-center items-center p-2 w-10 h-10 bg-white rounded-lg">
          {/* Mimicking the two rotated image layers with a colored background and an icon */}
          <div className="relative w-6 h-6">
            
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-4 w-full">
        <div className="flex flex-col items-start gap-3 w-full">
          <h3 className="text-lg font-semibold capitalize text-[#716F6F]">{cityName}</h3>
          <p className="text-xs font-light capitalize text-[#7D7D7D]">{address}</p>
        </div>
        <div className="flex justify-center items-start px-4 py-2 gap-2 border border-[#716F6F] rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium capitalize text-[#716F6F]">{status}</span>
            <ArrowRight className="w-5 h-5 text-[#716F6F] transform rotate-90" />
          </div>
        </div>
      </div>
    </div>
  )
}
