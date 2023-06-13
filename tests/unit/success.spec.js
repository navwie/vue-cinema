import { shallowMount } from "@vue/test-utils";
import SuccessComponent from "@/pages/SuccessComponent.vue";

describe("SuccessComponent", () => {
  it("renders h1 with correct text", () => {
    const wrapper = shallowMount(SuccessComponent);
    const h1 = wrapper.find("h1");
    expect(h1.text()).toBe("Payment is Successful");
  });
});
