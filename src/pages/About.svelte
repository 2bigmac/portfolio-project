<script>
    import getData from '../firebase/firebaseData';
    import {fly, fade} from "svelte/transition";
    import SocialLinks from "../components/SocialLinks.svelte";
    import Ripple from "../components/Ripple.svelte";

    let about = getData('about');
    let contact = getData('contact');
</script>

<section class="about">
    <div class="wrapper">
        {#await about}
        <!-- promise is pending -->
            <div class="shine"></div>
        {:then value}
            <div class="about-inner grid">
                <div in:fly={{ duration: 1000, x: -50 }} class="about-image">
                    <img src="{value.avatarImage}" alt="{value.title}">
                </div>
                <div in:fly={{ duration: 1000, x: 50 }} class="about-description">
                    <h1>{value.title}</h1>
                    <p>{value.description}</p>
                    {#await contact}
                        <!-- promise is pending -->
                            <div class="shine"></div>
                    {:then value}
                    <a target="_blank" rel="nofollow" href="{value.resume}" class="btn btn-primary">
                        Resume
                        <Ripple/>
                    </a>
                    {:catch error}
                    <!-- promise was rejected -->
                        <p>Something went wrong: {error.message}</p>
                    {/await}
                    <SocialLinks/>
                </div>
                <div in:fly={{ duration: 1000, y: 50 }} class="about-content">
                    {@html value.content}
                    {#await contact}
                    <!-- promise is pending -->
                        <div class="shine"></div>
                    {:then value}
                        <a href="mailto:{value.email}" class="btn btn-primary">
                            Contact me
                            <Ripple/>
                        </a>
                    {:catch error}
                    <!-- promise was rejected -->
                        <p>Something went wrong: {error.message}</p>
                    {/await}
                </div>
                <div in:fly={{ duration: 1000, y: -50 }} class="about-content-image">
                    <img src="{value.contentImage}" alt="{value.title}">
                </div>
            </div>
        {:catch error}
        <!-- promise was rejected -->
            <p>Something went wrong: {error.message}</p>
        {/await}
    </div>
</section>

<style>
    .about {
        padding: calc(var(--app-indent) * 1px) 0;
    }

    .btn {
        margin-bottom: calc(var(--app-indent) * 2 * 1px);
    }

    .shine{
        height: 80vh;
    }
    .about-image, .about-content-image{
        max-width: 400px;
    }

    @media (min-width: 992px) {
        .about {
            padding: calc(var(--app-indent) * 3 * 1px) 0;
        }

        .about-image, .about-content-image{
            box-shadow: var(--app-box-shadow);
            border-radius: calc(var(--app-border-radius) * 1px);
            overflow: hidden;
            height: 100%;
            object-fit: cover;
        }

        .about-image, .about-content {
            grid-column: 1 / 6;
        }

        .about-description, .about-content-image {
            grid-column: 7 / 13;
        }

        .about-content, .about-content-image {
            grid-row: 2;
        }

        .about-inner {
            gap: calc(var(--app-indent) * 4 * 1px) 0;
        }
    }
</style>
