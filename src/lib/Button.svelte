<script lang="ts">
  type $$Props = {
    color:
      | "primary"
      | "secondary"
      | "success"
      | "danger"
      | "warning"
      | "info"
      | "light"
      | "dark";
    size: "lg" | "md" | "sm" | "xs";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
    class?: string;
  };
  const colorsClassMap = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    success: "btn-success",
    danger: "btn-danger",
    warning: "btn-warning",
    info: "btn-info",
    light: "btn-light",
    dark: "btn-dark",
  };

  let {
    color = "primary",
    size = "sm",
    disabled,
    class: className = "",
    type,
    onClick,
  } = $$props as $$Props;
</script>

<button
  class="btn {colorsClassMap[color]} btn-{size} {className}"
  {disabled}
  {type}
  on:click={onClick}
>
  <slot />
</button>
