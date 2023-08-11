import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState = {
  posts: [],
  isLoading: false,
  error: null,
}


export const getPost = createAsyncThunk(
  'posts/getPostPost',
  async () => {
    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/posts`);
      const response = await data.json();
      const posts = response
      console.log(posts);
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
)

export const getPostByTitle = createAsyncThunk(
  'post/getPostByTitle',
  async (postTitle) => {
    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/posts/create/title?postTitle=${postTitle}`)
      const response = await data.json();
      const posts = response;
      return posts;

    } catch (error) {
      console.log(error)
    }
  }
)

export const createPost = createAsyncThunk(
  'post/createPost',
  async ({ payload }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"))
      console.log(token);
      const data = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/posts`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
        }
      );
      return data.json();
    } catch (error) {
      if (error)
        throw new Error("Impossibile creare il post");
    }
  }
)


const postSlice = createSlice({
  name: 'postState',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.posts
      })
      .addCase(getPost.rejected, (state) => {
        state.isLoading = false;
        state.error = "Errore nella ricerca"
      })
      .addCase(getPostByTitle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostByTitle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload; // Aggiorna lo stato dei post con i post ottenuti dalla ricerca
      })
      .addCase(getPostByTitle.rejected, (state) => {
        state.isLoading = false;
        state.error = "Errore nella ricerca";
      });
  }
});

export const allPosts = (state) => state.postState.posts;
export const isPostLoading = (state) => state.postState.isLoading;
export const postError = (state) => state.postState.error;

export default postSlice.reducer;