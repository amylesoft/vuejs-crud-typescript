import Vuex from "vuex"
import { userStore } from "./modules/user"
import { ModuleTypes } from "./types"

export default new Vuex.Store({
    modules: {
        [ModuleTypes.USER]: userStore
    }
})
