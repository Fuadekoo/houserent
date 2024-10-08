import React, { useEffect, useState } from 'react';
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";

import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';



export function AdminUsers() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [blockStatus, setBlockStatus] = useState({});
    const [activeTab, setActiveTab] = useState('all');

    const TABS = [
        { label: t("admin.adminuser.all"), value: "all" },
        { label: t("admin.adminuser.blocked"), value: "blocked" },
        { label: t("admin.adminuser.unblocked"), value: "unblocked" },
    ];
    
    const TABLE_HEAD = [
        t("admin.adminuser.member"),
        t("admin.adminuser.role"),
        t("admin.adminuser.status"),
        t("admin.adminuser.date"),
        ""
    ];
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    
    const usersPerPage = 3; // Adjust this value for the number of users per page
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/api/users/getUsers?searchTerm=${searchTerm}`);
            setFilteredUsers(response.data);
            setCurrentPage(1); // Reset to first page on new search
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleBlockUnblock = async (userId, isBlocked) => {
        try {
            await axios.put(`/api/users/toggleBlockUser/${userId}/block`, { isBlocked: !isBlocked });
            const response = await axios.get('/api/users/getUsers');
            setUsers(response.data);

            const updatedBlockStatus = {};
            response.data.forEach(user => {
                updatedBlockStatus[user._id] = user.isBlocked;
            });
            setBlockStatus(updatedBlockStatus);
        } catch (error) {
            console.error("Error updating block status:", error);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users/getUsers');
                setUsers(response.data);
                const initialBlockStatus = {};
                response.data.forEach(user => {
                    initialBlockStatus[user._id] = user.isBlocked;
                });
                setBlockStatus(initialBlockStatus);
                setFilteredUsers(response.data); // Initialize filtered users
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    // Filter users based on the selected tab
    useEffect(() => {
        let filtered;
        if (activeTab === 'all') {
            filtered = users;
        } else if (activeTab === 'blocked') {
            filtered = users.filter(user => user.isBlocked);
        } else if (activeTab === 'unblocked') {
            filtered = users.filter(user => !user.isBlocked);
        }
        setFilteredUsers(filtered);
        setCurrentPage(1); // Reset to first page when tab changes
    }, [activeTab, users]);

    useEffect(() => {
        setFilteredUsers(users.filter(user =>
            user.name.includes(searchTerm) ||
            user.email.includes(searchTerm) ||
            user.phone.toString().includes(searchTerm)
        ));
        setCurrentPage(1); // Reset to first page when search term changes
    }, [searchTerm, users]);

    // Get current users based on pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <Card className="h-full w-full mt-1">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className=" flex items-center justify-between gap-1">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            {t('admin.adminuser.member')}
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                        {t('admin.adminuser.seeall')}
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-1 md:flex-row">
                    <Tabs value={activeTab} className="w-full md:w-max">
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value} onClick={() => setActiveTab(value)}>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                        <form onSubmit={handleSearch} className='bg-slate-100 p-1 rounded-lg flex items-center'>
                            <input 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                                type='text' 
                                placeholder='Search...' 
                                className='bg-transparent focus:outline-none w-24 sm:w-64' 
                            />
                            <button type="submit">
                                <FaSearch className='text-slate-600' />
                            </button>
                        </form>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="mt-1 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-1"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(
                            ({ _id, name, email, phone, avatar, role,  isBlocked, createdAt   }, index) => {
                                const isLast = index === currentUsers.length - 1;
                                const classes = isLast
                                    ? "p-2"
                                    : "p-2 border-b border-blue-gray-50";

                                return (
                                    <tr key={_id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-1">
                                                <Avatar src={avatar} alt={name} size="sm" className='rounded-full h-10 w-10 object-cover' />
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {name}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {email}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {phone}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {role}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={isBlocked ? "Blocked" : "UnBlocked"}
                                                    color={isBlocked ? "green" : "blue-gray"}
                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {
                                                  createdAt}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content={blockStatus[_id] ? "Unblock User" : "Block User"}>
                                                <IconButton variant="text" onClick={() => handleBlockUnblock(_id, blockStatus[_id])}>
                                                    {blockStatus[_id] ? (
                                                        <LockClosedIcon className="h-4 w-4" />
                                                    ) : (
                                                        <LockOpenIcon className="h-4 w-4" />
                                                    )}
                                                </IconButton>
                                            </Tooltip>

                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-1">
                <div className="flex items-center">
                    <Typography className="mx-2">{`Page ${currentPage} of ${totalPages}`}</Typography>
                    <div className="inline-flex">
                    <Button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded-l'  onClick={handlePreviousPage} disabled={currentPage === 1}>
                      {t('admin.adminuser.prev')}
                    </Button>
                    <Button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded-l' onClick={handleNextPage} disabled={currentPage === totalPages}>
                    {t('admin.adminuser.next')}
                    </Button>
                    </div>
                </div>
                <Typography variant="small" color="blue-gray" className="font-normal">
                {t('admin.adminuser.total')}: {filteredUsers.length}
                </Typography>
            </CardFooter>
        </Card>
    );
}
export default AdminUsers;