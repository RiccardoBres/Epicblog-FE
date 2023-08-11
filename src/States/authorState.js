import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';




const initialState = {
    author: null,
    isLoading: false,
    error: null
  }

  export const createAuthor = createAsyncThunk(
    "Author/createAuthor",
    async (author) => {
      console.log(author)
      const form = new FormData()
  
      form.append("nome", author.nome);
      form.append("cognome", author.cognome);
      form.append("password", author.password);
      form.append("email", author.email);
      form.append("data", author.data);
      form.append("avatar", author.avatar);
  
      console.log(...form);
      try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/authors/create`, form, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        console.log(res)
        return res.data;
  
      } catch (error) {
        console.log(error)
      }
    }
  );
  

const Authorslice = createSlice({
    name: 'AuthorState',
    initialState,
    extraReducers: (builder)=>{
        builder
        .addCase(createAuthor.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createAuthor.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.author = action.payload
        })
        .addCase(createAuthor.rejected, state=>{
            state.isLoading = false;
            state.error = "Errore nella ricerca"
        })
    } 
});

export const allAuthor = (state) => state.authorState.author;
export const isAuthorLoading = (state) => state.authorState.isLoading;
export const authorError = (state) => state.authorState.error;

export default Authorslice.reducer;