import { bootstrapReactPage } from "./bootstrap-react-page.js";

await bootstrapReactPage({
  imports: ["../app.js", "../auth.js", "../brew-save.js"]
});
