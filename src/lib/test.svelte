<script lang="ts" context="module">
  export type Props = {
    text: string;
    after?: string;
  };
</script>

<script lang="ts">
  type $$Props = Props;
  let props = $$props as $$Props;
</script>

<div>
  {props.text}
  {#if props.after}
    {props.after}
  {/if}
</div>
