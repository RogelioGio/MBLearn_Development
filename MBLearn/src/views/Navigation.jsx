import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBook, faChartGantt, faChartPie, faGear, faGears, faHouse, faUserGroup, faUserLock, } from '@fortawesome/free-solid-svg-icons'
import Small_Logo from '../assets/Small_Logo.svg'
import { text } from '@fortawesome/fontawesome-svg-core';


//Icon props
const Icons = ({icon, text}) => (
    <div className='icon group'>
        <p>{icon}</p>
        <p className='icon-name group-hover:scale-100'>{text}</p>
    </div>
);

export default  function Navigation(){
    return (
        <div className="flex flex-col items-center h-screen w-100% border-2 border-red-950 place-content-between py-2">
            <div className='flex flex-col place-content-between h-full bg-white py-5 px-2 shadow-lg m-1 border-r rounded-full'>
                <ul className='flex flex-col gap-4 justify-center items-center p-[0.625rem]'>
                    <li><img src={Small_Logo} alt="" className='h-[1.875rem]'/></li>
                    <li><Icons icon={<FontAwesomeIcon icon={faHouse}/>} text={"Home"}/></li>
                    <li><Icons icon={<FontAwesomeIcon icon={faBook}/>} text={"Course List Maintenance"}/></li>
                    <li><Icons icon={<FontAwesomeIcon icon={faUserGroup}/>} text={"User Management Maintenance"}/></li>
                    <li><Icons icon={<FontAwesomeIcon icon={faUserLock}/>} text={"User Accounts Maintenance"}/></li>
                    <li> <Icons icon={<FontAwesomeIcon icon={faGears}/>} text={"System Configuration Maintanance"}/></li>
                    <li><Icons icon={<FontAwesomeIcon icon={faChartPie}/>} text={"System-Level Reports"}/></li>
                    <li><Icons icon={<FontAwesomeIcon icon={faChartGantt}/>} text={"Activity Logs"}/></li>
                </ul>

                <ul className='flex flex-col gap-4 justify-center items-center'>
                    <li><Icons icon={<FontAwesomeIcon icon={faGear} className='text-primary h-5'/>}/></li>
                    <li><Icons icon={<FontAwesomeIcon icon={faBell} className='text-primary h-5'/>}/></li>
                    <li></li>
                </ul>
            </div>

        </div>
    )
}
