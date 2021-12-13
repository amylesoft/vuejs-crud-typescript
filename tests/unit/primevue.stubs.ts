import PrimeVue from "primevue/config"

export const Plugins = [PrimeVue]

import DataTable from "primevue/datatable"
import Column from "primevue/column"
import InputText from "primevue/inputtext"
import Button from "primevue/button"
import Dialog from "primevue/dialog"
import ConfirmationDeleteDialog from "@/components/common/ConfirmationDeleteDialog.vue"

export const Components = {
    DataTable,
    Column,
    InputText,
    Button,
    Dialog,
    ConfirmationDeleteDialog
}
