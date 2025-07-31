import { useEffect, useState } from 'react';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import bgImage from "../../../assets/IDcardManagement/Group 1000000936.png";
import barCode from "../../../assets/IDcardManagement/barcode.png";
import { useDispatch, useSelector } from 'react-redux';
import { selectStudentId } from '../../../features/StudentIdCard/reducers/selectors';
import { getIdcardthunks } from '../../../features/StudentIdCard/reducers/thunks';


const StudentIDCard = () => {
    const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
    
    const arr = [1,2];

    const handleCardClick = (index: number) => {
        setFlippedCards(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };





	


	const dispatch = useDispatch<any>()

	const studentID = useSelector(selectStudentId)


	useEffect(() => {
		dispatch(getIdcardthunks());
		console.log(studentID, "Student Idcard Details")
	}, [dispatch]);

    return (
        <div>
            <h1 style={{ ...FONTS.heading_04_bold, color: COLORS.gray_dark_01 }}>Student ID Card</h1>

            <div className='mt-8 flex flex-wrap gap-8'>
                {arr.map((card, index) => {
                    return (
                        <div key={index} className="w-[370px] h-[560px] perspective-1000">
                            <section 
                                className={`w-full h-full shadow-[0px_4px_24px_0px_#00000026] rounded-xl transition-transform duration-700 cursor-pointer relative`}
                                onClick={() => handleCardClick(index)}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: flippedCards[index] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                                }}
                            >
                                {/* Front Side */}
                                <div
                                    className={`absolute w-full h-full rounded-xl border-b-[15px] border-[${COLORS.primary}] bg-white`}
                                    style={{
                                        backfaceVisibility: 'hidden',
                                    }}
                                >
                                    <div className="bg-cover bg-center h-[220px] w-full bg-no-repeat flex justify-center items-center"
                                        style={{ backgroundImage: `url(${bgImage})` }}
                                    >
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFPmGp1XOXV5pXsqM4-YLLbIQBun4NVA4g1ZFg5wotT4_QTCzNd6yuKlQ&s" alt="" className='w-[130px] h-[130px] rounded-full object-cover' />
                                    </div>

                                    <div className='text-center'>
                                        <h4 style={{ ...FONTS.heading_04_bold, color: COLORS.gray_dark_02 }}>Kamal Endhiran</h4>
                                        <p style={{ ...FONTS.heading_12, color: COLORS.gray_light }}>Student</p>
                                    </div>

                                    <div className='px-8 py-5 grid gap-2'>
                                        <p style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>ID NO : <span style={{ ...FONTS.heading_13 }}>ANN-TIR-STDNT0019</span></p>
                                        <p style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>User Name : <span style={{ ...FONTS.heading_13 }}>kamal_Endhiran</span></p>
                                        <p style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>Email : <span style={{ ...FONTS.heading_13 }}>kamal@endhiran.com</span></p>
                                        <p style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>Phone : <span style={{ ...FONTS.heading_13 }}>9876543210</span></p>
                                    </div>

                                    <div className='p-4 mb-3'>
                                        <img src={barCode} alt="" className='w-[70%] h-12 m-auto' />
                                    </div>
                                </div>
                                
                                {/* Back Side */}
                                <div className={`absolute w-full h-full bg-white rounded-xl overflow-hidden border-t-[15px] border-[${COLORS.primary}]`} 
                                    style={{ 
                                        backfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)'
                                    }}
                                >
                                    <div className="h-full relative flex flex-col justify-between p-6">
                                        <div className='py-5 grid gap-4'>
                                            <div className='flex'>
                                                <div className='w-1/3 flex justify-between'>
                                                    <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>User Name</span>
                                                    <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
                                                </div>
                                                <span style={{ ...FONTS.heading_13 }} className='w-2/3 pl-6'>kamal_Endhiran</span>
                                            </div>

                                            <div className='flex'>
                                                <div className='w-1/3 flex justify-between'>
                                                    <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>Email</span>
                                                    <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
                                                </div>
                                                <span style={{ ...FONTS.heading_13 }} className='w-2/3 pl-6 break-words'>kamal@endhiran.com</span>
                                            </div>

                                            <div className='flex'>
                                                <div className='w-1/3 flex justify-between'>
                                                    <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>Role</span>
                                                    <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
                                                </div>
                                                <span style={{ ...FONTS.heading_13 }} className='w-2/3 pl-6'>Student</span>
                                            </div>

                                            <div className='flex'>
                                                <div className='w-1/3 flex justify-between'>
                                                    <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>ID NO</span>
                                                    <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
                                                </div>
                                                <span style={{ ...FONTS.heading_13 }} className='w-2/3 pl-6'>ANN-TIR-STDNT0019</span>
                                            </div>

                                            <div className='flex'>
                                                <div className='w-1/3 flex justify-between'>
                                                    <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>Phone</span>
                                                    <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
                                                </div>
                                                <span style={{ ...FONTS.heading_13 }} className='w-2/3 pl-6'>9876543210</span>
                                            </div>

                                            <div className='flex'>
                                                <div className='w-1/3 flex justify-between'>
                                                    <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>Address</span>
                                                    <span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
                                                </div>
                                                <span style={{ ...FONTS.heading_13 }} className='w-2/3 pl-6'>Hello, world, Chennai, Tamilnadu -909090</span>
                                            </div>
                                        </div>

                                        <button className='mb-4 py-1 text-white rounded-[8px]' style={{ background: COLORS.light_green, ...FONTS.heading_07_bold }}>Download</button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StudentIDCard;