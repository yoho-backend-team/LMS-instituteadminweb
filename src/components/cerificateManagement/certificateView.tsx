import { HiMiniXMark } from 'react-icons/hi2';
import { useLocation, useNavigate } from 'react-router-dom';
import patternImg from '../../assets/certificate/pattern.png';
import arrowLeftImg from '../../assets/certificate/arrow left.png';
import arrowRightImg from '../../assets/certificate/arrow right.png';
import bgImg from '../../assets/certificate/cerificate-bg.png';
import courseBgImg from '../../assets/certificate/course button.png';
import certifiedImg from '../../assets/certificate/certified.png';

interface Certificate {
	id: number;
	title: string;
	description: string;
	branch: string;
	batch: string;
	student: string;
	email: string;
}

export default function CertificateView() {
	const navigate = useNavigate();
	const location = useLocation();
	const certificate = location.state?.certificate as Certificate | undefined;

	if (!certificate) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='text-center'>
					<h1 className='text-2xl font-bold mb-4'>Certificate Not Found</h1>
					<button
						onClick={() => navigate(-1)}
						className='bg-blue-500 text-white px-4 py-2 rounded'
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen flex flex-col bg-gray-100 p-4'>
			<div className='mb-4'></div>

			<div className='flex items-center justify-center'>
				<div className='w-full max-w-5xl'>
					<div className='bg-[#1BBFCA] px-6 py-3 rounded-xl flex justify-between items-center mb-6'>
						<h2 className='text-white text-lg font-semibold'>
							{certificate.student}'s Certificate
						</h2>
						<button
							onClick={() => navigate(-1)}
							className='bg-white ml-auto px-4 py-2 rounded-lg flex items-center'
						>
							<HiMiniXMark className='h-6 w-6 bg-gray-500 rounded-full text-white' />
						</button>
					</div>

					<div className='relative overflow-hidden bg-white'>
						<div className='certificate-content'>
							<img
								src={bgImg}
								className='absolute -z-100 left-36 opacity-50 top-42 object-cover'
							/>
							<img
								src={patternImg}
								alt='pattern top'
								className='absolute -rotate-41 -top-70 -left-10'
							/>
							<img
								src={patternImg}
								alt='pattern bottom'
								className='absolute rotate-139 -bottom-70 -right-10'
							/>
							<img
								src={patternImg}
								alt='pattern left'
								className='absolute rotate-49 -top-0 -left-75 opacity-10'
							/>
							<img
								src={patternImg}
								alt='pattern right'
								className='absolute -rotate-131 -bottom-0 -right-75 opacity-10'
							/>
							<img
								src={patternImg}
								alt='top right 1'
								className='absolute -top-40 -right-50 rotate-90'
							/>
							<img
								src={patternImg}
								alt='top right 2'
								className='absolute -top-30 -right-90 rotate-90'
							/>
							<img
								src={patternImg}
								alt='top right 3'
								className='absolute -top-25 -right-120 rotate-90 '
							/>
							<img
								src={patternImg}
								alt='bottom left 1'
								className='absolute -bottom-40 -left-50 rotate-0'
							/>
							<img
								src={patternImg}
								alt='bottom left 2'
								className='absolute -bottom-30 -left-90 rotate-0'
							/>
							<img
								src={patternImg}
								alt='bottom left 3'
								className='absolute -bottom-25 -left-120 rotate-0 '
							/>
							<h1 className='certificate-title'>Certificate</h1>

							<div className='completion-subtitle'>
								<img src={arrowRightImg} className='w-11' />
								<span className='completion-text'>OF COMPLETION</span>
								<img src={arrowLeftImg} className='w-11' />
							</div>

							<p className='certify-text'>This is to Certify that</p>

							<div className='recipient-name'>{certificate.student}</div>

							<div className='completion-details'>
								<p className='completion-text-main'>
									has Successfully Completed that
								</p>
								<span className='completion-text-main'>Course</span>
								<span className='relative'>
									<img
										src={courseBgImg}
										alt='course'
										className='course-badge'
									/>
									<span className='course-title'>
										{certificate.title.substring(0, 15)}
									</span>
								</span>

								<p className='duration-text'>
									during the period of{' '}
									<span className='duration-text1'>
										July 2025 - December 2025
									</span>
								</p>
							</div>

							<div className='signature-section'>
								<div className='signature-left'>
									<div className='signature-name'>Abdul Kalam</div>
									<div className='signature-line'></div>
									<div className='signature-title'>Authorised Signatory</div>
								</div>

								<div className='verification-badge'>
									<img
										src={certifiedImg}
										alt='certified'
										className='w-22 h-22'
									/>
								</div>

								<div className='signature-right'>
									<div className='signature-name'>Albert Einstein</div>
									<div className='signature-line'></div>
									<div className='instructor-title'>Course Instructor</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<style>
				{`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Italianno&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Pirata+One&display=swap');
          
          /* Main content area */
          .certificate-content {
            position: relative;
            z-index: 10;
            background: rgba(255, 255, 255, 1);
            margin: 20px;
            padding: 80px 120px;
            border-radius: 8px;
            text-align: center;
            height: calc(100% - 80px);
            box-sizing: border-box;
          }
          
          .certificate-title {
            font-size: 104px;
            font-weight: 400;
            color: #716F6F;
            letter-spacing: 4px;
            font-family: "Pirata One", system-ui;
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
            letter-spacing: 4px;
            text-transform: uppercase;
            font-family: "Montserrat", sans-serif;
          }
          
          .arrow {
            width: 0;
            height: 0;
            border-left: 15px solid #8b5cf6;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
          }
          
          .arrow.left {
            transform: rotate(180deg);
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
            color:#2A2A2A;
            position: relative;
          }
          
          .recipient-name::after {
            content: '';
            position: absolute;
            bottom: 25px;
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
          }
          
          .course-badge {
            width: 180px;
            height: 85px;
            display: inline-block;
            margin: 0;
          }
          
          .course-title {
            font-size: 12px;
            color: #fff;
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
            margin-top: 30px;
          }
          
          .signature-left {
            text-align: center;
            flex: 1;
          }
          
          .signature-name {
            font-size: 25px;
            color: #FF3131;
            font-weight: 500;
            margin-bottom: 5px;
            font-family: "Montserrat", sans-serif;
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
          
          /* Responsive adjustments */
          @media (max-width: 1024px) {
            .certificate-content {
              padding: 40px;
              margin: 20px;
            }
            
            .certificate-title {
              font-size: 60px;
            }
            
            .recipient-name {
              font-size: 50px;
            }
          }
          
          @media (max-width: 768px) {
            .certificate-content {
              padding: 30px;
              margin: 15px;
            }
            
            .certificate-title {
              font-size: 48px;
            }
            
            .recipient-name {
              font-size: 40px;
            }
            
            .completion-text {
              font-size: 18px;
              letter-spacing: 4px;
            }
            
            .signature-section {
              flex-direction: column;
              gap: 30px;
            }
          }
          
          @media print {
            body {
              background: none;
            }
            .certificate-container {
              box-shadow: none;
            }
          }
        `}
			</style>
		</div>
	);
}
