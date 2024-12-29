import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBook, faBookBookmark, faBookOpen, faBookOpenReader, faChartGantt, faChartPie, faGear, faGears, faGraduationCap, faHouse, faMedal, faPersonCirclePlus, faRightFromBracket, faUser, faUserGroup, faUserLock, } from '@fortawesome/free-solid-svg-icons'
import Small_Logo from '../assets/Small_Logo.svg'
import { icon, text } from '@fortawesome/fontawesome-svg-core';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';



//Icon props
const Icons = ({icon, text}) => (
    <div className='icon group'>
        <p>{icon}</p>
        <p className='icon-name group-hover:scale-100'>{text}</p>
    </div>
);

//Profile props
const ProfileIcons = ({text, icon, onClick}) => (
    <div className='profile-menu-item py-2 px-2' onClick={onClick}>
        <p className='text-xs'>{text}</p>
        <p className='text-xl'>{icon}</p>
    </div>
)

//Rolebased Navigations
const navItems = {
    "system-admin": [
        {icon:faHouse, text:"Home"},
        {icon:faBook, text:"Course List Maintenance"},
        {icon:faUserGroup, text:"User Management Maintenance"},
        {icon:faUserLock, text:"User Accounts Maintenance"},
        {icon:faGears, text:"System Configuration Maintenance"},
        {icon:faChartPie, text:"System-Level Reports"},
        {icon:faChartGantt, text:"Activity Logs"},
    ],
    "course-admin": [
        {icon:faHouse, text:"Home"},
        {icon:faBookBookmark, text:"Assigened Courses"},
        {icon:faPersonCirclePlus, text:"Enroll Trainee"},
        {icon:faChartPie, text:"Course Reports"},
    ],
    "learner": [
        {icon:faHouse, text:"Home"},
        {icon:faBook, text:"My Courses"},
        {icon:faMedal, text:"Certificates"},
        {icon:faBookOpen, text:"Course Catalog"},
    ]
}

//Profile Setting per role
const profileItems = {
    "system-admin": [
        {text:"Login as Course Admin", icon:faBookOpenReader},
        {text:"Login as Learner", icon:faGraduationCap}
    ],
    "course-admin": [
        {text:"Login as Learner", icon:faGraduationCap}
    ]
}

export default  function Navigation(){
    //Role-based Navigation
    const {role, setToken, setUser} = useStateContext();
    const Items = navItems[role]||[];
    const PItems = profileItems[role]||[];

    //Logout Function
    const onLogout = (ev) => {
    axiosClient.post('/logout').then(() => {
        setUser({});
        setToken(null);
        localStorage.removeItem("ACCESS_TOKEN")
    })
}

    return (
        <div className="flex flex-col items-center h-screen w-100% border-2 place-content-between py-2">
            <div className='flex flex-col place-content-between h-full bg-white py-5 px-2 shadow-lg m-1 border-r rounded-full'>
                <ul className='flex flex-col gap-4 justify-center items-center p-[0.625rem]'>
                    <li><img src={Small_Logo} alt="" className='h-[1.875rem]'/></li>
                    {
                        Items.map((role, index) => (
                            <li key={index}><Icons icon={<FontAwesomeIcon icon={role.icon}/>} text={role.text}/></li>
                        ))
                    }
                </ul>

                <ul className='flex flex-col gap-4 justify-center items-center'>
                    <li><Icons icon={<FontAwesomeIcon icon={faGear}/>} text={"Account Setting"}/></li>
                    <li><Icons icon={<FontAwesomeIcon icon={faBell}/>} text={"Notifications"}/></li>
                    <li className='inline-block relative w-auto group'>
                        <img src="" alt="" className='border-2 border-red-400 w-8 h-8 rounded-full'/>
                        {/* Profile */}
                        <div className='bg-tertiary p-4 rounded-md absolute left-9 min-w-max bottom-0 flex flex-row scale-100 group-hover:scale-100'>
                            <ul>
                                {
                                    PItems.map((role, index) => (
                                        <li key={index}>
                                            <ProfileIcons text={role.text} icon={<FontAwesomeIcon icon={role.icon}/>}/>
                                        </li>
                                    ))
                                }
                                <ProfileIcons text={"Logout"} icon={<FontAwesomeIcon icon={faRightFromBracket}/>} onClick={onLogout}/>
                                <li><div className='bg-white h-[1px]'></div></li>
                                <ProfileIcons text={"View Profile"} icon={<FontAwesomeIcon icon={faUser}/>}/>
                            </ul>
                        </div>

                    </li>
                </ul>
            </div>

        </div>
    )
}
