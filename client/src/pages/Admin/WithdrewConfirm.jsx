// import React, { useEffect, useState } from 'react';
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/solid";
// import {
//     Card,
//     CardHeader,
//     Input,
//     Typography,
//     Button,
//     CardBody,
//     Chip,
//     CardFooter,
//     Tabs,
//     TabsHeader,
//     Tab,
//     IconButton,
//     Tooltip,
// } from "@material-tailwind/react";

// import { FaSearch } from 'react-icons/fa';
// import axios from 'axios';

// const TABS = [
//     { label: "All", value: "all" },
//     { label: "Pending", value: "pending" },
//     { label: "Approved", value: "approved" },
// ];

// const TABLE_HEAD = ["Member", "Amount", "Status", "Date", ""];

// export function WithdrewConfirm() {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [withdrawals, setWithdrawals] = useState([]);
//     const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
//     const [blockStatus, setBlockStatus] = useState({});
//     const [activeTab, setActiveTab] = useState('all');

//     // Pagination states
//     const [currentPage, setCurrentPage] = useState(1);
//     const withdrawalsPerPage = 5; // Adjust this value for the number of items per page
//     const totalPages = Math.ceil(filteredWithdrawals.length / withdrawalsPerPage);

//     const handleSearch = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.get(`/api/withdrawals/getWithdrawals?searchTerm=${searchTerm}`);
//             setFilteredWithdrawals(response.data);
//             setCurrentPage(1); // Reset to first page on new search
//         } catch (error) {
//             console.error("Error fetching withdrawals:", error);
//         }
//     };

//     const handleBlockUnblock = async (withdrawalId, isApproved) => {
//         try {
//             await axios.put(`/api/withdrawals/toggleBlockWithdrawal/${withdrawalId}/block`, { isApproved: !isApproved });
//             const response = await axios.get('/api/withdrawals/getWithdrawals');
//             setWithdrawals(response.data);

//             const updatedBlockStatus = {};
//             response.data.forEach(withdrawal => {
//                 updatedBlockStatus[withdrawal._id] = withdrawal.isApproved;
//             });
//             setBlockStatus(updatedBlockStatus);
//         } catch (error) {
//             console.error("Error updating approval status:", error);
//         }
//     };

//     useEffect(() => {
//         const fetchWithdrawals = async () => {
//             try {
//                 const response = await axios.get('/api/withdrawals/getWithdrawals');
//                 setWithdrawals(response.data);
//                 const initialBlockStatus = {};
//                 response.data.forEach(withdrawal => {
//                     initialBlockStatus[withdrawal._id] = withdrawal.isApproved;
//                 });
//                 setBlockStatus(initialBlockStatus);
//                 setFilteredWithdrawals(response.data); // Initialize filtered withdrawals
//             } catch (error) {
//                 console.error("Error fetching withdrawals:", error);
//             }
//         };
//         fetchWithdrawals();
//     }, []);

//     // Filter withdrawals based on the selected tab
//     useEffect(() => {
//         let filtered;
//         if (activeTab === 'all') {
//             filtered = withdrawals;
//         } else if (activeTab === 'pending') {
//             filtered = withdrawals.filter(withdrawal => !withdrawal.isApproved);
//         } else if (activeTab === 'approved') {
//             filtered = withdrawals.filter(withdrawal => withdrawal.isApproved);
//         }
//         setFilteredWithdrawals(filtered);
//         setCurrentPage(1); // Reset to first page when tab changes
//     }, [activeTab, withdrawals]);

//     useEffect(() => {
//         setFilteredWithdrawals(withdrawals.filter(withdrawal =>
//             withdrawal.memberName.includes(searchTerm) ||
//             withdrawal.email.includes(searchTerm) ||
//             withdrawal.phone.toString().includes(searchTerm)
//         ));
//         setCurrentPage(1); // Reset to first page when search term changes
//     }, [searchTerm, withdrawals]);

//     // Get current withdrawals based on pagination
//     const indexOfLastWithdrawal = currentPage * withdrawalsPerPage;
//     const indexOfFirstWithdrawal = indexOfLastWithdrawal - withdrawalsPerPage;
//     const currentWithdrawals = filteredWithdrawals.slice(indexOfFirstWithdrawal, indexOfLastWithdrawal);

