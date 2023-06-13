import { shallowMount } from "@vue/test-utils";
import MovieTable from "@/components/MovieTable.vue";
import { createStore } from "vuex";

describe("MovieTable", () => {
  it("renders correctly", () => {
    const store = createStore({
      state: {
        darkTheme: true,
      },
      getters: {
        getDarkTheme: (state) => state.darkTheme,
      },
    });

    const movies = [
      {
        id: 1,
        name: "Movie 1",
        rating: 5,
        release_year: 2022,
        date_start: "2022-01-01",
        date_finish: "2022-02-01",
        duration: 120,
        confines: "PG-13",
        country: "USA",
        image_path: "movie1.jpg",
      },
      // Add more movie objects as needed
    ];

    const wrapper = shallowMount(MovieTable, {
      props: {
        movies: movies,
      },
      global: {
        plugins: [store],
        mocks: {
          $t: (key) => key, // Mock the translation function if needed
        },
      },
    });

    // Verify that the movie table has the correct number of rows
    const rows = wrapper.findAll("tbody tr");
    expect(rows.length).toBe(movies.length);

    // Verify that each row displays the correct movie information
    movies.forEach((movie, index) => {
      const row = rows[index];

      expect(row.find("td:nth-child(2)").text()).toBe(movie.name);
      expect(row.find("td:nth-child(3)").text()).toBe(String(movie.rating));
      expect(row.find("td:nth-child(4)").text()).toBe(
        String(movie.release_year)
      );
      expect(row.find("td:nth-child(5)").text()).toBe("01.01.2022"); // Assuming momentDate is working correctly
      expect(row.find("td:nth-child(6)").text()).toBe("01.02.2022"); // Assuming momentDate is working correctly
      expect(row.find("td:nth-child(7)").text()).toBe(`${movie.duration}м`);
      expect(row.find("td:nth-child(8)").text()).toBe(movie.confines || "-");
      expect(row.find("td:nth-child(9)").text()).toBe(movie.country);
      expect(row.find("button").text()).toBe("table.details"); // Assuming translation is working correctly
    });
  });
});
