import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from './Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus, faSearch, faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons'
import { Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react';


//Sort Options Array
const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
]

export default function CourseListMaintenance() {
    return (
        <div className='grid  grid-cols-4 grid-rows-[6.25rem_1.25rem_3.125rem_auto] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Course List Maintenance</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-2 row-span-1 px-5'>
            <h1 className='text-primary text-4xl font-header'>Course List Maintenance </h1>
            <p className='font-text text-sm text-unactive'>Easily manage and add courses to streamline learning opportunities.</p>
            </div>

            {/* Add Button */}
            <div className='col-start-4 row-start-1 flex flex-col justify-center px-5'>
            <button className='inline-flex flex-row shadow-md items-center justify-center bg-primary font-header text-white text-base p-4 rounded-full hover:bg-primaryhover hover:scale-105 transition-all ease-in-out'>
                <FontAwesomeIcon icon={faFolderPlus} className='mr-2'/>
                <p>Add Course</p>
            </button>
            </div>

            {/* Divider Span */}
            <div className='row-start-2 col-start-1 col-span-5 px-5'>
                <div className='w-full bg-divider h-0.5 rounded-full'></div>
            </div>

            {/* Small Sorter */}
            <div className='inline-flex items-center row-start-3 col-start-1 px-5'>
                <Menu>
                    <MenuButton className='flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md'>
                    <p>Sort Courses by</p>
                    <FontAwesomeIcon icon={faArrowDownWideShort}/>
                    </MenuButton>
                    {/* Sort Options */}
                    <MenuItems anchor="bottom" className = 'absolute origin-top-right border-2 border-primary bg-secondarybackground rounded-md shadow-md inline-flex flex-col gap-2 w-fit font-text text-primary p-1'>
                        {sortOptions.map((index) =>
                            <MenuItem key={index.name} className = 'p-1 w-40 hover:bg-primary hover:text-white hover:cursor-pointer rounded-md transition-all ease-in-out'>
                                <p>{index.name}</p>
                            </MenuItem>
                        )}
                    </MenuItems>
                </Menu>
            </div>

            {/* Search bar */}
            <div className='inline-flex items-center col-start-4 row-start-3 px-5'>
                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className='row-start-4 col-start-4 p-5'>
                <div className='bg-secondarybackground shadow-md rounded-md w-full h-full'>

                </div>
            </div>
        </div>

    )
}
