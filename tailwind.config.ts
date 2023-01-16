import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

export default <Partial<Config>>{
  theme: {
    screens: {
      xst: "300px",
      xs: "475px",
      ...defaultTheme.screens,
    },
  },
}
