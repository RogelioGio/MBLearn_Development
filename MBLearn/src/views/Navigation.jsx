import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBook, faBookBookmark, faBookOpen, faBookOpenReader, faChartGantt, faChartPie, faGear, faGears, faGraduationCap, faHouse, faMedal, faPersonCirclePlus, faRightFromBracket, faUser, faUserGroup, faUserLock, faUserShield, } from '@fortawesome/free-solid-svg-icons'
import Small_Logo from '../assets/Small_Logo.svg'
import axiosClient from '../axios-client';
import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { Link, Links, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { use } from 'react';
//Icon props
const Icons = ({icon, text, to}) => (
    <NavLink to={to} className={({isActive}) => isActive ? 'icon_active':'_icon'}>
        <div className='icon group'>
            <p className='hover:scale-105 transition-all ease-in-out'>{icon}</p>
            <p className='icon-name group-hover:scale-100'>{text}</p>
        </div>
    </NavLink>

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
    "System Admin": [
        {icon:faHouse, text:"Home", to:'/systemadmin/dashboard'},
        {icon:faBook, text:"Course List Maintenance", to:"/systemadmin/courselistmaintenance"},
        {icon:faUserGroup, text:"User Management Maintenance", to:"/systemadmin/usermanagementmaintenance"},
        {icon:faUserLock, text:"User Accounts Maintenance", to:"/systemadmin/useraccountsmaintenance"},
        {icon:faGears, text:"System Configuration Maintenance", to:"/systemadmin/systemconfigurationmaintenance"},
        {icon:faChartPie, text:"System-Level Reports", to:"/systemadmin/systemlevelreports"},
        {icon:faChartGantt, text:"Activity Logs", to:"/systemadmin/activitylogs"},
    ],
    "Course Admin": [
        {icon:faHouse, text:"Home", to:"/courseadmin/dashboard"},
        {icon:faBookBookmark, text:"Assigned Course Catalog", to:"/courseadmin/assignedcourses"},
        {icon:faPersonCirclePlus, text:"Enroll Trainee", to:"/courseadmin/bulkenrollment"},
        {icon:faChartPie, text:"Assigned Course Reports", to:"/courseadmin/coursereports"},
    ],
    "Learner": [
        {icon:faHouse, text:"Home"},
        {icon:faBook, text:"My Courses"},
        {icon:faMedal, text:"Certificates"},
        {icon:faBookOpen, text:"Course Catalog"},
    ]
}

export default function Navigation() {
    const {user, profile_image, role, availableRoles, setAvailableRoles,setUser, setToken, setRole} = useStateContext();
    const navigate = useNavigate();
    console.log(user.role)
    console.log(role)

    useEffect(() => {
        let roles = []
                //Set Available Roles
                if(user.role === 'System Admin'){
                    roles = ['System Admin', 'Course Admin', 'Learner']
                }else if(user.role === 'Course Admin'){
                    roles = ['Course Admin', 'Learner']
                };
                setAvailableRoles(roles);
    }, [role]);

    //Dynamic Role Switching Array
    const getSelection = (role) => {
        switch(role){
            case "System Admin": return faUserShield;
            case "Course Admin": return faBookOpenReader;
            case "Learner": return faGraduationCap;
            default: return faUser;
        }
    };
    const rolesSwitch = availableRoles.reduce((acc, index)=>{
        acc[index] = availableRoles.filter(r => r !== index)
        .map((r) => ({
            text: `Login as ${r}`,
            icon: <FontAwesomeIcon icon={getSelection(r)} />,
            onclick: () => handleRoleSwtiching(r),
        }));
        return acc;
    },{})



    //Role Switching
    const handleRoleSwtiching = (newRole) => {
        setRole(newRole);
        navigate(`/${newRole.toLowerCase().replace(" ","")}/dashboard`);
    };

    //Role-based Navigation
    const Items = navItems[role] || [];


    const onLogout = async () => {
        try{
            await axiosClient.post('/logout');
            setRole('');
            setUser('');
            setToken(null);
        }catch (e){
            console.error(e);
        }
    }


    return (
        <div className="flex flex-col items-center h-screen w-24 place-content-between py-2">
            <div className='flex flex-col place-content-between w-23 h-full bg-white py-5 px-2 shadow-lg m-1 border-r rounded-full'>
                <ul className='flex flex-col gap-4 justify-center items-center p-[0.625rem]'>
                    <li><img src={Small_Logo} alt="" className='h-[1.875rem]'/></li>
                    {
                        Items.map((role, index) => (
                            <li key={index}><Icons
                                                    icon={<FontAwesomeIcon icon={role.icon}/>}
                                                    text={role.text}
                                                    to={role.to}/>
                            </li>
                        ))
                    }
                </ul>

                <ul className='flex flex-col gap-4 justify-center items-center'>
                    <li><Icons icon={<FontAwesomeIcon icon={faGear}/>} text={"Account Setting"}/></li>
                    <li><Icons icon={<FontAwesomeIcon icon={faBell}/>} text={"Notifications"}/></li>
                    <li className='inline-block relative w-auto group p-1'>
                        <img src={profile_image} alt="" className='w-10 h-10 rounded-full shadow-lg hover:scale-105 transition-all ease-in-out'/>
                        {/* Profile */}
                        <div className='bg-tertiary p-4 rounded-md absolute left-9 min-w-max bottom-0 flex flex-row scale-0 group-hover:scale-100'>
                            <ul>
                                {
                                    rolesSwitch[role]?.map((option, index) => (
                                        <li key={index}>
                                            <ProfileIcons text={option.text} icon={option.icon} onClick={option.onclick}/>
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
