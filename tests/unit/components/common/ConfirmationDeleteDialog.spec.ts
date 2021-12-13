import { mount, VueWrapper } from "@vue/test-utils"
import ConfirmationDeleteDialog from "@/components/common/ConfirmationDeleteDialog.vue"
import { Components, Plugins } from "../../primevue.stubs"

function bootstrapWrapper() {
    return mount(ConfirmationDeleteDialog, {
        global: {
            plugins: [...Plugins],
            components: { ...Components }
        }
    })
}

describe("components/ConfirmationDeleteDialog.vue", () => {
    let wrapper: VueWrapper<ConfirmationDeleteDialog>

    beforeEach(() => {
        wrapper = bootstrapWrapper()
    })

    it("renders", () => {
        expect(wrapper.exists()).toBe(true)
    })
})
