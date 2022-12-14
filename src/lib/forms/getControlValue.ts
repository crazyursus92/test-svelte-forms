import get from "lodash/get";
import type { FormState } from "svelte-forms-lib";
import { derived, writable, get as storeGet } from "svelte/store";

export function getControlValue(formState: FormState, name: string) {
  const formValue = storeGet(
    derived(formState.form, ($form) => get($form, name))
  );

  let value = writable(formValue);
  value.subscribe((v) => {
    formState.updateField(name, v);
  });

  return value;
}
