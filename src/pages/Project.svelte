<script>
    export let uniqueKey;
    import {link} from "svelte-routing";
    import {fly, fade} from "svelte/transition";
    import {onMount} from "svelte";
    import {db} from "../firebase/firebase";

    const getProject = async () => {
        let data = [];
        await db
                .collection("fl_content")
                .where("_fl_meta_.schema", "==", "projects")
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        data = doc.data().project.filter(item => item.uniqueKey === uniqueKey);
                    });
                });
        return data;
    }

    onMount(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    })

</script>
<section class="project">
    <div class="wrapper">
        {#await getProject()}
        <!-- promise is pending -->
            <div class="shine"></div>
        {:then value}
            {#each value as project}
                <div class="project-hero grid">
                    <div class="project-hero__content">
                        {#if !project.projectOther}
                            <span in:fly={{ duration: 1000, x: -50 }} class="caseStudy">Case  <br> Study</span>
                        {/if}
                        <h1 in:fly={{ duration: 1000, x: -40 }} class="title">{project.title}</h1>
                        <h4 in:fly={{ duration: 1000, x: -30 }} class="subtitle">{project.subtitle}</h4>
                        <p in:fly={{ duration: 1000, x: -20 }} class="description">{project.description}</p>
                    </div>
                    <div in:fly={{ duration: 1000, x: 50 }} class="project-hero__img"
                         style="background-image: url('{project.previewImg}')">
                    </div>
                </div>


                <div class="project-content grid">
                    {#each project.contentField as contentField}
                        <div class="project-content__inner grid">
                            <h2 class="project-content__title"
                                in:fly={{ duration: 1000, x: -50 }}>{contentField.title}</h2>
                            {#if contentField.description}
                                <p class="project-content__description"
                                   in:fly={{ duration: 1000, x: 50 }}>{@html contentField.description}</p>
                            {/if}
                            {#if contentField.image}
                                <div in:fly={{ duration: 1000, x: 50 }} class:imageWide={contentField.imageWide} class="project-content__description-img"
                                     style="background-image: url('{contentField.image}')">
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            {/each}
        {:catch error}
        <!-- promise was rejected -->
            <p>Something went wrong: {error.message}</p>
        {/await}
    </div>
</section>

<style>
    .project {
        padding: calc(var(--app-indent) * 1px) 0;
    }

    .project-hero {
        position: relative;
    }

    .caseStudy {
        position: absolute;
        top: -5%;
        left: 0;
        font-size: 138px;
        font-weight: bold;
        text-transform: uppercase;
        color: rgba(245, 245, 245, 0.93);
        z-index: -1;
        display: none;
    }

    .shine {
        height: 80vh;
    }

    .project-hero {
        margin-bottom: calc(var(--app-indent) * 2 * 1px);
    }

    .project-content__inner, .project-hero {
        gap: 0;
    }

    .project-hero__img, .project-content__description-img {
        background-position: left;
        background-size: contain;
        background-repeat: no-repeat;
        min-height: 250px;
    }

    @media (min-width: 992px) {
        .project {
            padding: calc(var(--app-indent) * 3 * 1px) 0;
        }

        .project-hero {
            margin-bottom: calc(var(--app-indent) * 4 * 1px);
        }

        .caseStudy {
            display: block;
        }

        .project-content {
            gap: calc(var(--app-indent) * 3 * 1px) 0;
        }

        .project-content__inner {
            grid-column: 1 / 13;
        }

        .project-hero__content {
            grid-column: 1 / 6;
        }

        .project-hero__img {
            grid-column: 7 / 13;
        }

        .project-content__title {
            grid-column: 1 / 4;
        }

        .project-content__description, .project-content__description-img {
            grid-column: 7 / 13;
        }

        .project-content__description-img.imageWide{
            grid-column: 1 / 13;
            background-position: center;
        }

        .project-hero__img, .project-content__description-img {
            min-height: 500px;
        }
    }
    @media (min-width: 1800px) {
        .project-hero__img, .project-content__description-img {
            min-height: 600px;
        }
    }
</style>
