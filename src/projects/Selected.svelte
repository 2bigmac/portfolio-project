<script>
    import {db} from "../firebase/firebase";
    import {link} from "svelte-routing";
    import {fly} from "svelte/transition";
    import Ripple from "../components/Ripple.svelte";


    const getSelected = async () => {
        let data = [];
        await db
                .collection("fl_content")
                .where("_fl_meta_.schema", "==", "projects")
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        data = doc.data().project.filter(item => item.projectSelected).sort((a, b) => a.order - b.order);
                    });
                });
        return data;

    }

</script>

<section class="selected">
    <h2>Selected Works</h2>
    {#await getSelected()}
    <!-- promise is pending -->
        <div class="shine"></div>
    {:then value}
        <div class="selected-inner grid">
            {#each value as selected, index (selected.uniqueKey)}
                <article class="selected-item grid" in:fly={{ duration: 1000, delay: (index + 1) * 200, x: -100 }}>
                    <div class="selected-item__content">
                        <h3>{selected.title}</h3>
                        <ul class="list">
                            {#each selected.tags as tag}
                                <li class="list-item">{tag}</li>
                            {/each}
                        </ul>

                        <p>{selected.description}</p>
                        <a href={`/project/${selected.uniqueKey}`} use:link class="btn btn-primary">
                            View case study
                            <Ripple/>
                        </a>
                    </div>
                    <a href={`/project/${selected.uniqueKey}`} use:link class="selected-item__img">
                        <img loading="lazy"  src="{selected.previewImg}" alt="{selected.title}">
                    </a>

                </article>
            {/each}
        </div>
    {:catch error}
    <!-- promise was rejected -->
        <p>Something went wrong: {error.message}</p>
    {/await}
</section>


<style>
    .selected {
        margin: calc(var(--app-indent) * 2 * 1px) 0;
        padding: calc(var(--app-indent) * 1px) 0;
    }

    .selected-inner {
        gap: calc(var(--app-indent) * 5 * 1px) 0;
        margin-top: calc(var(--app-indent) * 2 * 1px);
    }

    .selected-item {
        grid-column: 1 / 13;
    }

    .selected-item__img {
        height: 100%;
        border-radius: calc(var(--app-border-radius) * 1px);
        overflow: hidden;
        box-shadow: var(--app-box-shadow);
        transition: all .25s ease;
        object-fit: cover;
    }

    .shine {
        width: 100%;
        height: 270px;
    }

    .selected-item__img:hover{
        transform: scale(1.025);
    }

    .btn{
        margin-top:  calc(var(--app-indent)  * 1px);
    }

    .list{
        display: flex;
        flex-wrap: wrap;
    }
    .list-item:not(:last-child){
        margin-right: calc(var(--app-indent)  * 1px);
    }

    @media (min-width: 992px) {

        .selected-item__content {
            grid-column: 1 / 8;
        }

        .selected-item__img {
            grid-column: 9 / 13;
        }

        .shine {
            width: 100%;
            height: 270px;
        }
        .selected-inner {
            gap: calc(var(--app-indent) * 4 * 1px) 0;
        }
    }
</style>
