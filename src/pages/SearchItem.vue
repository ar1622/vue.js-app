<template>
    <header class="py-3">
        <div class="row">
            <div class="col-md-12">
                <h2 v-if="lessons.length === 0" class="text-start header">
                    <strong>
                        Search Result for: {{ $route.query.search }}
                    </strong>
                </h2>
            </div>
        </div>
    </header>
    <main>
        <section>
            <div v-if="lessons.length === 0" class="text-center mt-4">
                <p class="fs-4">Search result not found.</p>
            </div>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-2">
                <div v-for="lesson in lessons" :key="lesson._id" class="col">
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
                                {{ lesson.description }}
                            </p>
                            <p class="card-text">
                                Location: {{ lesson.location }}
                            </p>

                            <div class="d-flex justify-content-between">
                                <button
                                    @click="addToCart(lesson._id)"
                                    type="button"
                                    class="btn btn-primary"
                                >
                                    Add to cart
                                </button>
                                <div>
                                    <button
                                        type="button"
                                        class="btn btn-danger"
                                        data-bs-toggle="modal"
                                        :data-bs-target="
                                            '#staticBackdrop-' + lesson._id
                                        "
                                        @click="openUpdateModal(lesson)"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-pencil-square"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        @click="deleteLesson(lesson._id)"
                                        id="delete-button"
                                        type="button"
                                        class="btn btn-danger ms-2"
                                    >
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

                        <!-- update lesson Modal -->

                        <div
                            class="modal fade"
                            :id="'staticBackdrop-' + lesson._id"
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                            tabindex="-1"
                            aria-labelledby="staticBackdropLabel"
                            aria-hidden="true"
                        >
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1
                                            class="modal-title fs-5"
                                            id="staticBackdropLabel"
                                        >
                                            Update {{ lesson.topic }}
                                        </h1>
                                        <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div class="modal-body">
                                        <form
                                            @submit.prevent="
                                                updateLessonDetails(lesson._id)
                                            "
                                            class="row g-3"
                                        >
                                            <div class="col-12">
                                                <label
                                                    for="topic"
                                                    class="form-label"
                                                >
                                                    Topic
                                                </label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="topic"
                                                    v-model="
                                                        updatedLesson.topic
                                                    "
                                                    placeholder="Topic name"
                                                />
                                            </div>
                                            <div class="col-12">
                                                <label
                                                    for="description"
                                                    class="form-label"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    class="form-control"
                                                    id="description"
                                                    rows="3"
                                                    v-model="
                                                        updatedLesson.description
                                                    "
                                                    placeholder="Write a short note about the topic"
                                                ></textarea>
                                            </div>
                                            <div class="col-md-6">
                                                <label
                                                    for="price"
                                                    class="form-label"
                                                >
                                                    Price
                                                </label>
                                                <input
                                                    type="number"
                                                    class="form-control"
                                                    v-model="
                                                        updatedLesson.price
                                                    "
                                                    id="price"
                                                />
                                            </div>
                                            <div class="col-md-4">
                                                <label
                                                    for="location"
                                                    class="form-label"
                                                >
                                                    Location
                                                </label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    v-model="
                                                        updatedLesson.location
                                                    "
                                                    id="location"
                                                />
                                            </div>
                                            <div class="col-md-2">
                                                <label
                                                    for="space"
                                                    class="form-label"
                                                >
                                                    Space
                                                </label>
                                                <input
                                                    type="Number"
                                                    class="form-control"
                                                    v-model="
                                                        updatedLesson.space
                                                    "
                                                    id="space"
                                                />
                                            </div>

                                            <div class="col-12 text-end">
                                                <button
                                                    type="button"
                                                    class="btn btn-secondary"
                                                    data-bs-dismiss="modal"
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    type="submit"
                                                    class="btn btn-primary ms-4 px-5"
                                                    data-bs-dismiss="modal"
                                                >
                                                    Update
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
        </section>
    </main>
</template>

<script>
export default {
    data() {
        return {
            updatedLesson: {
                topic: "",
                description: "",
                price: "",
                location: "",
                space: "",
            },
        };
    },
    computed: {
        lessons() {
            return this.$store.getters.getLessons;
        },
    },
    mounted() {
        // Retrieve the query parameter from the route
        const searchQuery = this.$route.query.search;

        // Perform a search and fetch lesson data based on the query
        this.$store.dispatch("fetchLessonsBasedOnQuery", searchQuery);
    },
    methods: {
        async deleteLesson(lessonId) {
            this.$store.dispatch("deleteLesson", lessonId);
        },

        addToCart(lessonId) {
            // Check if the lesson is already in the cart
            if (this.$store.getters.getCart.includes(lessonId)) {
                alert("This lesson is already in your cart!");
            } else {
                this.$store.dispatch("addToCart", lessonId);
            }
        },
        openUpdateModal(lesson) {
            this.updatedLesson = {
                topic: lesson.topic,
                description: lesson.description,
                price: lesson.price,
                location: lesson.location,
                space: lesson.space,
            };
        },
        async updateLessonDetails(lessonId) {
            try {
                const response = await fetch(
                    `http://webserver-env.eba-jrmuymp5.eu-west-2.elasticbeanstalk.com/lesson/update/${lessonId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(this.updatedLesson),
                    }
                );
                if (response.ok) {
                    // Optionally, fetch updated lessons from the server
                    this.$store.dispatch("fetchLessons");
                    alert("Lesson updated successfully!");
                } else {
                    alert(
                        "Failed to update lesson. Server returned:",
                        response.status,
                        response.statusText
                    );
                    alert("Failed to update lesson. Please try again.");
                }
            } catch (error) {
                alert("Error updating lesson:", error);
                alert("Error updating lesson. Please try again.");
            }
        },
    },
};
</script>
