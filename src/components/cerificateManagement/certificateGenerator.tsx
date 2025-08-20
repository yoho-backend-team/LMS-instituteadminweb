export interface Certificate {
	id: number;
	title: string;
	description: string;
	branch: string;
	batch: string;
	student: string;
	email: string;
}
export const downloadCertificate = async (certificate: Certificate) => {
	try {
		const html2canvas = (await import('html2canvas')).default;
		const jsPDF = (await import('jspdf')).default;

		const tempContainer = document.createElement('div');
		tempContainer.style.position = 'absolute';
		tempContainer.style.left = '-9999px';
		tempContainer.style.top = '-9999px';
		tempContainer.style.width = '1200px';
		tempContainer.style.height = '800px';
		tempContainer.style.fontFamily = 'Montserrat, sans-serif';

		tempContainer.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Italianno&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Pirata+One&display=swap');
        
        .certificate-container {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 25%, #c084fc 50%, #e879f9 75%, #f3e8ff 100%);
          position: relative;
          overflow: hidden;
          margin: 0 auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        /* Purple geometric shapes */
        .certificate-container::before {
          content: '';
          position: absolute;
          top: -50px;
          right: -50px;
          width: 200px;
          height: 50px;
          background: linear-gradient(45deg, #7c3aed, #a855f7);
          transform: rotate(45deg);
          opacity: 0.8;
        }
        
        .certificate-container::after {
          content: '';
          position: absolute;
          bottom: -100px;
          left: -100px;
          width: 300px;
          height: 50px;
          background: linear-gradient(45deg, #7c3aed, #a855f7);
          transform: rotate(45deg);
          opacity: 0.6;
        }
        
        /* Main content area */
        .certificate-content {
          position: relative;
          z-index: 10;
          background: rgba(255, 255, 255, 0.95);
          margin: 10px;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          text-align: center;
          height: calc(100% - 70px);
          box-sizing: border-box;
        }
        
        .certificate-title {
          font-size: 104px;
          font-weight: 400;
          color: #716F6F;
          letter-spacing: 4px;
          font-family: "Pirata One", system-ui;
          margin: 20px 0;
        }
        
        .completion-subtitle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .completion-text {
          font-size: 32px;
          color: #716F6F;
          font-weight: 400;
          letter-spacing: 8px;
          text-transform: uppercase;
          font-family: "Montserrat", sans-serif;
        }
        
        .certify-text {
          font-size: 22px;
          color: #716F6F;
          font-family: "Montserrat", sans-serif;
        }
        
       .recipient-name {
          font-family: 'Italianno', cursive;
          font-size: 106px;
          font-weight: 400;
          color: #2A2A2A;
          position: relative;
          margin: 10px 0; 
          padding-bottom: 15px; 
        }
        
        .recipient-name::after {
          content: '';
          position: absolute;
          bottom: 0; 
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 1px;
          background: #716F6F;
        }
        
        .completion-details {
          margin: -5px 0px 0px 0px;
        }
        
        .completion-text-main {
          font-size: 18px;
          color: #716F6F;
          font-family: "Montserrat", sans-serif;
          margin: 5px 0;
        }
        
        .course-badge {
          width: 180px;
          height: 85px;
          display: inline-block;
          margin: 0;
          position: relative;
        }
        
        .course-title {
          font-size: 12px;
          color: #2A2A2A;
          font-weight: 600;
          font-family: "Montserrat", sans-serif;
          position: absolute;
          left: 32px;
          top: -1px
        }
        
        .duration-text {
          font-size: 20px;
          color: #716F6F;
          font-weight: 400;
          margin-bottom: 20px;
          font-family: "Montserrat", sans-serif;
        }

        .duration-text1 {
          font-size: 20px;
          color: #2A2A2A;
          font-weight: 700;
          font-family: "Montserrat", sans-serif;
        }
        
        .signature-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          margin-top: 40px;
        }
        
        .signature-left {
          text-align: center;
          flex: 1;
        }
        
        .signature-name {
          font-size: 25px;
          color: #FF3131;
          font-weight: 400;
          margin-bottom: 5px;
          font-family: Inter, sans-serif;
          font-style: Italic
        }
        
        .signature-title {
          font-size: 18px;
          color: #2A2A2A;
          font-weight: 700;
          font-family: "Montserrat", sans-serif;
        }
        
        .signature-line {
          width: 150px;
          height: 1px;
          background: #d1d5db;
          margin: 10px auto;
        }
        
        .verification-badge {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .signature-right {
          text-align: center;
          flex: 1;
        }
        
        .instructor-title {
          font-size: 18px;
          color: #2A2A2A;
          font-weight: 700;
          font-family: "Montserrat", sans-serif;
        }
        
        .pattern-bg {
          position: absolute;
          z-index: -100;
          left: 36px;
          opacity: 0.5;
          top: 20px;
          object-fit: cover;
          width: 90%;
        }
      </style>
      
      <div class="certificate-container">
        <div class="certificate-content">
          <img src="${patternImg}" class="pattern-bg" />
          <h1 class="certificate-title">Certificate</h1>

          <div class="completion-subtitle">
            <img src="${arrowRightImg}" width="100" />
            <span class="completion-text">OF COMPLETION</span>
            <img src="${arrowLeftImg}" width="100" />
          </div>

          <p class="certify-text">This is to Certify that</p>

          <div class="recipient-name">${certificate.student}</div>

          <div class="completion-details">
            <p class="completion-text-main">
              has Successfully Completed that
            </p>
            <span class="completion-text-main">Course</span>
            <span class="relative">
              <img
                src="${courseBgImg}"
                alt="course"
                class="course-badge"
              />
              <span class="course-title">
                ${certificate.title.substring(0, 15)}
              </span>
            </span>

            <p class="duration-text">
              during the period of
              <span class="duration-text1">
                July 2025 - December 2025
              </span>
            </p>
          </div>

          <div class="signature-section">
            <div class="signature-left">
              <div class="signature-name">Abdul Kalam</div>
              <div class="signature-line"></div>
              <div class="signature-title">Authorised Signatory</div>
            </div>

            <div class="verification-badge">
              <img
                src="${certifiedImg}"
                alt="certified"
                class="w-18 h-24"
                width="72"
                height="96"
              />
            </div>

            <div class="signature-right">
              <div class="signature-name">Albert Einstein</div>
              <div class="signature-line"></div>
              <div class="instructor-title">Course Instructor</div>
            </div>
          </div>
        </div>
      </div>
    `;

		document.body.appendChild(tempContainer);

		const canvas = await html2canvas(tempContainer, {
			width: 1200,
			height: 800,
			scale: 2,
			useCORS: true,
			allowTaint: true,
		});

		document.body.removeChild(tempContainer);

		const pdf = new jsPDF({
			orientation: 'landscape',
			unit: 'px',
			format: [1200, 800],
		});

		const imgData = canvas.toDataURL('image/png');
		pdf.addImage(imgData, 'PNG', 0, 0, 1200, 800);

		pdf.save(`${certificate.student}_${certificate.title}_Certificate.pdf`);
	} catch (error) {
		console.error('Error generating certificate:', error);
		alert('Error generating certificate. Please try again.');
	}
};

// You'll need to import these images or provide their data URLs
// For production, you might want to convert these to data URLs
const patternImg = 'path/to/pattern.png';
const arrowRightImg = 'path/to/arrow-right.png';
const arrowLeftImg = 'path/to/arrow-left.png';
const courseBgImg = 'path/to/course-button.png';
const certifiedImg = 'path/to/certified.png';
