<template>
    <div class="">
        <nav class="navbar navbar-expand-lg bg-dark-subtle">
            <div class="container">
                <router-link to="/" class="navbar-brand h1">
                    VueExpress
                </router-link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link to="/lesson" class="nav-link">
                                Lesson Information
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/order" class="nav-link">
                                Order
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link
                                to="/create-new-lesson"
                                class="nav-link"
                            >
                                Create New Lesson
                            </router-link>
                        </li>
                    </ul>
                    <form
                        class="d-flex"
                        role="search"
                        @submit.prevent="performSearch"
                    >
                        <div class="input-group">
                            <input
                                type="text"
                                v-model="searchQuery"
                                class="form-control outline-0 ring-0"
                                placeholder="Search"
                                aria-label="Recipient's username"
                                aria-describedby="searchButton"
                            />
                            <button
                                type="submit"
                                class="input-group-text"
                                id="searchButton"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-search"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
                <router-link
                    to="/cart"
                    class="input-group-text ms-2"
                    style="padding: 10px; position: relative"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-cart"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
                        />
                    </svg>

                    <span
                        class="rounded-pill text-bg-danger"
                        style="
                            position: absolute;
                            top: -10px;
                            right: -10px;
                            width: 15px;
                            height: 15px;
                            font-size: 10px;
                        "
                    >
                        {{ cart.length }}
                    </span>
                </router-link>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: "", // Initialize with an empty search query
        };
    },

    computed: {
        cart() {
            return this.$store.getters.getCart;
        },
    },
    methods: {
        async performSearch () {
        
                const searchQuery = this.searchQuery;

       this.$store.dispatch("fetchLessonsBasedOnQuery", searchQuery);
            this.$router.push({
                name: "search",
                query: { search: this.searchQuery },
            });

            
        },
    },
};
</script>
