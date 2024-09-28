import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
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

const TABS = [
    { label: "All", value: "all" },
    { label: "Blocked", value: "blocked" },
    { label: "UnBlocked", value: "unblocked" },
];

const TABLE_HEAD = ["Member", "Role", "Status", "Phone Number", ""];

export function AdminUsers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [blockStatus, setBlockStatus] = useState({});
    const [activeTab, setActiveTab] = useState('all'); // Track the active tabs
    
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/api/users/getUsers?searchTerm=${searchTerm}`);
            setFilteredUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
  const handleBlockUnblock = async (userId, isBlocked) => {
    try {
        await axios.put(`/api/users/toggleBlockUser/${userId}/block`, { isBlocked: !isBlocked });

        // Fetch the updated list of users after the block/unblock action
        const response = await axios.get('/api/users/getUsers');
        setUsers(response.data);

        // Update block status based on the response data
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
                const response = await axios.get('/api/users/getUsers'); // Adjust the endpoint as necessary
                setUsers(response.data);
                const initialBlockStatus = {};
                response.data.forEach(user => {
                    initialBlockStatus[user._id] = user.isBlocked;
                });
                setBlockStatus(initialBlockStatus);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);
    // Filter users based on the selected tab (All, Blocked, Unblocked)
    useEffect(() => {
      let filtered;
      if (activeTab === 'all') {
          filtered = users; // Show all users
      } else if (activeTab === 'blocked') {
          filtered = users.filter(user => user.isBlocked); // Show blocked users
      } else if (activeTab === 'unblocked') {
          filtered = users.filter(user => !user.isBlocked); // Show unblocked users
      }
      setFilteredUsers(filtered);
  }, [activeTab, users]);

    useEffect(() => {
        setFilteredUsers(users.filter(user => 
            user.name.includes(searchTerm) ||
            user.email.includes(searchTerm) ||
            user.phone.toString().includes(searchTerm)
        ));
    }, [searchTerm, users]);

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Members list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all members
                        </Typography>
                    </div>
                    {/* <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button variant="outlined" size="sm">
                            View all
                        </Button>
                        <Button className="flex items-center gap-3" size="sm">
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
                        </Button>
                    </div> */}
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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
                        <form onSubmit={handleSearch} className='bg-slate-100 p-3 rounded-lg flex items-center'>
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
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
                        {filteredUsers.map(
                            ({ _id, name, email,phone,avatar, role, org, isBlocked, date }, index) => {
                                const isLast = index === filteredUsers.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={_id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={avatar} alt={name}  size="sm" className='rounded-full h-10 w-10 object-cover' />
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
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {org}
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
                                                {date}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content={blockStatus[_id] ? "Unblock User" : "Block User"}>
                                                <IconButton variant="text" onClick={() => handleBlockUnblock(_id, blockStatus[_id])}>
                                                    {blockStatus[_id] ? (
                                                        <LockOpenIcon className="h-4 w-4" />
                                                    ) : (
                                                        <LockClosedIcon className="h-4 w-4" />
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
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm">
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export default AdminUsers;
