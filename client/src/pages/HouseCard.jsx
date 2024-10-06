import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FaMapMarkerAlt } from 'react-icons/fa'; // Import icons from react-icons

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from '@material-tailwind/react';

const HouseCard = ({ house }) => {
        const zoom = 16; // 15 is ideal


    
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
                <Typography>
                    Floor Level: {house.floorLevel}
                </Typography>
                <Typography>
                    House Number: {house.houseNumber}
                </Typography>
                <Typography>
                    Rent Per Month: ${house.rentPerMonth}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button 
                    color="blue" 
                    className="w-full transform transition-transform duration-300 hover:scale-105 hover:bg-green-700 bg-zinc-600"
                >
                    <Link to={`/booking/${house._id}`}>More Info</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default HouseCard;