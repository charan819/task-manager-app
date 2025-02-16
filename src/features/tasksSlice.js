import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, updateDoc, doc, query, where, deleteDoc } from "firebase/firestore";
import { db, auth } from "../services/firebase";

// ✅ Fetch Tasks from Firestore
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const user = auth.currentUser;
  if (!user) return [];
  const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    isSelected: false,
  }));
});

// ✅ Update Task Status
export const updateTaskStatus = createAsyncThunk("tasks/updateTaskStatus", async ({ id, status }) => {
  const taskRef = doc(db, "tasks", id);
  await updateDoc(taskRef, { status });
  return { id, status };
});

// ✅ Add New Task (without priority)
export const addTask = createAsyncThunk("tasks/addTask", async ({ name, dueDate }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");
  const newTask = {
    name,
    status: "To Do",
    userId: user.uid,
    dueDate: dueDate ? new Date(dueDate).toISOString() : null,
  };
  const docRef = await addDoc(collection(db, "tasks"), newTask);
  return { id: docRef.id, ...newTask };
});

// ✅ Edit Task (without priority)
export const editTask = createAsyncThunk("tasks/editTask", async ({ id, name, dueDate }) => {
  const taskRef = doc(db, "tasks", id);
  await updateDoc(taskRef, {
    name,
    dueDate: dueDate ? new Date(dueDate).toISOString() : null,
  });
  return { id, name, dueDate: dueDate ? new Date(dueDate).toISOString() : null };
});

// ✅ Delete Selected Tasks
export const deleteSelectedTasks = createAsyncThunk("tasks/deleteSelectedTasks", async (_, { getState }) => {
  const { tasks } = getState().tasks;
  const selectedTasks = tasks.filter((task) => task.isSelected);
  for (const task of selectedTasks) {
    await deleteDoc(doc(db, "tasks", task.id));
  }
  return selectedTasks.map((task) => task.id);
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], loading: false, sortBy: "dueDate", sortOrder: "asc" },
  reducers: {
    toggleTaskSelection: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.isSelected = !task.isSelected;
    },

    // ✅ Sorting Logic (only name & dueDate)
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = { ...state.tasks[index], ...action.payload };
        }
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const task = state.tasks.find((task) => task.id === action.payload.id);
        if (task) task.status = action.payload.status;
      })
      .addCase(deleteSelectedTasks.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => !action.payload.includes(task.id));
      });
  },
});

// ✅ Export all necessary actions
export const { toggleTaskSelection, setSortBy, toggleSortOrder } = tasksSlice.actions;
export default tasksSlice.reducer;
