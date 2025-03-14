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
    if (query.name) {
        searchCriteria.name = { $regex: query.name, $options: 'i' }; // Case-insensitive search
    }
    if (query.email) {
        searchCriteria.email = { $regex: query.email, $options: 'i' };
    }
    if (query.phone) {
        searchCriteria.phone = { $regex: query.phone, $options: 'i' };
    }

    return await Customer.find(searchCriteria);
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