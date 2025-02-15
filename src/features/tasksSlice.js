import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, updateDoc, doc, query, where } from "firebase/firestore";
import { db, auth } from "../services/firebase";


export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const user = auth.currentUser;
  if (!user) return []; // If no user, return empty array

  const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const docRef = await addDoc(collection(db, "tasks"), task);
  return { id: docRef.id, ...task };
});

export const updateTaskStatus = createAsyncThunk("tasks/updateTask", async ({ id, status }) => {
  await updateDoc(doc(db, "tasks", id), { status });
  return { id, status };
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const task = state.tasks.find((task) => task.id === action.payload.id);
        if (task) task.status = action.payload.status;
      });
  },
});

export default tasksSlice.reducer;
