<script lang="ts">
  import ControlWrapper from "./ControlWrapper.svelte";
  import type { FormState } from "svelte-forms-lib";
  import type { DotNestedKeys, DropdownOption } from "./types";
  import { derived } from "svelte/store";
  import get from "lodash/get";
  import { getControlValue } from "./getControlValue";

  type T = $$Generic<Record<string, any>>;
  type $$Props = {
    formState: FormState<T>;
    className?: string;
    label?: string;
    name: DotNestedKeys<T>;
    options: Array<DropdownOption>;
    showEmptyOption?: boolean;
  };

  let { formState, className, label, name, options, showEmptyOption } =
    $$props as $$Props;
  const value = getControlValue(formState, name);
</script>

<ControlWrapper {formState} {name} {label}>
  <select
    {name}
    on:change={formState.handleChange}
    bind:value={$value}
    class="select w-full select-bordered max-w-xs {className}"
  >
    {#if showEmptyOption}
      <option value="" />
    {/if}
    {#each options as option (option.value)}
      <option value={option.value} disabled={option.disabled}>
        {option.label}</option
      >
    {/each}
  </select>
</ControlWrapper>
