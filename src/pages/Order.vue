<template>
    <div>
        <h2>Orders</h2>
        <div>
            <div
                v-for="order in orders"
                :key="order._id"
                class="border p-3 my-3"
            >
                <div
                    class="card-header card-body d-flex justify-content-between"
                >
                    <div>
                        <strong>Name:</strong>
                        {{ order.name }}
                        <br />
                        <strong>Phone Number:</strong>
                        {{ order.phoneNumber }}
                        <br />
                        <strong>Number Of Spaces:</strong>
                        {{ order.numberOfSpaces }}
                        <br />
                        <strong>Lesson:</strong>
                    </div>

                    <div
                        class="d-flex justify-content-between align-item-center gap-3"
                    >
                        <button
                            @click="updateOrder(order)"
                            type="button"
                            class="btn btn-primary"
                            style="height: fit-content"
                            data-bs-toggle="modal"
                            :data-bs-target="'#updateOrderModal' + order._id"
                        >
                            Update order
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-exposure"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M8.5 4a.5.5 0 0 0-1 0v2h-2a.5.5 0 0 0 0 1h2v2a.5.5 0 0 0 1 0V7h2a.5.5 0 0 0 0-1h-2zm-3 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"
                                />
                                <path
                                    d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8"
                                />
                            </svg>
                        </button>
                        <button
                            @click="deleteOrder(order._id)"
                            id="delete-button"
                            type="button"
                            class="btn btn-danger"
                            style="height: fit-content"
                        >
                            Delete Order
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-trash"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                />
                                <path
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div
                    class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-2"
                >
                    <div
                        v-for="lesson in order.lessonIds"
                        :key="lesson._id"
                        class="col"
                    >
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title">
                                    <strong>{{ lesson.topic }}</strong>
                                </h5>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <h5 class="card-title">
                                        Price: {{ lesson.price }}
                                    </h5>
                                    <p class="card-text">
                                        Space: {{ lesson.space }}
                                    </p>
                                </div>
                                <p class="card-text">
                                    With supporting text below as a natural
                                    lead-in to additional content.
                                </p>
                                <p class="card-text">
                                    Location: {{ lesson.location }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Update Order Modal -->
                <div
                    class="modal fade"
                    :id="'updateOrderModal' + order._id"
                    tabindex="-1"
                    aria-labelledby="updateOrderModalLabel"
                    aria-hidden="true"
                >
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5
                                    class="modal-title"
                                    id="updateOrderModalLabel"
                                >
                                    Update Order
                                </h5>
                                <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div class="modal-body">
                                <!-- Your update form or components go here -->
                                <form
                                    @submit.prevent="
                                        updateOrderDetails(order._id)
                                    "
                                >
                                    <div class="mb-3">
                                        <label
                                            for="updateName"
                                            class="form-label"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="updateName"
                                            v-model="updatedOrder.name"
                                        />
                                    </div>
                                    <div class="mb-3">
                                        <label
                                            for="updatePhoneNumber"
                                            class="form-label"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="updatePhoneNumber"
                                            v-model="updatedOrder.phoneNumber"
                                        />
                                    </div>
                                    <div class="mb-3">
                                        <label
                                            for="updateNumberOfSpaces"
                                            class="form-label"
                                        >
                                            Number Of Spaces
                                        </label>
                                        <input
                                            type="number"
                                            class="form-control"
                                            id="updateNumberOfSpaces"
                                            v-model="
                                                updatedOrder.numberOfSpaces
                                            "
                                        />
                                    </div>
                                    <!-- Add other fields as needed -->
                                    <div class="mb-3">
                                        <div
                                            v-for="lesson in lessonId"
                                            :key="lesson._id"
                                            class="col"
                                        >
                                            <div class="card mb-3">
                                                <div class="card-header">
                                                    <h5 class="card-title">
                                                        <strong>
                                                            {{ lesson.topic }}
                                                        </strong>
                                                    </h5>
                                                </div>
                                                <div class="card-body">
                                                    <div
                                                        class="d-flex justify-content-between"
                                                    >
                                                        <h5 class="card-title">
                                                            Price:
                                                            {{ lesson.price }}
                                                        </h5>
                                                        <p class="card-text">
                                                            Space:
                                                            {{ lesson.space }}
                                                        </p>
                                                    </div>
                                                    <p class="card-text">
                                                        With supporting text
                                                        below as a natural
                                                        lead-in to additional
                                                        content.
                                                    </p>

                                                    <div
                                                        class="d-flex justify-content-between"
                                                    >
                                                        <p class="card-text">
                                                            Location:
                                                            {{
                                                                lesson.location
                                                            }}
                                                        </p>
                                                        <button
                                                            @click="
                                                                removeFromOrder(
                                                                    lesson._id
                                                                )
                                                            "
                                                            id="delete-button"
                                                            type="button"
                                                            class="btn btn-danger"
                                                        >
                                                            Remove
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                fill="currentColor"
                                                                class="bi bi-trash"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path
                                                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                                                />
                                                                <path
                                                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal-footer">
                                        <button
                                            type="button"
                                            class="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="submit"
                                            class="btn btn-primary"
                                        >
                                            Save changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            updatedOrder: {
                name: "",
                phoneNumber: "",
                numberOfSpaces: 0,
                lessonIds: [],
            },
            lessonId: [],
        };
    },
    computed: {
        orders() {
            return this.$store.getters.getOrders;
        },
        lessons() {
            return this.$store.getters.getLessons;
        },
    },
    methods: {
        deleteOrder(orderId) {
            this.$store.dispatch("deleteOrder", orderId);
        },
        updateOrder(order) {
            this.lessonId = order.lessonIds;
            this.updatedOrder = {
                name: order.name,
                phoneNumber: order.phoneNumber,
                numberOfSpaces: order.numberOfSpaces,
            };
        },

        removeFromOrder(lessonId) {
            // Remove the lessonId from updatedOrder.lessonIds
            this.lessonId = this.lessonId.filter(
                (lesson) => lesson._id !== lessonId
            );
        },
        async updateOrderDetails(orderId) {
            this.updateOrder = {
                ...this.updatedOrder,
                lessonIds: this.lessonId.map((lesson) => lesson._id),
            };
            try {
                const response = await fetch(
                    `http://webserver-env.eba-jrmuymp5.eu-west-2.elasticbeanstalk.com/order/update/${orderId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(this.updateOrder),
                    }
                );

                if (response.ok) {
                    this.$store.dispatch("fetchOrders");
                    alert("Order updated successfully!");
                } else {
                    console.error(
                        "Failed to update order. Server returned:",
                        response.status,
                        response.statusText
                    );
                    alert("Failed to update order. Please try again.");
                }
            } catch (error) {
                console.error("Error updating order:", error);
                alert("Error updating order. Please try again.");
            }
        },
    },
    mounted() {
        // Fetch orders when the component is mounted
        this.$store.dispatch("fetchOrders");
    },
};
</script>
