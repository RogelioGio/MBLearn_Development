import { useOption } from "MBLearn/src/contexts/AddUserOptionProvider"

const UserReactivationProps = ({id,image, name, MBEmail, branch, city, selected}) => {
    const {cities,departments,location,titles,roles,permission} = useOption()

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

            </td>
            <td className='py-3 px-4'>

            </td>
        </tr>
    )
}
export default UserReactivationProps
