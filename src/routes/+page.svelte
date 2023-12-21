<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

{#if !data.loggedIn}
    <a href="/app/oauth/42">Log in with 42</a>
{:else}
    <div>You are logged in!</div>
{/if}
