import { Sale } from '../models/sale.model';
import { Product } from '../models/product.model';

// Function to get daily sales data for the last 30 days
export const getSalesData = async () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const salesData = await Sale.aggregate([
        {
            $match: {
                dateOfSale: { $gte: thirtyDaysAgo }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$dateOfSale" } },
                total: { $sum: "$totalPrice" }
            }
        },
        {
            $project: {
                _id: 0,
                date: "$_id",
                total: 1
            }
        },
        {
            $sort: { date: 1 }
        }
    ]);

    return salesData;
};

// Function to get top 10 selling products
export const getTopProducts = async () => {
    const topProducts = await Sale.aggregate([
        {
            $group: {
                _id: "$productId",
                quantity: { $sum: "$quantity" }
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product"
            }
        },
        {
            $unwind: "$product"
        },
        {
            $project: {
                _id: 0,
                name: "$product.name",
                quantity: 1
            }
        },
        {
            $sort: { quantity: -1 }
        },
        {
            $limit: 10
        }
    ]);

    return topProducts;
};

// Function to get sales by category
export const getSalesByCategory = async () => {
    const categorySales = await Sale.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product"
            }
        },
        {
            $unwind: "$product"
        },
        {
            $match: {
                "product.status": "active"
            }
        },
        {
            $group: {
                _id: "$product.category",
                sales: { $sum: "$totalPrice" }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                sales: 1
            }
        },
        {
            $sort: { sales: -1 }
        }
    ]);

    return categorySales;
};

// Function to get detailed sales history
export const getSalesHistory = async (page: number = 1, limit: number = 20) => {
    const skip = (page - 1) * limit;

    const [salesHistory, total] = await Promise.all([
        Sale.aggregate([
            {
                $lookup: {
                    from: "customers",
                    localField: "customerId",
                    foreignField: "_id",
                    as: "customerInfo"
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            {
                $unwind: {
                    path: "$productInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    customerData: { $first: "$customerInfo" }
                }
            },
            {
                $project: {
                    _id: 1,
                    customerName: {
                        $cond: {
                            if: { $eq: ["$customerData", null] },
                            then: "Walk-in Customer",
                            else: "$customerData.name"
                        }
                    },
                    productName: "$productInfo.name",
                    quantity: 1,
                    totalPrice: 1,
                    dateOfSale: 1
                }
            },
            {
                $sort: { dateOfSale: -1 }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ]),
        Sale.countDocuments()
    ]);

    // Format the sales history with proper customer names
    const formattedSalesHistory = salesHistory.map(sale => ({
        _id: sale._id,
        customerName: sale.customerName || "Walk-in Customer",
        productName: sale.productName || "Unknown Product",
        quantity: sale.quantity,
        totalPrice: sale.totalPrice,
        date: new Date(sale.dateOfSale).toISOString().split('T')[0]
    }));

    return {
        data: formattedSalesHistory,
        pagination: {
            total,
            page,
            totalPages: Math.ceil(total / limit),
            hasMore: page * limit < total
        }
    };
}; 