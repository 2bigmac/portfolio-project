<script>
    import Ripple from "../Ripple.svelte";
    import {link} from "svelte-routing";
    import NavLink from './NavLink.svelte';
</script>

<nav id="nav--m">
    <ul class="nav-container-mobile">
        <li>
            <a href='/#works'>
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M5,9.5L7.5,14H2.5L5,9.5M3,4H7V8H3V4M5,20A2,2 0 0,0 7,18A2,2 0 0,0 5,16A2,2 0 0,0 3,18A2,2 0 0,0 5,20M9,5V7H21V5H9M9,19H21V17H9V19M9,13H21V11H9V13Z" />
                </svg>
                <Ripple/>
                <span class="link-item-text">Works</span>
            </a>
        </li>
        <li>
            <a use:link href='/about'>
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
                </svg>
                <Ripple/>
                <span class="link-item-text">About</span>
            </a>
        </li>

        <li>
            <a href='mailto:huliaiev@gmail.com'>
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" />
                </svg>
                <Ripple/>
                <span class="link-item-text">Contact</span>
            </a>
        </li>
    </ul>
</nav>

<style>
    nav {
        position: fixed;
        z-index: 10;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        background: var(--app-secondary-background-color);
        padding-bottom: calc(var(--app-indent) * 1px);
    }

    ul {
        display: flex;
        padding: 0;
        margin: 0;
        list-style: none;
        width: 100%;
        height: 50px;
    }

    li {
        text-align: center;
        flex: 1;
    }

    a {
        --custom-min-fz: 14;
        --custom-max-fz: 14;
        display: flex;
        flex-direction: column;
        position: relative;
        height: 100%;
        align-items: center;
        justify-content: center;
        border-radius: calc(var(--app-border-radius) * 1px);
        padding: calc(var(--app-indent) / 2 * 1px);
        color: var(--app-light-text-color);
    }

    .link-item-text {
        transition: var(--app-transition);
    }

    svg {
        display: inline-block;
        width: 20px;
        height: 20px;
    }

    @media (min-width: 992px) {
        a:hover {
            color: var(--app-primary-color);
            background: rgba(255, 255, 255, 0.8);
        }
    }

    a:focus {
        color: var(--app-primary-color);
        background: rgba(255, 255, 255, 0.9);
        outline: 0;
    }

    a:active {
        color: var(--app-primary-color);
        background: rgba(255, 255, 255, 0.8);
    }
</style>
