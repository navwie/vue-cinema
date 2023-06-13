import { shallowMount } from "@vue/test-utils";
import AddNewProductToCafe from "@/pages/Admin/AddNewProductToCafe.vue";
import MyButton from "@/components/UI/MyButton.vue";
import { createProduct, createProductCafes } from "@/api/api_request";
import { createStore } from "vuex";
import mainStore from "@/store/main";

jest.mock("@/api/api_request", () => ({
  createProduct: jest.fn(() =>
    Promise.resolve({
      data: {
        product: {
          id: 1,
        },
      },
    })
  ),
  createProductCafes: jest.fn(() => Promise.resolve()),
}));

const mockRouter = {
  push: jest.fn(),
};

const mockSwal = jest.fn();

const store = createStore({
  state: {
    darkTheme: true,
    auth: {
      cafeid: 3,
    },
  },
  getters: {
    getDarkTheme: (state) => state.darkTheme,
    getCafeId: (state) => state.auth.cafeid,
  },
});

const $t = (key) => key;

describe("AddNewProductToCafe", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AddNewProductToCafe, {
      global: {
        plugins: [store],
        mocks: {
          $t,
          $router: mockRouter,
          $swal: mockSwal,
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  it("submits form and redirects on success", async () => {
    // Set form values
    wrapper.setData({
      form: {
        name: "Test Product",
        price: "10",
        type: "drink",
        amount: "5",
      },
    });

    // Find and trigger the submit button click event
    const submitButton = wrapper.findComponent(MyButton);
    await submitButton.trigger("click");

    // Assertions
    expect(createProduct).toHaveBeenCalledWith({
      name: "Test Product",
      price: "10",
      type: "drink",
    });

    mainStore.commit("auth/setCafeId", 3); // Установите значение cafeid

    expect(createProductCafes).toHaveBeenCalledWith({
      cafe_id: mainStore.getters.getCafeId,
      product_id: 1,
      amount: "5",
    });

    expect(mockSwal).toHaveBeenCalledWith({
      icon: "success",
      color: "#000",
      timer: 4000,
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });

    expect(mockRouter.push).toHaveBeenCalledWith("/adminMain");
  });
});
