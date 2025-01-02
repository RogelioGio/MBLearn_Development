import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBook, faBookBookmark, faBookOpen, faBookOpenReader, faChartGantt, faChartPie, faGear, faGears, faGraduationCap, faHouse, faMedal, faPersonCirclePlus, faRightFromBracket, faUser, faUserGroup, faUserLock, } from '@fortawesome/free-solid-svg-icons'
import Small_Logo from '../assets/Small_Logo.svg'
import axiosClient from '../axios-client';
import { useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { Link, Links, useNavigate } from 'react-router-dom';

//Icon props
const Icons = ({icon, text}) => (
        <div className='icon group'>
            <p>{icon}</p>
            <p className='icon-name group-hover:scale-100'>{text}</p>
        </div>
)


//Profile props
const ProfileIcons = ({text ,icon, onClick}) => (
    <div className='profile-menu-item py-2 px-2' onClick={onClick}>
        <p className='text-xs'>{text}</p>
        <p className='text-xl'>{icon}</p>
    </div>
)

//Role-based Navigations
const navItems = {
    "system_admin": [
        {icon:faHouse, text:"Home", to:'/systemadmin'},
        {icon:faBook, text:"Course List Maintenance", to:'courselistmaintenance'},
        {icon:faUserGroup, text:"User Management Maintenance", to:'usermanagmentmaintenance'},
        {icon:faUserLock, text:"User Accounts Maintenance", to:'useraccountsmaintenance'},
        {icon:faGears, text:"System Configuration Maintenance", to:'systemconfigurationmaintenance'},
        {icon:faChartPie, text:"System-Level Reports", to:'systemlevelreports'},
        {icon:faChartGantt, text:"Activity Logs", to:'activitylogs'},
    ],
    "course_admin": [
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

//Profile Menu per role
const profileItems = {
    "system_admin": [
        {text:"Login as Course Admin", icon:faBookOpenReader},
        {text:"Login as Learner", icon:faGraduationCap}
    ],
    "course_admin": [
        {text:"Login as Learner", icon:faGraduationCap}
    ]
}

export default function Navigation() {

    const {user, role, token, profileUrl, setUser, setRole, setToken, setProfileUrl} = useStateContext();

    //fetching user data
    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            setUser(data.name);
            setProfileUrl(data.profile_photo_url);
            setRole(data.role);

        }).catch((error) => {
            console.error('Failed to fetch user:', error.response?.data || error.message);
            setUser(null); // Handle unauthorized state
        });
    }, [setUser]);

    //Role-based Navigation
    const Items = navItems[role] || [];
    const PItems = profileItems[role] || [];

    //Logout Function
    const onLogout = () => {
        axiosClient.post('/logout').then(() => {
            setUser({});
            setToken(null);
            console.log("Logout Success");
        });
    };



    return (
        <div className="flex flex-col items-center h-screen w-24 border-2 place-content-between py-2">
            <div className='flex flex-col place-content-between w-23 h-full bg-white py-5 px-2 shadow-lg m-1 border-r rounded-full'>
                <ul className='flex flex-col gap-4 justify-center items-center p-[0.625rem]'>
                    <li><img src={Small_Logo} alt="" className='h-[1.875rem]'/></li>
                    {
                        Items.map((role, index) => (
                            <li key={index}><Icons
                                                    icon={<FontAwesomeIcon icon={role.icon}/>}
                                                    text={role.text}/>
                            </li>
                        ))
                    }
                </ul>

                <ul className='flex flex-col gap-4 justify-center items-center'>
                    <li><Icons icon={<FontAwesomeIcon icon={faGear}/>} text={"Account Setting"}/></li>
                    <li><Icons icon={<FontAwesomeIcon icon={faBell}/>} text={"Notifications"}/></li>
                    <li className='inline-block relative w-auto group p-1'>
                        <img src={profileUrl} alt="" className='w-10 h-10 hover:h-[2.6rem] rounded-full shadow-lg transition-all ease-in-out'/>
                        {/* Profile */}
                        <div className='bg-tertiary p-4 rounded-md absolute left-9 min-w-max bottom-0 flex flex-row scale-0 group-hover:scale-100'>
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
