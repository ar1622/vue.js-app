import { createStore } from "vuex";

const store = createStore({
    state: {
        lessons: [],
        cart: [],
        orders: [],
        lessons: [],
    },
    mutations: {
        setLessons(state, lessons) {
            state.lessons = lessons;
        },
        addToCart(state, lessonId) {
            if (!state.cart.includes(lessonId)) {
                state.cart.push(lessonId);
            }
        },
        removeFromCart(state, lessonId) {
            state.cart = state.cart.filter((id) => id !== lessonId);
        },

        setOrders(state, orders) {
            state.orders = orders;
        },
        deleteOrder(state, orderId) {
            state.orders = state.orders.filter(
                (order) => order._id !== orderId
            );
        },
        clearCart(state) {
            state.cart = [];
        },
    },

    actions: {
        async fetchLessonsBasedOnQuery({ commit }, searchQuery) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_APP_API_BASE_URL}/search?search=${searchQuery}`
                );
                const data = await response.json();
                commit("setLessons", data.body);
            } catch (error) {
                console.error("Error fetching lessons:", error);
            }
        },
        async fetchLessons({ commit }) {
            try {
                const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/lesson`);
                const data = await response.json();

                commit("setLessons", data.body);
            } catch (error) {
                alert("Error fetching lessons:", error);
            }
        },
        async deleteLesson({ commit, state }, lessonId) {
            try {
                const isConfirmed = window.confirm(
                    "Are you sure you want to delete this lesson?"
                );
                if (!isConfirmed) {
                    return;
                }

                const response = await fetch(
                    `${import.meta.env.VITE_APP_API_BASE_URL}/lesson/delete/${lessonId}`,
                    {
                        method: "DELETE",
                    }
                );

                if (response.ok) {
                    // Assuming you want to update the lessons after deleting one
                    const updatedLessons = state.lessons.filter(
                        (lesson) => lesson._id !== lessonId
                    );
                    commit("setLessons", updatedLessons);
                    alert("Lesson deleted successfully!");
                } else {
                    console.error(
                        "Failed to delete lesson. Server returned:",
                        response.status,
                        response.statusText
                    );
                }
            } catch (error) {
                console.error("Error deleting lesson:", error);
            }
        },
        addToCart({ commit }, lessonId) {
            commit("addToCart", lessonId);
        },
        removeFromCart({ commit }, lessonId) {
            commit("removeFromCart", lessonId);
        },
        async buyLesson({ commit }, orderDetails) {
            try {
                // Assuming you have a proper endpoint for saving order details
                const response = await fetch(
                    `${import.meta.env.VITE_APP_API_BASE_URL}/order/save-order-details`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(orderDetails),
                    }
                );

                if (response.ok) {
                    commit("clearCart");
                    alert("Lesson bought successfully!");
                } else {
                    alert(
                        "Failed to save order details. Server returned:",
                        response.status,
                        response.statusText
                    );
                }
            } catch (error) {
                alert("Error saving order details:", error);
            }
        },

        async fetchOrders({ commit }) {
            try {
                const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/order/`);
                const data = await response.json();

                commit("setOrders", data.body);
            } catch (error) {
                alert("Error fetching orders:", error);
            }
        },
        async deleteOrder({ commit }, orderId) {
            try {
                const isConfirmed = window.confirm(
                    "Are you sure you want to delete this order?"
                );
                if (!isConfirmed) {
                    return;
                }

                const response = await fetch(
                    `${import.meta.env.VITE_APP_API_BASE_URL}/order/delete/${orderId}`,
                    {
                        method: "DELETE",
                    }
                );

                if (response.ok) {
                    commit("deleteOrder", orderId);
                    alert("Order deleted successfully!");
                } else {
                    console.error(
                        "Failed to delete order. Server returned:",
                        response.status,
                        response.statusText
                    );
                }
            } catch (error) {
                console.error("Error deleting order:", error);
            }
        },
    },
    getters: {
        getLessons: (state) => {
            return state.lessons;
        },
        getCart: (state) => {
            return state.cart;
        },
        getOrders: (state) => {
            return state.orders;
        },
    },
});

export default store;
