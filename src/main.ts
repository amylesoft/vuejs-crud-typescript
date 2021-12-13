import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

const app = createApp(App)

import PrimeVue from "primevue/config"
app.use(PrimeVue)

import "primevue/resources/themes/saga-blue/theme.css" //theme
import "primevue/resources/primevue.min.css" //core css
import "primeicons/primeicons.css" //icons

import DataTable from "primevue/datatable"
app.component("DataTable", DataTable)
import Column from "primevue/column"
app.component("Column", Column)
import InputText from "primevue/inputtext"
app.component("InputText", InputText)
import Button from "primevue/button"
app.component("Button", Button)
import Dialog from "primevue/dialog"
app.component("Dialog", Dialog)
import ConfirmationDeleteDialog from "@/components/common/ConfirmationDeleteDialog.vue"
app.component("ConfirmationDeleteDialog", ConfirmationDeleteDialog)

import "primeflex/primeflex.css"

app.use(store)
app.use(router)
app.mount("#app")
