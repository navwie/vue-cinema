import { shallowMount } from "@vue/test-utils";
import MovieTable from "@/components/MovieTable.vue";
import { createStore } from "vuex";

const store = createStore({
  state: {
    darkTheme: true, // Замените на ожидаемое значение darkTheme
  },
  getters: {
    getDarkTheme: (state) => state.darkTheme,
  },
});
const $t = (key) => key;
describe("MovieTable", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(MovieTable, {
      global: {
        plugins: [store],
        mocks: {
          $t, // Передаем заглушку $t в компонент
        },
      },
      props: {
        movies: [
          {
            id: 13,
            name: "One more time",
            description:
              "On her 40th birthday, Amelia makes a fateful wish to be 18 again back in 2002 but soon regrets it when she's stuck reliving the day over and over again.",
            release_year: "2023",
            date_start: "2023-05-16",
            date_finish: "2023-06-22",
            confines: "-",
            director: "Jonatan Etzler",
            image_path: "1xYNe949NLJ.webp",
            screenwriter: "Sofie Forsman Tove Forsman Mikael Ljung",
            actors: "Hedda Stiernstedt Miriam Ingrid Vanna Rosenberg",
            country: "USA",
            trailer: "https://www.youtube.com/watch?v=iH8XAOOwuiw",
            duration: 85,
            rating: 5.7,
            created_at: "2023-05-05T18:10:57.000000Z",
            updated_at: "2023-05-16T16:43:24.000000Z",
            quizled: 0,
            formats: [
              {
                created_at: "2023-05-05T00:31:30.000000Z",
                id: 1,
                name: "2D",
                pivot: {},
                updated_at: "2023-05-05T00:31:31.000000Z",
              },
            ],
            genres: [
              {
                created_at: "2023-05-05T00:27:29.000000Z",
                id: 1,
                name: "Комедія",
                pivot: {},
                updated_at: "2023-05-05T00:27:30.000000Z",
              },
            ],
          },
        ],
      },
    });
    const expectedText = "#"; // Ожидаемый текст
    expect(wrapper.text()).toMatch(expectedText);
  });
});
