export interface Certificate {
  id: number
  title: string
  description: string
  branch: string
  batch: string
  student: string
  email: string
}

export const downloadCertificate = async (certificate: Certificate) => {
  try {
    const html2canvas = (await import("html2canvas")).default
    const jsPDF = (await import("jspdf")).default

    const tempContainer = document.createElement("div")
    tempContainer.style.position = "absolute"
    tempContainer.style.left = "-9999px"
    tempContainer.style.top = "-9999px"
    tempContainer.style.width = "1200px"
    tempContainer.style.height = "800px"

    tempContainer.innerHTML = `
      <div style="min-height: 800px; background: rgb(251 207 232); padding: 32px; display: flex; align-items: center; justify-content: center;">
        <div style="width: 100%; max-width: 1000px; background: white; border: 8px solid rgb(250 204 21); padding: 48px; position: relative;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 2.5rem; font-weight: bold; color: rgb(202 138 4); margin-bottom: 8px;">
              Certificate of ${certificate.title.split(" ")[0].toUpperCase()} 2024
            </h1>
            <p style="font-size: 1.125rem; color: rgb(55 65 81); font-style: italic;">This is proudly presented to</p>
          </div>

          <div style="text-align: center; margin-bottom: 32px;">
            <h2 style="font-size: 1.875rem; font-weight: bold; color: rgb(31 41 55); border-bottom: 2px solid rgb(209 213 219); padding-bottom: 8px; display: inline-block; padding-left: 32px; padding-right: 32px;">
              ${certificate.student}
            </h2>
          </div>

          <div style="text-align: center; margin-bottom: 48px;">
            <p style="font-size: 1.125rem; color: rgb(55 65 81); margin-bottom: 16px;">For successfully completing the</p>
            <p style="font-size: 1.25rem; font-weight: 600; color: rgb(31 41 55); margin-bottom: 16px;">${certificate.batch} - ${certificate.branch} Branch</p>
            <div style="max-width: 600px; margin: 0 auto; font-size: 0.875rem; color: rgb(75 85 99); line-height: 1.625; margin-bottom: 16px;">
              <p>${certificate.description}</p>
            </div>
            <p style="font-size: 1.125rem; color: rgb(55 65 81); font-weight: 500;">
              on <span style="font-weight: bold;">6 months</span> program
            </p>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: end; margin-top: 64px;">
            <div style="text-align: center;">
              <div style="border-bottom: 2px solid rgb(156 163 175); width: 192px; margin-bottom: 8px;"></div>
              <p style="font-size: 0.875rem; color: rgb(75 85 99);">Signature 1</p>
              <p style="font-size: 0.875rem; color: rgb(75 85 99); font-weight: 500;">Director</p>
            </div>
            <div style="text-align: center;">
              <div style="border-bottom: 2px solid rgb(156 163 175); width: 192px; margin-bottom: 8px;"></div>
              <p style="font-size: 0.875rem; color: rgb(75 85 99);">Signature 2</p>
              <p style="font-size: 0.875rem; color: rgb(75 85 99); font-weight: 500;">Instructor</p>
            </div>
          </div>

          <div style="position: absolute; bottom: 32px; right: 32px;">
            <div style="width: 80px; height: 80px; background: rgb(250 204 21); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 4px solid rgb(234 179 8);">
              <div style="font-size: 0.75rem; text-align: center; color: rgb(133 77 14); font-weight: bold;">
                <div>Gold</div>
                <div>Seal</div>
              </div>
            </div>
          </div>

          <div style="position: absolute; top: 16px; left: 16px; width: 32px; height: 32px; border-left: 4px solid rgb(250 204 21); border-top: 4px solid rgb(250 204 21);"></div>
          <div style="position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-right: 4px solid rgb(250 204 21); border-top: 4px solid rgb(250 204 21);"></div>
          <div style="position: absolute; bottom: 16px; left: 16px; width: 32px; height: 32px; border-left: 4px solid rgb(250 204 21); border-bottom: 4px solid rgb(250 204 21);"></div>
          <div style="position: absolute; bottom: 16px; right: 16px; width: 32px; height: 32px; border-right: 4px solid rgb(250 204 21); border-bottom: 4px solid rgb(250 204 21);"></div>
        </div>
      </div>
    `

    document.body.appendChild(tempContainer)

    const canvas = await html2canvas(tempContainer, {
      width: 1200,
      height: 800,
      scale: 2,
      useCORS: true,
      allowTaint: true,
    })

    document.body.removeChild(tempContainer)

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [1200, 800],
    })

    const imgData = canvas.toDataURL("image/png")
    pdf.addImage(imgData, "PNG", 0, 0, 1200, 800)

    pdf.save(`${certificate.student}_${certificate.title}_Certificate.pdf`)
  } catch (error) {
    console.error("Error generating certificate:", error)
    alert("Error generating certificate. Please try again.")
  }
}