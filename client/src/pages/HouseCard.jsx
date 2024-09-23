import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

const HouseCard = ({ house }) => {
  return (
    <Card className="mt-6 w-72"> {/* Adjusted width */}
      <CardHeader color="blue-gray" className="relative h-40"> {/* Adjusted height */}
        <img
          src={house.image}
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
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  );
};

export default HouseCard;