<script>
    import Hero from '../components/Hero.svelte'
    import Selected from "../projects/Selected.svelte";
    import Other from "../projects/Other.svelte";
    import Playground from "../projects/Playground.svelte";
</script>


<div class="home">
    <div class="wrapper">
        <Hero/>
        <div id="works">
            <Selected/>
            <Other/>
            <Playground/>
        </div>
    </div>
</div>
