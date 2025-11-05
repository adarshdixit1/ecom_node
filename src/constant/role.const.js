const ROLE = {
  ADMIN: "admin",
  SUB_ADMIN: "subAdmin",
  CUSTOMER: "customer",
};

const ORDER_STATUS = {
  pending: 1,
  paid: 2,
  shipped: 3,
  delivered: 4,
};

module.exports = {
  ROLE,
  ORDER_STATUS,
};
