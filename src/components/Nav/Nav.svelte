<script>
    import MobileNav from "./MobileNav.svelte";
    import DesktopNav from "./DesktopNav.svelte";
</script>

<DesktopNav/>

<MobileNav/>


<style>
    :global(#nav--d) {
        display: none;
    }

    @media (min-width: 992px) {
        :global(#nav--d) {
            display: block;
        }

        :global(#nav--m) {
            display: none;
        }
    }
</style>
