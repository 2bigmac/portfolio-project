<script>
    import Ripple from "./Ripple.svelte";
    import {onMount} from "svelte";
    import getData from '../firebase/firebaseData';
    import {fly, fade} from "svelte/transition";
    import SocialLinks from "./SocialLinks.svelte";

    let hero = getData('hero');

    function measureClick(e) {
        window.an.logEvent('hero_click', {
            content_type: 'click',
            value: e.target.href,
        });
    }

</script>
<section class="hero grid">
    <div class="hero-inner">
        {#await hero}
        <!-- promise is pending -->
            <div class="shine hero-shine"></div>
        {:then value}
            <div in:fly={{ duration: 1000, y: -50 }} class="hero-content">
                {@html value.heroContent}
            </div>
        {:catch error}
        <!-- promise was rejected -->
            <p>Something went wrong: {error.message}</p>
        {/await}
        <div class="hero-social-links">
            <SocialLinks/>
        </div>
    </div>
</section>

<style>

    .hero {
        position: relative;
        padding: calc(var(--app-indent) * 1px) 0;
        align-items: center;
    }

    .hero-inner {
        grid-column: 1 / 10;
    }

    .hero-social-links {
        display: flex;
    }

    .links-shine {
        grid-column: 1 / 3;
        width: 100%;
        height: 18px;
    }

    .hero-shine {
        grid-column: 1 / 9;
        width: 100%;
        height: 235px;
    }

    @media (min-width: 768px) {
        .hero-inner {
            grid-column: 1 / 10;
        }
    }

    @media (min-width: 992px) {
        .links-shine {
            grid-column: 1 / 3;
            width: 100%;
            height: 18px;
        }

        .hero-shine {
            grid-column: 1 / 9;
            width: 100%;
            height: 235px;
        }
        .hero {
            padding: calc(var(--app-indent) * 3 * 1px) 0;
        }
    
    }

  

     @media (min-width: 1800px) {

         .hero-inner {
            grid-column: 1 / 8;
        }
    }

    	
</style>
