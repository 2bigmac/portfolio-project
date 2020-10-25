<script>
    import {db} from "../firebase/firebase";
    import {link} from "svelte-routing";
    import {fly} from "svelte/transition";
    import Ripple from "../components/Ripple.svelte";


    const getOther = async () => {
        let data = [];
        await db
                .collection("fl_content")
                .where("_fl_meta_.schema", "==", "projects")
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        data = doc.data().project.filter(item => item.projectPlayground).sort((a, b) => a.order - b.order);
                    });
                });
        return data;

    }

</script>

<section class="otherProjects">
    <h2>Coding playground</h2>
    <p>By clicking this picture below, you will follow the link to my github page</p>
    {#await getOther()}
    <!-- promise is pending -->
        <div class="shine"></div>
    {:then value}
        <div class="otherProjects-inner grid">
            {#each value as other, index}
                <a aria-label="{other.title}" in:fly={{ duration: 1000, delay: (index + 1) * 200, y: 100 }}
                   href={other.githubLink}
                   target="_blank"
                   rel=”noreferrer”
                   use:link class="otherProjects-img">
                    <img loading="lazy" src="{other.previewImg}" alt="{other.title}">

                    {#if other.overlayText}
                        <p class="otherProjects-overlayText">{@html other.overlayText}</p>
                    {/if}
                    <Ripple/>
                </a>
            {/each}
        </div>
    {:catch error}
    <!-- promise was rejected -->
        <p>Something went wrong: {error.message}</p>
    {/await}
</section>


<style>
    .otherProjects {
        padding: calc(var(--app-indent) * 3 * 1px) 0;
    }

    .otherProjects-inner {
        gap: calc(var(--app-indent) * 2 * 1px);
        grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    }

    .otherProjects-img {
        height: 100%;
        border-radius: calc(var(--app-border-radius) * 1px);
        overflow: hidden;
        box-shadow: var(--app-box-shadow);
        transition: all .2s ease;
        will-change: transform;
        position: relative;
    }

    .shine {
        width: 100%;
        height: 270px;
    }

    .otherProjects-img:hover {
        transform: scale(1.025);
    }

    .otherProjects-overlayText {
        --custom-min-fz: 20;
        --custom-max-fz: 35;
        display: flex;
        align-items: center;
        position: absolute;
        padding: calc(var(--app-indent) * 1px);
        color: var(--app-light-text-color);
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        opacity: 0;
        margin: 0;
        transition: opacity .2s ease-out;
    }

    .otherProjects-overlayText * {
        color: var(--app-light-text-color);
    }

    .otherProjects-img:hover .otherProjects-overlayText {
        opacity: 1;
    }

    .otherProjects-overlayText:before {

    }

    @media (min-width: 992px) {

        .shine {
            width: 100%;
            height: 270px;
        }

    }
</style>
