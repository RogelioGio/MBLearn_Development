import { format } from "date-fns"
import { useOption } from "MBLearn/src/contexts/AddUserOptionProvider"


const UserReactivationProps = ({id,image, name, MBEmail, branch, city, _division,_section,login_time_stamp,selected}) => {
    const {cities,departments,location,titles,roles,division,section} = useOption()

    return(
        <tr className='font-text text-sm hover:bg-gray-200 hover:cursor-pointer' onClick={()=>selected(id)}>
            <td className='text-sm py-3 px-4'>
                <div className='flex items-center gap-2'>
                    {/* User Image */}
                    <div className='bg-blue-500 h-10 w-10 rounded-full'>
                        <img alt="" src={image} className='rounded-full'/>
                    </div>
                    {/* Name */}
                    <div>
                        <p className='font-text'>{name}</p>
                        <p className='text-unactive'>{MBEmail}</p>
                    </div>
                </div>
            </td>
            <td className='py-3 px-4'>
                <div className='flex flex-col'>
                    {/* Branch Location */}
                    <p className='text-unactive'>{location?.find(l => l.id === branch).branch_name}</p>
                    {/* City Location */}
                    <p className='text-unactive text-xs'>{cities?.find(c => c.id === city)?.city_name}</p>
                </div>
            </td>
            <td className='py-3 px-4'>
                    {/* Division */}
                    <p className='text-unactive'>{division?.find(d => d.id === _division)?.division_name}</p>
                    {/* Section */}
                    <p className='text-unactive'>{section?.find(s => s.id === _section)?.section_name}</p>
            </td>
            <td className='py-3 px-4'>
                    {/* Last Login TimeStamp */}
                    <p className='text-unactive'>{format(new Date(login_time_stamp), 'MMMM d, yyyy')}</p>
            </td>
        </tr>
    )
}
export default UserReactivationProps
