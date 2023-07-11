const ip = "172.16.132.90:5000";

export const API_CUST_LOGIN = `http://${ip}/api/customers/login`;
export const API_CUST_REGISTER = `http://${ip}/api/customers/`;
export const API_CUST_GET = `http://${ip}/api/customers/getCustomer`;

export const API_OWNER_LOGIN = `http://${ip}/api/owners/login`;
export const API_PROPCUST_GET = `http://${ip}/api/properties/getPropCust`;
export const API_PROP_DELETE = `http://${ip}/api/properties/delete`;
export const API_PROP = `http://${ip}/api/properties`;
export const API_OWNER_PROP = `http://${ip}/api/properties/get`;
export const API_GET_OWNER = `http://${ip}/api/owners/getOwner`;

export const API_NEW_BOOKING = `http://${ip}/api/bookings/newBooking`;
export const API_CURR_BOOKING = `http://${ip}/api/bookings/currentBooking`;
export const API_END_BOOKING = `http://${ip}/api/bookings/out`;
