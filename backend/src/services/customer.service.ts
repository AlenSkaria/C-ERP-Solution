import { Customer, ICustomer } from '../models/customer.model';

// Function to add a new customer
export const addCustomer = async (customerData: ICustomer) => {
    const customer = new Customer(customerData);
    return await customer.save();
};

// Function to search for customers
export const searchCustomers = async (query: any) => {
    const searchCriteria: any = {};
    
    // Add search criteria based on query parameters
    if (query) {
        searchCriteria.$or = [
            { name: { $regex: query, $options: 'i' } }, // Case-insensitive search by name
            { email: { $regex: query, $options: 'i' } }, // Case-insensitive search by email
            { phone: { $regex: query, $options: 'i' } }  // Case-insensitive search by phone
        ];
    }

    return await Customer.find(searchCriteria);
};

// Function to get all customers or search based on query
export const getAllCustomers = async (query: any) => {
    if (query.query) { // Check for the 'query' parameter
        return await searchCustomers(query.query);
    }
    return await Customer.find(); // Return all customers if no query
};

// Function to get a customer by ID
export const getCustomerById = async (id: string) => {
    return await Customer.findById(id);
};

// Function to update a customer
export const updateCustomer = async (id: string, customerData: Partial<ICustomer>) => {
    return await Customer.findByIdAndUpdate(id, customerData, { new: true });
};

// Function to delete a customer
export const deleteCustomer = async (id: string) => {
    return await Customer.findByIdAndDelete(id);
}; 