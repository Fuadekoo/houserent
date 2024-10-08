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
import { useTranslation } from 'react-i18next';


const IsRoomBlockCard = ({ house, onToggleBlock }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

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
            <Link to={`/booking/${house._id}`}>
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
                <Typography>{t('admin.isroomblockedcard.floor')}: {house.floorLevel}</Typography>
                <Typography>{t('admin.isroomblockedcard.House')}: {house.houseNumber}</Typography>
                <Typography>{t('admin.isroomblockedcard.rent')}: {house.rentPerMonth} {t('admin.isroomblockedcard.ETB')}</Typography>
            </CardBody>
            </Link>
            <CardFooter className="pt-0">
                <Button
                    color="blue"
                    className="w-full transform transition-transform duration-300 hover:scale-105 hover:bg-green-800 bg-zinc-600 mb-2"
                >
                    <Link to={`/booking/${house._id}`}>{t('common.housecard.moreinfo')}</Link>
                </Button>
 
                <Button
                    onClick={handleBlock}
                    color={house.active ? 'red' : 'green'} // Conditional color for Block/Unblock
                    className="w-full transform transition-transform duration-300 hover:scale-105 hover:bg-red-700 bg-red-400"
                >
                    {house.active ? t('admin.isroomblockedcard.Block') : t('admin.isroomblockedcard.Unblock')} {/* Conditional text based on "active" */}
                </Button>
            </CardFooter>
        </Card>
       
    );
};

export default IsRoomBlockCard;
