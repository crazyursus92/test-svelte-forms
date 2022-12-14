<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import ControlWrapper from "./forms/ControlWrapper.svelte";
  import InputControl from "./forms/InputControl.svelte";
  import * as Yup from "yup";
  import SelectControl from "./forms/SelectControl.svelte";
  import Button from "./Button.svelte";

  const formState = createForm({
    initialValues: {
      title: "",
      name: "",
      email: "",
      data: {
        id: 0,
        name: "",
      },
      arrayData: [
        {
          id: 0,
          name: "",
        },
      ],
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(),
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      data: Yup.object().shape({
        id: Yup.number().required(),
        name: Yup.string().required(),
      }),
      arrayData: Yup.array().of(
        Yup.object().shape({
          id: Yup.number().required(),
          name: Yup.string().required(),
        })
      ),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });
  const { form, handleSubmit, errors } = formState;

  function addArrayItem() {
    console.log("addArrayItem");
    form.update((values) => {
      console.log(values);
      values.arrayData = [
        ...values.arrayData,
        {
          id: 0,
          name: "",
        },
      ];
      return { ...values };
    });
  }

  function removeArrayItem(index: number) {
    form.update((values) => {
      values.arrayData = values.arrayData.filter((_, i) => i !== index);
      return values;
    });
  }
</script>

<div class="flex justify-between">
  <form on:submit={handleSubmit} class="w-6/12">
    <label for="title">title</label>

    <SelectControl
      {formState}
      name="title"
      label="Title"
      showEmptyOption={true}
      options={[
        {
          value: "Mr",
          label: "Mr",
        },
        {
          value: "Mrs",
          label: "Mrs",
        },
      ]}
    />
    <InputControl {formState} name="name" label="Name" />
    <InputControl {formState} name="email" label="Email" />
    <h3 class="mt-4">Nested data</h3>
    <InputControl {formState} type="number" name="data.id" label="Data ID" />
    <InputControl {formState} name="data.name" label="Data name" />
    <h3 class="mt-4">Array data</h3>
    {#each $form.arrayData as item, index}
      <div class="mt-2 border-b">
        <InputControl
          {formState}
          type="number"
          name={`arrayData.${index}.id`}
          label="Array Data ID"
        />
        <InputControl
          {formState}
          name={`arrayData.${index}.name`}
          label="Array Data Name"
        />
        <Button
          color="danger"
          class="my-2"
          size="xs"
          type="button"
          onClick={() => removeArrayItem(index)}>Remove</Button
        >
      </div>
    {/each}
    <Button
      class="my-2"
      color="secondary"
      size="xs"
      type="button"
      onClick={() => addArrayItem()}>Add new</Button
    >
    <div class="mt-2">
      <Button color="primary" size="sm">Submit</Button>
    </div>
  </form>
  <pre
    class="bg-gray-700 max-h-[80vh] sticky top-0 rounded-xl overflow-auto p-5 w-5/12 text-white break-words">
    <code>
    {JSON.stringify($form, null, 2)}
  </code>
  </pre>
</div>
