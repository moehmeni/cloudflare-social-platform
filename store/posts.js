
// const rootUrl = "http://127.0.0.1:8787/api/"
const rootUrl = "https://posts.moehmeni.workers.dev/api/"

export const state = () => ({
    posts: [],
    newPost: {}
})

export const getters = {
    posts(state) {
        return state.posts
    },
    newPost(state) {
        return state.newPost
    }
}

export const mutations = {
    setAllPosts(state, posts) {
        state.posts = posts
    },
    setNewPost(state, post) {
        state.newPost = post
    }
}

export const actions = {
    async getAllPosts({ commit }) {
        let url = rootUrl + "posts"
        const response = await this.$axios.get(url)
        commit("setAllPosts", response.data)
    },
    async createNewPost({ commit }, data) {
        let url = rootUrl + "posts/"
        try {
            const response = await this.$axios.post(url, data, { headers: { "Content-Type": "application/json" } })
            commit("setNewPost", response.data)
        }
        catch (e) {
            return e
        }
    }
}