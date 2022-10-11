<script>
    export default {
        name: "default-select",
        props  : ['data' , 'name'],
    }
</script>
<template>
    <div class="d-flex align-items-center">
        <div class="mr-1 text-primary">
            <strong class="pe-3">#{{ data.row.id }}</strong>
        </div>
        <div class="my-0 ml-1">
            <div v-if="name !== ''" class="font-weight-bold">{{ data.row.select_name}}</div>
            <div v-else class="font-weight-bold pe-2">{{ data.row[name]}}</div>
            <div class="text-muted font-12 pe-3"><small>created : {{ data.row.created_at }}</small></div>
        </div>
    </div>

</template>
