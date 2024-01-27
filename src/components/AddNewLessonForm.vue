<template>
    <header class="py-3">
        <div class="row">
            <div class="col-md-12">
                <h2 class="text-start header">
                    <strong>Added New Lesson</strong>
                </h2>
            </div>
        </div>
    </header>

    <main>
        <div class="card-body p-3">
            <!-- Display alert when showMessage is true -->
            <div v-if="showMessage" class="alert alert-info" role="alert">
                Lesson created successfully!
                <a href="#" class="alert-link">Click here</a>
                for more details.
            </div>

            <form class="row g-3" @submit.prevent="submitForm">
                <div class="col-12">
                    <label for="topic" class="form-label">Topic</label>
                    <input
                        v-model="formData.topic"
                        type="text"
                        class="form-control"
                        id="topic"
                        placeholder="Topic name"
                    />
                </div>
                <div class="col-12">
                    <label for="description" class="form-label">
                        Description
                    </label>
                    <textarea
                        v-model="formData.description"
                        class="form-control"
                        id="description"
                        rows="3"
                        placeholder="Write a short note about the topic"
                    ></textarea>
                </div>
                <div class="col-md-6">
                    <label for="price" class="form-label">Price</label>
                    <input
                        v-model="formData.price"
                        type="number"
                        class="form-control"
                        id="price"
                    />
                </div>
                <div class="col-md-4">
                    <label for="location" class="form-label">Location</label>
                    <input
                        v-model="formData.location"
                        type="text"
                        class="form-control"
                        id="location"
                    />
                </div>
                <div class="col-md-2">
                    <label for="space" class="form-label">Space</label>
                    <input
                        v-model="formData.space"
                        type="Number"
                        class="form-control"
                        id="space"
                    />
                </div>

                <div class="col-12">
                    <button type="submit" class="btn btn-primary px-5">
                        Submit
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
            showMessage: false, // Initially, do not show the message
            formData: {
                topic: "",
                description: "",
                price: "",
                location: "",
                space: "",
            },
        };
    },
    methods: {
        async submitForm() {
            // Capture form values
            const topic = document.getElementById("topic").value;
            const description = document.getElementById("description").value;
            const price = document.getElementById("price").value;
            const location = document.getElementById("location").value;
            const space = document.getElementById("space").value;

            // Create JSON object
            const formData = {
                topic,
                description,
                price: parseFloat(price),
                location,
                space: parseInt(space),
            };

            try {
                // Make POST request to the server
                const response = await fetch(
                    "http://webserver-env.eba-jrmuymp5.eu-west-2.elasticbeanstalk.com/lesson/create-new-lesson/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    }
                );

                if (response.ok) {
                    this.showMessage = true; // Set showMessage to true if the request is successful
                    this.resetForm(); // Reset form data
                    setTimeout(() => {
                        this.showMessage = false; // Hide message after 3 seconds
                    }, 3000);
                } else {
                    console.error(
                        "Failed to create lesson. Server returned:",
                        response.status,
                        response.statusText
                    );
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        },
        resetForm() {
            // Reset form data
            this.formData.topic = "";
            this.formData.description = "";
            this.formData.price = "";
            this.formData.location = "";
            this.formData.space = "";
        },
    },
};
</script>
