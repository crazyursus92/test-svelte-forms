<script lang="ts">
  import type { Props } from "./test.svelte";
  type $$Props = Props & { before: string };

  let props = $$props as $$Props;
</script>

<div>
  {props.before}
  {props.text}
  {props.after}
</div>
