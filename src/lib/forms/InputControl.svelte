<script lang="ts">
  import ControlWrapper from "./ControlWrapper.svelte";
  import type { FormState } from "svelte-forms-lib";
  import type { DotNestedKeys } from "./types";
  import { getControlValue } from "./getControlValue";

  type T = $$Generic<Record<string, any>>;
  type $$Props = Omit<
    svelte.JSX.SvelteInputProps,
    "bind:value" | "on:change"
  > & {
    formState: FormState<T>;
    className?: string;
    label?: string;
    name: DotNestedKeys<T>;
  };

  let { formState, className, label, name, ...rest } = $$props as $$Props;
  const value = getControlValue(formState, name);
</script>

<ControlWrapper {formState} {name} {label}>
  <input
    {...rest}
    {name}
    on:change={formState.handleChange}
    bind:value={$value}
    class={`input input-bordered w-full max-w-xs ${className}`}
  />
</ControlWrapper>
