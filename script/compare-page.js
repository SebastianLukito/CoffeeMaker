(function initComparePage() {
  const coffeeTypeEl = document.getElementById("coffeeType");
  const brewToolEl = document.getElementById("brewTool");
  const generateEl = document.getElementById("generate");
  const compareToggleEl = document.getElementById("compareToggle");
  const compareBodyEl = document.getElementById("compareBody");

  if (!coffeeTypeEl || !brewToolEl || !compareToggleEl || !compareBodyEl) {
    return;
  }

  function dispatchChange(element) {
    element.dispatchEvent(new Event("change", { bubbles: true }));
  }

  if (!coffeeTypeEl.value) {
    coffeeTypeEl.value = "java-arabica";
    dispatchChange(coffeeTypeEl);
  }

  if (!brewToolEl.value) {
    brewToolEl.value = "v60";
    dispatchChange(brewToolEl);
  }

  if (generateEl) {
    generateEl.click();
  }

  if (compareBodyEl.classList.contains("is-hidden")) {
    compareToggleEl.click();
  }
})();
