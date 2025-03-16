const UserCredentialsLoadingProps = () => {
    return(
        <>
            {
                Array(5).fill().map((item, index) => (
                    <tr key={index}>
                        <td className="animate-pulse py-3 px-4">
                            <div className='flex items-center gap-2'>
                                {/* User Image */}
                                <div className='bg-gray-300 h-10 w-10 rounded-full'>
                                    <img alt="" className='rounded-full'/>
                                </div>
                                {/* Name */}
                                <div className="bg-gray-300 h-4 w-36 rounded-full"></div>
                            </div>
                        </td>
                        <td className="py-3 px-4 animate-pulse">
                            <div className="bg-gray-300 h-4 w-36 rounded-full"></div>
                        </td>
                        <td className="py-3 px-4 animate-pulse">
                            <div className="bg-gray-300 h-4 w-36 rounded-full"></div>
                        </td>
                        <td className="py-3 px-4 animate-pulse">
                            <div className="bg-gray-300 h-4 w-36 rounded-full"></div>
                        </td>
                        <td className="py-3 px-4 animate-pulse">
                            <div className="bg-gray-300 h-4 w-36 rounded-full"></div>
                        </td>
                        <td className="py-3 px-4 animate-pulse">
                            <div className='flex gap-2 justify-end'>
                                <div className="bg-gray-300 h-8 w-20 rounded-md"></div>
                            </div>
                        </td>
                    </tr>
                ))
            }
        </>
    )
}
export default UserCredentialsLoadingProps;
