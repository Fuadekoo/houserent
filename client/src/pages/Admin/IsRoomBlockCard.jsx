import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from '@material-tailwind/react';

const IsRoomBlockCard = ({ house, onToggleBlock }) => {
    const navigate = useNavigate();

    const handleBlock = async () => {
        const response = await fetch(`/api/property/blockRoom/${house._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                active: !house.active, // Toggle active state
            }),
        });

        if (response.ok) {
            const updatedHouse = await response.json();
            onToggleBlock(updatedHouse); // Call parent callback to update house status
            navigate('/');
        } else {
            console.log('There is something wrong with blocking/unblocking the house');
        }
    };

    return (
        <Card className="mt-6 w-64 transform transition-transform duration-300 hover:scale-105">
            <CardHeader color="blue-gray" className="relative h-32">
                <img
                    src={house.image[0]}
                    alt="house-image"
                    className="w-full h-full object-cover"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {house.address}
                </Typography>
                <Typography>Floor Level: {house.floorLevel}</Typography>
                <Typography>House Number: {house.houseNumber}</Typography>
                <Typography>Rent Per Month: ${house.rentPerMonth}</Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button
                    color="blue"
                    className="w-full transform transition-transform duration-300 hover:scale-105 hover:bg-green-800 bg-zinc-600 mb-2"
                >
                    <Link to={`/booking/${house._id}`}>More Info</Link>
                </Button>

                <Button
                    onClick={handleBlock}
                    color={house.active ? 'red' : 'green'} // Conditional color for Block/Unblock
                    className="w-full transform transition-transform duration-300 hover:scale-105 hover:bg-red-700 bg-red-400"
                >
                    {house.active ? 'Block' : 'Unblock'} {/* Conditional text based on "active" */}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default IsRoomBlockCard;
