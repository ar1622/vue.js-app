<template>
    <header class="py-3">
        <div class="row">
            <div class="col-md-12">
                <h2 class="text-start header">
                    <strong>Cart</strong>
                </h2>
            </div>
        </div>
    </header>

    <main>
        <div class="card-body p-3 border">
            <div>
                  <p class="text-start">
                    <strong>Lesson: </strong>
                </p>
                <div
                    class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
                >
                    <div v-for="lessonId in cart" :key="lessonId" class="col">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title">
                                    <strong>
                                        {{ getLessonById(lessonId).topic }}
                                    </strong>
                                </h5>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <h5 class="card-title">Price:</h5>
                                    <p class="card-text">
                                        Space:
                                        {{ getLessonById(lessonId).space }}
                                    </p>
                                </div>
                                <p class="card-text">
                                    With supporting text below as a natural
                                    lead-in to additional content.
                                </p>
                              <div class="d-flex justify-content-between">
                                  <p class="card-text">
                                    Location:
                                    {{ getLessonById(lessonId).location }}
                                </p>
                                <button
                                @click="removeFromCart(lessonId)"
                                id="delete-button"
                                type="button"
                                class="btn btn-danger"
                            > Remove
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
            </div>
            <form class="row g-3 mt-2" @submit.prevent="buyLesson">
                <div class="col-12">
                    <label for="name" class="form-label">Name</label>
                    <input
                        v-model="formData.name"
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="Full Name"
                    />
                </div>
                <div class="col-md-6">
                    <label for="number" class="form-label">Phone Number</label>
                    <input
                        v-model="formData.phoneNumber"
                        type="number"
                        class="form-control"
                        id="number"
                    />
                </div>
                <div class="col-md-6">
                    <label for="NumberOfSpace" class="form-label">
                        Number Of Spaces
                    </label>
                    <input
                        v-model="formData.numberOfSpaces"
                        type="number"
                        class="form-control"
                        id="NumberOfSpace"
                    />
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary px-5">
                        Buy
                    </button>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                name: "",
                phoneNumber: "",
                numberOfSpaces: 0,
            },
        };
    },
    computed: {
        cart() {
            return this.$store.getters.getCart;
        },
        lessons() {
            return this.$store.getters.getLessons;
        },
    },
    methods: {
        removeFromCart(lessonId) {
            this.$store.dispatch("removeFromCart", lessonId);
        },
        getLessonById(lessonId) {
            return this.lessons.find((lesson) => lesson._id === lessonId);
        },
        async buyLesson() {
            try {
                const lessonIds = this.cart;
                const formData = { ...this.formData, lessonIds };
                // Dispatch an action to store the cart data in the database
                
                await this.$store.dispatch("buyLesson", formData);
                // Clear the form and cart after successful submission
                this.formData = {
                    name: "",
                    phoneNumber: "",
                    numberOfSpaces: 0,
                };
                this.$store.dispatch("clearCart");
                alert("Lesson bought successfully!");
            } catch (error) {
                console.error("Error buying lesson:", error);
            }
        },
    },
};
</script>
