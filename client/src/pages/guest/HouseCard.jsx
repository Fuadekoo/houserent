import React from 'react';
import { Link } from "react-router-dom";
import { MdLocationOn } from 'react-icons/md';
const HouseCard = ({ house }) => {
    return (
        <div className="bg-white pt-2 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
            <Link to={`/house/${house._id}`}>
                <img
                    src={house.image[0]}
                    alt="house-image"
                    className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-3 flex flex-col gap-2 w-full">
                    <p className="truncate text-lg font-semibold text-slate-700">{house.address}</p>
                    <div className="flex items-center gap-1">
                        <MdLocationOn className="h-4 w-4 text-green-700" />
                        <p className="text-sm text-gray-600 truncate w-full">{house.address}</p>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{house.description}</p>
                    <p className="text-slate-500 mt-2 font-semibold">
                    ETB-{house.rentPerMonth.toLocaleString('ETB')}/month

   

                        
                    </p>
                    <div className="text-slate-700 flex gap-2">
                        <div className="font-bold text-xs">
                            {house.bedrooms > 1 ? `${house.bedrooms} beds` : `${house.bedrooms} bed`}
                        </div>
                        <div className="font-bold text-xs">
                            {house.bathrooms > 1 ? `${house.bathrooms} baths` : `${house.bathrooms} bath`}
                        </div>
                    </div>
                    <div className="pt-1">
                        <button 
                            color="blue" 
                            className="w-full transform transition-transform duration-300 hover:scale-105 bg-slate-600 text-white p-1 rounded-sm  hover:opacity-750"
                        >
                            More Info
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default HouseCard;