//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePreviousPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     return (
//         <Card className="h-full w-full">
//             <CardHeader floated={false} shadow={false} className="rounded-none">
//                 <div className="mb-8 flex items-center justify-between gap-8">
//                     <div>
//                         <Typography variant="h5" color="blue-gray">
//                             Withdrawal Requests
//                         </Typography>
//                         <Typography color="gray" className="mt-1 font-normal">
//                             Manage withdrawal approvals
//                         </Typography>
//                     </div>
//                 </div>
//                 <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
//                     <Tabs value={activeTab} className="w-full md:w-max">
//                         <TabsHeader>
//                             {TABS.map(({ label, value }) => (
//                                 <Tab key={value} value={value} onClick={() => setActiveTab(value)}>
//                                     &nbsp;&nbsp;{label}&nbsp;&nbsp;
//                                 </Tab>
//                             ))}
//                         </TabsHeader>
//                     </Tabs>
//                     <div className="w-full md:w-72">
//                         <form onSubmit={handleSearch} className='bg-slate-100 p-3 rounded-lg flex items-center'>
//                             <input 
//                                 value={searchTerm} 
//                                 onChange={(e) => setSearchTerm(e.target.value)} 
//                                 type='text' 
//                                 placeholder='Search...' 
//                                 className='bg-transparent focus:outline-none w-24 sm:w-64' 
//                             />
//                             <button type="submit">
//                                 <FaSearch className='text-slate-600' />
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </CardHeader>
//             <CardBody className="overflow-scroll px-0">
//                 <table className="mt-4 w-full min-w-max table-auto text-left">
//                     <thead>
//                         <tr>
//                             {TABLE_HEAD.map((head) => (
//                                 <th
//                                     key={head}
//                                     className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
//                                 >
//                                     <Typography
//                                         variant="small"
//                                         color="blue-gray"
//                                         className="font-normal leading-none opacity-70"
//                                     >
//                                         {head}
//                                     </Typography>
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentWithdrawals.map(
//                             ({ _id, memberName, amount, isApproved, date }, index) => {
//                                 const isLast = index === currentWithdrawals.length - 1;
//                                 const classes = isLast
//                                     ? "p-4"
//                                     : "p-4 border-b border-blue-gray-50";

//                                 return (
//                                     <tr key={_id}>
//                                         <td className={classes}>
//                                             <div className="flex items-center gap-3">
//                                                 <div className="flex flex-col">
//                                                     <Typography
//                                                         variant="small"
//                                                         color="blue-gray"
//                                                         className="font-normal"
//                                                     >
//                                                         {memberName}
//                                                     </Typography>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className={classes}>
//                                             <Typography
//                                                 variant="small"
//                                                 color="blue-gray"
//                                                 className="font-normal"
//                                             >
//                                                 {amount}
//                                             </Typography>
//                                         </td>
//                                         <td className={classes}>
//                                             <div className="w-max">
//                                                 <Chip
//                                                     variant="ghost"
//                                                     size="sm"
//                                                     value={isApproved ? "Approved" : "Pending"}
//                                                     color={isApproved ? "green" : "blue-gray"}
//                                                 />
//                                             </div>
//                                         </td>
//                                         <td className={classes}>
//                                             <Typography
//                                                 variant="small"
//                                                 color="blue-gray"
//                                                 className="font-normal"
//                                             >
//                                                 {date}
//                                             </Typography>
//                                         </td>
//                                         <td className={classes}>
//                                             <Tooltip content={blockStatus[_id] ? "Mark as Pending" : "Approve"}>
//                                                 <IconButton variant="text" onClick={() => handleBlockUnblock(_id, blockStatus[_id])}>
//                                                     {blockStatus[_id] ? (
//                                                         <LockOpenIcon className="h-4 w-4" />
//                                                     ) : (
//                                                         <LockClosedIcon className="h-4 w-4" />
//                                                     )}
//                                                 </IconButton>
//                                             </Tooltip>
//                                         </td>
//                                     </tr>
//                                 );
//                             }
//                         )}
//                     </tbody>
//                 </table>
//             </CardBody>
//             <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
//                 <Button
//                     variant="outlined"
//                     color="blue-gray"
//                     size="sm"
//                     onClick={handlePreviousPage}
//                     disabled={currentPage === 1}
//                 >
//                     Previous
//                 </Button>
//                 <div className="flex items-center gap-2">
//                     <Typography variant="small" color="blue-gray" className="font-normal">
//                         Page {currentPage} of {totalPages}
//                     </Typography>
//                 </div>
//                 <Button
//                     variant="outlined"
//                     color="blue-gray"
//                     size="sm"
//                     onClick={handleNextPage}
//                     disabled={currentPage === totalPages}
//                 >
//                     Next
//                 </Button>
//             </CardFooter>
//         </Card>
//     );
// }
