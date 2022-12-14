<script lang="ts">
  import type { FormState } from "svelte-forms-lib";
  import get from "lodash/get";
  import type { DotNestedKeys } from "./types";

  type T = $$Generic<Record<string, any>>;
  type $$Props = {
    formState: FormState<T>;
    className?: string;
    label?: string;
    name: DotNestedKeys<T>;
  };

  let {
    formState: { errors },
    className,
    label,
    name,
  } = $$props as $$Props;

  $: error = get($errors, name);
</script>

<div class="form-control w-full max-w-xs {className}">
  {#if label}
    <label class="label">
      <span class="label-text">{label}</span>
    </label>
  {/if}
  <slot />
  {#if error}
    <label class="label">
      <span class="label-text-alt">{error}</span>
    </label>
  {/if}
</div>
