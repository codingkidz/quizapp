import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../../ducks/store";
import { TokenService } from "../../services";
import {
  Unit,
  Topic,
  MultipleChoiceQuestion,
  Language,
} from "../../utils/models";

interface StateType {
  languages: Language[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StateType = {
  languages: null,
  status: "idle",
  error: null,
};

const getLanguages = createAsyncThunk<
  Language[],
  {},
  {
    state: RootState;
  }
>("languages/getLanguages", async (_foo, { getState, rejectWithValue }) => {
  const { accessToken } = getState().auth;
  const userId = accessToken
    ? TokenService.readToken(accessToken).id
    : undefined;

  if (!userId) {
    return rejectWithValue("Undefined user id");
  }

  return await axios
    .get("http://localhost:8000/api/language", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(
      async (response) => {
        const languages: Language[] = response.data.languages;

        return languages;
      },
      (error: AxiosError) => {
        return rejectWithValue(error);
      }
    );
});

const createMultipleChoiceQuestion = createAsyncThunk<
  Topic,
  {
    languageId: Language["id"];
    unitId: Unit["id"];
    topicId: Topic["id"];
    question: Pick<
      MultipleChoiceQuestion,
      | "question"
      | "correctAnswer"
      | "wrongAnswer0"
      | "wrongAnswer1"
      | "wrongAnswer2"
    >;
  },
  {
    state: RootState;
  }
>(
  "units/createMultipleChoiceQuestion",
  async (
    { languageId, unitId, topicId, question },
    { getState, rejectWithValue }
  ) => {
    const { accessToken } = getState().auth;
    const userId = accessToken
      ? TokenService.readToken(accessToken).id
      : undefined;

    if (!userId) {
      return rejectWithValue("Undefined user id");
    }

    return await axios
      .post(
        `http://localhost:8000/api/language/${languageId}/unit/${unitId}/topic/${topicId}/question/multiplechoice`,
        {
          question: question.question,
          correctAnswer: question.correctAnswer,
          wrongAnswer0: question.wrongAnswer0,
          wrongAnswer1: question.wrongAnswer1,
          wrongAnswer2: question.wrongAnswer2,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(
        async (response) => {
          const updatedTopic = response.data.updatedTopic;

          return updatedTopic;
        },
        (error: AxiosError) => {
          return rejectWithValue(error);
        }
      );
  }
);

const languagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLanguages.pending, (state, _action) => {
      state.error = null;
      state.status = "loading";
    });

    builder.addCase(getLanguages.fulfilled, (state, action) => {
      state.languages = action.payload;
      state.error = null;
      state.status = "succeeded";
    });

    builder.addCase(getLanguages.rejected, (state, action) => {
      state.languages = null;
      state.error = action.error.message ?? "Unknown login error";
      state.status = "failed";
    });

    builder.addCase(createMultipleChoiceQuestion.pending, (state, _action) => {
      state.error = null;
      state.status = "loading";
    });

    builder.addCase(createMultipleChoiceQuestion.fulfilled, (state, action) => {
      state.error = null;
      // trigger refresh of questions
      state.status = "idle";
    });
  },
});

export default languagesSlice.reducer;
export { getLanguages, createMultipleChoiceQuestion };
