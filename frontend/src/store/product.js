import { create } from "zustand";

// Global state hook
export const useProductStore = create((set) => ({
	products: [],
	//Populates the products array
	setProducts: (products) => set({ products }),

	//Verifies if all fields and filled and either creates a new product or returns an error message
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("http://localhost:5000/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	},

	//Fetches all products
	getProducts: async () => {
		const res = await fetch("http://localhost:5000/products")
		const data = await res.json()
		set({products: data.data})
	},
	
	//Delete product
	deleteProduct: async (productId) => {
		const res = await fetch(`http://localhost:5000/products/${productId}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		set((state) => ({ products: state.products.filter((product) => product._id !== productId) }));
		return { success: true, message: data.message };
	}

}));