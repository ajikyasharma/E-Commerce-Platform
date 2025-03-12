import axios from "axios";

export const getProducts = async (req, res) => {
    try {
        const { query } = req.query; // Get search query
        const API_URL = "https://fakestoreapi.com/products"; // Third-party API

        const { data: products } = await axios.get(API_URL);

        // Search functionality
        let filteredProducts = products;
        if (query) {
            const lowerQuery = query.toLowerCase();
            filteredProducts = products.filter(product =>
                product.title.toLowerCase().includes(lowerQuery)
            );
        }

        res.json(filteredProducts);
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
