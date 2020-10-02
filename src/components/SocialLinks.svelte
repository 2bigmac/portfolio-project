<script>
    import getData from '../firebase/firebaseData';
    import {fly} from "svelte/transition";

    let contact = getData('contact');
</script>

{#await contact}
    <div class="shine links-shine"></div>
{:then value}
    <div class="social-links">
        {#each value.links as link, index}
            <a aria-label="socialLink" in:fly={{ duration: 1000, delay: (index + 1) * 150, y: -50 }} href="{link.link}"
               class="social-link">{@html link.linkIcon}</a>
        {/each}
    </div>
{:catch error}
    <!-- promise was rejected -->
    <p>Something went wrong: {error.message}</p>
{/await}

<style>
    .social-link {
        display: inline-block;
        width: 20px;
        height: 18px;
        margin-right: calc(var(--app-indent) * 1px);
    }
</style>
