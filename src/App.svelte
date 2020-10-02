<script>
	import {Router, Link, Route} from "svelte-routing";
	import Home from "./pages/Home.svelte";
	import About from "./pages/About.svelte";
	import Project from "./pages/Project.svelte";
	import Nav from "./components/Nav/Nav.svelte";
	import Footer from "./components/Footer.svelte";

	export let url = "";
</script>

<Router url="{url}">
	<Nav/>
	<main>
		<Route path="about" component="{About}" />
		<Route path="/project/:uniqueKey" component={Project} />
		<Route path="/"><Home /></Route>
	</main>
	<Footer/>
</Router>

