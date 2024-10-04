// // apartama   villa  condominium  compound-house  single-house


// const classModel = require("../models/HouseModel");

// const getApartamaFilter = async (req, res) => {
//   try {
//     const houses = await classModel.find({ housecategory: 'Apartama'  }); // Fetch Apartama houses
//     res.status(200).json({ message: "Apartama houses retrieved successfully", success: true, data: houses });
//   } catch (error) {
//     res.status(500).json({ message: error.message, success: false, data: null });
//   }
// };

// const getVillaFilter = async (req, res) => {
//   try {
//     const houses = await classModel.find({ housecategory: 'Villa'  }); // Fetch Villa houses
//     res.status(200).json({ message: "Villa houses retrieved successfully", success: true, data: houses });
//   } catch (error) {
//     res.status(500).json({ message: error.message, success: false, data: null });
//   }
// };


// const getCondominiumFilter = async (req, res) => {
//   try {
//     const houses = await classModel.find({ housecategory: 'Condominium'  }); // Fetch Condominium houses
//     res.status(200).json({ message: "Condominium houses retrieved successfully", success: true, data: houses });
//   } catch (error) {
//     res.status(500).json({ message: error.message, success: false, data: null });
//   }
// };


// const getCompoundHouseFilter = async (req, res) => {
//   try {
//     const houses = await classModel.find({ housecategory:'compound_house'  }); // Fetch compound house House houses
//     res.status(200).json({ message: "compound House houses retrieved successfully", success: true, data: houses });
//   } catch (error) {
//     res.status(500).json({ message: error.message, success: false, data: null });
//   }
// };

// const getSingleHouseFilter = async (req, res) => {
//   try {
//     const houses = await classModel.find({ housecategory: 'single_house'  }); // Fetch single house House houses
//     res.status(200).json({ message: "single House houses retrieved successfully", success: true, data: houses });
//   } catch (error) {
//     res.status(500).json({ message: error.message, success: false, data: null });
//   }
// };
// module.exports ={getApartamaFilter ,
//                  getVillaFilter,
//                  getCondominiumFilter,
//                  getCompoundHouseFilter,
//                  getSingleHouseFilter
//              }

const classModel = require("../models/HouseModel");

const getApartamaFilter = async (req, res) => {
  try {
    const houses = await classModel.find({ housecategory: 'Apartama' });
    res.status(200).json({ message: "Apartama houses retrieved successfully", success: true, data: houses });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false, data: null });
  }
};

const getVillaFilter = async (req, res) => {
  try {
    const houses = await classModel.find({ housecategory: 'Villa' });
    res.status(200).json({ message: "Villa houses retrieved successfully", success: true, data: houses });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false, data: null });
  }
};

const getCondominiumFilter = async (req, res) => {
  try {
    const houses = await classModel.find({ housecategory: 'Condominium' });
    res.status(200).json({ message: "Condominium houses retrieved successfully", success: true, data: houses });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false, data: null });
  }
};

const getCompoundHouseFilter = async (req, res) => {
  try {
    const houses = await classModel.find({ housecategory: 'compound_house' });
    res.status(200).json({ message: "Compound houses retrieved successfully", success: true, data: houses });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false, data: null });
  }
};

const getSingleHouseFilter = async (req, res) => {
  try {
    const houses = await classModel.find({ housecategory: 'single_house' });
    res.status(200).json({ message: "Single houses retrieved successfully", success: true, data: houses });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false, data: null });
  }
};

module.exports = {
  getApartamaFilter,
  getVillaFilter,
  getCondominiumFilter,
  getCompoundHouseFilter,
  getSingleHouseFilter
};
