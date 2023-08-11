import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState = {
    comment: [],
    isLoading: false,
    error: null
}

export const getComment = createAsyncThunk(
    'comment/getComment',
    async (postId) => {
        try {
            const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/posts/${postId}/comment`);
            const response = await data.json();
            const comment = response
            return comment;

        } catch (error) {
            console.log(error);
        }
    }
)


export const postComment = createAsyncThunk(
    "comments/postComment",
    async ({ postId, payload }) => {
        try {
            const token = JSON.parse(localStorage.getItem("userLoggedIn")) 
            const data = await fetch(
                `${process.env.REACT_APP_SERVER_BASE_URL}/posts/${postId}/comment`,

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
                throw new Error("Impossibile continuare con la richiesta dei commenti");
        }
    }
);


const commentSlice = createSlice({
    name: 'commentState',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comment = action.payload;
            })
            .addCase(getComment.rejected, state => {
                state.isLoading = false;
                state.error = "Errore nella ricerca"
            })
    }
});

export const allComment = (state) => state.commentState.comment;
export const isPostLoading = (state) => state.commentState.isLoading;
export const commentError = (state) => state.commentState.error;

export default commentSlice.reducer;