import { shallowMount } from "@vue/test-utils";
import ErrorComponent from "@/pages/ErrorComponent.vue";

describe("ErrorComponent", () => {
  it("renders h1 with correct text", () => {
    const wrapper = shallowMount(ErrorComponent);
    const h1 = wrapper.find("h1");
    expect(h1.text()).toBe("Payment Failed");
  });
});
