<template>
    <h1>User list</h1>
    <Button
        type="button"
        class="float-end"
        icon="pi pi-plus"
        label="Add"
        @click="
            () => {
                updateUserDialogStatus({
                    isUserManageDialogOpen: true,
                    isManageForAdd: true
                })
            }
        "
    />
    <br />
    <UserList class="p-mt-6" />
    <Dialog
        :header="isManageForAdd ? 'User create' : 'User update'"
        :visible="isUserManageDialogOpen"
        :closable="false"
    >
        <UserManageDialog />
    </Dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import UserList from "@/components/UserList.vue"
import UserManageDialog from "@/components/UserManageDialog.vue"
import { mapActions, mapState } from "vuex"
import { ActionTypes } from "../store/modules/types"
import { ModuleTypes } from "../store/types"

export default defineComponent({
    name: "Home",
    components: {
        UserList,
        UserManageDialog
    },
    mounted() {
        this.getAllUser()
    },
    computed: mapState(ModuleTypes.USER, [
        "isUserManageDialogOpen",
        "isManageForAdd"
    ]),
    methods: mapActions(ModuleTypes.USER, [
        ActionTypes.getAllUser,
        ActionTypes.updateUserDialogStatus
    ])
})
</script>
