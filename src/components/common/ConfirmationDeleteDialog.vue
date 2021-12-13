<template>
    <div class="d-flex">
        <i class="pi pi-exclamation-triangle p-mr-2" style="font-size: 2rem" />
        <p class="p-mt-1">Are you sure you want to delete?</p>
    </div>
    <div class="float-end p-mt-2">
        <Button
            label="No"
            icon="pi pi-times"
            @click="$emit('onCancel')"
            class="p-button-text"
        />
        <Button
            data-cy="btnYes"
            label="Yes"
            icon="pi pi-check"
            @click="$emit('onConfirm')"
            class="p-button-text"
            autofocus
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "ConfirmationDeleteDialog",
    emits: ["onCancel", "onConfirm"]
})
</script>
