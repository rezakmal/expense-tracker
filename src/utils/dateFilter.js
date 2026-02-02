const { Op } = require("sequelize");

exports.getDateFilter = (filter) => {
  const now = new Date();
  let startDate;

  switch (filter) {
    case "yesterday":
      startDate = new Date(now.setDate(now.getDate() - 1));
      break;
    case "week":
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case "month":
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    case "3months":
      startDate = new Date(now.setMonth(now.getMonth() - 3));
      break;
    default:
      return {};
  };

  return {
    createdAt: {
      [Op.gte]: startDate,
    }
  };
};