<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="py-0">
                    <!-- Left sidebar -->
                    <div class="page-aside-left p-0 z-100">
                        <div class="email-menu-list mt-3 mb-3">
                            <slot name="create"/>
                        </div>
                        <div :class="[ 'email-menu-list' ,  $route.params.id === 'open' ? 'disabled' : '']">
                            <slot name="links"/>
                        </div>
                    </div>
                    <div class="page-aside-right mh-80vh px-3">
                        <div class="d-flex">
                            <div class="flex-fill">
                                <keep-alive>
                                    <transition name="slide-in-left">
                                        <router-view/>
                                    </transition>
                                </keep-alive>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "page-open",
    }
</script>

