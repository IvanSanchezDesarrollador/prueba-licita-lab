import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserTokenInterface {
  id: string | null;
  email: string | null;
  name: string | null;
  role: string | null;
  exp: number | null;
  iat: number | null;
}


const initialState: UserTokenInterface = {
  id: null,
  email: null,
  name: null,
  role: null,
  exp: null,
  iat: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserTokenInterface>) => {
      return action.payload; 
    },

    clearUser: () => initialState,
  },
});

// 4️⃣ Exportamos las acciones y el reducer
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
