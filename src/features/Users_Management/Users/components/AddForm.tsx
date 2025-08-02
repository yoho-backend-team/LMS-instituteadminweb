import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select'
import { Input } from '../../../../components/ui/input'
import { COLORS, FONTS } from '../../../../constants/uiConstants'
import upload from '../../../../assets/cloud.png'
import close from '../../../../assets/Cancel.png'
import { useFormik } from 'formik'
import * as Yup from 'yup';

type props = {
    setShowForm : (show: boolean)=> void;
}

const AddForm:React.FC<props> = ({setShowForm}) => {

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            contact: '',
            password: '',
            confirmPassword: '',
            designation: '',
            branch: '',
            role: '',
            image:'',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name is required').min(3,'Minimum 3 characters to firstname'),
            lastName: Yup.string().required('Last name is required'),
            email: Yup.string().required('Email is required').matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid Email Format'),
            contact: Yup.string().min(10, 'Phone number must be a 10 digit').required('Phone number is required').matches(/^[6-9]\d{9}$/, 'Invalid Phone Number'),
            branch: Yup.string().required('Select a branch'),
            role: Yup.string().required('Select a role'),
            password: Yup.string().min(6, 'Password is minimum 6 characters').required('Password is required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
            image: Yup.string().required('Profile is required'),
            designation: Yup.string().required('Designation is required')
        }),
        onSubmit: (values) => {
            console.log('Form Values', values)
            setShowForm(false)
        }
    })
    return (
        <div className={`p-4`}>
            <div className='flex justify-between pb-5 pt-2'>
                <h1 className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_04_bold }}>Add User</h1>
                <button onClick={()=> setShowForm(false)} className="text-gray-500 font-bold text-lg"><img src={close}></img></button>
            </div>

            <form onSubmit={formik.handleSubmit} className='grid gap-4'>
                <div className=' p-1  grid justify-center ml-15'>
                    <img className={`w-[100px] h-[100px] ml-8`} src={upload}></img>
                    <Input
                    name='image'
                    value={formik.values.image}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type='file'
                    className='border-none text-left'
                     />
                </div>

                <div className='grid gap-1'>
                    <label htmlFor='branch' className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_08_bold }}>Branch</label>
                    <Select 
                    onValueChange={(val)=> {formik.setFieldValue('branch',val); formik.setFieldTouched('branch', true)}}
                    >
                        <SelectTrigger style={{ height: '45px' }} className={`w-full border rounded-[8px] border-[#716F6F] pr-[16px] pl-[16px] text-[${COLORS.gray_dark_02}]`}>
                            <SelectValue placeholder='Select branch' />
                        </SelectTrigger>
                        <SelectContent className='bg-[#FFFFFF]'>
                            <SelectItem value='branch' className={`hover:bg-[${COLORS.primary}] text-white bg-[${COLORS.primary}] focus:bg-[${COLORS.primary}] p-2  my-1.5 focus:text-white rounded-[8px] cursor-pointer`}
                                style={{ ...FONTS.heading_08 }}>No options</SelectItem>
                        </SelectContent>
                    </Select>
                    {formik.touched.branch && formik.errors.branch && (
                        <p className={`text-red-400`} style={{...FONTS.heading_12}}>{formik.errors.branch}</p>
                    )}
                </div>

                <div className='grid gap-1'>
                    <label className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_08_bold }}>First Name</label>
                    <Input
                    name='firstName'
                    // value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    minLength={3}
                    placeholder="Enter your first name" 
                    className={`w-full  h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus: outline-none`}>
                    </Input>
                    {formik.touched.firstName && formik.errors.firstName && (
                        <p className={`text-red-400`} style={{...FONTS.heading_12}}>{formik.errors.firstName}</p>
                    )}
                </div>

                <div className='grid gap-1'>
                    <label className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_08_bold }}>Last Name</label>
                    <Input
                    name='lastName'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                    placeholder="Enter your last name" 
                    className={`w-full  h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus: outline-none`}>
                    </Input>
                    {formik.touched.lastName && formik.errors.lastName && (
                        <p className={`text-red-400`} style={{...FONTS.heading_12}}>{formik.errors.lastName}</p>
                    )}
                </div>

                <div className='grid gap-1'>
                    <label className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_08_bold }}>Email</label>
                    <Input 
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your email" 
                    className={`w-full  h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus: outline-none`}>
                    </Input>
                    {formik.touched.email && formik.errors.email && (
                        <p className={`text-red-400`} style={{...FONTS.heading_12}}>{formik.errors.email}</p>
                    )}
                </div>

                <div className='grid gap-1'>
                    <label className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_08_bold }}>Designation</label>
                    <Input 
                    name='designation'
                    value={formik.values.designation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your designation" 
                    className={`w-full  h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus: outline-none`}>
                    </Input>
                    {formik.touched.designation && formik.errors.designation && (
                        <p className={`text-red-400`} style={{...FONTS.heading_12}}>{formik.errors.designation}</p>
                    )}
                </div>

                <div className='grid gap-1'>
                    <label className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_08_bold }}>Contact</label>
                    <Input
                    name='contact'
                    value={formik.values.contact}
                    // maxLength={10}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                    placeholder="Enter your contact number" 
                    className={`w-full  h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus: outline-none`}>
                    </Input>
                    {formik.touched.contact && formik.errors.contact && (
                        <p className={`text-red-400`} style={{...FONTS.heading_12}}>{formik.errors.contact}</p>
                    )}
                </div>

                <div className='grid gap-1'>
                    <label htmlFor='role' className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_08_bold }}>Role</label>
                    <Select 
                    onValueChange={(val)=> {formik.setFieldValue('role', val); formik.setFieldTouched('role', true)}}
                    >
                        <SelectTrigger style={{ height: '45px' }} className={`w-full border rounded-[8px] border-[#716F6F] pr-[16px] pl-[16px] text-[${COLORS.gray_dark_02}]`}>
                            <SelectValue placeholder='Select role' />
                        </SelectTrigger>
                        <SelectContent className='bg-[#FFFFFF]'>
                            <SelectItem value='role' className={`hover:bg-[${COLORS.primary}] text-white bg-[${COLORS.primary}] focus:bg-[${COLORS.primary}] p-2  my-1.5 focus:text-white rounded-[8px] cursor-pointer`}
                                style={{ ...FONTS.heading_08 }}>No options</SelectItem>
                        </SelectContent>
                    </Select>
                    {formik.touched.role && formik.errors.role && (
                        <p className={`text-red-400`} style={{...FONTS.heading_12}}>{formik.errors.role}</p>
                    )}
                </div>

                <div className='grid gap-1'>
                    <label className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_08_bold }}>Password</label>
                    <Input
                    name='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password} 
                    placeholder="Enter your password" 
                    className={`w-full  h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus: outline-none`}>
                    </Input>
                    {formik.touched.password && formik.errors.password && (
                        <p className={`text-red-400`} style={{...FONTS.heading_12}}>{formik.errors.password}</p>
                    )}
                </div>

                <div className='grid gap-1'>
                    <label className={`text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_08_bold }}>Confirm Password</label>
                    <Input
                    name='confirmPassword'
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                    placeholder="Enter your confirm password" 
                    className={`w-full  h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus: outline-none`}>
                    </Input>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <p className={`text-red-400`} style={{...FONTS.heading_12}}>{formik.errors.confirmPassword}</p>
                    )}
                </div>

                <div className='flex justify-end gap-2'>
                    <button onClick={()=> setShowForm(false)} style={{ ...FONTS.heading_08_bold }} className={`bg-[#D7F6F5] border border-[#1BBFCA] pr-[16px] pl-[16px] h-[40px] rounded-[8px] flex items-center gap-2 text-[#1BBFCA]`}>Cancel</button>
                    <button type='submit' style={{ ...FONTS.heading_08_bold }} className='bg-[#1BBFCA] pr-[16px] pl-[16px] h-[40px] rounded-[8px] flex items-center gap-2 text-[#FFFFFF]'>Save</button>
                </div>
                
            </form>

        </div>
    )
}

export default AddForm