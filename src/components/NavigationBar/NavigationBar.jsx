import React, { useState, Fragment } from 'react';
import Logo from './../../assets/Logo.png';
import { MdCreateNewFolder, MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { GrMapLocation } from "react-icons/gr";
import { LuTicket } from "react-icons/lu";
import { TbPlaneDeparture } from "react-icons/tb";
import { FaClipboardList, FaRegCommentDots, FaRegUserCircle } from "react-icons/fa";
import { LuLayers } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import RightArrow from "./../../assets/icons/rightArrow.svg";
import { motion } from "framer-motion";
import { Link, NavLink } from 'react-router-dom';
//import { createSlug } from '../../ultils/helpers'
import path from '../../ultils/path';
const navLinks = [
    {
        name: "Dashboard",
        icon: MdOutlineDashboard,
        link: "dashboard",
        type: 'SINGLE',
        path: `/${path.ADMIN}/${path.DASHBOARD}`
    },
    {
        name: "Users",
        icon: FiUsers,
        link: "user",
        type: 'SINGLE',
        path: `/${path.USERS}`

    },
    {
        name: "Bookings",
        icon: LuTicket,
        link: "booking",
        type: 'SINGLE',
        path: `/${path.BOOKINGPAGE}`

    },
    {
        name: "Categories",
        icon: LuLayers,
        link: "category",
        type: 'SINGLE',
        path: `/${path.CATEGORYPAGE}`

    },
    {
        name: "Manage Tours",
        icon: GrMapLocation,
       
        type: 'PARENT',
        
        children: [
            {
                name: "Create Tours",
                icon: MdCreateNewFolder,
                link: "create",
                type: 'SINGLE',
                path: `/${path.TOURPAGE}/${path.CREATETOURS}`,
            },
            {
                name: "List Tours",
                icon: FaClipboardList,
                link: "tour",
                type: 'SINGLE',
                path: `/${path.TOURPAGE}`,
            }
        ]
    },
    
    {
        name: "Trip",
        icon: TbPlaneDeparture,
        link: "trip",
        type: 'SINGLE',
        path: `/${path.TOURACTIVEPAGE}`

    },
    {
        name: "Destination",
        icon: FaRegCommentDots,
        link: "destination",
        type: 'SINGLE',
        path: `/${path.COMMENTPAGE}`

    },
];

const adminUser = [
    {
        name: "Tài Khoản",
        icon: FaRegUserCircle,
        link: "information",
        type: 'SINGLE',
        path: `/${path.INFOMATIONPAGE}`

    },
    {
        name: "Đăng Xuất",
        icon: RiLogoutCircleLine,
        link: "dangxuat",
        type: 'SINGLE',
        path: `/${path.LOGOUT}`

    },
];

const variants = {
    expanded: { width: "20%" },
    nonExpanded: { width: "10%" },
};


const NavigationBar = () => {
    const [activeNavIndex, setActiveNavIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);
    const [isToursExpanded, setIsToursExpanded] = useState(false);

    const handleToggleTours = () => {
        setIsToursExpanded(!isToursExpanded);
    };

    return (
        <motion.div
            animate={isExpanded ? "expanded" : "nonExpanded"}
            variants={variants}
            className={`px-10 py-8 flex flex-col border border-r-2 w-1/5 h-screen relative ${isExpanded ? "px-10" : "px-4"}`}
        >
            <div className='flex space-x-3 items-center'>
                <Link to='/'><img src={Logo} alt="logo images" className='w-36 h-auto' /></Link>
            </div>

            <div
                onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
                className='w-5 h-5 bg-[#5DBC5D] rounded-full absolute -right-[10.5px] top-14 flex items-center justify-center cursor-pointer'>
                <img src={RightArrow} className={`w-[5px] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </div>

            <div className='mt-10 flex flex-col space-y-8'>
                {navLinks.map((item, index) => (
                    <Fragment key={index}>
                        {item.type === 'PARENT' ? (
                            <div className={`flex space-x-3 p-2 rounded ${isExpanded ? "" : "mx-auto"} ${activeNavIndex === index ? " font-semibold" : ""}`}
                                onClick={() => { setActiveNavIndex(index); setIsToursExpanded(!isToursExpanded); }}
                                style={{ textDecoration: 'none', color: 'black' }}
                            >
                                <div className='text-2xl'>
                                    
                                    <item.icon />
                                </div>
                                <span className={isExpanded ? "block" : "hidden"}>{item.name}</span>
                            </div>
                        ) : (
                            <Link to={item.link} className={`flex space-x-3 p-2 rounded ${isExpanded ? "" : "mx-auto"} ${activeNavIndex === index ? " font-semibold" : ""}`}
                                onClick={() => setActiveNavIndex(index)}
                                style={{ textDecoration: 'none', color: 'black' }}
                            >
                                <div className='text-2xl'>
                                    <item.icon />
                                </div>
                                <span className={isExpanded ? "block" : "hidden"}>{item.name}</span>
                            </Link>
                        )}

                        {item.type === 'PARENT' && isToursExpanded && item.children && (
                            item.children.map((child, childIndex) => (
                                <Link to={child.link} key={childIndex} className={`flex space-x-3 p-2 rounded ml-6 ${isExpanded ? "" : "mx-auto"} ${activeNavIndex === childIndex ? " font-semibold" : ""}`}
                                    onClick={() => setActiveNavIndex(childIndex)}
                                    style={{ textDecoration: 'none', color: 'black' }}
                                >
                                    <div className='text-2xl'>
                                    
                                    </div>
                                    <span className={isExpanded ? "block" : "hidden"}>{child.name}</span>
                                </Link>
                            ))
                        )}
                    </Fragment>
                ))}
            </div>
            <div className='ml-2 mt-4 flex flex-col space-y-4'>
                {adminUser.map((item, index) => (
                    <Link to={item.link} key={index} className={`flex space-x-3 rounded text-black ${isExpanded ? "" : "mx-auto"} ${activeNavIndex === index + 8 ? "bg-[#5DBC5D] text-white font-semibold" :"" }`}
                        onClick={() => setActiveNavIndex(index + 8)}
                    >
                        <div className='text-2xl'>
                            <item.icon />
                        </div>
                        <span className={isExpanded ? "block" : "hidden"}>{item.name}</span>
                    </Link>
                ))}
                
            </div>
        </motion.div>
    );
};



export default NavigationBar;
