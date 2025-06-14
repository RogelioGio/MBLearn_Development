import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBook, faBookBookmark, faBookOpen, faBookOpenReader, faChalkboard, faChartGantt, faChartPie, faGear, faGears, faGraduationCap, faHouse, faMedal, faPersonCirclePlus, faRightFromBracket, faUser, faUserGroup, faUserLock, faUserShield, faUsersRays, } from '@fortawesome/free-solid-svg-icons'
import Small_Logo from '../assets/Small_Logo.svg'
import axiosClient from '../axios-client';
import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { Link, Links, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { use } from 'react';
import { toast } from 'sonner';
import NotificationModal from '../modalsandprops/NotificationModal';

//Icon props
const Icons = ({icon, text, to, notification, unread}) => (
    notification ?
    <div className='_icon'>
        <div className='icon group'>
            <div className='hover:scale-105 transition-all ease-in-out grid grid-cols-1 place-items-center relative'>
                {
                    unread &&
                    <div className='text-xs font-text bg-primary w-2 h-2 rounded-full mt-[-0.5rem] mr-[-1rem]'></div>
                }
                {icon}
            </div>
            <p className='icon-name group-hover:scale-100'>{text}</p>
        </div>
    </div>
    :
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
        {icon:faUserGroup, text:"User Management Maintenance", to:"/systemadmin/usermanagementmaintenance"},
        {icon:faUserLock, text:"System Access Maintenance", to:"/systemadmin/useraccountsmaintenance"},
        {icon:faGears, text:"System Configuration Maintenance", to:"/systemadmin/systemconfigurationmaintenance"},
        {icon:faChartPie, text:"System-Level Reports", to:"/systemadmin/systemlevelreports"},
        //{icon:faChartGantt, text:"Activity Logs", to:"/systemadmin/activitylogs"},
    ],
    "Course Admin": [
        {icon:faHouse, text:"Home", to:"/courseadmin/dashboard"},
        {icon:faChalkboard, text:"Course Manager", to:"/courseadmin/courses"},
        // {icon:faBook, text:"My Course Maintenance", to:"/courseadmin/courselistmaintenance"},
        {icon:faPersonCirclePlus, text:"Enroll Trainee", to:"/courseadmin/bulkenrollment"},
        {icon:faChartPie, text:"Assigned Course Reports", to:"/courseadmin/coursereports"},
        // {icon:faUsersRays, text:"My Employees", to:"/courseadmin/myemployee"}
    ],
    "Learner": [
        {icon:faHouse, text:"Home", to:"/learner/dashboard"},
        {icon:faBook, text:"Courses Manager", to:"/learner/learnercoursemanager/#"},
        {icon:faMedal, text:"Certificates" , to:"/learner/learnercertificates"},
        {icon:faGraduationCap, text:"Self Enrollment", to:"/learner/learnerselfenrollment"},
    ]
}

export default function Navigation({unread_notfications}) {
    const {user, profile_image, role, availableRoles, setAvailableRoles,setUser, setToken, setRole, setAuthenticated} = useStateContext();
    const navigate = useNavigate();
    const [openNotficiation, setOpenNotification] = useState(false);
    const [unread, setUnread] = useState(unread_notfications || false); // Default to false if not provided

    const Logout = () => {
        toast("Logging Out....",{
            description: "User account is logging out the system",
        }
        )
    }

    const OpenProfile = (e) => {
        e.stopPropagation()
        const roleName = user?.user_infos?.roles?.[0]?.role_name?.replace(/\s+/g, '').toLowerCase(); // Remove spaces
        //navigate(`/${roleName}/userdetail/${user?.user_infos?.id}`);
        navigate(`/${roleName}/profile`);
    }


    useEffect(() => {
        let roles = []
                //Set Available Roles
                if(user.user_infos.roles[0]?.role_name === 'System Admin'){
                    roles = ['System Admin', 'Course Admin', 'Learner']
                }else if(user.user_infos.roles[0]?.role_name === 'Course Admin'){
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


    // const onLogout = async () => {
    //     try{
    //         Logout()
    //         await axiosClient.post('/logout');
    //         setRole('');
    //         setUser('');
    //         setToken(null);
    //         toast("Log Out Successfully.",{
    //             description: "User account is logged out the system",
    //         })
    //     }catch (e){
    //         console.error(e);
    //     }

    const onLogout = () => {
        Logout();
        axiosClient.post('/logout')
            .then(() => {
                setRole('');
                setUser('');
                setToken(null);
                navigate('/login');
                toast("Log Out Successfully.", {
                    description: "User account is logged out of the system",
                });
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to log out. Please try again.");
            });
    }
    useEffect(() => {
        setUnread(unread_notfications);
    }, [unread_notfications]);

    return (
        <>
        <div className="flex flex-col items-center h-screen w-24 place-content-between py-2 z-10
                        sm:px-2">
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
                    <li><Icons icon={<FontAwesomeIcon icon={faGear}/>} text={"Account Setting"} to={"/systemadmin/accountsettings"}/></li>
                    <li onClick={() => setOpenNotification(true)}><Icons icon={<FontAwesomeIcon icon={faBell}/>} text={"Notifications"} notification={true}  unread={unread}/></li>
                    {/* <li className='_icon' onClick={() => setOpenNotification(true)}>
                        <div>
                            <div className='icon group'>
                                <p className='hover:scale-105 transition-all ease-in-out'><FontAwesomeIcon icon={faBell}/></p>
                                <p className='icon-name group-hover:scale-100'>Notifications</p>
                            </div>
                        </div>
                    </li> */}
                    <li className='inline-block relative w-auto group p-1'>
                        <div className='w-10 h-10 rounded-full shadow-lg hover:scale-105 transition-all ease-in-out'>
                            <img src={user.user_infos.profile_image} className='rounded-full'/>
                        </div>
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
                                <ProfileIcons text={"View Profile"} icon={<FontAwesomeIcon icon={faUser}/>} onClick={OpenProfile}/>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
        <NotificationModal open={openNotficiation} close={() => setOpenNotification(false)}/>
        </>
    )
}
