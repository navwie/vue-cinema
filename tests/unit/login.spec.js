import { shallowMount } from "@vue/test-utils";
import LoginPage from "@/pages/Auth/LoginPage.vue";
import { createStore } from "vuex";
import { createApp } from "vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";

const mockMutations = {
  "auth/setToken": jest.fn(),
  "auth/setUserId": jest.fn(),
  "auth/setRoles": jest.fn(),
  "auth/setAddressId": jest.fn(),
  "auth/setShopId": jest.fn(),
  "auth/setCafeId": jest.fn(),
};
const store = createStore({
  state: {
    darkTheme: true,
  },
  mutations: mockMutations,
  getters: {
    getDarkTheme: (state) => state.darkTheme,
  },
});
const $t = (key) => key;
const app = createApp({});

jest.mock("axios", () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe("LoginPage", () => {
  it("renders correctly", async () => {
    app.component("MyButton", MyButton);
    app.component("MyInput", MyInput);
    const swalMock = jest.fn();
    const dispatchMock = jest.fn(); // Mock store.dispatch

    store.dispatch = dispatchMock; // Assign the mock to store.dispatch

    const wrapper = shallowMount(LoginPage, {
      global: {
        plugins: [store],
        mocks: {
          $t,
          $swal: swalMock,
        },
      },
    });

    const expectedText = $t("auth.login");
    expect(wrapper.text()).toContain(expectedText);

    const inputs = wrapper.findAllComponents(MyInput);
    expect(inputs).toHaveLength(2);

    const emailInput = inputs[0];
    emailInput.setValue("test@example.com");
    expect(wrapper.vm.form.email).toBe("test@example.com");

    const passwordInput = inputs[1];
    passwordInput.setValue("password123");
    expect(wrapper.vm.form.password).toBe("password123");

    const errorElement = wrapper.find(".error");
    expect(errorElement.exists()).toBeFalsy();
  });
});
