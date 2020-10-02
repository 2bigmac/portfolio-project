<script>
    import SocialLinks from "./SocialLinks.svelte";

    import getData from '../firebase/firebaseData';
    import {fly} from "svelte/transition";

    let contact = getData('contact');
    let footer = getData('footer');


</script>

<footer>
    <div class="wrapper">
        <div class="footer-inner">
            {#await footer}
            <!-- promise is pending -->
                <div class="shine"></div>
            {:then value}
                <div in:fly={{ duration: 1000, y: -50 }} class="footer-content">
                    <h2>{value.title}</h2>
                    <p>{value.description}</p>
                </div>
                <div class="footer-touch">
                    <h3>{value.subtitle}</h3>
                    {#await contact}
                        <div class="shine links-shine"></div>
                    {:then value}
                        <a href="tel:{value.phone}">{value.phone}</a>
                        <a href="mailto:{value.email}">{value.email}</a>
                    {:catch error}
                    <!-- promise was rejected -->
                        <p>Something went wrong: {error.message}</p>
                    {/await}
                </div>
            {:catch error}
            <!-- promise was rejected -->
                <p>Something went wrong: {error.message}</p>
            {/await}
            <div class="footer-social-links">
                <SocialLinks/>
            </div>
        </div>

    </div>
</footer>

<style>

    footer {
        padding: calc(var(--app-indent) * 2 * 1px) 0;
        background: var(--app-secondary-background-color);
        margin-bottom: 60px;
        color: var(--app-light-text-color);
    }

    h2 {
        margin-bottom: calc(var(--app-indent) * 1px);
    }

    .footer-touch {
        display: flex;
        flex-direction: column;
    }

    .footer-touch a {
        display: inline-flex;
        margin-bottom: calc(var(--app-indent) / 2 * 1px);
    }

    .footer-social-links{
        margin-top: calc(var(--app-indent) * 1px);
        color: var(--app-light-text-color);
    }

    .footer-content p{
        color: var(--app-light-text-color);
    }

    @media (min-width: 992px) {
        footer {
            margin-bottom: 0;
        }
    }

</style>
