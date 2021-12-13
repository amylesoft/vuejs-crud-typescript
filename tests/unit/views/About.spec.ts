import { mount, VueWrapper } from "@vue/test-utils"
import About from "@/views/About.vue"

describe("components/About.vue", () => {
    let wrapper: VueWrapper<About>

    beforeEach(() => {
        wrapper = mount(About)
    })

    it("renders", () => {
        expect(wrapper.exists()).toBe(true)
    })

    it("should display text 'This is an about page'", () => {
        expect(wrapper.html()).toContain("This is an about page")
    })
})
