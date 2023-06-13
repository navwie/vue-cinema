import { shallowMount } from "@vue/test-utils";
import { createApp } from "vue";
import Register from "@/pages/Auth/RegistrationPage.vue";
import { createStore } from "vuex";
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";

const store = createStore({
  state: {
    darkTheme: true,
  },
  getters: {
    getDarkTheme: (state) => state.darkTheme,
  },
});

const $t = (key) => key;
const app = createApp({});

describe("Register", () => {
  it("renders correctly", () => {
    app.component("MyButton", MyButton);
    app.component("MyInput", MyInput);
    const swalMock = jest.fn();

    const wrapper = shallowMount(Register, {
      global: {
        plugins: [store],
        mocks: {
          $t,
          $swal: swalMock, // Mock the $swal function
        },
      },
    });

    store.dispatch = jest.fn().mockResolvedValue();

    const expectedText = $t("auth.register");
    expect(wrapper.text()).toContain(expectedText);

    // Проверка полей формы
    const inputs = wrapper.findAllComponents(MyInput);
    expect(inputs).toHaveLength(6);

    const firstnameInput = inputs[0];
    firstnameInput.setValue("John");
    expect(wrapper.vm.firstname).toBe("John");

    const lastnameInput = inputs[1];
    lastnameInput.setValue("Doe");
    expect(wrapper.vm.lastname).toBe("Doe");

    const birthdayInput = inputs[2];
    birthdayInput.setValue("2020-01-01");
    expect(wrapper.vm.birthday).toBe("2020-01-01");

    const phoneInput = inputs[3];
    phoneInput.setValue("1234567890");
    expect(wrapper.vm.phone).toBe("1234567890");

    const emailInput = inputs[4];
    emailInput.setValue("test@example.com");
    expect(wrapper.vm.email).toBe("test@example.com");

    const passwordInput = inputs[5];
    passwordInput.setValue("password123");
    expect(wrapper.vm.password).toBe("password123");

    // Проверка ошибок
    const errorElement = wrapper.find(".error");
    expect(errorElement.exists()).toBeFalsy();

    firstnameInput.setValue("John");
    lastnameInput.setValue("Doe");
    emailInput.setValue("test@example.com");
    passwordInput.setValue("password123");
    wrapper.vm.submit();
    expect(store.dispatch).toHaveBeenCalledWith("auth/register", {
      firstname: "John",
      lastname: "Doe",
      birthday: "2020-01-01",
      phone: "1234567890",
      email: "test@example.com",
      password: "password123",
    });
  });
});
